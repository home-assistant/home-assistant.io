---
title: Luxaflex
description: Connect and control your Luxaflex devices using the Hunter Douglas PowerView integration
ha_category:
  - Button
  - Cover
  - Number
  - Scene
  - Select
  - Sensor
ha_domain: luxaflex
ha_integration_type: virtual
ha_supporting_domain: hunterdouglas_powerview
ha_supporting_integration: Hunter Douglas PowerView
ha_release: 0.15
ha_codeowners:
  - '@bdraco'
  - '@kingy444'
  - '@trullock'
ha_config_flow: true
ha_platforms:
  - button
  - cover
  - diagnostics
  - number
  - scene
  - select
  - sensor
ha_iot_class: Local Polling
ha_dhcp: true
ha_homekit: true
ha_zeroconf: true
---

{% include integrations/supported_brand.md %}
