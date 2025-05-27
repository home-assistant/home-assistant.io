---
title: Swing2Sleep Smarla
description: Instructions on connecting Swing2Sleep Smarla to Home Assistant.
ha_category:
  - Number
  - Sensor
  - Switch
ha_iot_class: Cloud Push
ha_release: 2025.6
ha_codeowners:
  - '@explicatis'
  - '@rlint-explicatis'
ha_domain: smarla
ha_integration_type: device
ha_config_flow: true
ha_platforms:
  - number
  - sensor
  - switch
ha_quality_scale: bronze
---

The `smarla` {% term integration %} enables Home Assistant to integrate [Swing2Sleep](https://swing2sleep.de) (Smarla) motorized cradles. This integration will allow you to control your Smarla device.

## Requirements

- Swing2Sleep Smarla device with Version 1.6.X or later.
- Swing2Sleep app.
- Internet connectivity.

## Registration

1. Follow the instructions in the Swing2Sleep app.
2. Connect the device to your Wi-Fi network.
3. Follow the steps for **Configuration** until the access token field appears
4. In the Swing2Sleep app, generate an access token under **Settings**.
5. Copy the access token and continue with the **Configuration**.

{% include integrations/config_flow.md %}

## Entities

This component will set up the following entities:

| Entity         | Platform | Description                                                 |
| -------------- | -------- | ----------------------------------------------------------- |
| `swing_active` | `switch` | Turns the cradle’s oscillation on or off.                   |
| `smart_mode`   | `switch` | Enables or disables automatic intensity control.            |
| `intensity`    | `number` | Sets the intensity level (range: `0` to `100`).             |
| `amplitude`    | `sensor` | Displays the current measured amplitude of the oscillation. |
| `period`       | `sensor` | Displays the current measured period of the oscillation.    |
| `activity`     | `sensor` | Displays the current measured activity level.               |
| `swing_count`  | `sensor` | Displays the total number of swings.                        |

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the Swing2Sleep app and remove the "Home Assistant" entry under **Settings** -> **Connected devices** as well.
