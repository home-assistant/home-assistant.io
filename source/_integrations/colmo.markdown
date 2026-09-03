---
title: Colmo
description: Connect and control your Colmo devices using the Midea integration
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Fan
  - Humidifier
  - Light
  - Number
  - Select
  - Switch
ha_release: 2026.8
ha_domain: colmo
ha_integration_type: virtual
ha_supporting_domain: midea
ha_supporting_integration: Midea
ha_codeowners:
  - '@chemelli74'
  - '@rokam'
  - '@caibinqing'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - fan
  - humidifier
  - light
  - number
  - select
  - switch
  - time
ha_iot_class: Local Push
---

{% include integrations/supported_brand.md %}
