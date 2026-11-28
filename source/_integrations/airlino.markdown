---
title: AirLino
description: Instructions on how to integrate AirLino devices with Home Assistant.
ha_release: 2026.12
ha_iot_class: Local Polling
ha_zeroconf: true
ha_codeowners:
  - '@Philipp-E'
ha_domain: airlino
ha_integration_type: device
related:
  - url: https://www.lintech.de/
    title: LinTech GmbH
---

The **AirLino** {% term integration %} is used to integrate the devices of [LinTech GmbH](https://www.lintech.de/) in Home Assistant. LinTech is specialized in mobile and wireless communication via Bluetooth, Bluetooth Low Energy, Wi-Fi, NB-IoT, and other technologies and is a manufacturer of wireless components for audio and data communication.

## Supported devices

The following devices are known to be supported by the integration:

- AirLino&reg;
- AirLino&reg;plus
- AirLino&reg;max
- AirLino&reg;pro

## Unsupported devices

The following devices are not supported by the integration:

- AirLino devices with older API versions than v19 (Firmware version 5.0.4 or older)

## Prerequisites

No prerequisites required.
Supported devices are discovered automatically using [Zeroconf integration](/integrations/zeroconf) or manually by entering the ip-address or hostname of the device.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address or hostname of your AirLino device. For example, `192.168.1.100` or `AirLino-12AB.local`. You can find it in your router or in the AirLino App"
Port:
    description: "The device is accessed using its HTTP API. For this, the port needs to be specified. The default port is 8989"
{% endconfiguration_basic %}

## Configuration options

There are no specific configuration options needed for supported AirLino devices.

## Supported functionality

The **AirLino** integration provides the following entities.

### Media Player

- **Play/Pause**
- **Stop**
  - Since the device supports also `pause` there is no `Stop` button shown by Home Assistant. However, it can be triggered by a Button or Automation.
- **Volume Control**
  - The devices and the integration does not directly support a mute/unmute functionality
- **Play MP3 or Ogg/Vorbis stream**
  - Radio stations, TTS command (See limitation), or other streams
- **Next/Previous**
  - Plays the next item from the playlist (For example radio station)

AirLino entities support standard [media player triggers, conditions, and actions](/integrations/media_player/).

## AirLino automation examples

Media Players in Home Assistant can be also used in Automations as triggers and actions.

The following triggers can be used:

- Media player volume changed
- Media player crossed threshold
- Media player paused playing
- Media player started playing
- Media player stopped playing
- State changed (Transition from/to Unavailable can be used as workaround for turned on/off)

The following conditions are supported:

- Media player is muted
- Media player is not muted
- Media player is not playing (Consider Spotify connect state limitation)
- Media player is on
- Media player is paused
- Media player is playing
- Media player volume
- State

The following actions will work:

- Browse media (Consider TTS limitation)
- Next track
- Pause media
- Play media
- Play specific media (Consider TTS limitation)
- Play/Pause media
- Previous Track
- Set media player volume
- Stop media
- Turn down media player volume
- Turn up media player volume

Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Start playback every morning

- **Trigger**: Time when media player should start playing
- **Condition**: Optional condition if needed
- **Action**: Start playing last radio stream again

{% details "YAML example for start playing radio stream in the morning" %}

{% example %}
 automation: |
   alias: "Play radio stream in the morning"
   triggers:
     - trigger: time
       at: "07:30:00"
   actions:
     - action: media_player.media_play
       target:
         entity_id: media_player.living_room
{% endexample %}

{% enddetails %}

### Automation: Stop media if everyone leaves

- **Trigger**: Zone occupancy cleared
- **Condition**: Optional condition if needed
- **Action**: Stop media on players

{% details "YAML example for stopping media when everyone leaves" %}

{% example %}
 automation: |
   alias: "Leave Home"
   triggers:
     - trigger: zone.occupancy_cleared
       options:
         for: '00:00:00'
         zone: zone.home
   actions:
     - action: media_player.media_stop
       target:
         entity_id: media_player.living_room
     - action: media_player.media_stop
       target:
         entity_id: media_player.kitchen
     - action: media_player.media_stop
       target:
         entity_id: media_player.bathroom
{% endexample %}

{% enddetails %}

## Data updates

The **AirLino** integration {% term polling polls %} data from the device every 30 seconds by default.

## Known limitations

- The current version of the Integration supports the basic media player functionalities. TIDAL and Qobuz are currently not supported. Source selection is currently not supported
- Multiroom joining and unjoining is not yet supported
- AirLino devices still report themselves as idle when used through Spotify Connect or Bluetooth. As a workaround, check the state of the Spotify integration.
- When using the AirLino device for TTS output, the mp3 stream will run in repeat mode when not being stopped manually
- Starting Internet Radio from Home Assistant will be reported by the AirLino device as source `other`
- Image URL of the current Radio stations are not provided by the device
- The AirLino devices do not provide a unique ID, so the MAC address of the currently used interface is used to identify the device. Therefore, when connecting through a different interface (For example using WIFI instead of Ethernet) it will be detected as a new device.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

## Disclaimer

This integration is a third-party community project and is not affiliated with LinTech GmbH.
