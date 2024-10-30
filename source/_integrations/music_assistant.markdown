---
title: Music Assistant
description: Instructions on how to integrate Music Assistant into Home Assistant.
ha_category:
  - Media player
featured: true
ha_release: 2024.11.0
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@music_assistant'
ha_domain: music_assistant
ha_platforms:
  - media_player
ha_zeroconf: true
ha_integration_type: integration
---

The Music Assistant (MA) integration allows you to connect Home Assistant to a [Music Assistant Server](https://music-assistant.io/). Once configured, all [MA Players](https://music-assistant.io/player-support/) show up as Home Assistant [media player entities](/integrations/media_player/).  Media players will allow you to control media playback and see the currently playing item.

There is currently support for the following Home Assistant Platforms:

- [Media player](#media-player)

All of the Home Assistant [Media Player Control Actions](https://www.home-assistant.io/integrations/media_player/#media-control-actions) are supported.

{% include integrations/config_flow.md %}

### Manual configuration

Under normal circumstances, Home Assistant will automatically discover your running Music Assistant Server. If there is something special about the HA or MA setup (e.g. the MA server is running as a remote docker container) or discovery is not working, it is possible to manually specify the URL to your Music Assistant server. 

## Media player

The Music Assistant media player platform will create media player entities for all players available in MA including those imported from Home Assistant. This is needed to provide the full functionality Music Assistant has to offer. These entities will display media information, playback progress, and playback controls.

### Action `media_player.play_media`

Play media hosted on a Music Assistant server on a Music Assistant player. The action configuration is as described in the [media player documentation](https://www.home-assistant.io/integrations/media_player/#action-media_playerplay_media)

The `media_content_id` payload can be any of the following:

- The name of a track, artist or album. (e.g. "Queen")
- A track or album defined also with the artist name (e.g. "Queen - Innuendo")
- A streaming provider URI (e.g. `spotify://artist/12345`)

##### Examples:

Play Adele's album 25

```yaml
entity_id: media_player.music_assistant_player
media_content_type: MUSIC
media_content_id: 'Adele - 25'
```

Play all tracks from Stevie Wonder

```yaml
entity_id: media_player.music_assistant_player
media_content_type: MUSIC
media_content_id: 'Stevie Wonder'
```

Play the playlist The Best of Disco

```yaml
entity_id: media_player.music_assistant_player
media_content_type: PLAYLIST
media_content_id: 'The Best of Disco'
```

## Additional actions

### Action `mass.play_media`

Play media on a Music Assistant player with more fine grained control options.

| Data attribute | Required | Description                                                                                                              | Example                            |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `media_id`     | Yes      | URI or name of the item you want to play. Specify a list if you want to play/enqueue multiple items.                     | "spotify://playlist/aabbccddeeff " |
| `media_type`   | No       | The type of the content to play. Such as artist, album, track or playlist. Will be auto determined if omitted.           | "playlist "                        |
| `artist`       | No       | When specifying a track or album by name in the Media ID field, you can optionally restrict results by this artist name. | "Queen"                            |
| `album`        | No       | When specifying a track by name in the Media ID field, you can optionally restrict results by this album name.           | "News of the world"                |
| `enqueue`      | No       | If the content should be played now or be added to the queue. Options are: play, replace, next. replace_next, add        | "replace"                          |
| `radio_mode`   | No       | Enable radio mode to auto generate a playlist based on the selection.                                                    | "true"                             |


### Action `mass.play_announcement`

Play announcement on a Music Assistant player with more fine grained control options.

| Data attribute         | Required | Description                                                                      | Example                                   |
| ---------------------- | -------- | -------------------------------------------------------------------------------- | ----------------------------------------- |
| `url`                  | Yes      | URL to the notification sound.                                                   | "http://someremotesite.com/doorbell.mp3 " |
| `use_pre_announce`     | No       | Use pre-announcement sound for the announcement. Omit to use the player default. | "true"                                    |
| `announce_volume`      | No       | Use a forced volume level for the announcement. Omit to use player default.      | "75"                                      |


### Action `mass.search`

Perform a global search on the Music Assistant library and all providers.

| Data attribute | Required | Description                                                                                                       | Example                |
| ---------------| -------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `name`         | Yes      | The name/title to search for.                                                                                     | "We Are The Champions" |
| `media_type`   | No       | The type of the content to search. Such as artist, album, track, radio or playlist. All types if omitted.         | "playlist"             |
| `artist`       | No       | When specifying a track or album name in the name field, you can optionally restrict results by this artist name. | "Queen"                |
| `album`        | No       | When specifying a track name in the name field, you can optionally restrict results by this album name.           | "News of the world"    |
| `limit`        | No       | Maximum number of items to return (per media type)                                                                | "25"                   |
| `library_only` | No       | Only include results that are in the library.                                                                     | "true"                 |


### Action `mass.transfer_queue`

Transfer the player's queue to another player.

| Data attribute   | Required | Description                                                                                                            | Example                        |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `source_player`  | No       | The source media player which has the queue you want to transfer. When omitted, the first playing player will be used. | "media_player.kitchen_speaker" |
| `auto_play`      | No       | Start playing the queue on the target player. Omit to use the default behavior.                                        | "true"                         |

## Notes

- Any HA players added to MA will appear duplicated as the MA version of the player is created. The original HA player can be hidden if desired.
