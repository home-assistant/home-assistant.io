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
  - sensor
  - switch
ha_codeowners:
  - '@tkdrob'
---

This `goalzero` integration pulls data from a Wi-fi enabled Goal Zero Yeti.

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

The following sensors will also be created:

- **Watts In**: Shows the watt input.
- **Amps In**: Shows the ampere input. (disabled by default)
- **Watts Out**: Shows the watt output.
- **Amps Out**: Shows the ampere output. (disabled by default)
- **WH Out**: Shows the watt-hour output. (disabled by default)
- **WH Stored**: Shows the current watt-hours stored.
- **Volts**: Shows the voltage of the battery. (disabled by default)
- **State of Charge Percent**: Shows the current battery charge percentage.
- **Temperature**: Shows the battery temperature.
- **Time to Empty/Full**: Shows the time left in minutes to empty or full depending on current usage. Shows -1 when there is no battery activity.
- **Wi-fi Strength**: Shows the Wi-fi strength the device has with the connected access point.
- **Up Time**: The time in seconds since the last reboot. (disabled by default)
