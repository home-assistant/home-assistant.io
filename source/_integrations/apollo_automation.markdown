---
title: Apollo Automation
description: Connect and control your Apollo Automation ESPHome devices using the ESPHome integration
ha_release: '2025.3'
ha_iot_class: Local Push
ha_category:
  - Sensor
  - Presence detection
ha_domain: apollo_automation
ha_integration_type: brand
ha_supporting_domain: esphome
ha_supporting_integration: ESPHome
ha_platforms:
  - sensor
works_with:
  - local
---

[Apollo automation](https://apolloautomation.com/) is a member of the Made for ESPHome program.

Apollo Automation devices work locally and integrate seamlessly with the [ESPHome](/integrations/esphome/) {% term integration %} in Home Assistant. As all connectivity is done locally, status updates and device control from Home Assistant happen instantly.

{% include integrations/supported_brand.md %}

## Supported devices

The following devices are known to be supported by the integration. They are certified under the [Works with Home Assistant](https://partner.home-assistant.io/) program.

- [MTR-1 Multi-Target Radar Multisensor For Home Assistant (LD2450)](https://apolloautomation.com/products/mtr-1) - A tiny, but powerful radar-based (mmWave) presence sensor that can pack in many other sensors.
- [MSR-2 mmWave Multisensor For Home Assistant (LD2410B)](https://apolloautomation.com/products/msr-2) - An even smaller multisensor that is the successor of the initial community feedback-driven design.
- [AIR-1 Air Quality Sensor For Home Assistant](https://apolloautomation.com/products/air-1) - A small air quality multisensor that can be extended to incorporate a huge variety of sensors.
