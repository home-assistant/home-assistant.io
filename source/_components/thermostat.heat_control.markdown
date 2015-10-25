---
layout: page
title: "Heat control"
description: "Turn Home Assistant into a thermostat"
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
ha_category: Thermostat
---

Specify a start time, end time and a target temperature.
If the the current temperature is lower than the target temperature,
and the time is between start time and end time, the heater will
be turned on. Opposite if the the temperature is higher than the
target temperature the heater will be turned off.

If away mode is activated the target temperature is sat to a min
temperature (min_temp in config). The min temperature is also used
as target temperature when no other temperature is specified.

If the heater is manually turned on, the target temperature will
be sat to 100*C. Meaning
the thermostat probably will never turn off the heater.
If the heater is manually turned off, the target temperature will
be sat according to normal rules. (Based on target temperature
for given time intervals and the min temperature.)

A target temperature sat with the set_temperature function will
override all other rules for the target temperature.

```yaml
# Example configuration.yaml entry
thermostat:
  platform: heat_control
  name: Stue

  # entity_id for heater switch, must be a toggle device
  heater: switch.Ovn_stue

  # entity_id for temperature sensor, target_sensor.state must be temperature
  target_sensor: tellstick_sensor.Stue_temperature

  # start_time-end_time:target_temp,
  time_temp: 0700-0745:17,1500-1850:20

  # minimum temperature, used when away mode is active or
  # no other temperature specified.
  min_temp: 10
```

For the example the heater will turn on at 0700 if the temperature
is lower than 17C away mode is false. Between 0700 and 0745 the
target temperature will be 17C. Between 0745 and 1500 no temperature
is specified. so the min_temp of 10C will be used. From 1500 to 1850
the target temperature is 20, but if away mode is true the target
temperature will be sat to 10C
