---
title: SensorPush Cloud
description: Instructions on how to integrate SensorPush Cloud devices into Home Assistant.
ha_category:
  - Sensor
ha_release: 2025.3
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@sstallion'
ha_domain: sensorpush_cloud
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

Integrates [SensorPush Cloud](https://www.sensorpush.com/) devices into Home Assistant.

## Prerequisites

A [G1 WiFi Gateway](https://www.sensorpush.com/products/p/g1-gateway) is required to make use of the Cloud API. To activate API access, log in to the [Gateway Cloud Dashboard](https://dashboard.sensorpush.com/) and agree to the terms of service.

Sensor entities (temperature, humidity, barometric pressure) will not be available to Home Assistant until you have activated the device with the SensorPush app on iOS or Android.

## Supported devices

- [HT1 Temperature and Humidity Smart Sensor](https://www.sensorpush.com/products/p/ht1)
- [HT.w Water-Resistant Temperature / Humidity Smart Sensor](https://www.sensorpush.com/products/p/ht-w)
- [HTP.xw Extreme Accuracy Water-Resistant Temperature / Humidity / Barometric Pressure Smart Sensor](https://www.sensorpush.com/products/p/htp-xw)

{% include integrations/config_flow.md %}

## Sensors

For each device, the following *sensors* are created:

| Sensor                 | Description                                                   |
| :--------------------- | :------------------------------------------------------------ |
| `altitude`             | Measures the altitude. (disabled by default)                  |
| `atmospheric_pressure` | Measures the barometric pressure. (disabled by default)       |
| `battery_voltage`      | Measures the battery voltage. (disabled by default)           |
| `dewpoint`             | Measures the dew point. (disabled by default)                 |
| `humidity`             | Measures the relative humidity.                               |
| `signal_strength`      | Measures the Bluetooth signal strength. (disabled by default) |
| `temperature`          | Measures the temperature.                                     |
| `vapor_pressure`       | Measures the vapor-pressure deficit. (disabled by default)    |

## Known limitations

- `atmospheric_pressure` is not available on HT1 and HT.w series devices.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
