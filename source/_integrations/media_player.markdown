---
title: Media Player
description: Instructions on how to setup your media players with Home Assistant.
ha_category:
  - Media Player
ha_release: 0.7
ha_quality_scale: internal
ha_domain: media_player
ha_iot_class:
---

Interacts with media players on your network.

## Services

### Media control services
Available services: `turn_on`, `turn_off`, `toggle`, `volume_up`, `volume_down`, `volume_set`, `volume_mute`, `media_play_pause`, `media_play`, `media_pause`, `media_stop`, `media_next_track`, `media_previous_track`, `clear_playlist`, `shuffle_set`, `repeat_set`, `play_media`, `select_source`, `select_sound_mode`

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`. |

#### Service `media_player.volume_mute`

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`. |
| `is_volume_muted`      |       no | True/false for mute/unmute                       |

#### Service `media_player.volume_set`

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`. |
| `volume_level`         |       no | Float for volume level. Range 0..1               |

#### Service `media_player.media_seek`

| Service data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`.       |
| `seek_position`        |       no | Position to seek to. The format is platform dependent. |

#### Service `media_player.play_media`

| Service data attribute | Optional | Description                                                                                                                                                            |
| -----------------------| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`.                                                                                                                       |
| `media_content_id`     |       no | A media identifier. The format of this is integration dependent. For example, you can provide URLs to Sonos and Cast but only a playlist ID to iTunes.                   |
| `media_content_type`   |       no | A media type. Must be one of `music`, `tvshow`, `video`, `episode`, `channel` or `playlist`. For example, to play music you would set `media_content_type` to `music`. |
| `extra`                |      yes | Extra dictionary data to send, e.g., title, thumbnail. Possible values can be found below.

##### Extra dictionary data

```json
title: string - Title of the media.
thumb: string - Thumbnail image URL.
current_time: float - Seconds since beginning of content. If the content is
    live content, and position is not specifed, the stream will start at the
    live position
autoplay: bool - Whether the media will automatically play.
stream_type: string - Describes the type of media artifact as one of the
    following: "NONE", "BUFFERED", "LIVE".
subtitles: str - URL of subtitle file to be shown on chromecast.
subtitles_lang: string - Language for subtitles.
subtitles_mime: string - Mimetype of subtitles.
subtitle_id: int - Id of subtitle to be loaded.
enqueue: bool - If True, enqueue the media instead of play it.
media_info: map - Additional MediaInformation attributes not explicitly listed.
metadata: map - Media metadata object, one of the following:
    GenericMediaMetadata, MovieMediaMetadata, TvShowMediaMetadata,
    MusicTrackMediaMetadata, PhotoMediaMetadata.
```

Docs:
[Google Dev Docs MediaData](https://developers.google.com/cast/docs/reference/messages#MediaData)
[Google Dev Docs MediaInformation](https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.messages.MediaInformation)


Example of calling media_player service with title and image set:

```yaml
entity_id: media_player.chromecast
service: media_player.play_media
data:
  media_content_type: music
  media_content_id: 'https://fake-home-assistant.io.stream/aac'
  extra:
    thumb: 'https://brands.home-assistant.io/_/homeassistant/logo.png'
    title: HomeAssitantRadio
```

#### Service `media_player.select_source`

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. To target all media players, use `all`.     |
| `source`               |       no | Name of the source to switch to. Platform dependent. |

#### Service `media_player.select_sound_mode`

Currently only supported on [Denon AVR](/integrations/denonavr/) and  [Songpal](/integrations/songpal).

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. For example `media_player.marantz`|
| `sound_mode`           |       no | Name of the sound mode to switch to. Platform dependent.|

#### Service `media_player.shuffle_set`

Currently only supported on [Sonos](/integrations/sonos), [Spotify](/integrations/spotify), [MPD](/integrations/mpd), [Kodi](/integrations/kodi), [Roon](/integrations/roon), [Squeezebox](/integrations/squeezebox) and [Universal](/integrations/universal).

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. For example `media_player.spotify`|
| `shuffle`              |       no | `true`/`false` for enabling/disabling shuffle        |

#### Service `media_player.repeat_set`

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Target a specific media player. For example `media_player.kitchen`|
| `repeat`               |       no | `off`/`all`/`one` for setting repeat mode            |

### Device Class

The way media players are displayed in the frontend can be modified in the [customize section](/getting-started/customizing-devices/). The following device classes are supported for media players:

- `tv`: Device is a television type device.
- `speaker`: Device is speaker or stereo type device.
