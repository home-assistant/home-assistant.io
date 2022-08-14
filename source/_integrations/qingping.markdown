---
title: Qingping
description: Instructions on how to integrate Qingping devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: qingping
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

Integrates [Qingping](https://qingping.co/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The Qingping integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [Air Monitor Lite](https://www.qingping.co/air-monitor-lite/overview) (CGDN1)
- [Alarm Clock](https://www.qingping.co/bluetooth-alarm-clock/overview) (CGPR1)
- [Motion & Ambient Light Sensor](https://www.qingping.co/motion-light-sensor/overview) (CGPR1)
