---
layout: page
title: "Heat control"
description: "Turn Home Assistant into a thermostat"
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

Specify a start time, end time and a target temperature. If the current temperature is lower than the target temperature,
and the time is between start time and end time, the heater will be turned on. Opposite if the temperature is higher than the
target temperature the heater will be turned off.

If away mode is activated the target temperature is set to a minimal temperature (`min_temp` in configuration block). The minimal temperature is also used as target temperature when no other temperature is specified.

If the heater is manually turned on, the target temperature will be set to 100°C. Meaning the thermostat probably will never turn off the heater. If the heater is manually turned off, the target temperature will be set according to normal rules. Based on target temperature for given time intervals and the min temperature.

A target temperature set with the `set_temperature` function will override all other rules for the target temperature.

```yaml
# Example configuration.yaml entry
thermostat:
  platform: heat_control
  name: Stue
  heater: switch.Ovn_stue
  target_sensor: tellstick_sensor.Stue_temperature
  time_temp: 0700-0745:17,1500-1850:20
  min_temp: 10
```

Configuration variables:

- **name** (*Required*): Name of thermostat
- **heater** (*Required*: `entity_id` for heater switch, must be a toggle device.
- **target_sensor** (*Required*): `entity_id` for a temperature sensor, target_sensor.state must be temperature.
- **time_temp** (*Required*): TIme frames and temperature. Format: *start_time*-*end_time*:*target_temp*
- **min_temp** (*Required*): Minimum temperature, used when away mode is active or no other temperature specified.


For the example the heater will turn on at 07:00 if the temperature is lower than 17°C away mode is false. Between 07:00 and 07:45 the
target temperature will be 17°C. Between 07:45 and 15:00 no temperature is specified. So the min_temp of 10°C will be used. From 15:00 to 18:50 the target temperature is 20°C, but if away mode is true the target temperature will be set to 10°C.

