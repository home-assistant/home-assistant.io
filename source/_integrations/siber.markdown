---
title: Siber
description: Connect and control your Siber devices using the Airios integration
ha_category:
  - Climate
  - Fan
ha_domain: siber
ha_release: 2025.4
ha_integration_type: virtual
ha_supporting_domain: airios
ha_supporting_integration: Airios
ha_codeowners:
  - '@scabrero'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - fan
  - number
  - select
  - sensor
ha_iot_class: Local Polling
ha_ssdp: false
ha_zeroconf: false
---

{% include integrations/supported_brand.md %}

## Supported products

* RF bridges
  * RS485 serial bridge (Ref. `DFEVORFRS485`)
* Ventilation units
  * DF Optima 2 BP (Ref. ` DFOPTIMA2BPx`)
  * DF EVO series (**not tested**)
* Remotes
  * 4 button remote (Ref. `DFPULS4B`)
