---
layout: page
title: "Generic Thermostat"
description: "Turn Home Assistant into a thermostat"
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: heat-control.png
ha_category: Climate
ha_release: pre 0.7
ha_iot_class: "Local Polling"
---


The `generic_thermostat` climate platform is a thermostat implemented in Home Assistant. It uses a sensor and a switch connected to a heater or air conditioning under the hood. When in heater mode, if the measured temperature is cooler then the target temperature, the heater will be turned on and turned off when the required temperature is reached. When in air conditioning mode, if the measured temperature is hotter then the target temperature, the air conditioning will be turned on and turned off when required temperature is reached.

```yaml
# Example configuration.yaml entry
climate:
  - platform: generic_thermostat
    name: Study
    heater: switch.study_heater
    target_sensor: sensor.study_temperature
```

Configuration variables:

- **name** (*Required*): Name of thermostat
- **heater** (*Required*): `entity_id` for heater switch, must be a toggle device. Becomes air conditioning switch when `ac_mode` is set to `true`
- **target_sensor** (*Required*): `entity_id` for a temperature sensor, target_sensor.state must be temperature.
- **min_temp** (*Optional*): Set minimum set point available (default: 7)
- **max_temp** (*Optional*): Set maximum set point available (default: 35)
- **target_temp** (*Optional*): Set initial target temperature. Failure to set this variable will result in target temperature being set to null on startup. As of version 0.59, it will retain the target temperature set before restart if available.
- **ac_mode** (*Optional*): Set the switch specified in the *heater* option to be treated as a cooling device instead of a heating device.
- **min_cycle_duration** (*Optional*): Set a minimum amount of time that the switch specified in the *heater* option must be in it's current state prior to being switched either off or on.
- **cold_tolerance** (*Optional*): Set a minimum amount of difference between the temperature read by the sensor specified in the *target_sensor* option and the target temperature that must change prior to being switched on. For example, if the target temperature is 25 and the tolerance is 0.5 the heater will start when the sensor equals or goes below 24.5.
- **hot_tolerance** (*Optional*): Set a minimum amount of difference between the temperature read by the sensor specified in the *target_sensor* option and the target temperature that must change prior to being switched off. For example, if the target temperature is 25 and the tolerance is 0.5 the heater will stop when the sensor equals or goes above 25.5.
- **keep_alive** (*Optional*): Set a keep-alive interval. If set, the switch specified in the *heater* option will be triggered every time the interval elapses. Use with heaters and A/C units that shut off if they don't receive a signal from their remote for a while. Use also with switches that might lose state. The keep-alive call is done with the current valid climate component state (either on or off).
- **initial_operation_mode** (*Optional*): Set the initial operation mode. Valid values are `off` or `auto`. Value has to be double quoted. If this parameter is not set, it is preferable to set a *keep_alive* value. This is helpful to align any discrepancies between *generic_thermostat* and *heater* state.
- **away_temp** (*Optional*): Set the temperature used by "away_mode". If this is not specified, away_mode feature will not get activated.

A full configuration example looks like the one below. `min_cycle_duration` and `keep_alive` must contain at least one of the following entries: `days:`, `hours:`, `minutes:`, `seconds:` or `milliseconds:`.

Currently the `generic_thermostat` climate platform supports 'heat', 'cool' and 'off' operation modes. You can force your `generic_thermstat` to avoid starting by setting Operation to 'off'.

Please note that changing Away Mode you will force a target temperature change as well that will get restored once the Away Mode is turned off.

```yaml
# Full example configuration.yaml entry
climate:
  - platform: generic_thermostat
    name: Study
    heater: switch.study_heater
    target_sensor: sensor.study_temperature
    min_temp: 15
    max_temp: 21
    ac_mode: false
    target_temp: 17
    cold_tolerance: 0.3
    hot_tolerance: 0
    min_cycle_duration:
      seconds: 5
    keep_alive:
      minutes: 3
    initial_operation_mode: "off"
    away_temp: 16
```
