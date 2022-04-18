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

[SwitchBee](https://www.switchbee.com) is an innovation company making smart homes more accessible and affordable to any household environment.

The SwitchBee integration allows you to control [SwitchBee](https://www.switchbee.com) devices.

Its unique solutions are patented technology, leading the smart home growing demand.

There is currently support for the following device types within Home Assistant:

- Light
- Switch
- Shutter
- Outlet

Supported devices will be discovered after the `SwitchBee` integration is configured

## Prerequisites

In order to set up this integration, you need to get the following parameters:

- Central Unit IP
- Username
- Password (`Getting the SwitchBee API password` below)

### Note

 The Central Unit version must be on 1.4.3(0) for the APIs to be exposed, you can contact [SwitchBee](https://www.switchbee.com) to get this version.

## Getting the SwitchBee API password

 You are also required required to set API user password in the SwitchBee app from your smartphone (iPhone users must install SwitchBee Next Gen app).

  1. Open the SwitchBee app on your smartphone
  2. Open the Menu from top left corner
  3. Click on Users and choose the API user
  4. Under the `User Info` tab, click `Edit` and set the desired password

{% include integrations/config_flow.md %}
