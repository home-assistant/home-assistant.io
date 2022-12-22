---
title: Klyqa
description: Instructions on integrating Klyqa with Home Assistant.
ha_category:
  - Light
  - Vacuum
ha_release: 2022.12
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@fraizy22'
ha_domain: klyqa
ha_homekit: true
ha_platforms:
  - light
ha_integration_type: integration
---

The Klyqa integration will allow users to integrate with their Klyqa account their Klyqa smart devices.

Please visit the [Klyqa website](https://www.klyqa.de/) for further information about Klyqa devices.

Devices, Rooms and Device Groups of the user will be imported.

{% include integrations/config_flow.md %}

There is currently support for the following device types within Home Assistant:

- **Light**: Dim the brightness of the lights, set scenes, set colors, set temperature and turn the lights on and off.
- **Vacuum**: Start, stop or pause the vacuum cleaner, set the beeping for locating the cleaner, set the fan speed, return the cleaner to the dock.
