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
ha_dhcp: true
ha_integration_type: integration
---

The Twinkly integration allows you to control [Twinkly](https://twinkly.com/) LED string from Home Assistant.

You may need to program at least one [effect](#effects) into your device before you can control it at all using this integration.

## Effects

For devices with software version > 2.7.1, you can also control the effects on your Twinklys.

The Twinkly devices do not initially have any effects stored locally. Effects must be added from the Twinkly application before they become visible in Home Assistant.

Make sure the latest firmware is installed on your Twinkly devices and add effects by _apply_-ing them from the Twinkly app.
This integration can then be used to switch between static colors and effects, and to turn your Twinklys on and off.  

Playlists and Music modes are currently not supported.

{% include integrations/config_flow.md %}

_If configured using an IP address, on your router / DHCP, you should assign a static IP to your Twinkly device._
