---
layout: page
title: "ebusd"
description: "The ebusd sensor allows the integration between eBUS heating system and Home Assistant."
date: 2018-10-01 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ebusd.png
ha_category: Ebus
ha_iot_class: "Local Polling"
ha_release: "0.81"
---

Integration between [ebusd](https://github.com/john30/ebusd/) daemon for communication with eBUS heating systems, and homeassistant using sensor component.

## {% linkable_title Configuration %}

Enable the sensor by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ebus:
  - platform: ebusd
    host: 127.0.0.1
    circuit: '700'
    monitored_conditions:
      - 'MaxFlowTemperatureDesired'
      - 'WaterPressure'
      - 'PumpStatus'
```

{% configuration %}
host:
  description: This is the IP address of your ebus daemon, eg. 127.0.0.1.
  required: true
  type: string
circuit: 
  description: The heating circuit name to monitor, eg. 700.
  required: true
  type: string
port:
  description: The port your ebus daemon uses.
  type: integer
  required: false
  default: 8888
name: 
  description: The name to use when displaying this ebusd instance.
  type: string
  required: false
  default: ebusd
monitored_conditions:
  description: List of condition to monitor.
  type: list
  required: false
  keys:
    ActualFlowTemperatureDesired:
      description: Heating circuit flow temperature desired
    MaxFlowTemperatureDesired:
      description: Heating circuit maximum flow temperature
    MinFlowTemperatureDesired:
      description: Heating circuit minimum flow temperature
    PumpStatus:
      description: Heating circuit pump status
    HCSummerTemperatureLimit:
      description: Heating circuit summer temperature limit
    HolidayTemperature:
      description: Heating circuit holiday temperature
    HWTemperature:
      description: Hot water circuit actual temperature
    HWTemperatureDesired:
      description: Hot water circuit desired temperature
    HWTimerMonday:
      description: Hot water circuit monday timer
    HWTimerTuesday:
      description: Hot water circuit tuesday timer
    HWTimerWednesday:
      description: Hot water circuit wednesday timer
    HWTimerThursday:
      description: Hot water circuit thursday timer
    HWTimerFriday:
      description: Hot water circuit friday timer
    HWTimerSaturday:
      description: Hot water circuit saturday timer
    HWTimerSunday:
      description: Hot water circuit sunday timer
    WaterPressure:
      description: Water pressure (bar)
    Zone1RoomZoneMapping:
      description: Room controller assignment zone 1
    Zone1NightTemperature:
      description: Heating circuit night temperature desired on zone 1
    Zone1DayTemperature:
      description: Heating circuit day temperature desired on zone 1
    Zone1HolidayTemperature:
      description: Heating circuit holiday temperature desired on zone 1
    Zone1RoomTemperature:
      description: Actual room temperature on zone 1
    Zone1ActualRoomTemperatureDesired:
      description: Actual room temperature desired on zone 1
    Zone1TimerMonday:
      description: Heating circuit monday timer on zone 1
    Zone1TimerTuesday:
      description: Heating circuit tuesday timer on zone 1
    Zone1TimerWednesday:
      description: Heating circuit wednesday timer on zone 1
    Zone1TimerThursday:
      description: Heating circuit thursday timer on zone 1
    Zone1TimerFriday:
      description: Heating circuit friday timer on zone 1
    Zone1TimerSaturday:
      description: Heating circuit saturday timer on zone 1
    Zone1TimerSunday:
      description: Heating circuit sunday timer on zone 1
    Zone1OperativeMode:
      description: Heating circuit operative mode (on/off/day/night)
    ContinuosHeating:
      description: Continuos heating
    PowerEnergyConsumptionLastMonth:
      description: Power energy consumption from last month
    PowerEnergyConsumptionThisMonth:
      description: Power energy consumption from the actual month
{% endconfiguration %}