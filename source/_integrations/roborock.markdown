---
title: Roborock
description: Connect and control your Roborock devices using the Xiaomi Miio integration
ha_category:
  - Alarm
  - Fan
  - Health
  - Hub
  - Light
  - Presence Detection
  - Remote
  - Vacuum
ha_domain: roborock
ha_integration_type: virtual
ha_supporting_domain: xiaomi_miio
ha_supporting_integration: Xiaomi Miio
ha_release: 0.51
ha_codeowners:
  - '@rytilahti'
  - '@syssi'
  - '@starkillerOG'
ha_config_flow: true
ha_platforms:
  - air_quality
  - alarm_control_panel
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - fan
  - humidifier
  - light
  - number
  - remote
  - select
  - sensor
  - switch
  - vacuum
ha_iot_class: Local Polling
ha_zeroconf: true
---

{% include integrations/supported_brand.md %}
