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
ha_category: Sensor
ha_iot_class: "Local Push"
ha_release: 0.80
---

Integration between ebusd (https://github.com/john30/ebusd), daemon for communication with eBUS heating systems, and homeassistant using sensor component.

## {% linkable_title Configuration %}

Enable the sensor by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ebusd
    host: 127.0.0.1
    port: 8888
    name: 'ebusd'
    circuit: '700'
    monitored_conditions:
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

{% configuration %}
api_key:
  description: The API key to access the service.
- host:
  description: This is the IP address of your ebus daemon, eg. 127.0.0.1.
  required: true
  type: string
- circuit: 
  description: The heating circuit name to monitor, eg. 700.
  required: true
  type: string
- port:
  description: The port your ebus daemon uses, defaults to 8888.
  type: integer
  default: 8888
- name: 
  description: The name to use when displaying this ebusd instance.
  type: string
- monitored_conditions:
  description: array: List of condition to monitor.
  type: list
{% endconfiguration %}