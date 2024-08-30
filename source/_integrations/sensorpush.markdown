---
title: SensorPush
description: Instructions on how to integrate SensorPush devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: sensorpush
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [SensorPush](https://www.sensorpush.com/) devices into Home Assistant.

## Activation is required

Sensor entities (temperature, humidity, barometric pressure) will not be available to Home Assistant until you have activated the device with the SensorPush app on iOS or Android.

## Supported devices

- [HT1 Temperature and Humidity Smart Sensor](https://www.sensorpush.com/products/p/ht1)
- [HT.w Water-Resistant Temperature / Humidity Smart Sensor](https://www.sensorpush.com/products/p/ht-w)
- [HTP.xw Extreme Accuracy Water-Resistant Temperature / Humidity / Barometric Pressure Smart Sensor](https://www.sensorpush.com/products/p/htp-xw)

The SensorPush integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% include integrations/config_flow.md %}
