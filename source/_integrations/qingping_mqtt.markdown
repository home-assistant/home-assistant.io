---
title: Qingping MQTT
description: Instructions on how to integrate Qingping environmental monitoring devices with Home Assistant via MQTT.
ha_category:
  - Sensor
ha_iot_class: Local Push
ha_release: 2026.10
ha_codeowners:
  - '@tengfeili-qingping'
ha_domain: qingping_mqtt
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Qingping MQTT** {% term integration %} allows you to monitor temperature and humidity from [Qingping](https://www.qingping.co/) devices in Home Assistant. The devices publish their sensor readings directly to your MQTT broker, so no cloud connection is needed.

## Supported devices

- Qingping Indoor Environment Monitor (CGR1W)

## Unsupported devices

- Qingping devices that connect over Bluetooth only. For those devices, use the [Qingping integration](/integrations/qingping/) instead.

## Prerequisites

1. Set up the [MQTT integration](/integrations/mqtt/) in Home Assistant and connect it to the same MQTT broker your device uses.
2. Configure your device to use your MQTT broker. The MQTT settings are sent to the device as a private deployment in one of the following ways:
   - In the [Qingping Developer Platform](https://developer.qingping.co/private/access-configuration), under **Private access configuration**.
   - In the Qingping IoT app, under the advanced settings of the device.
3. Make sure the device is powered on and sending data before you start the setup.

{% include integrations/config_flow.md %}

During setup, devices that are currently publishing data are listed automatically. If your device is not in the list, you can enter its MAC address manually.

## MQTT topics

Qingping devices and services use the following MQTT topic convention, where `{mac}` is the MAC address of the device in upper case without separators, for example `582D3412A4C2`:

- `qingping/{mac}/up`: the device publishes its sensor data to this topic.
- `qingping/{mac}/down`: configuration messages for the device, such as the MQTT settings sent from the Qingping Developer Platform or the Qingping IoT app, use this topic.

## Supported functionality

### Sensors

- **Temperature**: The current temperature, in °C.
- **Humidity**: The relative humidity, in %.

## Troubleshooting

### Setup stops with the message "MQTT is not configured"

Set up the [MQTT integration](/integrations/mqtt/) first, then start the setup again.

### My device is not in the list during setup

The list is created when the setup starts and shows devices that are currently publishing data. Make sure the device is powered on and connected to your MQTT broker, then start the setup again. You can also enter the MAC address of the device manually.

## Removing the integration

This integration follows standard integration removal. No additional steps are required on the device side.

{% include integrations/remove_device_service.md %}
