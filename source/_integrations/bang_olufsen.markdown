---
title: Bang & Olufsen
description: Instructions on how to integrate Bang & Olufsen devices into Home Assistant.
ha_category:
  - Event
  - Media Player
  - Multimedia
ha_release: 2024.2
ha_iot_class: Local Push
ha_domain: bang_olufsen
ha_platforms:
  - diagnostics
  - event
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

and any other [Mozart](https://support.bang-olufsen.com/hc/en-us/articles/24766979863441-Which-platform-is-my-Connected-Audio-product-based-on) based products. This means all [Connected Speakers](https://www.bang-olufsen.com/en/dk/story/connected-speakers) that have been launched after 2020.

{% include integrations/config_flow.md %}

{% configuration_basic %}
IP Address:
  description: The IP address of your device. Can be found by navigating to the device on the [Bang & Olufsen app](https://www.bang-olufsen.com/en/dk/story/apps) and selecting `Settings` → `About` → `IP address`.
Device model:
  description: The model name of your Bang & Olufsen device. This is used to determine some capabilities of the device. If the device is not in the list yet, choose a product similar to yours.
{% endconfiguration_basic %}

## Data updates

The **Bang & Olufsen** integration uses the [Mozart API](https://bang-olufsen.github.io/mozart-open-api), which is a local REST API with a WebSocket notification channel for immediate state information for media metadata, playback progress, volume etc. The only exception to this is the repeat and shuffle controls which are polled every 30 seconds.

## Supported features

Currently, a single device with a `media_player` entity is created for each added physical device. For advanced automations, [events](#automations) are fired in Home Assistant.

### Media player

A number of features are available through the media player entity:

- See current metadata, progress, volume, etc.
- Control next/previous, play/pause, shuffle/repeat settings, volume, sound mode, audio and video sources, and more.
- Play various media through [play_media actions](#play_media-actions).
- Control multiroom audio through [Beolink](https://support.bang-olufsen.com/hc/en-us/articles/4411572883089-What-is-Beolink-Multiroom):
  - Control with Home Assistant media_player grouping.
  - Monitor current [Beolink state](#beolink) through media player properties.
  - For more advanced usage, [custom Beolink services](#custom-actions) have been defined:
     - Connect or expand to [ASE](https://support.bang-olufsen.com/hc/en-us/articles/24766979863441-Which-platform-is-my-Connected-Audio-product-based-on) products not available in Home Assistant.
     - Expand sessions to all discovered devices.
     - Connect to, expand to or unexpand devices.
     - Set all connected Beolink devices to standby.

## Limitations

Currently, some features of the Mozart platform are not available through the [public API](https://github.com/bang-olufsen/mozart-open-api). Some may become available at a later point, but until then the [Bang & Olufsen App](https://www.bang-olufsen.com/en/dk/story/apps) can be used to configure these settings and features:

- Creating timers and alarms
- Retrieving detailed alarm and timer information

And more advanced app-centric features such as:

- Creating presets
- Creating listening positions
- Creating sound modes
- Creating stereo pairs
- Adjusting specific sound settings
- Pairing remotes

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

| Data attribute            | Optional | Description                                                                                       |
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

### Custom actions

The Bang & Olufsen integration additionally supports different custom actions for Beolink.

[Beolink](https://support.bang-olufsen.com/hc/en-us/articles/4411572883089-What-is-Beolink-Multiroom) is Bang & Olufsen's advanced multiroom audio solution. This integration supports Home Assistant's `media_player` grouping, but to fully benefit from Beolink, such as being able to join legacy devices not added in Home Assistant, custom actions have been defined.

Attempting to execute an invalid Beolink action will result in either a Home Assistant error or an audible error indication from your device.

#### `bang_olufsen.beolink_join`

Join a Beolink experience.

| Action data attribute | Optional | Description                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `beolink_jid`         | yes      | Manually specify Beolink JID to join.                                                                                                                                                                                                                                                                                                                |
| `source_id`           | yes      | Specify which source to join, behavior varies between hardware platforms. Source names prefaced by a platform name can only be used when connecting to that platform. For example "ASE Beoradio" can only be used when joining an ASE device, while ”ASE / Mozart Deezer” can be used with ASE or Mozart devices. A defined Beolink JID is required. |

##### Join a currently active beolink experience or device playing compatible source

```yaml
action: bang_olufsen.beolink_join
target:
  entity_id: media_player.beosound_balance_12345678
```

Repeatedly calling this will cycle through available devices.

Will also be triggered by calling the `media_player.join` action with an empty list of `group_members`:

```yaml
action: media_player.join
target:
  entity_id: media_player.beosound_balance_12345678
data:
  group_members:
```

##### Join a specific active beolink experience

```yaml
action: bang_olufsen.beolink_join
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jid: 1111.2222222.33333333@products.bang-olufsen.com
```

##### Join the "radio" source on a Beolink Converter NL/ML

```yaml
action: bang_olufsen.beolink_join
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jid: 1111.2222222.33333333@products.bang-olufsen.com
  source_id: radio
```

A limited selection of `source_id`s are available. The below table shows which `source_id` can be joined on which hardware platform:

| Hardware platform       | Compatible source_ids                      |
| ----------------------- | ------------------------------------------ |
| ASE                     | `beoradio`                                 |
| ASE and Mozart          | `deezer`, `spotify`                        |
| Mozart                  | `tidal`                                    |
| Beolink Converter NL/ML | `radio`, `tp1`, `tp2`, `cd`, `aux_a`, `ph` |

#### `bang_olufsen.beolink_expand`

Expand current Beolink experience.

| Action data attribute | Optional | Description                                                      |
| --------------------- | -------- | ---------------------------------------------------------------- |
| `all_discovered`      | yes      | Expand Beolink experience to all discovered devices.             |
| `beolink_jids`        | yes      | Specify which Beolink JIDs will join current Beolink experience. |

##### Expand an active Beolink experience to all other devices discovered by the defined device

```yaml
action: bang_olufsen.beolink_expand
target:
  entity_id: media_player.beosound_balance_12345678
data:
  all_discovered: true
```

##### Expand an active Beolink experience to a specific device

```yaml
action: bang_olufsen.beolink_expand
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jids:
    - 1111.2222222.33333333@products.bang-olufsen.com
```

Will also be triggered by calling the `media_player.join` action, with the entity_id of a `media_player` entity from this integration in `group_members`:

```yaml
action: media_player.join
target:
  entity_id: media_player.beosound_balance_12345678
data:
  group_members:
    - media_player.beosound_balance_33333333
```

##### Expand an active Beolink experience to specific devices

```yaml
action: bang_olufsen.beolink_expand
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jids:
    - 1111.2222222.33333333@products.bang-olufsen.com
    - 4444.5555555.66666666@products.bang-olufsen.com
```

Will also be triggered by calling the `media_player.join` action, with the entity_ids of `media_player` entities from this integration in `group_members`:

```yaml
action: media_player.join
target:
  entity_id: media_player.beosound_balance_12345678
data:
  group_members:
    - media_player.beosound_balance_33333333
    - media_player.beosound_balance_66666666
```

#### `bang_olufsen.beolink_unexpand`

Unexpand from current Beolink experience.

| Action data attribute | Optional | Description                                                            |
| --------------------- | -------- | ---------------------------------------------------------------------- |
| `beolink_jids`        | no       | Specify which Beolink JIDs will leave from current Beolink experience. |

##### Remove a device from an active Beolink experience

```yaml
action: bang_olufsen.beolink_unexpand
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jids:
    - 1111.2222222.33333333@products.bang-olufsen.com
```

##### Remove devices from an active Beolink experience

```yaml
action: bang_olufsen.beolink_unexpand
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jids:
    - 1111.2222222.33333333@products.bang-olufsen.com
    - 4444.5555555.66666666@products.bang-olufsen.com
```

#### `bang_olufsen.beolink_leave`

Leave a Beolink experience.

##### Action usage example

```yaml
action: bang_olufsen.beolink_leave
target:
  entity_id: media_player.beosound_balance_12345678
```

Same behavior as calling the `media_player.unjoin` action:

```yaml
action: media_player.unjoin
target:
  entity_id: media_player.beosound_balance_12345678
```

#### `bang_olufsen.beolink_allstandby`

Set all connected Beolink devices to standby.

##### Action usage example

```yaml
action: bang_olufsen.beolink_allstandby
target:
  entity_id: media_player.beosound_balance_12345678
```

## Automations

WebSocket notifications received from the device are fired as events in Home Assistant. These can be received by listening to `bang_olufsen_websocket_event` event types, where `device_id` or `serial_number` can be used to differentiate devices.

### Events

Event entities are created for each of the physical controls on your device. These controls usually have their own behaviors, so using them for automations is not always ideal.
Available event entities:
- Bluetooth
- Microphone
- Next
- Play / Pause
- Favourite 1
- Favourite 2
- Favourite 3
- Favourite 4
- Previous
- Volume

All of these event entities support the following event types:
- Release of short press
- Long press
- Release of long press
- Very long press
- Release of very long press

All devices except the [Beoconnect Core](https://www.bang-olufsen.com/en/dk/accessories/beoconnect-core) support device controls.

### Getting Deezer URIs

To find Deezer playlist, album URIs, and user IDs for Deezer flows, the Deezer website has to be accessed. When navigating to an album, the URL will look something like: <https://www.deezer.com/en/album/ALBUM_ID>, and this needs to be converted to: `album:ALBUM_ID` and the same applies to playlists, which have the format: `playlist:PLAYLIST_ID`.

Additionally a Deezer user ID can be found at <https://www.deezer.com/en/profile/USER_ID> by selecting the active user in a web browser.

### Getting Tidal URIs

Tidal playlists, album URIs and track IDs are available via the Tidal website. When navigating to an album, the URL will look something like <https://listen.tidal.com/album/ALBUM_ID/>, and this needs to be converted to `album:ALBUM_ID`. The same applies to playlists, which have the format `playlist:PLAYLIST_ID`. Individual tracks can be found by sharing the track and selecting the `Copy track link` method, which should yield a link of the format <https://tidal.com/browse/track/TRACK_ID?u>, this can be played by extracting the track id `TRACK_ID`.

### Beolink

Discovered devices and devices in an active Beolink experience are available in the properties of the media_player entity. A device is represented by its friendly name and JID, used for connecting devices.

```yaml
beolink:
  self: The current device
  leader: Beolink leader (if available)
  listeners: Beolink listeners (if available)
  peers: Beolink peers (if available)
```

## Diagnostics and troubleshooting

The **Bang & Olufsen** integration supports [Home Assistant debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).
Where all received WebSocket events are provided through debug logs and the WebSocket connection state, config entry and media player state is provided through diagnostics.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
