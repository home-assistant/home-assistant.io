---
title: CoolMasterNet
description: Instructions on how to integrate CoolMasterNet within Home Assistant.
ha_category:
  - Climate
ha_release: 0.88
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@OnFreund'
ha_domain: coolmaster
ha_platforms:
  - binary_sensor
  - button
  - climate
  - sensor
ha_integration_type: integration
---

The `coolmaster` climate platform lets you control HVAC through [CoolMasterNet](https://coolautomation.com/products/coolmasternet/).

{% include integrations/config_flow.md %}
