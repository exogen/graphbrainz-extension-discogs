import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'
import DiscogsClient from './client'
import { ONE_DAY } from 'graphbrainz/lib/util'

export default {
  name: 'Discogs',
  description: `Retrieve artist, release, and recording information from
[Discogs](https://www.discogs.com/).`,
  extendContext(context, { discogs = {} } = {}) {
    const client = new DiscogsClient(discogs)
    const cacheSize = parseInt(
      process.env.DISCOGS_CACHE_SIZE ||
        process.env.GRAPHBRAINZ_CACHE_SIZE ||
        8192,
      10
    )
    const cacheTTL = parseInt(
      process.env.DISCOGS_CACHE_TTL ||
        process.env.GRAPHBRAINZ_CACHE_TTL ||
        ONE_DAY,
      10
    )
    return {
      ...context,
      loaders: {
        ...context.loaders,
        discogs: createLoader({ client, cacheSize, cacheTTL })
      }
    }
  },
  extendSchema: {
    schemas: [schema],
    resolvers
  }
}
