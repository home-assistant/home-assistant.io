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


The `generic_thermostat` climate platform is a thermostat implemented in Home Assistant. It uses a sensor and switches to control heaters and A/C units. In can be used for heating, cooling or both at the same time.

## Heater mode
You can choose to use `generic_thermostat` as heater only by applying a simple configuration as below:

```yaml
# Heating example configuration.yaml entry
climate:
  - platform: generic_thermostat
    name: Study
    heater_control: switch.study_heater
    target_sensor: sensor.study_temperature
    min_cycle_duration:
      seconds: 30
```

<p class='note warning'>
  `min_cycle_duration` is recommended to avoid triggering your ignition too often when doing changes (manual or through automation).
</p>

## A/C mode
You can choose to use `generic_thermostat` as A/C unit by using a configuration as below:

```yaml
# A/C example configuration.yaml entry
climate:
  - platform: generic_thermostat
    name: Study
    ac_control: switch.study_ac
    target_sensor: sensor.study_temperature
    keep_alive:
      minutes: 3
```

<p class='note warning'>
  `keep_alive` is usually recommended as most A/C units will turn off after a while without a keep alive.
</p>

## Auto - Using both a heater and an A/C unit together
You can have both a heater and an A/C unit setup inside `generic_thermostat` to allow `auto` operation mode with a low target temperature and a high target temperature. 

```yaml
# Auto mode example configuration.yaml entry
climate:
  - platform: generic_thermostat
    name: Study
    ac_control: switch.study_ac
    heater_control: switch.study_heater
    target_sensor: sensor.study_temperature
    target_temp_low: 20
    target_temp_high: 25
    keep_alive:
      minutes: 3
    initial_operation_mode: "auto"
```

<p class='note warning'>
  Make sure `target_temp_low` and `target_temp_high` are far enough from each other so you don't trigger both devices at the same time or bounce between.
</p>

## Configuration variables

- **name** (*Required*): Name of the thermostat.
- **target_sensor** (*Required*): `entity_id` for a temperature sensor, target_sensor.state must be temperature.
- **heater_control** (*Optional*): `entity_id` for heater switch, must be a toggle device. When not present, you must have **ac_control** set.
- **ac_control** (*Optional*): `entity_id` for A/C unit switch, must be a toggle device. When not present, you must have **heater_control** set.
- **min_temp** (*Optional*): Set minimum set point available (default: 7).
- **max_temp** (*Optional*): Set maximum set point available (default: 35).
- **target_temp** (*Optional*): Set the target temperature that Home Assistant will use after a reboot. If not set, you will get previously set `target temperature` (default: 20). You can use *target_temp* only when using either **heater_control** or **ac_control**
- **target_temp_low** (*Optional*): Set the target temperature that Home Assistant will use after a reboot. If not set, you will get previously set `target_temp_low` (default: 18). You can use **target_temp_low** only when using both **heater_control** and **ac_control**
- **target_temp_high** (*Optional*): Set the target temperature that Home Assistant will use after a reboot. If not set, you will get previously set `target_temp_high` (default: 21). You can use **target_temp_high** only when using both **heater_control** and **ac_control**
- **min_cycle_duration** (*Optional*): Set a minimum amount of time that the switch (either **heater_control** or **ac_control**) must be in its current state prior to being switched either off or on.
- **cold_tolerance** (*Optional*): Set a minimum amount of difference between the temperature read by the sensor specified in the *target_sensor* option and the target temperature that must change prior to being switched on. For example, if the target temperature is 25 and the tolerance is 0.5 the heater will start when the sensor equals or goes below 24.5.
- **hot_tolerance** (*Optional*): Set a minimum amount of difference between the temperature read by the sensor specified in the *target_sensor* option and the target temperature that must change prior to being switched off. For example, if the target temperature is 25 and the tolerance is 0.5 the heater will stop when the sensor equals or goes above 25.5.
- **away_temp_heat** (*Optional*): Set the temperature used by "away_mode" when in heater mode (default: 16)
- **away_temp_cool** (*Optional*): Set the temperature used by "away_mode" when in cooling mode (default: 30)
- **initial_operation_mode** (*Optional*): Set the initial operation mode. Valid values are `off` or `auto`. Value has to be double quoted. If this parameter is not set, it is preferable to set a *keep_alive* value. This is helpful to align any discrepancies between *generic_thermostat* and *heater* state.
- **keep_alive** (*Optional*): Set a keep-alive interval. If set, the switch (either **heater_control** or **ac_control**) will be triggered every time the interval elapses. Use with heaters and A/C units that shut off if they don't receive a signal from their remote for a while. Use also with switches that might lose state. The keep-alive call is done with the current valid climate component state (either on or off).
- **initial_operation_mode** (*Optional*): Set the initial operation mode. Valid values are based on the type of switches defined. If you defined both **ac_control** and **heater_control** you can set: `off`, `cool`, `heat` or `auto`. If you only specified **heater_control** you can set: `off` and `heat`. Value has to be double quoted.
- **away_temp_heat** (*Optional*): Set the temperature used by "away_mode" when used by heater (default: 16).
- **away_temp_cool** (*Optional*): Set the temperature used by "away_mode" when used by A/C unit (default: 30).

A full configuration example looks like the one below. `min_cycle_duration` and `keep_alive` must contain at least one of the following entries: `days:`, `hours:`, `minutes:`, `seconds:` or `milliseconds:`.

Currently the `generic_thermostat` climate platform supports 'auto', 'heat', 'cool' and 'off' operation modes. You can force your `generic_thermstat` to avoid starting by setting Operation to 'off'.

Please note that changing Away Mode you will force a target temperature change as well that will get restored once the Away Mode is turned off. 

```yaml
# Full example configuration.yaml entry
climate:
  - platform: generic_thermostat
    name: Study
    heater_control: switch.study_heater
    ac_control: switch.study_ac
    target_sensor: sensor.study_temperature
    min_temp: 15
    max_temp: 21
    target_temp_low: 17
    target_temp_high: 21
    cold_tolerance: 0.3
    hot_tolerance: 0
    min_cycle_duration:
      seconds: 5
    keep_alive:
      minutes: 3
    initial_operation_mode: "off"
    away_temp_cool: 16
    away_temp_heat: 30
```