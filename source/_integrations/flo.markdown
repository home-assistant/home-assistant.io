---
title: Flo
description: Instructions on how to integrate Flo by Moen into Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Switch
ha_config_flow: true
ha_codeowners:
  - '@dmulcahey'
ha_domain: flo
ha_iot_class: Cloud Polling
ha_release: 0.115
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
---

The `flo` integration integrates
[Flo by Moen smart water shutoff valves](https://www.moen.com/flo) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- **Binary sensor**: reports whether or not there are any alerts.
- **Sensor**: reports on the device's system mode, water flow rate, temperature, water pressure, and daily water consumption.
- **Switch**: allows the user to open and close the valve on the water shutoff device.

{% include integrations/config_flow.md %}

## Actions

### `flo.run_health_test`

Run a health test for the Flo device.

### `flo.set_away_mode`

Set the Flo device to away mode.

### `flo.set_home_mode`

Set the Flo device to home mode.

### `flo.set_sleep_mode`

Set the Flo device to sleep mode.
