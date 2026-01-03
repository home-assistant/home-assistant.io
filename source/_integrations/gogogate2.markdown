---
title: Gogogate2 and ismartgate
description: Instructions on how to integrate Gogogate2 and iSmartGate enabled garage door covers into Home Assistant.
ha_category:
  - Cover
ha_release: 0.67
ha_iot_class: Local Polling
ha_domain: gogogate2
ha_codeowners:
  - '@vangorra'
ha_config_flow: true
ha_homekit: true
ha_platforms:
  - cover
  - sensor
ha_dhcp: true
ha_integration_type: integration
---

The `gogogate2` cover platform lets you control Gogogate2 and iSmartGate enabled garage doors and gates through Home Assistant. Device names in Home Assistant are generated based on the names defined in the GogoGate2 or iSmartGate mobile app.

{% include integrations/config_flow.md %}

### Supported devices

- Gogogate 2
- ismartgate PRO
- ismartgate LITE
- ismartgate MINI
