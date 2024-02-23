---
title: OVO Energy
description: Instructions on how to integrate OVO Energy with Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: ovo_energy
ha_platforms:
  - sensor
ha_integration_type: service
---

The `ovo_energy` integration allows you to monitor your energy consumption data
in Home Assistant.

Currently, this integration only supports OVO Energy in the UK.

{% include integrations/config_flow.md %}

## Sensors

This integration provides a few sensors for OVO Energy:

- Last Electricity Reading - Last meter reading consumption in kWh.
- Last Gas Reading - Last meter reading consumption in kWh.
- Last Electricity Cost - Last meter reading electricity cost.
- Last Gas Cost - Last meter reading gas cost.
