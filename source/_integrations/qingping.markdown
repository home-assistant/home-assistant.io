---
title: Qingping
description: Instructions on how to integrate Qingping devices into Home Assistant.
ha_category:
  - Binary sensor
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
- [Alarm Clock](https://www.qingping.co/bluetooth-alarm-clock/overview) (CGD1)
- [BT Clock Lite](https://www.qingping.co/bluetooth-clock/overview) (CGC1)
- [Door/Window Sensor](https://www.qingping.co/door-window-sensor/overview) (CGH1)
- [LEE GUITARS Thermo-Hygrometer](https://www.qingping.co/lee-guitars-thermo-hygrometer/overview) (CGM1)
- [Motion & Ambient Light Sensor](https://www.qingping.co/motion-light-sensor/overview) (CGPR1)
- [Temp RH M](https://www.qingping.co/temp-rh-monitor/overview#mi) (CGG1)
- [Temp RH Pro E](https://www.qingping.co/temp-rh-monitor-pro-e/overview) (CGF1W)
- [CO2 Temp RH](https://www.qingping.co/co2-temp-rh-monitor/overview) (GCP22C)
