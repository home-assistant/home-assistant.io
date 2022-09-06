---
title: Moat
description: Instructions on how to integrate Moat devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: moat
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Moat](https://moat-tech.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The Moat integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [S2 Smart Temperature & Humidity Sensor](https://www.moat-tech.com/product/smart-climate-sensor/)
