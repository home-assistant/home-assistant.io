---
title: TOLO Sauna
description: Control your TOLO Sauna and TOLO Steam Bath with Home Assistant.
ha_release: "2021.12"
ha_category:
  - Climate
ha_domain: tolo
ha_config_flow: true
ha_codeowners:
  - '@MatthiasLohr'
ha_iot_class: "Local Polling"
ha_platforms:
  - climate
  - light
  - sensor
ha_dhcp: true
---

The TOLO Sauna integration allows you to control your [TOLO Sauna and TOLO Steam Bath](https://www.tolosauna.com/) with Home Assistant.

The integration allows for:

- Turning the sauna on and off
- Setting the target temperature and target humidity
- Controlling the fan (used for drying and cooling down the sauna)
- Controlling the sauna lights
- Checking diagnostic information (water level, tank temperature)

{% include integrations/config_flow.md %}
