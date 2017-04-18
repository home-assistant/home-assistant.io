---
layout: component
title: "Heat control"
description: "Turn Home Assistant into a thermostat"
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: heat-control.png
ha_category: Thermostat
---

Heat Control is a thermostat implemented in Home Assistant. It uses a sensor and a switch connected to a heater under the hood. If the measured temperature is cooler then the target temperature, the heater will be turned on and turned off when required temperature is reached.

```yaml
# Example configuration.yaml entry
thermostat:
  platform: heat_control
  name: Study
  heater: switch.study_heater
  target_sensor: sensor.study_temperature
```

Configuration variables:

- **name** (*Required*): Name of thermostat
- **heater** (*Required*: `entity_id` for heater switch, must be a toggle device.
- **target_sensor** (*Required*): `entity_id` for a temperature sensor, target_sensor.state must be temperature.
