---
title: Freedompro
description: Instructions for how to integrate SwitchBee accessories within Home Assistant.
ha_category:
  - Cover
  - Light
  - Switch
ha_release: 2021.7
ha_iot_class: local Polling
ha_config_flow: true
ha_codeowners:
  - '@jafar-atili'
ha_domain: switchbee
ha_platforms:
  - cover
  - light
  - switch
ha_integration_type: integration
---

[SwitchBee](https://www.switchbee.com), is an innovation company making smart homes more accessible and affordable to any household environment. 

Its unique solutions are patented technology, leading the smart home growing demand.

There is currently support for the following device types within Home Assistant:

- Light
- Switch
- Shutter
- Outlet

Supported devices will be discovered after the `SwitchBee` integration is configured

## Preliminary Steps

You will need to provide the following parameters in order to set up the `SwitchBee` integration:

- Central Unit IP
- Username
- Password


{% include integrations/config_flow.md %}
