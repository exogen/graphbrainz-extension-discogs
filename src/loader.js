import qs from 'qs'
import DataLoader from 'dataloader'
import LRUCache from 'lru-cache'
import createLogger from 'debug'

const debug = createLogger('graphbrainz-extension-discogs:loader')

export default function createLoader(options) {
  const { client } = options
  const cache = LRUCache({
    max: options.cacheSize,
    maxAge: options.cacheTTL,
    dispose(key) {
      debug(`Removed from cache. key=${key}`)
    }
  })
  // Make the cache Map-like.
  cache.delete = cache.del
  cache.clear = cache.reset

  const catchNotFound = err => {
    if (err.statusCode === 404) {
      return null
    }
    debug(`Error: ${err}`)
    throw err
  }

  const loader = new DataLoader(
    keys => {
      return Promise.all(
        keys.map(key => {
          const [endpoint, id] = key
          switch (endpoint) {
            case 'artist':
              return client.artist(id).catch(catchNotFound)
            case 'label':
              return client.label(id).catch(catchNotFound)
            case 'master':
              return client.master(id).catch(catchNotFound)
            case 'release':
              return client.release(id).catch(catchNotFound)
            default:
              throw new Error(`Unsupported endpoint: ${endpoint}`)
          }
        })
      )
    },
    {
      cacheKeyFn: ([endpoint, id, params = {}]) => {
        return [endpoint, id, qs.stringify(params)].join('/')
      },
      cacheMap: cache
    }
  )

  return loader
}
