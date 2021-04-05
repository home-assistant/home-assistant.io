---
title: Goal Zero Yeti
description: Instructions on how to integrate Goal Zero Yeti with Home Assistant
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_release: 0.116
ha_config_flow: true
ha_domain: goalzero
ha_platforms:
  - binary_sensor
  - switch
ha_codeowners:
  - '@tkdrob'
---

This `goalzero` integration pulls data from a Wifi enabled Goal Zero Yeti.

{% include integrations/config_flow.md %}

## Integration Entities

Each added configuration entry will create the following binary sensors:

- **Backlight**: Indicates if the backlight is currently on.
- **App Online**: Indicates if the mobile app is actively being used.
- **Charging**: Shows when the battery is currently charging.
- **Input Detected**: Shows when the device detects power input.

The following switches will also be created:

- **12V Port Status**: Indicates if the 12V power port is currently on.
- **USB Port Status**: Indicates if the USB power port is currently on.
- **AC Port Status**: Indicates if the AC power port is currently on.
