---
title: MusicCast
description: Instructions on how to integrate Yamaha MusicCast Receivers into Home Assistant.
ha_category:
  - Media player
ha_release: 0.53
ha_codeowners:
  - '@vigonotion'
  - '@micha91'
ha_iot_class: Local Push
ha_ssdp: true
ha_config_flow: true
ha_domain: yamaha_musiccast
ha_platforms:
  - media_player
  - number
  - select
  - switch
ha_integration_type: integration
---

The Yamaha **MusicCast** {% term integration %} allows you to control [Yamaha MusicCast Receivers](https://usa.yamaha.com/products/audio_visual/musiccast/index.html) from Home Assistant.

Supported devices are listed on their [site](https://usa.yamaha.com/products/contents/audio_visual/musiccast/musiccast-compatiblity.html).

{% include integrations/config_flow.md %}

## Grouping functionality

The Yamaha MusicCast {% term integration %} implements the grouping actions. There are some limitations in the MusicCast system for grouping:

- It is not possible to let mediaplayer entities of the same device (e.g., different zones) be in distinct groups.
- If a non-main zone is the master of a group, it is not possible to let other mediaplayers of the same device join this group.

## Play media functionality

The MusicCast {% term integration %} supports the Home Assistant media browser for all streaming services, your device supports. For services such as Deezer, you have to log in using the official MusicCast app. In addition, local HTTP URLs can be played back using this action. This includes the Home Assistant text-to-speech actions.

It is also possible to recall NetUSB presets using the play media action. To do so "presets:<preset_num>" has to be used as `media_content_id` in the action.

### Examples:

This is an example action that plays an audio file from a web server on the local network (like the Home Assistant built-in webserver):

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos
data:
  media_content_type: "music"
  media_content_id: "http://192.168.188.18:8123/local/sound_files/doorbell-front.mp3"
```

This example call shows how to call netusb preset 1:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.buro
data:
  media_content_id: "presets:1"
  media_content_type: "music"
```

## Configuration / diagnostic entities

Depending on the features supported by the device, several entities will be added for every MusicCast Device. Some of the entities are related to the MusicCast device and some are related to a zone of the device. All device and main zone related entities will be assigned to the Home Assistant device of the main zone. Entities related to other zones will be assigned to the Home Assistant device of the corresponding zone.

### Number entities

The following entities will be added, if they are supported by the MusicCast device:
- Equalizer (configuration, zone level)
  - One number {% term entity %} each is added for high, mid and low
- Tone Control (configuration, zone level)
  - One number {% term entity %} each is added for bass and treble
- Dialogue Level (configuration, zone level)
  - Set the volume of dialogues in relation to the general volume
- Dialogue Lift (configuration, zone level)
  - Set the vertical position of the dialogues in the surround system
- DTS Dialogue Control (configuration, zone level)
  - Control the volume of dialogues for DTS:X content

### Select entities

The following entities will be added, if they are supported by the MusicCast device:
- Dimmer (configuration, device level)
  - Set the display brightness
- Surround Decoder Type (configuration, zone level)
  - If sound program is set to surround decoder, the decoder type can be selected here
- Sleep (configuration, zone level)
  - Set a sleep timer for the device
- Equalizer Mode (configuration, zone level)
  - Some devices support multiple different equalizer modes
- Tone Control Mode (configuration, zone level)
  - Some devices support multiple different tone control modes
- Link Audio Delay (configuration, zone level)
  - Some devices let the user select, whether he prefers to have audio and video in sync or the audio of linked speakers in a group
- Link Control (configuration, zone level)
  - Some devices support compressed audio for groups
- Link Audio Quality (configuration, zone level)
  - Set the audio quality for grouped speakers

### Switch entities

The following entities will be added, if they are supported by the MusicCast device:
- Speaker A (configuration, device level)
  - A switch to turn on the speaker set A
- Speaker B (configuration, device level)
  - A switch to turn on the speaker set B
- Party Mode (configuration, device level)
  - Lets all zones play the same content like the main zone
- Bass Extension (configuration, zone level)
  - Extend the bass to more speakers (especially useful in configurations without a subwoofer)
- Extra Bass (configuration, zone level)
  - Seems to be the same as bass extension, but on other devices
- Enhancer (configuration, zone level)
  - Enhances compressed audio formats
- Pure Direct (configuration, zone level)
  - Lets the device play the audio directly without any additional processing
- Adaptive DRC (configuration, zone level)
  - Adjusts the volume of high and low frequency levels for better sound at low volume

## Troubleshooting

In this section known problems and their resolution are documented.

### Errors on handling UDP messages

The Yamaha MusicCast {% term integration %} is working with updates sent from the device to Home Assistant instead of pulling all information every few seconds. There is no error correction mechanism in these messages, so that only 100% correct messages can be processed. Whenever there is a corrupt message the Yamaha MusicCast integration will update all device information and log an error message like these:
- `Received invalid message: <message>`
- `Received non UTF-8 compliant message: b'<binary>'`

If you receive these errors frequently, you should first try to disconnect your MusicCast devices from the power, wait 30 seconds and reconnect them to the power. If this does not help, you can try to use a LAN cable instead of WiFi to connect the device to the network.
