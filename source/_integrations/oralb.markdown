---
title: Oral-B
description: Instructions on how to integrate Oral-B devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.11
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: oralb
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Oral-B](https://oralb.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The OralB integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

[IO 7 Series](https://oralb.com/en-us/products/electric-toothbrushes/oralbio)
[Smart Series 7000](https://oralb.com/en-us/products/electric-toothbrushes/smart-7000-rechargeable-electric-toothbrush/)
