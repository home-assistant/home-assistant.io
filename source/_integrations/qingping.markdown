---
title: Qingping
description: Instructions on how to integrate Qingping devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: qingping
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Qingping](https://qingping.co/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The Qingping integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [Motion & Ambient Light Sensor](https://www.qingping.co/motion-light-sensor/overview)