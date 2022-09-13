---
title: SwitchBee
description: Instructions for how to integrate SwitchBee accessories within Home Assistant.
ha_category:
  - Switch
ha_release: 2022.10
ha_iot_class: local Polling
ha_config_flow: true
ha_codeowners:
  - '@jafar-atili'
ha_domain: switchbee
ha_platforms:
  - switch
ha_integration_type: integration
---

[SwitchBee](https://www.switchbee.com), is an innovation company making smart homes more accessible and affordable to any household environment. 

There is currently support for the following device types within Home Assistant:

- Switch 
- Timed Power Switch (Boiler)
- Group Switch
- Timed Switch

Supported devices will be discovered after the `SwitchBee` integration is configured

## Prerequisites

You will need to provide the following parameters in order to set up the SwitchBee integration:

- Central Unit IP
- Username (e-mail)
- Password


{% include integrations/config_flow.md %}
