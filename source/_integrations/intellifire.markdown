---
title: Intellifire 
description: Instructions on the Intellifire Fireplace integration for Home Assistant.
ha_category:
  - Sensor
  - Binary Sensor
ha_iot_class: Local Polling
ha_release: 0.47
ha_codeowners:
  - '@jeeftor'
ha_domain: intellifire
ha_config_flow: true
---


### Overview

Intellifire Wifi fireplace modules provide app-based and Alexa control to various fireplace. The modules do expose an unencrypted HTTP endpoint on the network that provides status information. This integration will read that URL and create a set of sensors displaying the current fireplace state.

Configuration is done via the GUI.

{% include integrations/config_flow.md %}


### Sensor Types


The following sensors are available as either a **Binary Sensor** when dealing with on/off values or in the form of a **Sensor** when dealing with other values.

### Binary Sensors

- `pilot_light`: Pilot light status.
- `fan_on`: Whether the fan is on/off.
- `timer_on`: Whether timer-mode is engaged.
- `thermostat_on`: Whether the thermostat is turned on.

### Sensors

- `fan_speed`: an `integer` representing fan-speed. Most likely 0-5
- `flame_height`: an `integer` representing the flame height. `0` is off
- `target_temp`: if the thermostat is enabled (`thermostat_on`) this will display the desired temperature. Natively the unit operates in celsius.
- `timer_remaining`: if the timer mode (`timer_on`) is enabled - this will display the number of `minutes` remaining.
