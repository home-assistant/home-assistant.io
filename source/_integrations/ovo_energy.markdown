---
title: OVO Energy
description: Instructions on how to integrate OVO Energy with Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.111
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@timmo001"
ha_domain: ovo_energy
---

The `ovo_energy` integration allows you to monitor your energy consumption data
in Home Assistant.

## Configuration

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **OVO Energy**.
After completing the configuration flow, the OVO Energy integration will be
available.

## Sensors

This integration provides a few sensors for OVO Energy:

- Last Electricity Reading - Last meter reading consumption in kWh.
- Last Gas Reading - Last meter reading consumption in kWh.
- Last Electricity Cost - Last meter reading electricity cost.
- Last Gas Cost - Last meter reading gas cost.
