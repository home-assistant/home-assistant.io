---
title: Media Player
description: Instructions on how to setup your media players with Home Assistant.
ha_category:
  - Media Player
ha_release: 0.7
ha_quality_scale: internal
ha_domain: media_player
---

Interacts with media players on your network.

## Services

### Media control services
Available services: `turn_on`, `turn_off`, `toggle`, `volume_up`, `volume_down`, `volume_set`, `volume_mute`, `media_play_pause`, `media_play`, `media_pause`, `media_stop`, `media_next_track`, `media_previous_track`, `clear_playlist`, `shuffle_set`, `play_media`, `select_source`, `select_sound_mode`, `send_key`

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      no | Target a specific media player. To target all media players, use `all`. |

#### Service `media_player.volume_mute`

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      no | Target a specific media player. To target all media players, use `all`. |
| `is_volume_muted`      |       no | True/false for mute/unmute                       |

#### Service `media_player.volume_set`

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      no | Target a specific media player. To target all media players, use `all`. |
| `volume_level`         |       no | Float for volume level. Range 0..1               |

#### Service `media_player.media_seek`

| Service data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `entity_id`            |      no | Target a specific media player. To target all media players, use `all`.       |
| `seek_position`        |       no | Position to seek to. The format is platform dependent. |

#### Service `media_player.play_media`

| Service data attribute | Optional | Description                                                                                                                                                            |
| -----------------------| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            |      no | Target a specific media player. To target all media players, use `all`.                                                                                                                       |
| `media_content_id`     |       no | A media identifier. The format of this is integration dependent. For example, you can provide URLs to Sonos and Cast but only a playlist ID to iTunes.                   |
| `media_content_type`   |       no | A media type. Must be one of `music`, `tvshow`, `video`, `episode`, `channel` or `playlist`. For example, to play music you would set `media_content_type` to `music`. |

#### Service `media_player.select_source`

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      no | Target a specific media player. To target all media players, use `all`.     |
| `source`               |       no | Name of the source to switch to. Platform dependent. |

#### Service `media_player.select_sound_mode`

Currently only supported on [Denon AVR](/integrations/denonavr/) and  [Songpal](/integrations/songpal).

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       no | Target a specific media player. For example `media_player.marantz`|
| `sound_mode`           |       no | Name of the sound mode to switch to. Platform dependent.|

#### Service `media_player.shuffle_set`

Currently only supported on [Sonos](/integrations/sonos), [Spotify](/integrations/spotify), [MPD](/integrations/mpd), [Kodi](/integrations/kodi), [Squeezebox](/integrations/squeezebox) and [Universal](/integrations/universal).

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       no | Target a specific media player. For example `media_player.spotify`|
| `shuffle`              |       no | `true`/`false` for enabling/disabling shuffle        |

#### Service `media_player.send_key`

Currently not supported by any integrations.

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       no | Target a specific media player. For example `media_player.living_room_tv`|
| `key`                  |       no | The name of the key command to send. Default valid values are: `power`, `volume_up`, `volume_down`, `mute`, `up`, `down`, `left`, `right`, `select`, `back`, `exit`, `home`, `play`, `pause`, `play_pause`, `fast_forward`, `rewind`, `next_track` and `previous_track`. For integration-specific commands, consult their documentation.|

### Device Class

The way media players are displayed in the frontend can be modified in the [customize section](/getting-started/customizing-devices/). The following device classes are supported for media players:

- `tv`: Device is a television type device.
- `speaker`: Device is speaker or stereo type device.
