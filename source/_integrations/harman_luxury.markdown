---
title: Harman Luxury Audio
description: Instructions on how to integrate Harman Luxury Audio streamers into Home Assistant.
ha_category:
  - Media player
ha_release: 2026.8
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@sbesh91'
ha_domain: harman_luxury
ha_platforms:
  - media_player
ha_integration_type: device
ha_quality_scale: bronze
ha_ssdp: true
---

The **Harman Luxury Audio** {% term integration %} lets you control network streamers built on the Harman Luxury Audio (StreamUnlimited StreamSDK) platform, such as the Arcam Radia **ST5** and **ST60**, and equivalent JBL and Mark Levinson streamers.

It talks to the device directly on your local network; no cloud account is required.

{% include integrations/config_flow.md %}

Devices are discovered automatically over SSDP. You can also add one manually by entering its hostname or IP address.

{% configuration_basic %}
Host:
  description: The hostname or IP address of the streamer on your network.
{% endconfiguration_basic %}

## Supported devices

The following devices are known to work:

- Arcam Radia ST5
- Arcam Radia ST60

Other streamers on the same Harman Luxury Audio / StreamUnlimited platform (including JBL and Mark Levinson models) are expected to work but have not all been verified.

## Supported functionality

A media player entity is created for the device, exposing:

- Playback state (playing, paused, idle) and standby status
- Now playing information: title, artist, album, artwork, duration, and position
- Volume level and mute
- Transport controls (play, pause, stop, next, previous)

## Known limitations

- Power cannot be controlled from Home Assistant. The device only reports its power state; it is switched on and off by its own remote, front panel, or automatic standby. The media player reports `off` when the device is in standby but does not offer power on/off.
- Transport control depends on the active source. Spotify Connect and AirPlay are controlled by the sending app: the device can pause them, but only the source app can resume. Because of this, transport buttons are shown only when the current source reports them as available. For those sources, use the originating app to start or resume playback.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
