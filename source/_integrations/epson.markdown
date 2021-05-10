---
title: Epson
description: Instructions on how to integrate Epson projector into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.72
ha_iot_class: Local Polling
ha_domain: epson
ha_codeowners:
  - "@pszafer"
ha_config_flow: true
ha_platforms:
  - media_player
---

The `epson` platform allows you to control a Epson projector from Home Assistant.
**Device has to be turned on during initial configuration.**
When you want to add device turn it on for first time before following integration steps.

{% include integrations/config_flow.md %}

### Supported features

- turn on/off
- set input
- set/get color mode
- increase/decrease volume
- mute/unmute audio
- send next/previous track

### Supported devices

- Epson projectors supporting ESC/VP21 protocol.

### Tested devices

- Epson EH-TW5350
- Epson EH-TW7000

To make this module work you need to connect your projector to your LAN.
The best is to use iProjection app by Epson to test if it is working.
