---
title: Tapo
description: Connect and control your Tapo devices using the TP-Link integration
ha_category:
  - Hub
  - Light
  - Sensor
  - Switch
ha_domain: tplink_tapo
ha_release: 2024.2
ha_integration_type: virtual
ha_supporting_domain: tplink
ha_supporting_integration: tplink
ha_codeowners:
  - '@rytilahti'
  - '@thegardenmonkey'
  - '@bdraco'
  - '@sdb9696'
ha_platforms:
  - diagnostics
  - light
  - sensor
  - switch
ha_iot_class: Local Polling
ha_config_flow: true
ha_dhcp: true
ha_quality_scale: platinum
ha_integration_type: integration
---

{% include integrations/supported_brand.md %}
