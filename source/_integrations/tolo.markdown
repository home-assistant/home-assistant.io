---
title: TOLO Sauna
description: Control your TOLO Sauna and TOLO Steam Bath with Home Assistant.
ha_release: '2021.12'
ha_category:
  - Climate
  - Health
  - Light
ha_domain: tolo
ha_config_flow: true
ha_codeowners:
  - '@MatthiasLohr'
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - button
  - climate
  - fan
  - light
  - number
  - select
  - sensor
ha_dhcp: true
ha_integration_type: integration
---

The TOLO Sauna integration allows you to control your [TOLO Sauna and TOLO Steam Bath](https://www.tolosauna.com/) with Home Assistant.

The integration allows for:

- Turning the sauna on and off
- Setting the target temperature and target humidity
- Controlling the fan (used for drying and cooling down the sauna)
- Controlling the sauna lights (on/off, mode selection)
- Configuring timers for automatic power shutdown, automatic fan shutdown and salt spray activation interval
- Checking diagnostic information (water level, tank temperature, water in/out valves)

{% include integrations/config_flow.md %}
