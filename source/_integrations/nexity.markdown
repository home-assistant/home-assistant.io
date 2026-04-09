---
title: Nexity Eugénie
description: Connect and control your Nexity Eugénie devices using the Overkiz integration
ha_category:
  - Alarm
  - Binary sensor
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
  - Water heater
ha_domain: nexity
ha_integration_type: virtual
ha_supporting_domain: overkiz
ha_supporting_integration: Overkiz
ha_release: 2022.2
ha_codeowners:
  - '@imicknl'
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
  - water_heater
ha_iot_class: Local Polling
ha_dhcp: true
ha_zeroconf: true
---

{% include integrations/supported_brand.md %}
