---
title: MINI Connected
description: Get the status and control your MINI vehicle, using the BMW Connected Drive integration
ha_category:
  - Binary sensor
  - Button
  - Car
  - Lock
  - Notifications
  - Number
  - Presence detection
  - Select
  - Sensor
  - Switch
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_integration_type: virtual
ha_supporting_domain: bmw_connected_drive
ha_supporting_integration: BMW Connected Drive
ha_codeowners:
  - '@gerard33'
  - '@rikroe'
ha_domain: mini_connected
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - lock
  - notify
  - number
  - select
  - sensor
  - switch
---

{% include integrations/supported_brand.md %}
