---
title: Pitsos
description: Connect and control your Pitsos appliances using the Home Connect integration
ha_category:
  - Binary sensor
  - Button
  - Hub
  - Light
  - Number
  - Select
  - Sensor
  - Switch
ha_iot_class: Cloud Push
ha_release: '2025.4'
ha_domain: pitsos
ha_codeowners:
  - '@DavidMStraub'
  - '@Diegorro98'
  - '@MartinHjelmare'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
ha_integration_type: virtual
ha_supporting_domain: home_connect
ha_supporting_integration: Home Connect
---

{% include integrations/supported_brand.md %}
