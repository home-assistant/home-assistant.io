---
title: Airthings BLE
description: Instructions on how to set up Airthings Devices over Bluetooth LE.
ha_category:
  - Environment
  - Health
  - Sensor
ha_release: '2022.11'
ha_iot_class: Local Polling
ha_codeowners:
  - '@vincegio'
  - '@LaStrada'
ha_domain: airthings_ble
ha_bluetooth: true
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
---

Integrates Airthings BLE {% term sensors %} into Home Assistant.

[Airthings](https://www.airthings.com/) provide different {% term devices %} for measuring the air quality. Initially focusing on radon gas sensors, each device provides several different sensors to monitor typical contaminants whose presence contributes to bad air quality in the home.

## Prerequisites

- A supported Airthings device (see [Supported devices](#supported-devices)) within Bluetooth range of your Home Assistant host, or of a [Bluetooth proxy](/integrations/bluetooth/#remote-adapters-bluetooth-proxies) that supports active connections.
- A working [Bluetooth](/integrations/bluetooth) integration.
- Wave Enhance and Corentium Home 2 must use Bluetooth connectivity. If the device is set to SmartLink in the Airthings app, or its connectivity has not been set up, Bluetooth is only turned on for a short time after the button on the device is pressed, and Home Assistant cannot read it. In the Airthings app, open the device's settings and select **Connectivity** > **Switch to Bluetooth**, or add the device and select **I prefer to connect with Bluetooth**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device:
  description: "The Airthings device to add. Devices are shown by model and serial number."
{% endconfiguration_basic %}

The Airthings BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. This will include the device name and its serial number.

There are two ways of retrieving the 10-digit serial number of an Airthings device:
1. At the back of the device, located under the magnetic backplate.
2. Airthings app: **Device settings -> Device info -> Serial Number**

This integration uses the last 6 digits of the serial number.

## Supported devices

- Wave gen. 1
- Wave Radon
- Wave Mini
- Wave Plus
- Wave Enhance
- Corentium Home 2

## Sensors

Sensor entities added to Home Assistant, depending on the device model:
- Humidity
- Illuminance
- Pressure (relative depending on home elevation)
- Radon 1-day and longterm average, as well as levels
- Temperature
- VOC
- Co2
- Battery

## Removing the integration

{% include integrations/remove_device_service.md %}
