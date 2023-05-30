---
title: Bang & Olufsen
description: Instructions on how to integrate Bang & Olufsen devices into Home Assistant.
ha_category:
  - Media Player
  - Multimedia
ha_release: 2023.6.0
ha_iot_class: Local Push
ha_domain: bangolufsen
ha_platforms:
  - media_player
ha_codeowners:
  - "@mj23000"
ha_config_flow: true
ha_zeroconf: true
ha_integration_type: integration
---

The `bangolufsen` integration enables control of some of the features of certain [Bang & Olufsen](https://www.bang-olufsen.com/) devices through Home Assistant.

## Compatible devices

Devices that have been tested and *should* work without any trouble are:

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
  description: The IP address of your device. Can be found by navigating to the device on the [Bang & Olufsen app](https://www.bang-olufsen.com/en/dk/story/apps) and selecting `⋯` → `Product settings` → `About` → `IP address`.
  required: true
  type: string
Device model:
  description: The model name of your Bang & Olufsen device. This is used to determine som capabilities of the device. If the device is not in the list yet, choose a product similar to yours.
  required: true
  type: string
Volume step:
  description: The step size of the media_player.volume_up and media_player.volume_down services.
  required: true
  type: integer
Default volume:
  description: The volume level that the device will *default* to when entering standby.
  required: true
  type: integer
Max volume:
  description: The maximum volume level that the device will be able to play at.
  required: true
  type: integer
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}
{% configuration_basic %}
Name:
  description: The name of the device in Home Assistant.
  required: true
  type: string
Volume step:
  description: The step size of the media_player.volume_up and media_player.volume_down services.
  required: true
  type: integer
Default volume:
  description: The volume level that the device will *default* to when entering standby.
  required: true
  type: integer
Max volume:
  description: The maximum volume level that the device will be able to play at.
  required: true
  type: integer
{% endconfiguration_basic %}

## Entities

This integration currently adds a media_player entity.

## Services

### play_media services

The Bang & Olufsen integration supports different playback types in the `media_player.play_media` service: playback from URL, activating a favourite, playback from a local file, playing a radio station, activating a Deezer flow and Deezer playlists, albums, and tracks.

#### play_media examples

Playing [DR P1](https://www.dr.dk/lyd/p1) from a URL:

```yaml
service: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: url
  media_content_id: http://live-icy.dr.dk/A/A03H.mp3
```

Activating the first favourite:

```yaml
service: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: favourite
  media_content_id: 1
```

Playing a local file:

```yaml
service: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_id: media-source://media_source/local/example.mp3
  media_content_type: music
```

Playing a radio station:

```yaml
service: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_id: 1234567890123456
  media_content_type: radio
```

Playing a Deezer flow. Optionally define a Deezer user ID:

```yaml
service: media_player.play_media
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
service: media_player.play_media
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
service: media_player.play_media
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
service: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: deezer
  media_content_id: 1234567890
```

### Custom services

The Bang & Olufsen integration additionally supports different custom services

### Service `bangolufsen.beolink_join`

Join a Beolink experience.

| Service data attribute | Optional | Description                           |
| ---------------------- | -------- | ------------------------------------- |
| `beolink_jid`          | yes      | Manually specify Beolink JID to join. |

### Service `bangolufsen.beolink_expand`

Expand current Beolink experience.

| Service data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `beolink_jids`         | no       | Specify which Beolink JIDs will join current Beolink experience. |

### Service `bangolufsen.beolink_unexpand`

Unexpand from current Beolink experience.

| Service data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `beolink_jids`         | no       | Specify which Beolink JIDs will leave from current Beolink experience. |

### Service `bangolufsen.beolink_leave`

Leave a Beolink experience.

### Service `bangolufsen.beolink_allstandby`

Set all Connected Beolink devices to standby.

### Service `bangolufsen.beolink_set_volume`

Set a volume level for all connected Beolink devices.

| Service data attribute | Optional | Description               |
| ---------------------- | -------- | ------------------------- |
| `volume_level`         | no       | Specify the volume level. |

### Service `bangolufsen.beolink_leader_command`

Send a media_player command to Beolink leader.

| Service data attribute | Optional | Description                                   |
| ---------------------- | -------- | --------------------------------------------- |
| `command`              | no       | Specify the media_player command.             |
| `parameter`            | yes      | Specify the media_player command's parameter. |

### Service `bangolufsen.overlay_audio`

Overlay audio over any currently playing audio.

<div class="note">
TTS is generated by Bang & Olufsen and is limited to 100 unique messages a day. Generated TTS messages are cached for 24 hours.
</div>

| Service data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `uri`                  | yes      | Specify the audio to play.                                       |
| `absolute_volume`      | yes      | Specify an absolute volume for the overlay.                      |
| `volume_offset`        | yes      | Specify a volume offset to be added to the current volume level. |
| `tts`                  | yes      | Specify a string to be converted to a TTS message.               |
| `tts_language`         | yes      | Specify TTS language.                                            |

## Automations

All device triggers can be received by listening to `bangolufsen_event` event types.

Additionally the "raw" WebSocket notifications received from the device are fired as events in Home Assistant. These can be received by listening to `bangolufsen_websocket_event` event types where `device_id` or `serial_number` can be used to differentiate devices.

### Physical buttons and sensors

The "shortPress" of all the buttons, except for volume control, are available as device triggers.

### Beoremote One

Device triggers for the [Beoremote One](https://www.bang-olufsen.com/en/dk/accessories/beoremote-one) are supported and will be available once the integration detects that it has been paired with the device. To trigger these triggers, enter the "Control" or "Light" submenu, and press any of the compatible buttons. Each button press will send a "press" and a "release" event and therefore also a "press" and a "release" device trigger.

The favourite buttons correspond to the physical favourite buttons on the device.

### Getting Deezer URIs

In order to find Deezer playlist, album URIs and user IDs for Deezer flows, the Deezer website has to be accessed. When navigating to an album, the URL will look something like: <https://www.deezer.com/en/album/ALBUM_ID>, and this simply needs to be converted to: `album:ALBUM_ID` and the same applies to playlist, which have the format: `playlist:PLAYLIST_ID`.

Additionally a Deezer user ID can be found at <https://www.deezer.com/en/profile/USER_ID> by selecting the active user in a web browser.

Deezer track IDs can currently only easily be found by playing the track on the device and looking at the extra state attributes, where it is shown with the key "deezer_track_id". Tracks do not have a prefix so the ID needs to be used directly.

### Automation examples

#### Using the overlay as doorbell

```yaml
description: Play doorbell sound overlay on doorbell press.
mode: single
trigger:
  - platform: device
    device_id: 1234567890abcdef1234567890abcdef
    domain: example
    type: doorbell
condition: []
action:
  - service: bangolufsen.overlay_audio
    data:
      uri: media-source://media_source/local/doorbell.mp3
      absolute_volume: 60
    target:
      entity_id: media_player.beosound_balance_12345678
```

#### Using the overlay TTS as a bedtime reminder

```yaml
description: "Daily bedtime reminder using overlay TTS."
mode: single
trigger:
  - platform: time
    at: "22:00:00"
condition: []
action:
  - service: bangolufsen.overlay_audio
    data:
      absolute_volume: 70
      tts: It is 22:00. Time to go to bed!
    target:
      entity_id: media_player.beosound_balance_12345678
```

#### Using the Beoremote One to control lights

```yaml
description: Use the Beoremote One to control living room lights.
mode: single
trigger:
  - platform: device
    device_id: 234567890abcdef1234567890abcdef1
    domain: bangolufsen
    type: Light/Digit1_KeyPress
condition: []
action:
  - service: light.toggle
    target:
      entity_id: light.living_room
```

#### Setting all connected Beolink devices to standby when leaving home

```yaml
description: Set all connected Beolink devices to standby when leaving home.
mode: single
trigger:
  - platform: zone
    entity_id: person.example
    zone: zone.home
    event: leave
condition: []
action:
  - service: bangolufsen.beolink_allstandby
    data: {}
    target:
      entity_id: media_player.beosound_balance_12345678
```
