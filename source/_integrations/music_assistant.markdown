---
title: Music Assistant
description: Instructions on how to integrate Music Assistant into Home Assistant.
ha_category:
  - Media player
ha_release: 2024.12
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@music-assistant'
ha_domain: music_assistant
ha_platforms:
  - button
  - media_player
ha_zeroconf: true
ha_integration_type: integration
---

The **Music Assistant** (MA) {% term integration %} allows you to connect Home Assistant to a [Music Assistant Server](https://music-assistant.io/) (Required version 2.4 or later). Once configured, all [MA Players](https://music-assistant.io/player-support/) show up as Home Assistant [media player entities](/integrations/media_player/).  Media players will allow you to control media playback and see the currently playing item.

There is currently support for the following Home Assistant Platforms:

- [Media player](#media-player-entities)
- [Button](#favorite-current-song-button)


All of the Home Assistant [Media Player Control Actions](https://www.home-assistant.io/integrations/media_player/#media-control-actions) are supported.

The `media_content_id` payload for `media_player.play_media` can be any of the following:

- The name of a track, artist, or album. For example, `Queen`.
- A track or album combined with the artist's name. For example, `Queen - Innuendo`.
- A streaming provider URI. For example, `spotify://artist/12345`.
- A streaming provider URL. For example, `https://open.spotify.com/track/31cWPvM99ZHxMl3mdgiw4I`.

The `media_content_id` payload for `media_player.browse_media` must be a URI of the form `library://artist/1`, `library://album/20`, or `spotify://album/5zj4Ej0FrlJQaSo0d6cttH`. The type of item that the URI refers to must be an album or artist.

These URIs can be obtained from, for example, the output of the `get_library` or `search` actions described below or the `media_player.browse_media` action from Home Assistant. 

Streaming provider URLs can be obtained from the web interface of the provider.

{% include integrations/config_flow.md %}

### Manual configuration

Under normal circumstances, Home Assistant automatically discovers your running Music Assistant Server. If there is something special about the Home Assistant or MA setup (for example, the MA server is running as a remote Docker container) or discovery is not working, you can manually specify the URL to your Music Assistant server. If the Music Assistant Server is not installed, then follow these [installation instructions](https://music-assistant.io/installation/).

## Supported functionality

### Media player entities

The Music Assistant integration creates media player entities for all players and groups available in MA, including those imported from Home Assistant. This is needed to provide the full functionality Music Assistant has to offer. This full functionality includes transfer of the playing queue of music from one player to another, automatic pausing of playback during announcements, and richer options for selecting the media for playback. These entities will display media information, playback progress, and playback controls.

### Favorite current song button

The Music Assistant integration creates a button entity for each player to favorite the current song. Pressing this button (manually or by automation) adds the current song to your Music Assistant favorites. This works for songs stored locally as well as for tracks from streaming providers. It also works with remote content such as Spotify Connect, AirPlay, or a radio station, as long as the external source provides an artist and title combination (and optionally the album). 


## Actions

### Action `music_assistant.play_media`

Play media on a Music Assistant player with more fine-grained control options. This action is more powerful than the [`media_player.play_media`](https://www.home-assistant.io/integrations/media_player/#action-media_playerplay_media) action because it allows multiple items to be added to the queue at once, it allows more specific control of the media item to be played (e.g. a track from a specific album can be specified) and Music Assistant's radio mode (where the queue is filled with similar tracks to that enqueued) can be enabled.

- **Data attribute**: `media_id`
  - **Optional**: No.
  - **Description**: URI or name of the item to be played. Specify a list if it is desired to play/enqueue multiple items.
  - **Example**: `spotify://playlist/aabbccddeeff`
- **Data attribute**: `media_type`
  - **Optional**: Yes.
  - **Description**: The type of content to play. Select from artist, album, track, playlist or radio. Will be auto-determined if omitted.
  - **Example**: `playlist`
- **Data attribute**: `artist`
  - **Optional**: Yes.
  - **Description**: When specifying a track or album by name in the Media ID field, you can optionally restrict results by this artist name.
  - **Example**: `Queen`
- **Data attribute**: `album`
  - **Optional**: Yes.
  - **Description**: When specifying a track by name in the Media ID field, you can optionally restrict results by this album name.
  - **Example**: `News of the world`
- **Data attribute**: `enqueue`
  - **Optional**: Yes.
  - **Description**: If the content should be played now or be added to the queue. Options are:
    - play: Play now
    - replace: Replace the existing queue and play now
    - next: Add to the current queue after the currently playing item
    - replace_next: Replace the current queue after the currently playing item
    - add: Add to the end of the queue
  - **Example**: `replace`
- **Data attribute**: `radio_mode`
  - **Optional**: Yes.
  - **Description**: Enable radio mode to auto-generate a playlist based on the selection.
  - **Example**: `true`

### Action `music_assistant.play_announcement`

Play an announcement which is accessible via URL on a Music Assistant player. Home Assistant [TTS](https://www.home-assistant.io/integrations/tts/) actions are used for announcements provided as text.

- **Data attribute**: `url`
  - **Optional**: No.
  - **Description**: URL to the notification sound.
  - **Example**: `https://someremotesite.com/doorbell.mp3`
- **Data attribute**: `use_pre_announce`
  - **Optional**: Yes.
  - **Description**: Use pre-announcement sound. Omit to use the player default.
  - **Example**: `true`
- **Data attribute**: `announce_volume`
  - **Optional**: Yes.
  - **Description**: Use a forced volume level for the announcement. Omit to use the player default.
  - **Example**: `75`

### Action `music_assistant.transfer_queue`

Transfer the player's queue to another player. This could be combined with presence sensors to allow music to follow you around the house.

- **Data attribute**: `source_player`
  - **Optional**: Yes.
  - **Description**: The source media player which has the queue to be transferred. When omitted, the first playing player will be used.
  - **Example**: `media_player.kitchen_speaker`
- **Data attribute**: `auto_play`
  - **Optional**: Yes.
  - **Description**: Start playing the queue on the target player. Omit to use the default behavior.
  - **Example**: `true`

#### Example

In this example, the queue of the first player found playing will be transferred to the kitchen when a motion sensor is triggered in that room.

```yaml
automation:
  - id: auto_queue_transfer_kitchen
    alias: Automatically Transfer Queue to Kitchen
    trigger:
      platform: state
      entity_id: binary_sensor.kitchen_motion_sensor_occupancy
      to: 'on'
    action:
      service: music_assistant.transfer_queue
      target:
        entity_id: media_player.ma_kitchen_speaker
```

### Action `music_assistant.search`

Perform a global search on the Music Assistant library and all providers. This allows programmatic access to all of the music provider's catalogs and could be used to build a HA dashboard where any track could be found for playback.

- **Data attribute**: `config_entry_id`
  - **Optional**: No.
  - **Description**: The Music Assistant instance that the search will be performed upon. Allows for multiple servers to be running. This is obtained from a dropdown in the GUI editor. Users of YAML can use the dev tools action tab and select from the dropdown and then switch to YAML to get the actual value.
  - **Example**: `Music Assistant`
- **Data attribute**: `name`
  - **Optional**: No.
  - **Description**: The name/title to search for.
  - **Example**: `We Are The Champions`
- **Data attribute**: `media_type`
  - **Optional**: Yes.
  - **Description**: The type(s) of content to search for. Select from artist, album, track, radio, or playlist. All types if omitted.
  - **Example**: `playlist`
- **Data attribute**: `artist`
  - **Optional**: Yes.
  - **Description**: When specifying a track or album in the name field, you can optionally restrict results by this artist name.
  - **Example**: `Queen`
- **Data attribute**: `album`
  - **Optional**: Yes.
  - **Description**: When specifying a track in the name field, you can optionally restrict results by this album name.
  - **Example**: `News of the world`
- **Data attribute**: `limit`
  - **Optional**: Yes.
  - **Description**: Maximum number of items to return (per media type).
  - **Example**: `10`
- **Data attribute**: `library_only`
  - **Optional**: Yes.
  - **Description**: Only include results that are in the library.
  - **Example**: `true`
  
### Action `music_assistant.get_library`

Perform a local search on the Music Assistant library. This provides programmatic access to concise information about the media item. This information could be used to create a queue of tracks for playback.

- **Data attribute**: `config_entry_id`
  - **Optional**: No.
  - **Description**: The Music Assistant instance that the search will be performed upon. Allows for multiple servers to be running.
  - **Example**: `Music Assistant`
- **Data attribute**: `media_type`
  - **Optional**: No.
  - **Description**: The type of content to search for. Select from artist, album, track, radio, or playlist.
  - **Example**: `artist`
- **Data attribute**: `favorite`
  - **Optional**: Yes.
  - **Description**: When selected, only items marked as favorites will be returned.
  - **Example**: `false`
- **Data attribute**: `limit`
  - **Optional**: Yes.
  - **Description**: Maximum number of items to return.
  - **Example**: `25`
- **Data attribute**: `offset`
  - **Optional**: Yes.
  - **Description**: From what point in the list should results be returned.
  - **Example**: `10`
- **Data attribute**: `search`
  - **Optional**: Yes.
  - **Description**: A string that will further filter the results.
  - **Example**: `Home`
- **Data attribute**: `order_by`
  - **Optional**: Yes.
  - **Description**: Sort the list by this field. View available sorting options in the Developer Tools > Actions > music_assistant.get_library action.
  - **Example**: `year`
- **Data attribute**: `album_artists_only`
  - **Optional**: Yes.
  - **Description**: When `artist` is the `media_type` then this option will restrict the result to album artists only.
  - **Example**: `true`
- **Data attribute**: `album_type`
  - **Optional**: Yes.
  - **Description**: When `album` is the `media_type` then this option will restrict the result according to the selection of either album, single, compilation, EP or unknown.
  - **Example**: `album`

#### Example

This example will start playback of ten random tracks.

```yaml
script:
  create_random_queue:
    mode: single
    sequence:
      - service: music_assistant.get_library
        data:
          limit: 10
          media_type: track
          config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
          order_by: random
        response_variable: random_tracks
      - action: music_assistant.play_media
        data: 
          media_id: {% raw %}"{{ random_tracks['items'] | map(attribute='uri') | list }}" {% endraw %}
          media_type: track
          enqueue: replace
        target:
          entity_id: media_player.ma_kitchen_speaker
```

### Action `music_assistant.get_queue`

Get the queue details of a Music Assistant player queue. This provides programmatic access to comprehensive information about the current and next media item in the queue. This information could be used to create a bespoke media dashboard.

- **Data attribute**: `entity_id`
  - **Optional**: No.
  - **Description**: The entity_id of the player holding the queue to be retrieved.
  - **Example**: `media_player.kitchen_speaker`

#### Example

This example sets the name of the currently playing track in an [`input_text`](https://www.home-assistant.io/integrations/input_text/) which could then be used on a dashboard.

```yaml
script:
  get_now_playing:
    mode: queued
    alias: "Get Now Playing Track Name"
    sequence:
      - action: music_assistant.get_queue
        data:
          entity_id: media_player.ma_kitchen_speaker
        response_variable: queue_info
      - service: input_text.set_value
        data:
          entity_id: input_text.now_playing 
          value: {% raw %}"{{ queue_info['media_player.ma_kitchen_speaker'].current_item.name }}" {% endraw %}
```
  
## Notes

- Any Home Assistant players added to Music Assistant will appear duplicated as the MA version of the player is created. The original HA player can be hidden if desired.

## Known limitations

The data returned by the `get_queue` action will be partially limited if the item is not in the library (For example, if an item was selected for playback directly from Spotify). Metadata such as favorite status, explicit status, last played, played count, and disc art URL are only available for items that are in the MA library.

Radio mode is only available with certain music providers, and an error will be shown if attempting to enable radio mode on an item that isn't linked to one of those providers. Review the [Music Assistant documentation](https://www.music-assistant.io/music-providers/#summary) to identify which providers support this functionality.

## Troubleshooting

### Can’t find the MA actions

#### Symptom: No Music Assistant actions are shown in the editor

When trying to set up a script or automation via the GUI, no MA actions can be found.

##### Description

This means the add-on may have been installed, but the integration has not.

##### Resolution

Go to the [Configuration section](https://www.home-assistant.io/integrations/music_assistant/#configuration) and install the integration.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the {% my supervisor_addon title="**Settings** > **Add-ons**" addon="music_assistant" %} and remove the **Music Assistant** add-on from there as well (if installed).
