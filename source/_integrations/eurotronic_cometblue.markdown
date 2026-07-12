---
title: Eurotronic Comet Blue
description: Instructions on how to integrate Eurotronic Comet Blue Thermostats into Home Assistant.
ha_category:
  - Button
  - Climate
  - Number
  - Sensor
ha_iot_class: Local Polling
ha_release: 2026.5
ha_config_flow: true
ha_bluetooth: true
ha_codeowners:
  - '@rikroe'
ha_domain: eurotronic_cometblue
ha_integration_type: device
ha_quality_scale: bronze
ha_platforms:
  - button
  - climate
  - number
  - sensor
---

The **Eurotronic Comet Blue** {% term integration %} allows you to integrate Eurotronic Comet Blue (and similar) thermostats.

You can use this integration to read thermostat status and adjust temperatures in Home Assistant.

## Supported devices

- Eurotronic Comet Blue
- Sygonix HT100 BT
- Xavax Hama
- Lidl Silvercrest RT2000BT

## Prerequisites

Before you set up this integration, make sure the following requirements are met:

1. The [Bluetooth](/integrations/bluetooth) integration is enabled and working.
2. Bluetooth active scanning is enabled.


The Eurotronic Comet Blue {% term integration %} will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.


{% include integrations/config_flow.md %}

{% configuration_basic %}
Device PIN:
  description: "Device PIN with 6 digits, defaults to `000000`."
{% endconfiguration_basic %}

## Supported functionality

This integration provides climate control and thermostat configuration entities.

Comet Blue devices run on an internal schedule and can be manually controlled temporarily. When the schedule is active, the thermostat switches between low and high target temperatures based on that schedule.

If you manually change the target temperature or use presets, the thermostat returns to its programmed schedule on the next schedule change.

### Climate

The climate entity lets you control the thermostat by setting a target temperature which the device will try to reach on its own.

As shortcuts, the climate platform supports the following presets:

- **Eco**: Temperature is set to the low schedule temperature.
- **Comfort**: Temperature is set to the high schedule temperature.
- **Boost**: Valve is fully open.
- **Away**: Holiday mode is currently active. Display only.
- **None**: Temperature is other than the above. Display only.

Additionally, the following modes are available:

- **Off**: Valve is fully closed.
- **Heat**: Valve is fully open.
- **Auto**: The thermostat controls the temperature automatically, based on the target temperature.

### Button

The integration provides a **Sync time** button for each device. Pressing this button synchronizes the thermostat's internal clock with Home Assistant's current time.

### Number

Number entities provide specific settings that affect automatic thermostat behavior.

- **Comfort setpoint**: Temperature used for the **Comfort** preset and if schedule is on.
- **Eco setpoint**: Temperature used for the **Eco** preset and if schedule is off.
- **Setpoint offset**: Temperature calibration for the internal thermostat control.

### Sensor

The device reports its current battery level, but the reading may not be very accurate.

## Data updates

The integration {% term polling polls %} data from the thermostat every 5 minutes by default.

## Known limitations

- Holiday mode/away preset can only be set on the device itself.
- The devices only support temperature steps of 0.5°C and time steps of 15 minutes.
- If you manually change the target temperature or use presets, the thermostat returns to its programmed schedule at the next schedule change.
- If the thermostat is in holiday mode, you cannot reset it from Home Assistant. To reset it, press the `MENU` button on the thermostat until it resets.

## Troubleshooting

As the data is refreshed using an active Bluetooth connection, {% term polling %} can fail due to connection issues.

If you see repeated connection issues, try the following:

1. Move your Home Assistant host closer to the thermostat.
2. Add [ESPHome Bluetooth proxies](/integrations/bluetooth/#remote-adapters-bluetooth-proxies) closer to the thermostat.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
