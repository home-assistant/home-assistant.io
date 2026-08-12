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
ha_integration_type: device
---

Integrates [SensorPush](https://www.sensorpush.com/) devices into Home Assistant.

## Activation is required

Sensor entities (temperature, humidity, barometric pressure) will not be available to Home Assistant until you have activated the device with the SensorPush app on iOS or Android.

## Supported devices

- [HT1 Temperature and Humidity Smart Sensor](https://www.sensorpush.com/products/p/ht1)
- [HT.w Water-Resistant Temperature / Humidity Smart Sensor](https://www.sensorpush.com/products/p/ht-w)
- [HTP.xw Extreme Accuracy Water-Resistant Temperature / Humidity / Barometric Pressure Smart Sensor](https://www.sensorpush.com/products/p/htp-xw)

The SensorPush integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Battery level

The HT.w and HTP.xw also report their battery, as two diagnostic entities: a **Battery** percentage and a **Voltage** in volts. The percentage is estimated from the voltage, mapping the 2400–3000 mV range SensorPush documents onto 0–100%. A coin cell holds a nearly flat voltage for most of its life and then drops quickly, so expect the percentage to sit near full for a long time and then fall away towards the end.

Unlike temperature, humidity, and barometric pressure, the battery is not part of the Bluetooth advertisement. Home Assistant has to connect to the sensor to read it, which has two consequences:

- A Bluetooth adapter or [Bluetooth proxy](/integrations/bluetooth/#remote-adapters-bluetooth-proxies) able to make connections must be in range of the sensor. If only a passive proxy can see it, the other entities still work, but no battery entities are created.
- Each sensor is polled at most once every 24 hours, because connecting to it spends some of the battery being measured.

The HT1 does not expose battery information and does not get these entities.

{% include integrations/config_flow.md %}
