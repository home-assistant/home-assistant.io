---
title: HETA
description: Connect and control your HETA pellet stove using the Fumis integration
ha_category:
  - Climate
ha_release: '2026.10'
ha_domain: heta
ha_integration_type: virtual
ha_supporting_domain: fumis
ha_supporting_integration: Fumis
ha_codeowners:
  - '@frenck'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - number
  - sensor
  - switch
ha_iot_class: Cloud Polling
ha_dhcp: true
---

{% include integrations/supported_brand.md %}
