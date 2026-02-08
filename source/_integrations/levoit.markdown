---
title: Levoit
description: Connect and control your Levoit devices using the VeSync integration
ha_category:
  - Fan
  - Light
  - Number
  - Switch
  - Update
ha_release: 0.66
ha_domain: levoit
ha_integration_type: virtual
ha_supporting_domain: vesync
ha_supporting_integration: VeSync
ha_codeowners:
  - '@markperdue'
  - '@webdjoe'
  - '@thegardenmonkey'
  - '@cdnninja'
  - '@iprak'
  - '@sapuseven'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - fan
  - humidifier
  - light
  - number
  - select
  - sensor
  - switch
  - update
ha_iot_class: Cloud Polling
---

{% include integrations/supported_brand.md %}
