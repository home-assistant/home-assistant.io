---
title: Enmax Energy
description: Get energy usage from Enmax Energy using the Opower integration
ha_category:
  - Energy
  - Sensor
ha_release: 2023.8
ha_domain: enmax
ha_integration_type: virtual
ha_supporting_domain: opower
ha_supporting_integration: Opower
ha_codeowners:
  - '@tronikos'
ha_config_flow: true
ha_platforms:
  - sensor
ha_iot_class: Cloud Polling
---

{% include integrations/supported_brand.md %}

## Limitations

Unlike other utilities that use the [{{ page.ha_supporting_integration }}](/integrations/{{ page.ha_supporting_domain }}) integration, {{ name }} only publishes monthly data.
