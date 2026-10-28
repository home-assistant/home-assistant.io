---
title: Hayward
description: Connect and control your Hayward pool controllers using the NeoPool integration
ha_domain: hayward_neopool
ha_integration_type: virtual
ha_supporting_domain: neopool
ha_supporting_integration: NeoPool
ha_release: 2026.8
ha_codeowners:
  - '@svasek'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
  - time
ha_iot_class: Local Polling
---

{% include integrations/supported_brand.md %}
