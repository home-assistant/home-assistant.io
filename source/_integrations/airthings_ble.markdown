---
title: Airthings BLE
description: Instructions on how to set up Airthings Devices over Bluetooth LE.
ha_category:
  - Environment
  - Sensor
ha_release: '2022.9'
ha_iot_class: Local Push
ha_codeowners:
  - '@vincegio'
ha_domain: airthings_ble
ha_bluetooth: true
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

Integrates Airthings BLE sensors into Home Assistant.

[Airthings](https://www.airthings.com/) provide different sensors for measuring the air quality. The focus specially on Radon sensors.

Requires Airthings hardware and a compatible Bluetooth dongle.


{% include integrations/config_flow.md %}

The Airthings BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. This will include the device name and it's serial number.

There are two ways of retrieving the 10-digit serial number of a Wave device:
1. At the back of the device, located under the magnetic backplate.
2. Airthings app: **Device settings -> Device info -> Serial Number**

This integration uses the last 6 digits of the serial number.

## Supported Devices

- Wave
- Wave+
- Wave mini