---
title: RainMachine
description: Instructions on how to integrate RainMachine units within Home Assistant.
ha_category:
  - Binary sensor
  - Irrigation
  - Sensor
  - Switch
  - Update
ha_release: 0.69
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: rainmachine
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - select
  - sensor
  - switch
  - update
ha_zeroconf: true
ha_homekit: true
ha_integration_type: device
---

The **RainMachine** {% term integration %} is the main integration to integrate all platforms related to [RainMachine smart Wi-Fi sprinkler controllers](https://www.rainmachine.com/).

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Button
- Sensor
- Switch

Note that some entities are disabled by default. If you are missing a sensor or binary sensor, check the configured integration!

{% include integrations/config_flow.md %}

## Configuration Options

The integration has two configuration options: 

1. "Default Zone Run Time": sets a default duration when turning on a zone switch (default: 600 seconds). This can be overridden with an action (see below).
2. "Use Run Times from App": if enabled, will use the zone-specific run times from the last time the zone was turned on manually in the RainMachine App – this allows you to set per-zone default times using the RainMachine app instead of the same default time for all zones.

{% include integrations/actions.md %}

## Controlling Your Device

After Home Assistant loads, new switches will be added for every enabled program and zone. These work as expected:

- Program On/Off: starts/stops a program
- Zone On/Off: starts/stops a zone (using the configuration options described above to determine how long to run for)

Programs and zones are linked. While a program is running, you will see both the program and zone switches turned on; turning either one off will turn the other one off (just like in the web app).

## Entity Availability

Many RainMachine entities are enabled by default. Others, like those related to flow sensors, are disabled by default if they only apply to some controllers. You can view all entities for a controller and enable/disable them as appropriate in the Device screen for your RainMachine controller.


## Firmware Updates

The integration has an [update entity](/integrations/update/) that provides information on the latest available RainMachine firmware version. The firmware update can be triggered and installed onto your RainMachine controller
directly from Home Assistant.
