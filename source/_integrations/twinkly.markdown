---
title: Twinkly
description: Instructions on how to integrate Twinkly LED string to Home Assistant.
ha_category:
  - Light
ha_release: 2020.12
ha_config_flow: true
ha_domain: twinkly
ha_iot_class: Local Polling
ha_codeowners:
  - '@dr1rrb'
  - '@Robbie1221'
  - '@Olen'
ha_platforms:
  - diagnostics
  - light
  - select
ha_dhcp: true
ha_integration_type: integration
---

The Twinkly integration allows you to control [Twinkly](https://twinkly.com/) LED string from Home Assistant.

This integration can be used to:
- Turn your Twinklys on and off
- Adjust brightness
- Control static colors and effects
- Switch between operation modes (see explanation below)

Music mode is currently not supported.

## Effects

For devices with software version > 2.7.1, you can also control the effects on your Twinklys.

The Twinkly devices do not initially have any effects stored locally. Effects must be added from the Twinkly application before they become visible in Home Assistant.

Make sure the latest firmware is installed on your Twinkly devices and add effects by _apply_-ing them from the Twinkly app.

## Operation Modes

Modes can be switched using the select entity. 

For most use cases, "Color", "Movie" and "Playlist" modes are the most relevant.

**Color Mode**
- Displays a static color
- Controlled through the light entity
- Color can be set via RGB/RGBW

**Movie Mode**
- Plays effects previously uploaded through the Twinkly app
- Effects must be created and transferred to the device first using the app
- Effect selection is done through the light entity

**Playlist Mode**
- Sequential playback of multiple effects
- Playlist must be uploaded through the Twinkly app first

**Off Mode**
- Turns off the lighting

**Demo Mode**
- Shows predefined demo effects
- Primarily intended for presentation purposes
- Limited practical use

**Unsupported Modes:**
- Effect Mode: predefined effects built into the device. Alternatively, you can use Movie Mode
- RT (Real-Time): Live control of individual LEDs
- Music: Music-controlled light show

{% include integrations/config_flow.md %}

_If configured using an IP address, on your router / DHCP, you should assign a static IP to your Twinkly device._
