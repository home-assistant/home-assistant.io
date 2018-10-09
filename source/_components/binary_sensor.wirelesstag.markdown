---
layout: page
title: "WirelessTag Binary Sensor"
description: "Instructions on how to integrate Wireless Tags sensors within Home Assistant."
date: 2018-03-26 21:49
comments: false
sidebar: true
sharing: true
footer: true
logo: wirelesstag.png
ha_category: Binary Sensor
ha_iot_class: "Local Push and Cloud Polling"
ha_release: 0.68
---

To get your [wirelesstag.net](http://wirelesstag.net) binary sensors working within Home Assistant, please follow the instructions for the general [WirelessTag component](/components/wirelesstag).

## {% linkable_title Configuration %}

To enable tags set up with your [wirelesstag.net](http://wirelesstag.net) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: wirelesstag
    monitored_conditions:
      - presence
      - door
      - battery
```

{% configuration %}
monitored_conditions:
  description: The conditions types to monitor.
  required: true
  type: list
  keys:
    presence:
      description: On means in range, Off means out of range.
    motion:
      description: On when a movement was detected, Off when clear.
    door:
      description: On when a door is open, Off when the door is closed.
    cold:
      description: On means temperature become too cold, Off means normal.
    heat:
      description: On means hot, Off means normal.
    dry:
      description: On means too dry (humidity), Off means normal.
    wet:
      description: On means too wet (humidity), Off means normal.
    light:
      description: On means light detected, Off means no light.
    moisture:
      description: On means moisture detected (wet), Off means no moisture (dry).
    battery:
      description: On means tag battery is low, Off means normal.
{% endconfiguration %}

