---
title: ESERA 1-Wire
description: Instructions on how to integrate ESERA 1-Wire sensors into Home Assistant.
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
  - sensor
  - switch
ha_iot_class: Local Polling
---

{% include integrations/supported_brand.md %}
