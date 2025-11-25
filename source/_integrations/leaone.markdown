---
title: LeaOne
description: Instructions on how to integrate LeaOne devices into Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.2
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: leaone
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates LeaOne health devices into Home Assistant.

LeoOne produces Bluetooth scales and other health devices under the Xiaogui and BAGAIL brands.

## Supported devices

- Bluetooth scale TZC4 (metric)
- Bluetooth scale TZC4 (imperial)
- Bluetooth scale QJ-J (metric)

The LeaOne integration cannot automatically discover devices because the LeaOne Bluetooth design uses non-standard discovery.

{% include integrations/config_flow.md %}
