---
title: Pinecil
description: Connect and control your Pinecil devices using the IronOS integration
ha_category:
  - Binary sensor
  - Button
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 2024.8
ha_domain: pinecil
ha_integration_type: virtual
ha_supporting_domain: iron_os
ha_supporting_integration: IronOS
ha_codeowners:
  - '@tr4nt0r'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_iot_class: Local Polling
---

{% include integrations/supported_brand.md %}
