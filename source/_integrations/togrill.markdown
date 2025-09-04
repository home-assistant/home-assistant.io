---
title: ToGrill Bluetooth BBQ thermometers
description: Control and monitor your ToGrill compatible BBQ thermometers.
ha_iot_class: Local Push
ha_config_flow: true
ha_release: '2025.9'
ha_category:
  - Event
  - Number
  - Sensor
ha_domain: togrill
ha_bluetooth: true
ha_platforms:
  - event
  - number
  - sensor
ha_integration_type: integration
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

**Event**: The most recently triggered alarm or event on the probe. The following event types are expected:

- `ambient_cool_down` - The ambient temperature returned to normal.
- `ambient_low_temp` - The ambient temperature is too low.
- `ambient_over_heat` - The ambient temperature is too high.
- `device_high_temp` - Internal temperature too high.
- `device_low_power` - Power is low.
- `ignition_failure` - Ignition failed.
- `probe_above_maximum` - Temperature is above the allowed range.
- `probe_acknowledge` - Temperature probe alarm was acknowledged by user.
- `probe_alarm` - Temperature has reached it's set temperature target.
- `probe_below_minimum` - Temperature is below the allowed range.
- `probe_disconnected` - Probe disconnected from device.
- `probe_timer_alarm` - Timer alarm triggered (Note. some device will instead trigger `probe_alarm`).

## Sensors

**Temperature**: The current temperature of the given temperature probe
**Battery**: The current battery level of the device.

## Numbers

**Target temperature**: The target temperature of the given temperature probe. Set value to 0 to disable target alarm.
**Alarm interval**: The interval in minutes between successive alarms.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
