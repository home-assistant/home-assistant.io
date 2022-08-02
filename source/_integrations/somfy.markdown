---
title: Somfy
description: Connect and control your Somfy devices using the Overkiz integration
ha_category:
  - Alarm Control Panel
  - Binary Sensor
  - Button
  - Climate
  - Cover
  - Hub
  - Light
  - Lock
  - Number
  - Scene
  - Select
  - Sensor
  - Siren
  - Switch
ha_domain: somfy
ha_codeowners:
  - '@imicknl'
  - '@vlebourl'
  - '@tetienne'
ha_integration_type: integration
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - light
  - lock
  - number
  - scene
  - select
  - sensor
  - siren
  - switch
ha_iot_class: Cloud Polling
ha_zeroconf: true
ha_dhcp: true
ha_supporting_domain: overkiz
ha_supporting_integration: Overkiz
ha_release: 2022.2
---

{% include integrations/supported_brand.md %}
