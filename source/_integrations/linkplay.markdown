---
description: Connect and control your LinkPlay media players using the LinkPlay integration
ha_domain: linkplay
ha_release: 2024.8
---

The **LinkPlay** {% term integration %} for Home Assistant allows you to control various media players based on the LinkPlay protocol. The integration supports auto-discovery on your local network through [Zeroconf](/integrations/zeroconf).

{% include integrations/config_flow.md %}

## Features

### Media Player 

The media player entity offers robust controls and playback features from the media player integration and provides additionally:

- **Preset playback**: Play LinkPlay presets configured on the device using the action `linkplay.play_preset`. 
- **Multiroom**: Combine multiple LinkPlay devices in a multiroom. Use the actions `media_player.join` and `media_player.unjoin`. 

### Buttons

The button entities provide some additional LinkPlay features available on the device:

- **Time Sync**: Synchronize the device's internal clock with the current time in Home Assistant. 
- **Restart Device**: Reboot the device, allowing for convenient troubleshooting and maintenance.


{% include integrations/actions.md %}
