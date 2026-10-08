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
- The device must use Bluetooth connectivity. All supported devices except Wave Gen. 1 can connect through SmartLink instead, using a nearby Airthings device as a hub.
  - Bluetooth is then turned on only briefly after you wave at the device or press its button, and Home Assistant can't read it.
  - The same applies to a Wave Enhance or Corentium Home 2 whose connectivity has not been set up. See [Switching from SmartLink to Bluetooth](#switching-from-smartlink-to-bluetooth).
- Up-to-date device firmware. Update it in the Airthings app before adding the device.

### Switching from SmartLink to Bluetooth

A device uses either SmartLink or Bluetooth, not both. If the device currently sends live readings to the Airthings app over SmartLink, switching to Bluetooth stops the live readings.

If the Airthings app offers SmartLink when you add a device, select **I prefer to connect with Bluetooth**. For a device that is already added:

1. In the Airthings app, open the device's settings. **Connectivity** shows whether the device uses SmartLink or Bluetooth.
2. Select **Reset connectivity**.
3. Make sure the device is powered and stay close to it. Wave at a Wave Plus, Wave Radon, or Wave Mini, or press the button on a Wave Enhance or Corentium Home 2, so the app can connect to it over Bluetooth.
4. Select **Reset connectivity** again. This clears the SmartLink configuration and switches the device to Bluetooth without affecting your sensor data. On a Wave Plus, Wave Radon, or Wave Mini, remove the batteries and insert them again when the app asks you to.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device:
  description: "The Airthings device to add. Devices are shown by model and serial number."
{% endconfiguration_basic %}

The Airthings BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. This will include the device name and its serial number.

There are two ways of retrieving the 10-digit serial number of an Airthings device:
1. At the back of the device, located under the magnetic backplate.
2. In the Airthings app, open the device's settings. The serial number is listed there.

This integration uses the last 6 digits of the serial number.

## Supported devices

- Wave Gen. 1
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
