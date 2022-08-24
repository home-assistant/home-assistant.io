---
title: ThermoPro
description: Instructions on how to integrate ThermoPro devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: thermopro
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [ThermoPro](https://www.thermopro.com/) devices into Home Assistant.

## Activation is required

Sensor entities (temperature, humidity, barometric pressure) will not be available to Home Assistant until you have activated the device with the ThermoPro app on iOS or Android.

## Supported devices

- [HT.w Water-Resistant Temperature / Humidity Smart Sensor](https://www.thermopro.com/products/p/ht-w)
- [HTP.xw Extreme Accuracy Water-Resistant Temperature / Humidity / Barometric Pressure Smart Sensor](https://www.thermopro.com/products/p/htp-xw)

The ThermoPro integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% include integrations/config_flow.md %}
