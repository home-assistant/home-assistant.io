---
title: Anglian Water
description: Instructions on how to integrate Anglian Water smart meters with Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.8.0
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@pantherale0'
ha_domain: anglian_water
ha_platforms:
  - sensor
ha_integration_type: service
---

The `anglian_water` integration allows you to monitor your water consumption data
in Home Assistant.

This integration only supports Anglian Water in the UK.

{% include integrations/config_flow.md %}

## Sensors

This integration provides a single sensor to track the water consumption:

- Previous Consumption - A sensor that displays the latest water consumption available on your account.
