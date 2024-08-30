---
title: Bang & Olufsen
description: Instructions on how to integrate Bang & Olufsen devices into Home Assistant.
ha_category:
  - Media Player
  - Multimedia
ha_release: 2024.2
ha_iot_class: Local Push
ha_domain: bang_olufsen
ha_platforms:
  - media_player
ha_codeowners:
  - '@mj23000'
ha_config_flow: true
ha_zeroconf: true
ha_integration_type: device
---

The Bang & Olufsen integration enables control of some of the features of certain [Bang & Olufsen](https://www.bang-olufsen.com/) devices through Home Assistant.

## Compatible devices

Devices that have been tested and _should_ work without any trouble are:

- [Beoconnect Core](https://www.bang-olufsen.com/en/dk/accessories/beoconnect-core)
- [Beolab 8](https://www.bang-olufsen.com/en/dk/speakers/beolab-8)
- [Beolab 28](https://www.bang-olufsen.com/en/dk/speakers/beolab-28)
- [Beosound 2 3rd gen](https://www.bang-olufsen.com/en/dk/speakers/beosound-2)
- [Beosound A5](https://www.bang-olufsen.com/en/dk/speakers/beosound-a5)
- [Beosound A9 5th gen](https://www.bang-olufsen.com/en/dk/speakers/beosound-a9)
- [Beosound Balance](https://www.bang-olufsen.com/en/dk/speakers/beosound-balance)
- [Beosound Emerge](https://www.bang-olufsen.com/en/dk/speakers/beosound-emerge)
- [Beosound Level](https://www.bang-olufsen.com/en/dk/speakers/beosound-level)
- [Beosound Theatre](https://www.bang-olufsen.com/en/dk/soundbars/beosound-theatre)

and any other Mozart based products.

{% include integrations/config_flow.md %}

{% configuration_basic %}
IP Address:
  description: The IP address of your device. Can be found by navigating to the device on the [Bang & Olufsen app](https://www.bang-olufsen.com/en/dk/story/apps) and selecting `Settings` → `About` → `IP address`.
  required: true
  type: string
Device model:
  description: The model name of your Bang & Olufsen device. This is used to determine some capabilities of the device. If the device is not in the list yet, choose a product similar to yours.
  required: true
  type: string
{% endconfiguration_basic %}


## Actions

### play_media actions

The Bang & Olufsen integration supports different playback types in the `media_player.play_media` action: playback from URL, activating a favorite, playback from a local file, playing a radio station, activating a Deezer flow and Deezer playlists, albums, tracks, and playing files and text-to-speech (TTS) as an overlay.

#### play_media examples

Playing [DR P1](https://www.dr.dk/lyd/p1) from a URL:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: url
  media_content_id: http://live-icy.dr.dk/A/A03H.mp3
```

Activating the first favourite:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: favourite
  media_content_id: 1
```

Playing a local file:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_id: media-source://media_source/local/example.mp3
  media_content_type: music
```

Playing a radio station:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_id: 1234567890123456
  media_content_type: radio
```

Playing a Deezer flow. Optionally define a Deezer user ID:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: deezer
  media_content_id: flow
  extra:
    id: 1234567890
```

Playing a Deezer playlist. Optionally define starting position for the playlist:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: deezer
  media_content_id: playlist:1234567890
  extra:
    start_from: 123
```

Playing a Deezer album. Optionally define starting position for the album:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: deezer
  media_content_id: album:1234567890
  extra:
    start_from: 123
```

Playing a Deezer track:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: deezer
  media_content_id: 1234567890
```

Playing a Tidal playlist. Optionally define starting position for the playlist:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: tidal
  media_content_id: playlist:01234567-89ab-cdfe-0123-456789abcdef
  extra:
    start_from: 123
```

Playing a Tidal album. Optionally define starting position for the album:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: tidal
  media_content_id: album:123456789
  extra:
    start_from: 123
```

Playing a Tidal track:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: tidal
  media_content_id: 123456789
```

##### Overlay

Interrupts currently playing media to play an audio message.

To use the Bang & Olufsen Cloud TTS, use `overlay_tts` as the `media_content_type` and enter a message into the `media_content_id` field.
Bang & Olufsen Cloud TTS messages are limited to 100 unique messages a day and are cached for 24 hours.

Extra keys available:

| Data attribute    | Optional | Description                                                                                       |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `overlay_absolute_volume` | yes      | Specify an absolute volume for the overlay.                                                       |
| `overlay_offset_volume`   | yes      | Specify a volume offset to be added to the current volume level.                                  |
| `overlay_tts_language`    | yes      | Specify the language used for text-to-speech. Uses the BCP 47 standard. Default value is "en-us". |

###### Examples:

Playing a local file with an absolute volume as an overlay:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: music
  media_content_id: media-source://media_source/local/doorbell.mp3
  announce: true
  extra:
    overlay_absolute_volume: 60
```

Playing a Bang & Olufsen Cloud TTS message with an offset volume (as TTS messages can be quiet):

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: overlay_tts
  media_content_id: This is a test
  announce: true
  extra:
    overlay_offset_volume: 10
```

Playing a Bang & Olufsen Cloud TTS message with a local language:
```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: overlay_tts
  media_content_id: Dette er en test
  announce: true
  extra:
    overlay_tts_language: da-dk
```

## Automations

WebSocket notifications received from the device are fired as events in Home Assistant. These can be received by listening to `bang_olufsen_websocket_event` event types, where `device_id` or `serial_number` can be used to differentiate devices.

### Getting Deezer URIs

To find Deezer playlist, album URIs, and user IDs for Deezer flows, the Deezer website has to be accessed. When navigating to an album, the URL will look something like: <https://www.deezer.com/en/album/ALBUM_ID>, and this needs to be converted to: `album:ALBUM_ID` and the same applies to playlists, which have the format: `playlist:PLAYLIST_ID`.

Additionally a Deezer user ID can be found at <https://www.deezer.com/en/profile/USER_ID> by selecting the active user in a web browser.

### Getting Tidal URIs
Tidal playlists, album URIs and track IDs are available via the Tidal website. When navigating to an album, the URL will look something like <https://listen.tidal.com/album/ALBUM_ID/>, and this needs to be converted to `album:ALBUM_ID`. The same applies to playlists, which have the format `playlist:PLAYLIST_ID`. Individual tracks can be found by sharing the track and selecting the `Copy track link` method, which should yield a link of the format <https://tidal.com/browse/track/TRACK_ID?u>, this can be played by extracting the track id `TRACK_ID`.
