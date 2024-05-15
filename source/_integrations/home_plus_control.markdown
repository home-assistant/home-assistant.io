---
title: Legrand Home+ Control
description: Connect and control your Legrand Home+ Control devices using the Netatmo integration
ha_category:
  - Binary sensor
  - Camera
  - Climate
  - Cover
  - Environment
  - Fan
  - Hub
  - Light
  - Media source
  - Sensor
  - Switch
  - Weather
ha_release: '0.20'
ha_domain: home_plus_control
ha_integration_type: virtual
ha_supporting_domain: netatmo
ha_supporting_integration: Netatmo
ha_codeowners:
  - '@cgtobi'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - camera
  - climate
  - cover
  - diagnostics
  - fan
  - light
  - select
  - sensor
  - switch
ha_iot_class: Cloud Polling
ha_homekit: true
---

{% include integrations/supported_brand.md %}
