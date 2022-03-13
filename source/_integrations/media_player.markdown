---
title: Media Player
description: Instructions on how to setup your media players with Home Assistant.
ha_category:
  - Media Player
ha_release: 0.7
ha_quality_scale: internal
ha_domain: media_player
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: integration
---

Interacts with media players on your network.

## Services

### Media control services
Available services: `turn_on`, `turn_off`, `toggle`, `volume_up`, `volume_down`, `volume_set`, `volume_mute`, `media_play_pause`, `media_play`, `media_pause`, `media_stop`, `media_next_track`, `media_previous_track`, `clear_playlist`, `shuffle_set`, `repeat_set`, `play_media`, `select_source`, `select_sound_mode`, `join`, `unjoin`

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

{% configuration %}
title:
  type: string
  description: Title of the media.
  required: false
thumb:
  type: string
  description: Thumbnail image URL.
  required: false
current_time:
  type: float
  description: Seconds since the beginning of the content. If the content is live content, and the position is not specified, the stream will start at the live position.
  required: false
autoplay:
  type: boolean
  description: Whether the media will automatically play.
  default: true
  required: false
stream_type:
  type: string
  description: "Describes the type of media artifact as one of the following: `NONE`, `BUFFERED`, `LIVE`."
  required: false
subtitles:
  type: string
  description: URL of subtitle file to be shown on chromecast.
  required: false
subtitles_lang:
  type: string
  description: Language for subtitles.
  required: false
subtitles_mime:
  type: string
  description: Mimetype of subtitles.
  required: false
subtitle_id:
  type: integer
  description: ID of subtitle to be loaded.
  required: false
enqueue:
  type: boolean
  description: If True, enqueue the media instead of play it.
  default: false
  required: false
media_info:
  type: map
  description: Additional MediaInformation attributes not explicitly listed.
  required: false
metadata:
  type: map
  description: "Media metadata object, one of the following: `GenericMediaMetadata`, `MovieMediaMetadata`, `TvShowMediaMetadata`, `MusicTrackMediaMetadata`, `PhotoMediaMetadata`."
  required: false
{% endconfiguration %}

Documentation:

- [Google Dev Documentation MediaData](https://developers.google.com/cast/docs/reference/messages#MediaData)
- [Google Dev Documentation MediaInformation](https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.messages.MediaInformation)


Example of calling media_player service with title and image set:

```yaml
service: media_player.play_media
target:
  entity_id: media_player.chromecast
data:
  media_content_type: music
  media_content_id: "https://fake-home-assistant.io.stream/aac"
  extra:
    thumb: "https://brands.home-assistant.io/_/homeassistant/logo.png"
    title: HomeAssistantRadio
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

#### Service `media_player.join`

Allows to group media players together for synchronous playback. Only works on supported multiroom audio systems.

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | The media player entity whose playback will be expanded to the players specified in `group_members`.  |
| `group_members`        |       no | The player entities which will be synced with the playback from `entity_id`.  |

#### Service `media_player.unjoin`

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |      yes | Unjoin this media player from any player groups.     |

### Device Class

The way media players are displayed in the frontend can be modified in the [customize section](/getting-started/customizing-devices/). The following device classes are supported for media players:

- `tv`: Device is a television type device.
- `speaker`: Device is speaker or stereo type device.
- `receiver`: Device is audio video receiver type device taking audio and outputting to speakers and video to some display.

## Example script

The example script below combines a number of media player commands to set the output speaker for [Spotify](/integrations/spotify) to 30% volume and plays a randomly shuffled track from the playlist Calming Classical.

This demonstrates how steps a user would go through manually can be combined into a script that can then be called by a single button press or automation.

```yaml
# Example configuration.yaml entry
script:
  demo_spotify:
    # Script demonstrating media player functionality
    # To use this script you must update both media_player entity ids and Spotify's name for the source to match your Spotify integration and smart speaker device
    alias: Demo Spotify
    icon: mdi:music-box
    mode: single
    sequence:
      # In this demo we first prepare a receiver that supports Spotify
      - service: scene.apply
        data:
          entities:
            media_player.denon_avr_x2000:
              state: 'on'
              sound_mode: STEREO # Only supported by select devices
              volume_level: 0.3
      # Set the output. See the documentation about how the concept of source differs for Spotify than for other media players
      - service: media_player.select_source
        entity_id: media_player.spotify
        data:
          source: "Denon AVR-X2000"

      # If the script was too fast we may get a "No active playback device" error
      - alias: Allow time for service to wake from idle
        wait_template: "{{ not is_state('media_player.spotify', 'idle') }}"
        timeout: '00:00:30'

      # Start a playlist then set it to repeat, shuffle and skip to a random track
      - service: media_player.play_media
        data:
          entity_id: media_player.spotify
          media_content_id: "spotify:playlist:37i9dQZF1DWVFeEut75IAL"
          media_content_type: playlist

      - service: media_player.repeat_set
        data:
          entity_id: media_player.spotify
          repeat: all
      - service: media_player.shuffle_set
        data:
          entity_id: media_player.spotify
          shuffle: true
      - service: media_player.media_next_track
        data:
          entity_id: media_player.spotify
```

Documentation:

- [Scripts](/integrations/script) configuration details
- [Scripts Editor](/docs/scripts/editor/) for a UI that reads and writes `scripts.yaml`
- [Spotify](/integrations/spotify) integration details
