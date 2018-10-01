---
layout: page
title: "ebusd"
description: "The eBusd sensor allows the integration between eBUS heating system and Home Assistant."
date: 2018-10-01 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ebusd.png
ha_category: Sensor
ha_iot_class: "Local Push"
ha_release: 0.79
---

Integration between ebusd, daemon for communication with eBUS heating systems, and homeassistant using sensor component.

Enable the sensor by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ebusd
    host: 127.0.0.1
    port: 8888
    name: 'ebusd'
    circuit: '700'
    monitored_variables:
      - 'MaxFlowTemperatureDesired'
      - 'MinFlowTemperatureDesired'
      - 'WaterPressure'
      - 'PumpStatus'
      - 'HWTemperatureDesired'
      - 'HWTimerMonday'
      - 'HWTimerTuesday'
      - 'HWTimerWednesday'
      - 'HWTimerThursday'
      - 'HWTimerFriday'
      - 'HWTimerSaturday'
      - 'HWTimerSunday'
      - 'Zone1NightTemperature'
      - 'Zone1DayTemperature'
      - 'Zone1RoomTemperature'
      - 'Zone1ActualRoomTemperatureDesired'
      - 'Zone1TimerMonday'
      - 'Zone1TimerTuesday'
      - 'Zone1TimerWednesday'
      - 'Zone1TimerThursday'
      - 'Zone1TimerFriday'
      - 'Zone1TimerSaturday'
      - 'Zone1TimerSunday'
      - 'Zone1OperativeMode'
      - 'PowerEnergyConsumptionThisMonth'
```
