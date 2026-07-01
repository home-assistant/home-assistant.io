---
title: "Play specified media"
action: media_player.play_media
domain: plex
description: "Plays media from a Plex server on a Plex client or supported media player."
related_actions:
  - media_player.play_media
  - plex.refresh_library
---

Use this action to play media hosted on a Plex server on a Plex client or another supported media player. You can play music, playlists, TV episodes, movies, and search results from your Plex libraries.

{% include actions/ui_header.md %}

To play Plex media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Plex media player.
6. From the actions shown for that target, select **Play specified media**.
7. Select the media from the media browser, or enter the **Media content ID** and **Media content type**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media:
  description: The Plex media to play. Use the media picker to browse content available to the Plex media player.
Media content ID:
  description: A JSON payload that identifies the Plex media to play.
Media content type:
  description: The Plex media type, such as `MUSIC`, `PLAYLIST`, `EPISODE`, or `movie`.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.play_media`. A basic example looks like this:

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.plex_player
  data:
    media_content_type: movie
    media_content_id: >
      {"library_name": "Movies", "title": "Blade"}
{% endexample %}

### Options in YAML

{% options_yaml %}
media_content_id:
  description: A JSON payload that identifies the Plex media to play.
  required: true
  type: string
media_content_type:
  description: The Plex media type, such as `MUSIC`, `PLAYLIST`, `EPISODE`, or `movie`. To play Plex music on Sonos speakers, prepend the value with `plex://`, such as `plex://music`.
  required: true
  type: string
{% endoptions_yaml %}

The `media_content_id` payload can include these common search parameters:

- `library_name`: The Plex library to search. Required for most searches.
- `shuffle`: Shuffles the playback order of the media. Use `true` to enable it.
- `resume`: Resumes playback at the last partially watched position if available. Otherwise, playback starts from the beginning.
- `offset`: The playback start position in seconds.
- `allow_multiple`: Allows multiple matches in a search and enqueues all found items for playback. Use `true` to enable it.
- `username`: The local Plex user account to use. This is only needed when the Plex server has multiple users and you want to play media for a specific user.
- `continuous`: Automatically plays the next episode in the series. Use `true` to enable it.

For music, the JSON payload can include `artist_name`, `artist.title`, `album_name`, `album.title`, `track_name`, `track.title`, `track_number`, and `track.index`.

For playlists, the JSON payload can include `playlist_name`.

For TV episodes, the JSON payload can include `show_name`, `show.title`, `season_number`, `season.index`, `episode_number`, and `episode.index`.

For movies, the JSON payload can include `title`.

{% include actions/targets.md domain="media_player" %}

## Good to know

- The integration must be configured with a token for playback commands to work. If you use the Plex server option **List of IP addresses and networks that are allowed without auth**, configure the integration while that option is temporarily disabled.
- If you cast to non-Plex players, see the Plex notes for [Chromecast](/integrations/cast/#plex) and [Sonos](/integrations/plex/#sonos-playback).
- More search parameters are available in the [`plexapi` library documentation](https://python-plexapi.readthedocs.io/en/latest/modules/library.html#plexapi.library.LibrarySection.search).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Example: play a music track

Play a specific music track from a Plex music library.

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.plex_player
  data:
    media_content_type: MUSIC
    media_content_id: >
      {
        "library_name": "Music",
        "artist_name": "Adele",
        "album_name": "25",
        "track_name": "Hello"
      }
{% endexample %}

### Example: play a random TV episode

Play a random episode from a TV library.

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.plex_player
  data:
    media_content_type: EPISODE
    media_content_id: >
      {
        "library_name": "Kids TV",
        "show_name": "Sesame Street",
        "shuffle": true
      }
{% endexample %}

### Example: play a Plex playlist on Sonos

Play a Plex playlist directly on a Sonos speaker.

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.sonos_speaker
  data:
    media_content_type: plex://playlist
    media_content_id: >
      {"playlist_name": "Party Mix"}
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
