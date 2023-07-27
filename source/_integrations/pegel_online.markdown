---
title: PEGELONLINE
description: Instructions on how to integrate Radarr sensors with Home Assistant
ha_category:
  - Environment
  - Sensor
ha_release: 2023.8
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: 'pegel_online'
ha_platforms:
  - sensor
ha_codeowners:
  - '@mib1185'
ha_integration_type: service
---

This integration uses the data from the German Federal Waterways and Shipping Administration (_Wasserstraßen- und Schifffahrtsverwaltung des Bundes_) [PEGELONLINE](https://www.pegelonline.wsv.de/) to provide water level sensors.

{% include integrations/config_flow.md %}
