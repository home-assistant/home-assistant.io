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
ha_platforms:
  - light
ha_dhcp: true
ha_integration_type: integration
---

The Twinkly integration allows you to control [Twinkly](https://twinkly.com/) LED string from Home Assistant.

The Twinkly devices does not store the effects locally, they are instead re-sent from the Twinkly application each time.
This means that this integration does not support to change the LED string effect.
It only supports to configure the brightness and to turn the device on and off.

{% include integrations/config_flow.md %}

_If configured using an IP address, on your router / DHCP, you should assign a static IP to your Twinkly device._
