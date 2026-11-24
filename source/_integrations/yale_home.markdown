---
title: Yale Home
description: Connect and control your Yale Home devices using the Yale integration
ha_release: 2024.9
ha_domain: yale_home
ha_integration_type: virtual
ha_supporting_domain: yale
ha_supporting_integration: Yale
ha_codeowners:
  - '@bdraco'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - event
  - lock
  - sensor
ha_iot_class: Cloud Push
ha_dhcp: true
---

{% include integrations/supported_brand.md %}
