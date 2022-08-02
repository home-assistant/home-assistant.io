---
title: Luxaflex
description: Connect and control your Luxaflex devices using the Hunter Douglas PowerView integration
ha_category:
  - Button
  - Cover
  - Scene
  - Sensor
ha_domain: luxaflex
ha_codeowners:
  - '@bdraco'
  - '@kingy444'
  - '@trullock'
ha_integration_type: integration
ha_config_flow: true
ha_platforms:
  - button
  - cover
  - diagnostics
  - scene
  - sensor
ha_iot_class: Local Polling
ha_zeroconf: true
ha_homekit: true
ha_dhcp: true
ha_supporting_domain: hunterdouglas_powerview
ha_supporting_integration: Hunter Douglas PowerView
ha_release: 0.15
---

{% include integrations/supported_brand.md %}
