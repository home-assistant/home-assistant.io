---
title: LibreSync
description: Instructions on how to integrate audio hubs built on the Libre Wireless LibreSync platform, such as the Platin Stereo Hub, into Home Assistant.
ha_category:
  - Media player
ha_domain: libresync
ha_ssdp: true
ha_integration_type: device
ha_release: 2026.11
ha_codeowners:
  - '@drsound'
ha_config_flow: true
ha_platforms:
  - media_player
ha_iot_class: Local Push
ha_quality_scale: bronze
---

The **LibreSync** {% term integration %} lets you control audio hubs built on the Libre Wireless LibreSync platform over your local network, such as the Platin Stereo Hub. It needs no cloud account, and the vendor's app only for the hub's initial setup.

## Use cases

- Show what the hub is playing, and from which source, on a dashboard.
- Switch the hub to the TV input when the TV turns on.
- Lower the volume in the evening from an automation.
- Pause playback when a call comes in.

## Supported devices

The integration has been tested with:

- Platin Stereo Hub, firmware 1.52

The same hardware and software is sold under other brands, and is expected to work, but has not been tested: System Audio Stereo Hub, Buchardt Audio Stereo Hub, Econik Stereo Hub, and Triangle Compact Stereo Hub.

The Platin Stereo Hub HT (New Generation, model PTX3) uses a different chipset and has not been tested.

## Prerequisites

- The hub must be connected to the same network as Home Assistant, and set up in the vendor's app.
- Home Assistant must be able to reach the hub on TCP ports 50006 and 7777.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of the hub, for example `192.168.1.50`. You can find it in your router's list of connected devices.
{% endconfiguration_basic %}

## Supported functionality

### Media player

The hub is represented by a media player entity, which provides:

- Playback state, including whether sound is coming out of a physical input.
- Source selection, from the list of inputs the hub reports.
- Volume control.
- Play, pause, stop, next track, and previous track, for content streamed to the hub.
- The title, artist, album, artwork, duration, and position of the current track.

## Data updates

The hub pushes changes to volume, source, playback state, and track information as they happen, so Home Assistant usually reflects them within a second. The integration also contacts the hub every 30 seconds, which is how it notices a hub that has lost power.

## Known limitations

- **No on/off control.** The hub's power button does not switch it off in the usual sense. It stops playback, and the hub switches itself back on as soon as something starts playing. The media player therefore has no on/off control.
- **No mute control.** The hub has no mute command that works over the network. If the hub is muted with its remote or the vendor's app, Home Assistant shows it as muted.
- Seeking, media browsing, speaker grouping, and multiroom are not supported.
- EQ, room correction, and EQ presets are not supported.

## Troubleshooting

### The hub cannot be added

If setup reports that the hub does not identify itself, unplug the hub from the mains, plug it back in, wait a minute, and try again. A hub identifies itself by its factory serial number or, if it has none, through a network service that occasionally stops on its own.

### The hub is unavailable

Check that the hub is powered and connected to the network, and that nothing blocks TCP ports 50006 and 7777 between Home Assistant and the hub. The integration reconnects by itself when the hub comes back.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
