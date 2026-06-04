---
title: Hayward AquaRite
description: Connect Hayward AquaRite pool controllers to Home Assistant via Vistapool.
ha_category:
  - Sensor
ha_release: '2026.7'
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@fdebrus'
ha_domain: aquarite
ha_integration_type: virtual
ha_supporting_domain: vistapool
ha_supporting_integration: Vistapool
ha_platforms:
  - sensor
---

{% include integrations/supported_brand.md %}
