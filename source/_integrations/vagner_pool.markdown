---
title: VÁGNER POOL
description: Connect your VÁGNER POOL water treatment system to Home Assistant.
ha_category:
  - Sensor
  - Water Management
ha_release: '2025.12'
ha_domain: vagner_pool
ha_integration_type: virtual
ha_supporting_domain: pooldose
ha_supporting_integration: SEKO PoolDose
ha_codeowners:
  - '@lmaertin'
ha_config_flow: true
ha_platforms:
  - sensor
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_dhcp: true
---

{% include integrations/supported_brand.md %}
