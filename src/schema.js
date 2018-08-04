import gql from 'graphbrainz/lib/tag'

export default gql`
  """
  The type of image.
  """
  enum DiscogsImageType {
    """
    The primary image representing the item.
    """
    PRIMARY

    """
    A secondary image representing the item.
    """
    SECONDARY
  }

  """
  A single image from Discogs.
  """
  type DiscogsImage {
    """
    The URL of the image file.
    """
    url: URLString!

    """
    The image type, primary or secondary.
    """
    type: DiscogsImageType!

    """
    The image width in pixels.
    """
    width: Int!

    """
    The image height in pixels.
    """
    height: Int!

    """
    The URL for a 150x150 thumbnail of the image.
    """
    thumbnail: URLString
  }

  """
  A single video linked from Discogs.
  """
  type DiscogsVideo {
    """
    The URL of the video.
    """
    url: URLString!

    """
    The title of the video.
    """
    title: String

    """
    The video description.
    """
    description: String

    """
    The duration of the video in milliseconds.
    """
    duration: Duration

    """
    Whether the video is embeddable.
    """
    embed: Boolean
  }

  """
  An artist on Discogs.
  """
  type DiscogsArtist {
    """
    The ID of the artist on Discogs.
    """
    artistID: ID!

    """
    The name of the artist on Discogs.
    """
    name: String!

    """
    Commonly found variations of the artist’s name.
    """
    nameVariations: [String!]!

    """
    The artist’s real name, if the artist is a person who uses a stage name.
    """
    realName: String

    """
    A list of Discogs artists that represent the same artist under a different
    alias.
    """
    aliases: [DiscogsArtist!]!

    """
    The URL of the artist’s page on Discogs.
    """
    url: URLString!

    """
    Links to the artist’s official pages on different web properties.
    """
    urls: [URLString!]!

    """
    A biography or description of the artist.
    """
    profile: String

    """
    A list of images picturing the artist.
    """
    images: [DiscogsImage!]!

    """
    A list of members, if the artist is a group.
    """
    members: [DiscogsArtistMember!]!

    """
    A description of the quality and completeness of this artist’s data in the
    Discogs database.
    """
    dataQuality: String
  }

  """
  A single artist who is a member of a group on Discogs.
  """
  type DiscogsArtistMember {
    """
    Whether or not the member is still active in the group.
    """
    active: Boolean

    """
    The name of the member.
    """
    name: String!

    """
    The member’s artist information on Discogs.
    """
    artist: DiscogsArtist
  }

  """
  A credited artist on a release, track, etc.
  """
  type DiscogsArtistCredit {
    """
    The official or common name of the credited artist.
    """
    name: String

    """
    The artist name as credited on this particular work (the Artist Name
    Variation, or ANV, in Discogs terms).
    """
    nameVariation: String

    """
    Join phrases might include words and/or punctuation to separate artist
    names as they appear on the release, track, etc.
    """
    joinPhrase: String

    """
    A list of roles the artist had on the work in question.
    """
    roles: [String!]!

    """
    A list of tracks or track ranges (e.g. “A1 to A4”) on which the artist is
    credited.
    """
    tracks: [String!]!

    """
    The artist’s entry on Discogs.
    """
    artist: DiscogsArtist
  }

  """
  A label on Discogs.
  """
  type DiscogsLabel {
    """
    The ID of the label on Discogs.
    """
    labelID: ID!

    """
    The name of the label.
    """
    name: String!

    """
    The URL of the label on Discogs.
    """
    url: URLString!

    """
    A description of the history of the label.
    """
    profile: String

    """
    Information on how to contact a representative of the label.
    """
    contactInfo: String

    """
    The parent label, if this label is a subsidiary.
    """
    parentLabel: DiscogsLabel

    """
    A list of labels that are subsidiaries of this label.
    """
    subLabels: [DiscogsLabel!]!

    """
    A list of images associated with the label.
    """
    images: [DiscogsImage!]!

    """
    A description of the quality and completeness of this label’s data in the
    Discogs database.
    """
    dataQuality: String
  }

  """
  Master releases group different versions of the same release (for example,
  releases in different formats, issued in different countries, re-releases,
  etc.). The equivalent of a MusicBrainz release group.
  """
  type DiscogsMaster {
    """
    The ID of the master on Discogs.
    """
    masterID: ID!

    """
    The title of the master.
    """
    title: String!

    """
    The URL of the master on Discogs.
    """
    url: URLString!

    """
    The artists credited on the master.
    """
    artistCredits: [DiscogsArtistCredit!]!

    """
    The primary musical genres of the master (e.g. “Electronic”).
    """
    genres: [String!]!

    """
    The primary musical styles of the master (e.g. “Techno”, “Minimal”).
    """
    styles: [String!]!

    """
    The number of listings the master currently has on the marketplace.
    """
    forSaleCount: Int

    """
    The lowest price for the master currently found on the marketplace.
    """
    lowestPrice(
      """
      The three-letter currency code for which to retrieve the price. Discogs
      supports USD, GBP, EUR, CAD, AUD, JPY, CHF, MXN, BRL, NZD, SEK, and ZAR.
      #
      [NOT YET WORKING]
      """
      currency: String
    ): Float

    """
    The year the master was released (most likely its “main” release).
    """
    year: Int

    """
    The main release from the master.
    """
    mainRelease: DiscogsRelease

    """
    Images of the master.
    """
    images: [DiscogsImage!]!

    """
    Music videos from the master.
    """
    videos: [DiscogsVideo!]!

    """
    A description of the quality and completeness of this master’s data in the
    Discogs database.
    """
    dataQuality: String
  }

  """
  A user on Discogs.
  """
  type DiscogsUser {
    """
    The user’s username on Discogs.
    """
    username: String!
  }

  """
  An aggregated rating on Discogs.
  """
  type DiscogsRating {
    """
    The number of users who have contributed to the rating.
    """
    voteCount: Int!

    """
    The average rating as determined by users.
    """
    value: Float
  }

  """
  Community statistics regarding an item on Discogs.
  """
  type DiscogsCommunity {
    """
    The acceptance status.
    """
    status: String

    """
    Information about how Discogs users have rated the item.
    """
    rating: DiscogsRating

    """
    The number of Discogs users who have the item in their collection.
    """
    haveCount: Int

    """
    The number of Discogs users who want the item.
    """
    wantCount: Int

    """
    The Discogs users who have contributed to the item’s data.
    """
    contributors: [DiscogsUser!]!

    """
    The Discogs user who submitted the item.
    """
    submitter: DiscogsUser
  }

  """
  A release on Discogs.
  """
  type DiscogsRelease {
    """
    The ID of the release on Discogs.
    """
    releaseID: ID!

    """
    The title of the release.
    """
    title: String!

    """
    The URL of the release on Discogs.
    """
    url: URLString!

    """
    The artists credited on the release.
    """
    artistCredits: [DiscogsArtistCredit!]!

    """
    An additional list of artists who contributed to the release, but are not
    named in the release’s artists.
    """
    extraArtistCredits: [DiscogsArtistCredit!]!

    """
    The primary musical genres of the release (e.g. “Electronic”).
    """
    genres: [String!]!

    """
    The primary musical styles of the release (e.g. “Techno”, “Minimal”).
    """
    styles: [String!]!

    """
    The number of listings the release currently has on the marketplace.
    """
    forSaleCount: Int

    """
    The lowest price for the release currently found on the marketplace.
    """
    lowestPrice(
      """
      The three-letter currency code for which to retrieve the price. Discogs
      supports USD, GBP, EUR, CAD, AUD, JPY, CHF, MXN, BRL, NZD, SEK, and ZAR.
      #
      [NOT YET WORKING]
      """
      currency: String
    ): Float

    """
    The year the release was issued.
    """
    year: Int

    """
    Notes about the release.
    """
    notes: String

    """
    The country in which the release was issued.
    """
    country: String

    """
    The master release on Discogs.
    """
    master: DiscogsMaster

    """
    The primary thumbnail image for the release.
    """
    thumbnail: URLString

    """
    Images of the release.
    """
    images: [DiscogsImage!]!

    """
    Music videos from the release.
    """
    videos: [DiscogsVideo!]!

    """
    Information about the Discogs community’s contributions to the release’s
    data.
    """
    community: DiscogsCommunity

    """
    A description of the quality and completeness of this release’s data in
    the Discogs database.
    """
    dataQuality: String
  }

  """
  A connection to a list of Discogs releases.
  """
  type DiscogsReleaseConnection {
    """
    Information to aid in pagination.
    """
    pageInfo: PageInfo!

    """
    A list of edges.
    """
    edges: [DiscogsReleaseEdge!]!

    """
    A list of nodes in the connection (without going through the \`edges\` field).
    """
    nodes: [DiscogsRelease!]!

    """
    A count of the total number of items in this connection, ignoring pagination.
    """
    totalCount: Int
  }

  """
  An edge in a Discogs release connection.
  """
  type DiscogsReleaseEdge {
    """
    The release at the end of the edge.
    """
    node: DiscogsRelease!
  }

  extend type Artist {
    """
    Information about the artist on Discogs.
    """
    discogs: DiscogsArtist
  }

  extend type Label {
    """
    Information about the label on Discogs.
    """
    discogs: DiscogsLabel
  }

  extend type Release {
    """
    Information about the release on Discogs.
    """
    discogs: DiscogsRelease
  }

  extend type ReleaseGroup {
    """
    Information about the release group on Discogs.
    """
    discogs: DiscogsMaster
  }
`
