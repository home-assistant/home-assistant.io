---
title: SwitchBee
description: Instructions for how to integrate SwitchBee accessories within Home Assistant.
ha_category:
  - Switch
ha_release: 2021.7
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

Its unique solutions are patented technology, leading the smart home growing demand.

There is currently support for the following device types within Home Assistant:

- Switch 
- Timed Power Switch (Boiler)
- Group Switch
- Timed Switch

Supported devices will be discovered after the `SwitchBee` integration is configured

## Preliminary Steps

You will need to provide the following parameters in order to set up the `SwitchBee` integration:

- Central Unit IP
- Username
- Password
- Initialize switches as light entities (False by default)


## SwitchBee Options

- `Polling interval in seconds`: Increase/Decrease the update interval for the device.

- `Devices to include`: Select the devices (by type) you wish to control from Home Assistant.


{% include integrations/config_flow.md %}