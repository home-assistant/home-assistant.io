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
ha_integration_type: integration
---

Integrates Airthings BLE {% term sensors %} into Home Assistant.

[Airthings](https://www.airthings.com/) provide different {% term devices %} for measuring the air quality. Initially focusing on radon gas sensors, each device provides a number of different sensors to monitor typical contaminants that's presence contributes to bad air quality in the home.

Requires Airthings hardware and a compatible Bluetooth dongle.

{% include integrations/config_flow.md %}

The Airthings BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. This will include the device name and its serial number.

There are two ways of retrieving the 10-digit serial number of a Wave device:
1. At the back of the device, located under the magnetic backplate.
2. Airthings app: **Device settings -> Device info -> Serial Number**

This integration uses the last 6 digits of the serial number.

## Supported devices

- Wave gen. 1
- Wave Radon
- Wave Mini
- Wave Plus
- Wave Enhance

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
