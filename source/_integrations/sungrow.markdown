---
title: Sungrow inverters
description: Instructions on how to integrate Sungrow inverters into Home Assistant.
ha_category:
  - Energy
ha_config_flow: true
ha_release: 0.96
ha_iot_class: Local Polling
ha_domain: sungrow
ha_platforms:
  - sensor
ha_codeowners:
  - '@wallento'
---

The `sungrow` integration fetches live energy consumption data from Sungrow inverters that are supported by [sungrow-websocket](https://pypi.org/project/sungrow-websocket/) (follow the link for a list of supported inverters).

A number of metrics are available as sensors for the Energy Management and other uses. It is 
possible to track power and total energy of PV, grid, home usage, and battery.

During configuration enter a hostname or IP address of the inverter in your local network.

{% include integrations/config_flow.md %}
