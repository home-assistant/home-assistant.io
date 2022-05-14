---
title: Big Ass Fans
description: Instructions on how to integrate BAF devices into Home Assistant.
ha_category:
  - Fan
ha_zeroconf: true
ha_release: 2022.6
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
  - '@jfroy'
ha_domain: baf
ha_config_flow: true
ha_platforms:
  - fan
ha_integration_type: integration
---

Integrates [Big Ass Fans](https://www.bigassfans.com/) devices into Home Assistant.

### Supported devices

- Haiku Fans with 3.0 firmware and later (Legacy SenseME firmware not supported)
- i6 Fans

{% include integrations/config_flow.md %}
