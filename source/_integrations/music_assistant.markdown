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
  - media_player
ha_zeroconf: true
ha_integration_type: integration
---

The **Music Assistant** (MA) {% term integration %} allows you to connect Home Assistant to a [Music Assistant Server](https://music-assistant.io/) (Required version 2.4 or later). Once configured, all [MA Players](https://music-assistant.io/player-support/) show up as Home Assistant [media player entities](/integrations/media_player/).  Media players will allow you to control media playback and see the currently playing item.

There is currently support for the following Home Assistant Platforms:

- [Media player](#media-player)

All of the Home Assistant [Media Player Control Actions](https://www.home-assistant.io/integrations/media_player/#media-control-actions) are supported.

The `media_content_id` payload for `media_player.play_media` can be any of the following:

- The name of a track, artist, or album. For example, `Queen`.
- A track or album combined with the artist's name. For example, `Queen - Innuendo`.
- A streaming provider URI. For example, `spotify://artist/12345`.

The `media_content_id` payload for `media_player.browse_media` must be a URI of the form `library://artist/1`, `library://album/20`, or `spotify://album/5zj4Ej0FrlJQaSo0d6cttH`. The type of item that the URI refers to must be an album or artist.

These URIs can be obtained from, for example, the output of the `get_library` or `search` actions described below or the `media_player.browse_media` action from Home Assistant. 

{% include integrations/config_flow.md %}

### Manual configuration

Under normal circumstances, Home Assistant automatically discovers your running Music Assistant Server. If there is something special about the Home Assistant or MA setup (for example, the MA server is running as a remote Docker container) or discovery is not working, you can manually specify the URL to your Music Assistant server. If the Music Assistant Server is not installed, then follow these [installation instructions](https://music-assistant.io/installation/).

## Supported functionality

### Media player entities

The Music Assistant integration creates media player entities for all players and groups available in MA, including those imported from Home Assistant. This is needed to provide the full functionality Music Assistant has to offer. This full functionality includes transfer of the playing queue of music from one player to another, automatic pausing of playback during announcements, and richer options for selecting the media for playback. These entities will display media information, playback progress, and playback controls.

## Actions

### Action `music_assistant.play_media`

Play media on a Music Assistant player with more fine-grained control options. This action is more powerful than the [`media_player.play_media`](https://www.home-assistant.io/integrations/media_player/#action-media_playerplay_media) action because it allows multiple items to be added to the queue at once, it allows more specific control of the media item to be played (e.g. a track from a specific album can be specified) and Music Assistant's radio mode (where the queue is filled with similar tracks to that enqueued) can be enabled.

| Data attribute | Optional | Description                                                            |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
| `media_id` | no | URI or name of the item to be played.<br> Specify a list if it is desired to play/enqueue multiple items.|
| `media_type`| yes |  The type of content to play. Select from artist, album, track, playlist or radio.<br> Will be auto-determined if omitted.|
| `artist`| yes |  When specifying a track or album by name in the Media ID field,<br> you can optionally restrict results by this artist name.|
| `album`| yes |  When specifying a track by name in the Media ID field,<br> you can optionally restrict results by this album name.|
| `enqueue`| yes |  If the content should be played now or be added to the queue.<br> Must be one of `add`, `next`, `play`, `replace`, `replace_next`.
| `radio_mode` | yes |  Enable radio mode to auto-generate a playlist based on the selection.|


### Action `music_assistant.play_announcement`

Play an announcement which is accessible via URL on a Music Assistant player. Home Assistant [TTS](https://www.home-assistant.io/integrations/tts/) actions are used for announcements provided as text.

| Data attribute | Optional | Description                                                            |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
| `url` | no | URL to the notification sound.|
| `use_pre_announce` | yes | Use pre-announcement sound. Omit to use the player default.|
| `announce_volume` | yes | Use a forced volume level for the announcement. Omit to use the player default.|


### Action `music_assistant.transfer_queue`

Transfer the player's queue to another player. This could be combined with presence sensors to allow music to follow you around the house.

| Data attribute | Optional | Description                                                            |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
|`source_player` | yes | The source media player which has the queue to be transferred.<br> When omitted, the first playing player will be used.|
| `auto_play` | yes |  Start playing the queue on the target player. Omit to use the default behavior.|

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

| Data attribute | Optional | Description                                                            |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
|`config_entry_id` | no | The Music Assistant instance that the search will be performed upon.<br> Allows for multiple servers to be running. This is obtained from a dropdown in the GUI editor.<br> Users of YAML can use the dev tools action tab and select from the dropdown and<br> then switch to YAML to get the actual value.
| `name` | no | The name/title to search for.
| `media_type` | yes | The type(s) of content to search for. Select from artist, album, track, radio, or playlist.<br> All types if omitted.
| `artist` | yes | When specifying a track or album in the name field, you can optionally restrict results by this artist name.
| `album` | yes | When specifying a track in the name field, you can optionally restrict results by this album name.
| `limit` | yes | Maximum number of items to return (per media type).
| `library_only` | yes | Only include results that are in the library.
  
### Action `music_assistant.get_library`

Perform a local search on the Music Assistant library. This provides programmatic access to concise information about the media item. This information could be used to create a queue of tracks for playback.

| Data attribute | Optional | Description                                                            |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
| `config_entry_id` | no | The Music Assistant instance that the search will be performed upon.<br> Allows for multiple servers to be running.
| `media_type` | no | The type of content to search for. Select from artist, album, track, radio, or playlist.
| `favorite` | yes | When selected, only items marked as favorites will be returned.
| `limit` | yes | Maximum number of items to return.
| `offset` | yes | From what point in the list should results be returned.
| `search` | yes | A string that will further filter the results.
| `order_by` | yes | Sort the list by this field. View available sorting options in<br> Developer Tools > Actions > music_assistant.get_library action.
| `album_artists_only` | yes | When `artist` is the `media_type` then this option will restrict the result to album artists only.
| `album_type` | yes | When `album` is the `media_type` then this option will restrict the result<br> according to the selection of either album, single, compilation, EP or unknown.

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

| Data attribute | Optional | Description                                                            |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
| `entity_id` | no | The entity_id of the player holding the queue to be retrieved.

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
