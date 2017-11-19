import test from 'ava'
import { graphql } from 'graphql'
import { setupTests } from 'ava-nock'
import { createContext } from 'graphbrainz/lib/context'
import { options, schema, testQuerySnapshot } from './_helpers'

setupTests()

test('discogs queries work if there is no API key configured', t => {
  const context = createContext({
    ...options,
    discogs: {
      consumerKey: null,
      consumerSecret: null
    }
  })
  return graphql(
    schema,
    `
      {
        lookup {
          artist(mbid: "5b11f4ce-a62d-471e-81fc-a69a8278c7da") {
            discogs {
              artistID
            }
          }
        }
      }
    `,
    null,
    context
  ).then(result => t.snapshot(result), err => t.snapshot(err))
})

test(
  'MusicBrainz artists have a discogs artist field',
  testQuerySnapshot,
  `
    {
      lookup {
        artist(mbid: "5441c29d-3602-4898-b1a1-b77fa23b8e50") {
          discogs {
            artistID
            name
            nameVariations
            realName
            aliases {
              artistID
              name
            }
            url
            urls
            profile
            images {
              url
              type
              width
              height
              thumbnail
            }
            dataQuality
            members {
              name
              active
              artist {
                artistID
                name
              }
            }
          }
        }
      }
    }
  `
)

test(
  'MusicBrainz releases have a discogs release field',
  testQuerySnapshot,
  `
    {
      search {
        releases(query: "OK Computer", first: 5) {
          nodes {
            title
            discogs {
              releaseID
              title
              url
              artistCredits {
                name
                nameVariation
                joinPhrase
                roles
                tracks
                artist {
                  artistID
                }
              }
              extraArtistCredits {
                name
                nameVariation
                joinPhrase
                roles
                tracks
                artist {
                  artistID
                }
              }
              genres
              styles
              forSaleCount
              lowestPrice
              year
              notes
              country
              master {
                masterID
              }
              thumbnail
              images {
                url
                type
                width
                height
                thumbnail
              }
              videos {
                url
                title
                description
                duration
                embed
              }
              community {
                status
                rating {
                  voteCount
                  value
                }
                haveCount
                wantCount
                contributors {
                  username
                }
                submitter {
                  username
                }
              }
              dataQuality
            }
          }
        }
      }
    }
  `
)

test(
  'MusicBrainz release groups have a discogs master field',
  testQuerySnapshot,
  `
    {
      search {
        releaseGroups(query: "Dark Side of the Moon", first: 5) {
          nodes {
            title
            discogs {
              masterID
              title
              url
              artistCredits {
                name
                nameVariation
                joinPhrase
                roles
                tracks
                artist {
                  artistID
                }
              }
              genres
              styles
              forSaleCount
              lowestPrice
              year
              mainRelease {
                releaseID
              }
              images {
                url
                type
                width
                height
                thumbnail
              }
              videos {
                url
                title
                description
                duration
                embed
              }
              dataQuality
            }
          }
        }
      }
    }
  `
)

test(
  'MusicBrainz labels have a discogs label field',
  testQuerySnapshot,
  `
    {
      search {
        labels(query: "Geffen", first: 5) {
          nodes {
            name
            discogs {
              labelID
              name
              url
              profile
              contactInfo
              parentLabel {
                labelID
                name
                url
                profile
              }
              subLabels {
                labelID
                name
                url
                profile
              }
              images {
                url
                type
                width
                height
                thumbnail
              }
              dataQuality
            }
          }
        }
      }
    }
  `
)
