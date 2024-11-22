---
title: PEGELONLINE
description: Instructions on how to integrate PEGELONLINE measurements into Home Assistant.
ha_category:
  - Environment
  - Sensor
ha_release: 2023.8
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: pegel_online
ha_platforms:
  - diagnostics
  - sensor
ha_codeowners:
  - '@mib1185'
ha_integration_type: service
---

This integration uses the data from the German Federal Waterways and Shipping Administration (_Wasserstraßen- und Schifffahrtsverwaltung des Bundes_) [PEGELONLINE](https://www.pegelonline.wsv.de/) to provide different [sensors](#sensors), based on the available data of the selected measurement station.

{% include integrations/config_flow.md %}

## Sensors

Currently, the integration supports the following sensors:

| Sensor name | Common unit of measurement |
| --- | --- |
| Air temperature | °C |
| Clearance height (_only for bridges_) | cm |
| Oxygen level | mg/l |
| pH | `None` |
| Water flow speed | m/s |
| Water level | cm |
| Water temperature | °C |
| Water volume flow | m³/s |
