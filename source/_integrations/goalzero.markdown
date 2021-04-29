---
title: Goal Zero Yeti
description: Instructions on how to integrate Goal Zero Yeti with Home Assistant
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_release: 0.116
ha_config_flow: true
ha_domain: goalzero
ha_codeowners:
  - '@tkdrob'
ha_platforms:
  - binary_sensor
---

This `goalzero` integration pulls data from a Wifi enabled Goal Zero Yeti. For more information, visit https://www.goalzero.com

{% include integrations/config_flow.md %}

## Integration Entities

Each added configuration entry will create the following sensors:

`v12PortStatus`, `usbPortStatus`, `acPortStatus`, `backlight`, `app_online`, `isCharging`
