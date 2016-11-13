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
---


The `generic_thermostat` climate platform is a thermostat implemented in Home Assistant. It uses a sensor and a switch connected to a heater under the hood. If the measured temperature is cooler then the target temperature, the heater will be turned on and turned off when required temperature is reached.

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
- **heater** (*Required*): `entity_id` for heater switch, must be a toggle device.
- **target_sensor** (*Required*): `entity_id` for a temperature sensor, target_sensor.state must be temperature.
- **min_temp** (*Optional*): Set minimum set point available (default: 7)
- **max_temp** (*Optional*): Set maximum set point available (default: 35)
- **target_temp** (*Optional*): Set intital target temperature. Failure to set this variable will result in target temperature being set to null on startup.
- **ac_mode** (*Optional*): Set the switch specified in the *heater* option to be treated as a cooling device instead of a heating device.
- **delta_temp** (*Optional*): Set temperature interval between _on_ and _off_ state. For example, if **target_temp** is 22.0 and **delta_temp** is 0.2 (default), heater will switch on when sensor reported temperature is 21.9 or lower, and will switch off when measured temperature rasies to at least 22.1. The **delta_temp** is also called [hysteresis](https://en.wikipedia.org/wiki/Hysteresis) and prevents short heating cycles. Its value must exceed **target_sensor** resolution.

A full configuration example looks like the one below.

```yaml
# Full example configuration.yaml entry
climate:
  - platform: generic_thermostat
    name: Study
    heater: switch.study_heater
    target_sensor: sensor.study_temperature
    min_temp: 15
    max_temp: 21
    target_temp: 17
    delta_temp: 0.2
```
