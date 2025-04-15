---
title: Swing2Sleep Smarla
description: Instructions on how to connect Swing2Sleep Smarla to Home Assistant.
ha_category:
  - Hub
  - Sensor
  - Switch
  - Number
ha_iot_class: Cloud Push
featured: true
ha_release: '2025.5.0'
ha_codeowners:
  - '@explicatis'
  - '@rlint-explicatis'
ha_domain: smarla
ha_integration_type: device
ha_platforms:
  - number
  - sensor
  - switch
---

The `smarla` {% term integration %} is the main integration to integrate [Swing2Sleep](https://swing2sleep.de) (Smarla) motorized cradles. This integration will allow you to control your Smarla device.

{% include integrations/config_flow.md %}

## Requirements

- Swing2Sleep Smarla device with Version 1.6.X or greater.
- Swing2Sleep App.
- Internet connectivity.

## Registration

1. Follow the instructions in the Swing2Sleep App.
2. Connect the device with your Wi-Fi.
3. Generate an access token for Home Assistant in the settings.
4. Copy the access token.
5. In the Home Assistant UI, go to **Configuration** -> **Integrations**, click the "+" button, and search for "Swing2Sleep Smarla".
6. Paste the access token into the text box.

## Entities

This component will set up the following platforms:

| Entity         | Platform          | Description                           |
| -------------- | ----------------- | ------------------------------------- |
| `intensity`    | `number`          | Control the intensity from `0` to `100`.   |
| `amplitude`    | `sensor`          | Shows the current measured amplitude of the oscillation.   |
| `period`       | `sensor`          | Shows the current measured period of the oscillation.   |
| `activity`     | `sensor`          | Shows the current measured activity.   |
| `swing_count`  | `sensor`          | Shows the total swing count.   |
| `cradle`       | `switch`          | Turn `On` or `Off` the oscillation of the cradle. |
| `smartmode`    | `switch`          | Turn `On` or `Off` automatic control of the intensity. |
