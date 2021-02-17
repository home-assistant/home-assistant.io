---
title: Huisbaasje
description: Instructions on how to integrate Huisbaasje with Home Assistant.
ha_category:
  - Sensor
  - Energy
ha_release: 2021.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@denniss17'
ha_domain: huisbaasje
ha_platforms:
  - sensor
---

The Huisbaasje integrations allows you to track your energy consumption collected
by the monitoring device installed on your energy meters.

{% include integrations/config_flow.md %}
## Sensors

This integration provides the following sensors:

- Current power usage
- Current power consumption from the grid, for both normal and off-peak time periods.
- Current power return to the grid, for both normal and off-peak time periods.
- Total energy used today
- Current gas usage
- Total gas used today
