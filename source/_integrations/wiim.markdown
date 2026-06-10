---
title: WiiM
description: Instructions on how to integrate WiiM devices into Home Assistant.
ha_category:
  - Media player
ha_domain: wiim
ha_zeroconf: true
ha_integration_type: hub
ha_release: 2026.4
ha_codeowners:
  - '@Linkplay2020'
ha_config_flow: true
ha_platforms:
  - media_player
ha_iot_class: Local Push
ha_quality_scale: bronze
---

The **WiiM** {% term integration %} allows you to control different [WiiM](https://www.wiimhome.com) devices from Home Assistant.

{% include integrations/config_flow.md %}

## Supported functionality

### Media Player

The media player entity gives you complete control over your WiiM device from Home Assistant. In addition to standard playback functionality, it offers:

- Playback controls: Control playback state, skip tracks, adjust volume, seek, select sound modes, and set repeat or shuffle modes directly from the Home Assistant UI or automations.

- **Multiroom Audio**: Seamlessly group multiple WiiM devices to create synchronized multiroom playback. Use the standard Home Assistant services: `media_player.join` and `media_player.unjoin`.

- **Media Browsing**: Browse presets, playlists, and the device’s current playback queue, enabling dynamic selection of media from the Home Assistant interface.

### Buttons

The button entities provide some additional WiiM features available on the device:

- **Time Sync**: Synchronizes the device’s internal clock with the current time on your Home Assistant server, ensuring features like scheduled playback or time-based automations remain accurate.
- **Restart Device**: Reboots the device remotely, providing a quick way to recover from connectivity issues or apply configuration changes without physical interaction.

## Actions

The WiiM integration makes various custom actions available in addition to the [standard media player actions](/integrations/media_player/#actions).


## Removing the integration

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}
