import Client from 'graphbrainz/lib/api/client'

export default class DiscogsClient extends Client {
  constructor({
    consumerKey = process.env.DISCOGS_CONSUMER_KEY,
    consumerSecret = process.env.DISCOGS_CONSUMER_SECRET,
    baseURL = process.env.DISCOGS_BASE_URL || 'https://api.discogs.com/',
    limit = consumerKey && consumerSecret ? 60 : 25,
    period = 60000,
    ...options
  } = {}) {
    super({ baseURL, limit, period, ...options })
    this.consumerKey = consumerKey
    this.consumerSecret = consumerSecret
  }

  shouldRetry(err) {
    if (err instanceof this.errorClass) {
      if (err.statusCode === 429) {
        return true
      }
    }
    return super.shouldRetry(err)
  }

  get(path, options = {}) {
    options = {
      json: true,
      ...options,
      qs: {
        ...options.qs,
        key: this.consumerKey,
        secret: this.consumerSecret
      }
    }
    return super.get(path, options)
  }

  artist(id) {
    return this.get(`artists/${id}`)
  }

  label(id) {
    return this.get(`labels/${id}`)
  }

  master(id) {
    return this.get(`masters/${id}`)
  }

  release(id) {
    return this.get(`releases/${id}`)
  }
}
