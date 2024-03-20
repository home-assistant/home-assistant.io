---
title: Tapo
description: Connect and control your Tapo devices using the TP-Link Smart Home integration
ha_category:
  - Hub
  - Light
  - Sensor
  - Switch
ha_domain: tplink_tapo
ha_release: 0.89
ha_integration_type: virtual
ha_supporting_domain: tplink
ha_supporting_integration: TP-Link Smart Home
ha_codeowners:
  - '@rytilahti'
  - '@thegardenmonkey'
  - '@bdraco'
  - '@sdb9696'
ha_config_flow: true
ha_platforms:
  - diagnostics
  - light
  - sensor
  - switch
ha_iot_class: Local Polling
ha_dhcp: true
---

{% include integrations/supported_brand.md %}
