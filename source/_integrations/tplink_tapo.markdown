---
title: Tapo
description: Connect and control your Tapo devices using the TP-Link Smart Home integration
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Fan
  - Hub
  - Light
  - Number
  - Select
  - Sensor
  - Switch
ha_domain: tplink_tapo
ha_release: 0.89
ha_integration_type: virtual
ha_supporting_domain: tplink
ha_supporting_integration: TP-Link Smart Home
ha_codeowners:
  - '@rytilahti'
  - '@bdraco'
  - '@sdb9696'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - fan
  - light
  - number
  - select
  - sensor
  - switch
ha_iot_class: Local Polling
ha_dhcp: true
---

{% include integrations/supported_brand.md %}
