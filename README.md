# GraphBrainz Extension: Discogs

[![build status](https://img.shields.io/travis/exogen/graphbrainz-extension-discogs/master.svg)](https://travis-ci.org/exogen/graphbrainz-extension-discogs)
[![coverage](https://img.shields.io/codecov/c/github/exogen/graphbrainz-extension-discogs.svg)](https://codecov.io/gh/exogen/graphbrainz-extension-discogs)
[![npm version](https://img.shields.io/npm/v/graphbrainz-extension-discogs.svg)](https://www.npmjs.com/package/graphbrainz-extension-discogs)
[![license](https://img.shields.io/npm/l/graphbrainz-extension-discogs.svg)](https://github.com/exogen/graphbrainz-extension-discogs/blob/master/LICENSE)

Retrieve information about MusicBrainz entities from [Discogs](https://www.discogs.com/)
using the [Discogs API](https://www.discogs.com/developers/). This project has
no affiliation with Discogs.

The extension works by finding Discogs URLs in an entity’s URL relationships.
The URL relationship must have the `discogs` type and point to a Discogs entity
of the appropriate type: `artist` for artists, `label` for labels, `master` for
release groups, and `release` for releases.

**[Try out the live demo!][demo]** :bulb: Use the “Docs” sidebar or the
documentation below to help construct your query.

## Installation

To use this extension, install [GraphBrainz](https://github.com/exogen/graphbrainz),
then:

```console
$ npm install graphbrainz-extension-discogs
$ GRAPHBRAINZ_EXTENSIONS='["graphbrainz-extension-discogs"]' graphbrainz
```

Or, if you are using the middleware directly:

```js
import graphbrainz from 'graphbrainz'

const middleware = graphbrainz({
  // Don't forget to add the other extensions you use, too.
  extensions: ['graphbrainz-extension-discogs']
})
```

## Configuration

This extension can be configured using environment variables:

* **`DISCOGS_CONSUMER_KEY`**: The Discogs consumer key to use. This is required
  for any fields added by the extension to successfully resolve.
* **`DISCOGS_CONSUMER_SECRET`**: The Discogs consumer secret to use. This is
  required for any fields added by the extension to successfully resolve.
* **`DISCOGS_BASE_URL`**: The base URL at which to access the Discogs API.
  Defaults to `https://api.discogs.com/`.
* **`DISCOGS_CACHE_SIZE`**: The number of items to keep in the cache. Defaults to
  `GRAPHBRAINZ_CACHE_SIZE` if defined, or `8192`.
* **`DISCOGS_CACHE_TTL`**: The number of seconds to keep items in the cache.
  Defaults to `GRAPHBRAINZ_CACHE_TTL` if defined, or `86400000` (one day).

This extension uses its own cache, separate from the MusicBrainz loader cache.

## Example Queries

Get community ratings, collection counts, and marketplace info for various
releases of OK Computer ([try it](http://graphbrainz-extension-discogs.herokuapp.com/?query=%7B%0A%20%20search%20%7B%0A%20%20%20%20releases(query%3A%20%22OK%20Computer%22%2C%20first%3A%205)%20%7B%0A%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20mbid%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20discogs%20%7B%0A%20%20%20%20%20%20%20%20%20%20year%0A%20%20%20%20%20%20%20%20%20%20country%0A%20%20%20%20%20%20%20%20%20%20forSaleCount%0A%20%20%20%20%20%20%20%20%20%20lowestPrice%0A%20%20%20%20%20%20%20%20%20%20community%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20haveCount%0A%20%20%20%20%20%20%20%20%20%20%20%20wantCount%0A%20%20%20%20%20%20%20%20%20%20%20%20rating%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20voteCount%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)):

```graphql
{
  search {
    releases(query: "OK Computer", first: 5) {
      nodes {
        mbid
        title
        discogs {
          year
          country
          forSaleCount
          lowestPrice
          community {
            haveCount
            wantCount
            rating {
              voteCount
              value
            }
          }
        }
      }
    }
  }
}
```

<!-- START graphql-markdown -->

## Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Objects](#objects)
    * [Artist](#artist)
    * [DiscogsArtist](#discogsartist)
    * [DiscogsArtistCredit](#discogsartistcredit)
    * [DiscogsArtistMember](#discogsartistmember)
    * [DiscogsCommunity](#discogscommunity)
    * [DiscogsImage](#discogsimage)
    * [DiscogsLabel](#discogslabel)
    * [DiscogsMaster](#discogsmaster)
    * [DiscogsRating](#discogsrating)
    * [DiscogsRelease](#discogsrelease)
    * [DiscogsReleaseConnection](#discogsreleaseconnection)
    * [DiscogsReleaseEdge](#discogsreleaseedge)
    * [DiscogsUser](#discogsuser)
    * [DiscogsVideo](#discogsvideo)
    * [Label](#label)
    * [Release](#release)
    * [ReleaseGroup](#releasegroup)
  * [Enums](#enums)
    * [DiscogsImageType](#discogsimagetype)

</details>

### Objects

#### Artist

:small_blue_diamond: *This type has been extended.
See the [base schema](https://github.com/exogen/graphbrainz/docs/types.md) for a description and additional fields.*

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>discogs</strong></td>
<td valign="top"><a href="#discogsartist">DiscogsArtist</a></td>
<td>

Information about the artist on Discogs.

</td>
</tr>
</tbody>
</table>

#### DiscogsArtist

An artist on Discogs.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>artistID</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#id">ID</a>!</td>
<td>

The ID of the artist on Discogs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!</td>
<td>

The name of the artist on Discogs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nameVariations</strong></td>
<td valign="top">[<a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!]!</td>
<td>

Commonly found variations of the artist’s name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>realName</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

The artist’s real name, if the artist is a person who uses a stage name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>aliases</strong></td>
<td valign="top">[<a href="#discogsartist">DiscogsArtist</a>!]!</td>
<td>

A list of Discogs artists that represent the same artist under a different
alias.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#urlstring">URLString</a>!</td>
<td>

The URL of the artist’s page on Discogs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>urls</strong></td>
<td valign="top">[<a href="https://github.com/exogen/graphbrainz/docs/types.md#urlstring">URLString</a>!]!</td>
<td>

Links to the artist’s official pages on different web properties.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>profile</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

A biography or description of the artist.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>images</strong></td>
<td valign="top">[<a href="#discogsimage">DiscogsImage</a>!]!</td>
<td>

A list of images picturing the artist.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>members</strong></td>
<td valign="top">[<a href="#discogsartistmember">DiscogsArtistMember</a>!]!</td>
<td>

A list of members, if the artist is a group.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataQuality</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

A description of the quality and completeness of this artist’s data in the
Discogs database.

</td>
</tr>
</tbody>
</table>

#### DiscogsArtistCredit

A credited artist on a release, track, etc.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

The official or common name of the credited artist.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nameVariation</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

The artist name as credited on this particular work (the Artist Name
Variation, or ANV, in Discogs terms).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>joinPhrase</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

Join phrases might include words and/or punctuation to separate artist
names as they appear on the release, track, etc.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>roles</strong></td>
<td valign="top">[<a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!]!</td>
<td>

A list of roles the artist had on the work in question.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>tracks</strong></td>
<td valign="top">[<a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!]!</td>
<td>

A list of tracks or track ranges (e.g. “A1 to A4”) on which the artist is
credited.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>artist</strong></td>
<td valign="top"><a href="#discogsartist">DiscogsArtist</a></td>
<td>

The artist’s entry on Discogs.

</td>
</tr>
</tbody>
</table>

#### DiscogsArtistMember

A single artist who is a member of a group on Discogs.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>active</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#boolean">Boolean</a></td>
<td>

Whether or not the member is still active in the group.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!</td>
<td>

The name of the member.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>artist</strong></td>
<td valign="top"><a href="#discogsartist">DiscogsArtist</a></td>
<td>

The member’s artist information on Discogs.

</td>
</tr>
</tbody>
</table>

#### DiscogsCommunity

Community statistics regarding an item on Discogs.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

The acceptance status.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rating</strong></td>
<td valign="top"><a href="#discogsrating">DiscogsRating</a></td>
<td>

Information about how Discogs users have rated the item.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>haveCount</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#int">Int</a></td>
<td>

The number of Discogs users who have the item in their collection.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wantCount</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#int">Int</a></td>
<td>

The number of Discogs users who want the item.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>contributors</strong></td>
<td valign="top">[<a href="#discogsuser">DiscogsUser</a>!]!</td>
<td>

The Discogs users who have contributed to the item’s data.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>submitter</strong></td>
<td valign="top"><a href="#discogsuser">DiscogsUser</a></td>
<td>

The Discogs user who submitted the item.

</td>
</tr>
</tbody>
</table>

#### DiscogsImage

A single image from Discogs.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#urlstring">URLString</a>!</td>
<td>

The URL of the image file.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#discogsimagetype">DiscogsImageType</a>!</td>
<td>

The image type, primary or secondary.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>width</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#int">Int</a>!</td>
<td>

The image width in pixels.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>height</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#int">Int</a>!</td>
<td>

The image height in pixels.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>thumbnail</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#urlstring">URLString</a></td>
<td>

The URL for a 150x150 thumbnail of the image.

</td>
</tr>
</tbody>
</table>

#### DiscogsLabel

A label on Discogs.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>labelID</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#id">ID</a>!</td>
<td>

The ID of the label on Discogs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!</td>
<td>

The name of the label.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#urlstring">URLString</a>!</td>
<td>

The URL of the label on Discogs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>profile</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

A description of the history of the label.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>contactInfo</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

Information on how to contact a representative of the label.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>parentLabel</strong></td>
<td valign="top"><a href="#discogslabel">DiscogsLabel</a></td>
<td>

The parent label, if this label is a subsidiary.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>subLabels</strong></td>
<td valign="top">[<a href="#discogslabel">DiscogsLabel</a>!]!</td>
<td>

A list of labels that are subsidiaries of this label.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>images</strong></td>
<td valign="top">[<a href="#discogsimage">DiscogsImage</a>!]!</td>
<td>

A list of images associated with the label.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataQuality</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

A description of the quality and completeness of this label’s data in the
Discogs database.

</td>
</tr>
</tbody>
</table>

#### DiscogsMaster

Master releases group different versions of the same release (for example,
releases in different formats, issued in different countries, re-releases,
etc.). The equivalent of a MusicBrainz release group.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>masterID</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#id">ID</a>!</td>
<td>

The ID of the master on Discogs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!</td>
<td>

The title of the master.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#urlstring">URLString</a>!</td>
<td>

The URL of the master on Discogs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>artistCredits</strong></td>
<td valign="top">[<a href="#discogsartistcredit">DiscogsArtistCredit</a>!]!</td>
<td>

The artists credited on the master.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>genres</strong></td>
<td valign="top">[<a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!]!</td>
<td>

The primary musical genres of the master (e.g. “Electronic”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>styles</strong></td>
<td valign="top">[<a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!]!</td>
<td>

The primary musical styles of the master (e.g. “Techno”, “Minimal”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>forSaleCount</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#int">Int</a></td>
<td>

The number of listings the master currently has on the marketplace.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lowestPrice</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#float">Float</a></td>
<td>

The lowest price for the master currently found on the marketplace.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">currency</td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

The three-letter currency code for which to retrieve the price. Discogs
supports USD, GBP, EUR, CAD, AUD, JPY, CHF, MXN, BRL, NZD, SEK, and ZAR.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#int">Int</a></td>
<td>

The year the master was released (most likely its “main” release).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>mainRelease</strong></td>
<td valign="top"><a href="#discogsrelease">DiscogsRelease</a></td>
<td>

The main release from the master.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>images</strong></td>
<td valign="top">[<a href="#discogsimage">DiscogsImage</a>!]!</td>
<td>

Images of the master.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>videos</strong></td>
<td valign="top">[<a href="#discogsvideo">DiscogsVideo</a>!]!</td>
<td>

Music videos from the master.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataQuality</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

A description of the quality and completeness of this master’s data in the
Discogs database.

</td>
</tr>
</tbody>
</table>

#### DiscogsRating

An aggregated rating on Discogs.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>voteCount</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#int">Int</a>!</td>
<td>

The number of users who have contributed to the rating.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#float">Float</a></td>
<td>

The average rating as determined by users.

</td>
</tr>
</tbody>
</table>

#### DiscogsRelease

A release on Discogs.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>releaseID</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#id">ID</a>!</td>
<td>

The ID of the release on Discogs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!</td>
<td>

The title of the release.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#urlstring">URLString</a>!</td>
<td>

The URL of the release on Discogs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>artistCredits</strong></td>
<td valign="top">[<a href="#discogsartistcredit">DiscogsArtistCredit</a>!]!</td>
<td>

The artists credited on the release.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>extraArtistCredits</strong></td>
<td valign="top">[<a href="#discogsartistcredit">DiscogsArtistCredit</a>!]!</td>
<td>

An additional list of artists who contributed to the release, but are not
named in the release’s artists.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>genres</strong></td>
<td valign="top">[<a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!]!</td>
<td>

The primary musical genres of the release (e.g. “Electronic”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>styles</strong></td>
<td valign="top">[<a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!]!</td>
<td>

The primary musical styles of the release (e.g. “Techno”, “Minimal”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>forSaleCount</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#int">Int</a></td>
<td>

The number of listings the release currently has on the marketplace.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lowestPrice</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#float">Float</a></td>
<td>

The lowest price for the release currently found on the marketplace.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">currency</td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

The three-letter currency code for which to retrieve the price. Discogs
supports USD, GBP, EUR, CAD, AUD, JPY, CHF, MXN, BRL, NZD, SEK, and ZAR.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#int">Int</a></td>
<td>

The year the release was issued.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notes</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

Notes about the release.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>country</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

The country in which the release was issued.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>master</strong></td>
<td valign="top"><a href="#discogsmaster">DiscogsMaster</a></td>
<td>

The master release on Discogs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>thumbnail</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#urlstring">URLString</a></td>
<td>

The primary thumbnail image for the release.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>images</strong></td>
<td valign="top">[<a href="#discogsimage">DiscogsImage</a>!]!</td>
<td>

Images of the release.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>videos</strong></td>
<td valign="top">[<a href="#discogsvideo">DiscogsVideo</a>!]!</td>
<td>

Music videos from the release.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>community</strong></td>
<td valign="top"><a href="#discogscommunity">DiscogsCommunity</a></td>
<td>

Information about the Discogs community’s contributions to the release’s
data.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataQuality</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

A description of the quality and completeness of this release’s data in
the Discogs database.

</td>
</tr>
</tbody>
</table>

#### DiscogsReleaseConnection

A connection to a list of Discogs releases.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>pageInfo</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#pageinfo">PageInfo</a>!</td>
<td>

Information to aid in pagination.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>edges</strong></td>
<td valign="top">[<a href="#discogsreleaseedge">DiscogsReleaseEdge</a>!]!</td>
<td>

A list of edges.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nodes</strong></td>
<td valign="top">[<a href="#discogsrelease">DiscogsRelease</a>!]!</td>
<td>

A list of nodes in the connection (without going through the `edges` field).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>totalCount</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#int">Int</a></td>
<td>

A count of the total number of items in this connection, ignoring pagination.

</td>
</tr>
</tbody>
</table>

#### DiscogsReleaseEdge

An edge in a Discogs release connection.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>node</strong></td>
<td valign="top"><a href="#discogsrelease">DiscogsRelease</a>!</td>
<td>

The release at the end of the edge.

</td>
</tr>
</tbody>
</table>

#### DiscogsUser

A user on Discogs.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>username</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a>!</td>
<td>

The user’s username on Discogs.

</td>
</tr>
</tbody>
</table>

#### DiscogsVideo

A single video linked from Discogs.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#urlstring">URLString</a>!</td>
<td>

The URL of the video.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

The title of the video.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#string">String</a></td>
<td>

The video description.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>duration</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#duration">Duration</a></td>
<td>

The duration of the video in milliseconds.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>embed</strong></td>
<td valign="top"><a href="https://github.com/exogen/graphbrainz/docs/types.md#boolean">Boolean</a></td>
<td>

Whether the video is embeddable.

</td>
</tr>
</tbody>
</table>

#### Label

:small_blue_diamond: *This type has been extended.
See the [base schema](https://github.com/exogen/graphbrainz/docs/types.md) for a description and additional fields.*

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>discogs</strong></td>
<td valign="top"><a href="#discogslabel">DiscogsLabel</a></td>
<td>

Information about the label on Discogs.

</td>
</tr>
</tbody>
</table>

#### Release

:small_blue_diamond: *This type has been extended.
See the [base schema](https://github.com/exogen/graphbrainz/docs/types.md) for a description and additional fields.*

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>discogs</strong></td>
<td valign="top"><a href="#discogsrelease">DiscogsRelease</a></td>
<td>

Information about the release on Discogs.

</td>
</tr>
</tbody>
</table>

#### ReleaseGroup

:small_blue_diamond: *This type has been extended.
See the [base schema](https://github.com/exogen/graphbrainz/docs/types.md) for a description and additional fields.*

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>discogs</strong></td>
<td valign="top"><a href="#discogsmaster">DiscogsMaster</a></td>
<td>

Information about the release group on Discogs.

</td>
</tr>
</tbody>
</table>

### Enums

#### DiscogsImageType

The type of image.

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>PRIMARY</strong></td>
<td>

The primary image representing the item.

</td>
</tr>
<tr>
<td valign="top"><strong>SECONDARY</strong></td>
<td>

A secondary image representing the item.

</td>
</tr>
</tbody>
</table>

<!-- END graphql-markdown -->

[demo]: http://graphbrainz-extension-discogs.herokuapp.com/
