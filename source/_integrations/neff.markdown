---
title: Neff
description: Connect and control your Neff devices using the Home Connect integration
ha_category:
  - Binary sensor
  - Button
  - Hub
  - Light
  - Number
  - Select
  - Sensor
  - Switch
ha_release: '0.110'
ha_domain: neff
ha_integration_type: virtual
ha_supporting_domain: home_connect
ha_supporting_integration: Home Connect
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
  - time
ha_iot_class: Cloud Push
ha_dhcp: true
ha_zeroconf: true
---

{% include integrations/supported_brand.md %}
