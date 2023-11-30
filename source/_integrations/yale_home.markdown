---
title: Yale Home
description: Connect and control your Yale Home devices using the August integration
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Doorbell
  - Lock
  - Sensor
ha_release: 0.64
ha_domain: yale_home
ha_integration_type: virtual
ha_supporting_domain: august
ha_supporting_integration: August
ha_codeowners:
  - '@bdraco'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - lock
  - sensor
ha_iot_class: Cloud Push
ha_dhcp: true
---

{% include integrations/supported_brand.md %}
