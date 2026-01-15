---
title: VÁGNER POOL
description: Connect and control your VÁGNER POOL devices using the SEKO PoolDose integration
ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
  - Water Management
ha_release: '2025.9'
ha_domain: vagner_pool
ha_integration_type: virtual
ha_supporting_domain: pooldose
ha_supporting_integration: SEKO PoolDose
ha_codeowners:
  - '@lmaertin'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - number
  - select
  - sensor
  - switch
ha_iot_class: Local Polling
ha_dhcp: true
---

{% include integrations/supported_brand.md %}
