---
title: ESERA 1-Wire
description: Connect and control your ESERA 1-Wire devices using the 1-Wire integration
ha_category:
  - DIY
ha_domain: esera_onewire
ha_integration_type: virtual
ha_supporting_domain: onewire
ha_supporting_integration: 1-Wire
ha_release: 0.12
ha_codeowners:
  - '@garbled1'
  - '@epenet'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - select
  - sensor
  - switch
ha_iot_class: Local Polling
---

{% include integrations/supported_brand.md %}
