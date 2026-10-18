---
title: "Search"
action: plex.search
domain: plex
description: "Looks up media on a Plex server and returns information about the matches."
related_actions:
  - plex.on_deck
  - media_player.play_media
---

Use this action to find a movie, TV show, or other media on your Plex server by name, and to get its details. For example, you can read out the summary of a movie, or use the identifiers to link to the item in a Plex app.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To search Plex from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Plex Media Server: Search**.
6. Enter the text to look for in **Query**.
7. _Optional_: Select a **Media type** to only get movies, TV shows, or another type of media.
8. _Optional_: Turn on **Fuzzy** to find titles even when the search text is misspelled or misheard.
9. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

You need to provide at least one of **Query**, **Plex key**, **Playlist name**, or one of the library filters, such as **Title** or **Show name**.

### Options in the UI

{% options_ui %}
Query:
  description: The text to search for. Without a library, the whole Plex server is searched.
  required: false
Fuzzy:
  description: Find titles even when the search text is misspelled or misheard. When you leave this out, the **Fuzzy search** option of the integration decides.
  required: false
Media type:
  description: Only return one type of media. Choose from movie, show, season, episode, artist, album, track, or playlist.
  required: false
Library name:
  description: Only search in this Plex library. The library filters below need a library name.
  required: false
Plex key:
  description: Look up a single item by its Plex rating key.
  required: false
Playlist name:
  description: Look up a playlist by its name.
  required: false
Title:
  description: The title of the media to find.
  required: false
Show name:
  description: The title of a TV show.
  required: false
Season number:
  description: The season number of a TV show.
  required: false
Episode name:
  description: The title of an episode.
  required: false
Episode number:
  description: The number of an episode within its season.
  required: false
Artist name:
  description: The name of an artist.
  required: false
Album name:
  description: The name of an album.
  required: false
Track name:
  description: The title of a track.
  required: false
Track number:
  description: The number of a track within its album.
  required: false
Year:
  description: The release year.
  required: false
Filters:
  description: More Plex library filters as key and value pairs.
  required: false
Include on deck:
  description: For TV shows, also return the next episode that is on deck. This takes one extra request for each show.
  required: false
Server name:
  description: The name of the Plex server to use. Only needed if you have more than one server configured.
  required: false
Username:
  description: The Plex user to search as. Only needed if the Plex server has multiple users.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `plex.search`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: plex.search
  data:
    query: The Matrix
    media_type: movie
    fuzzy: true
  response_variable: matches
{% endexample %}

This looks for movies that match `The Matrix`, even if the name is slightly misspelled.

### Options in YAML

{% options_yaml %}
query:
  description: The text to search for. Without a library, the whole Plex server is searched.
  required: false
  type: string
fuzzy:
  description: Find titles even when the search text is misspelled or misheard. When you leave this out, the **Fuzzy search** option of the integration decides.
  required: false
  default: The integration option
  type: boolean
media_type:
  description: Only return one type of media, one of `movie`, `show`, `season`, `episode`, `artist`, `album`, `track`, or `playlist`.
  required: false
  type: string
library_name:
  description: Only search in this Plex library. The library filters need a library name.
  required: false
  type: string
plex_key:
  description: Look up a single item by its Plex rating key.
  required: false
  type: integer
playlist_name:
  description: Look up a playlist by its name.
  required: false
  type: string
title:
  description: The title of the media to find.
  required: false
  type: string
show_name:
  description: The title of a TV show.
  required: false
  type: string
season_number:
  description: The season number of a TV show.
  required: false
  type: integer
episode_name:
  description: The title of an episode.
  required: false
  type: string
episode_number:
  description: The number of an episode within its season.
  required: false
  type: integer
artist_name:
  description: The name of an artist.
  required: false
  type: string
album_name:
  description: The name of an album.
  required: false
  type: string
track_name:
  description: The title of a track.
  required: false
  type: string
track_number:
  description: The number of a track within its album.
  required: false
  type: integer
year:
  description: The release year.
  required: false
  type: integer
filters:
  description: More Plex library filters as key and value pairs.
  required: false
  type: map
include_on_deck:
  description: For TV shows, also return the next episode that is on deck in an `on_deck` field. This takes one extra request for each show.
  required: false
  default: false
  type: boolean
server_name:
  description: The name of the Plex server to use. Only needed if you have more than one server configured.
  required: false
  type: string
username:
  description: The Plex user to search as. Only needed if the Plex server has multiple users.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The action returns a list named `results`. Each result includes the following fields:

- `title`, `media_type`, `year`, `summary`, `tagline`, and `studio`: What the item is.
- `guid`, `rating_key`, `key`, `server_id`, and `server_name`: Identifiers that you can use to link to the item or to play it.
- `content_rating`, `rating`, `audience_rating`, and `genres`: How the item is rated and categorized.
- `duration`: The length in milliseconds.
- `originally_available_at`, `added_at`, and `last_viewed_at`: Dates in ISO format.
- `view_count`, `is_watched`, `view_offset`, and `progress_percent`: How much has been watched. `view_offset` is in milliseconds.
- `library_id` and `library_name`: The library the item is in.
- `episode_count`, `watched_episode_count`, and `season_count`: Only for TV shows.
- `show_title`, `show_rating_key`, `show_guid`, and `season_number`: Only for seasons.
- `show_title`, `show_rating_key`, `show_guid`, `season_title`, `season_rating_key`, `season_guid`, `season_number`, and `episode_number`: Only for episodes.
- `artist_name`: Only for albums and tracks.
- `album_title` and `track_number`: Only for tracks.
- `thumb_url`: A link to the poster. The link is signed and stops working after one hour.
- `on_deck`: Only for TV shows when **Include on deck** is on. The next episode that is on deck, with the same fields.

A shortened example of the response looks like this:

```yaml
results:
  - title: The Matrix
    media_type: movie
    year: 1999
    guid: plex://movie/5d776b85594b2b001e6dc641
    rating_key: 1121
    server_id: a6c5c5ee8b521be7e5feb918ed865881631807bd
    library_name: Movies
    is_watched: false
```

## Good to know

- Without **Fuzzy**, the search uses the search of the Plex server itself, which can also return items that only loosely match, such as movies with a matching actor.
- With **Fuzzy**, results are ordered by how well the title matches your search text.
- When you search in a library, the search text is matched against titles in that library only.
- If nothing matches, the action returns an empty `results` list instead of an error.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: show the summary of a movie

Create a notification with the summary of the best match for a movie.

- **Trigger**: Any trigger you like
- **Action**: Plex Media Server: Search
  - **Query**: `The Matrix`
  - **Media type**: movie
- **Action**: Notifications: Send a persistent notification
  - **Message**: The summary of the first result

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Show the summary of a movie"
  triggers:
    - trigger: state
      entity_id: input_boolean.show_movie_info
      to: "on"
  actions:
    - action: plex.search
      data:
        query: The Matrix
        media_type: movie
      response_variable: matches
    - if:
        - "{{ matches.results | count > 0 }}"
      then:
        - action: persistent_notification.create
          data:
            title: "{{ matches.results[0].title }}"
            message: "{{ matches.results[0].summary }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
