import URL from 'url'
import createLogger from 'debug'

const debug = createLogger('graphbrainz-extension-discogs:resolvers')

function findDiscogsID(entity, args, context) {
  // TODO: Make this more efficient by (1) being able to tell GraphBrainz
  // that we should fetch `url-rels` along with the artist when the
  // `discogs` field is requested, and/or (2) adding the ability to check
  // whether `url-rels` were already requested: otherwise we can't
  // distinguish between an item having no URL relationships and them just
  // not being requested yet.
  const isURL = relation => relation['target-type'] === 'url'
  let rels = entity.relations ? entity.relations.filter(isURL) : []
  if (!rels.length) {
    rels = context.loaders.lookup
      .load([entity._type, entity.id, { inc: 'url-rels' }])
      .then(entity => entity.relations.filter(isURL))
  }
  return Promise.resolve(rels).then(rels => {
    const rel = rels.find(rel => rel.type === 'discogs')
    if (rel) {
      const url = URL.parse(rel.url.resource)
      const match = url.pathname.match(
        /\/(artist|label|master|release)\/(?:view\/)?([0-9]+)(?:-[^/]+)?$/
      )
      // Return the segment preceding the ID too, so we know what type of entity
      // we're getting from the API.
      if (match) {
        debug(
          `Matched Discogs URL: ${url.pathname} => [${match[1]}, ${match[2]}]`
        )
        return [match[1], match[2]]
      } else {
        debug(`Failed to parse entity from Discogs URL: ${url.pathname}`)
      }
    }
    return null
  })
}

function createDiscogsResolver(discogsType) {
  return function resolveDiscogs(entity, args, context) {
    return findDiscogsID(entity, args, context).then(discogsID => {
      if (!discogsID) {
        return null
      }
      const [endpoint, id] = discogsID
      if (endpoint === discogsType) {
        return context.loaders.discogs.load([endpoint, id])
      }
      return null
    })
  }
}

// Master releases and releases share a lot of fields.
const releaseResolvers = {
  url: release => release.uri,
  artistCredits: release => release.artists || [],
  genres: release => release.genres || [],
  styles: release => release.styles || [],
  forSaleCount: release => release.num_for_sale,
  lowestPrice: release => release.lowest_price,
  dataQuality: release => release.data_quality,
  videos: release => release.videos || []
}

export default {
  DiscogsImage: {
    url: image => image.uri,
    type: image => (image.type ? image.type.toUpperCase() : null),
    thumbnail: image => image.uri150
  },
  DiscogsArtist: {
    artistID: artist => artist.id,
    images: artist => (artist.images || []).filter(image => image.uri),
    url: artist => artist.uri || null,
    urls: artist => artist.urls || [],
    nameVariations: artist => artist.namevariations || [],
    realName: artist => artist.realname || null,
    dataQuality: artist => artist.data_quality || null,
    members: artist => artist.members || [],
    aliases: (artist, args, context) =>
      Promise.all(
        (artist.aliases || []).map(alias => {
          if (alias.id) {
            return context.loaders.discogs.load(['artist', alias.id])
          }
          return null
        })
      )
  },
  DiscogsArtistMember: {
    artist: (member, args, context) => {
      if (member.id) {
        return context.loaders.discogs.load(['artist', member.id])
      }
      return null
    }
  },
  DiscogsArtistCredit: {
    nameVariation: credit => credit.anv || null,
    joinPhrase: credit => credit.join || '',
    roles: credit => {
      if (credit.role) {
        const roles = []
        let role = ''
        let inBrackets = 0
        for (let i = 0; i < credit.role.length; i++) {
          const char = credit.role.charAt(i)
          switch (char) {
            case ',':
              if (inBrackets) {
                role += char
              } else {
                roles.push(role)
                role = ''
                inBrackets = 0
              }
              break
            case '[':
              role += char
              inBrackets += 1
              break
            case ']':
              role += char
              inBrackets = Math.max(0, inBrackets - 1)
              break
            default:
              role += char
          }
        }
        roles.push(role)
        return roles.map(value => value.trim()).filter(value => value)
      }
      return []
    },
    tracks: credit =>
      credit.tracks
        ? credit.tracks
            .split(',')
            .map(value => value.trim())
            .filter(value => value)
        : [],
    artist: (credit, args, context) => {
      if (credit.id) {
        return context.loaders.discogs.load(['artist', credit.id])
      }
      return null
    }
  },
  DiscogsLabel: {
    labelID: label => label.id,
    url: label => label.uri,
    contactInfo: label => label.contact_info || null,
    images: label => label.images || [],
    parentLabel: (label, args, context) => {
      if (label.parent_label) {
        return context.loaders.discogs.load(['label', label.parent_label.id])
      }
      return null
    },
    subLabels: (label, args, context) => {
      if (label.sublabels) {
        return label.sublabels.map(subLabel =>
          context.loaders.discogs.load(['label', subLabel.id])
        )
      }
      return []
    },
    dataQuality: label => label.data_quality
  },
  DiscogsMaster: {
    masterID: master => master.id,
    ...releaseResolvers,
    mainRelease: (master, args, context) => {
      if (master.main_release) {
        return context.loaders.discogs.load(['release', master.main_release])
      }
      return null
    }
  },
  DiscogsRelease: {
    releaseID: release => release.id,
    ...releaseResolvers,
    extraArtistCredits: release => release.extraartists || [],
    thumbnail: release => release.thumb || null,
    master: (release, args, context) => {
      if (release.master_id) {
        return context.loaders.discogs.load(['master', release.master_id])
      }
      return null
    }
  },
  DiscogsCommunity: {
    haveCount: community => community.have,
    wantCount: community => community.want
  },
  DiscogsRating: {
    voteCount: rating => rating.count,
    value: rating => rating.average
  },
  DiscogsVideo: {
    url: video => video.uri,
    duration: video => (video.duration == null ? null : video.duration * 1000)
  },
  Artist: {
    discogs: createDiscogsResolver('artist')
  },
  Label: {
    discogs: createDiscogsResolver('label')
  },
  Release: {
    discogs: createDiscogsResolver('release')
  },
  ReleaseGroup: {
    discogs: createDiscogsResolver('master')
  }
}
