---
title: ToGrill Bluetooth BBQ thermometers
description: Control and monitor your ToGrill compatible BBQ thermometers.
ha_iot_class: Local Push
ha_config_flow: true
ha_release: '2025.9'
ha_category:
  - Event
  - Sensor
  - Number
ha_domain: togrill
ha_bluetooth: true
ha_platforms:
  - event
  - sensor
  - number
ha_integration_type: device
ha_codeowners:
  - '@elupus'
ha_quality_scale: bronze
---

The ToGrill {% term integration %} allows you to connect your ToGrill compatible Bluetooth grill thermometer.

{% tip %}

The recommended way to connect the device to Home Assistant is by using an [ESPHome Bluetooth Proxy](https://esphome.io/projects/?type=bluetooth), as they provide the best experience.

{% endtip %}

{% include integrations/config_flow.md %}

Home Assistant will display a list of addresses of the available desks, and you just need to select the one you want to add. Repeat the process to add more than one desk.

{% note %}
When the Home Assistant integration is active, it will take exclusive control over the device and block access by other controllers like the standard smart phone applications.
{% endnote %}

## Known working devices

Many ToGrill compatible devices exist from many different vendors. Only a subset has been tested successfully. These are known to work. Other detected devices may work or may not work as expected.

| Device                           | Model  |
|----------------------------------|--------|
| Rubicson - BBQ probe thermometer | Pro-05 |

## Events

**Probe X**: The most recently triggered alarm or event on the probe. The following event types are expected: `alarm`, `acknowledge`, `disconnected`.

## Sensors

**Probe X**: The current temperature of the given temperature probe
**Battery**: The current battery level of the device.

## Numbers

**Target X**: The target temperature of the given temperature probe. Set value to 0 to disable target alarm.
**Alarm interval**: The interval in minutes between successive alarms.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
