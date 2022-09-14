---
title: Dacia
description: Connect and control your Dacia devices using the Renault integration
ha_category:
  - Binary Sensor
  - Car
  - Presence Detection
  - Select
  - Sensor
ha_domain: dacia
ha_codeowners:
  - '@epenet'
ha_integration_type: integration
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - select
  - sensor
ha_iot_class: Cloud Polling
ha_supporting_domain: renault
ha_supporting_integration: Renault
ha_release: 2021.8
---

{% include integrations/supported_brand.md %}
