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
ha_release: 0.67
---

To get your [wirelesstag.net](http://wirelesstag.net) binary sensors working within Home Assistant, please follow the instructions for the general [WirelessTag component](/components/wirelesstag).

To enable tags set up with your [wirelesstag.net](http://wirelesstag.net) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: wirelesstag
    monitored_conditions:
      - presence
      - door
      - low_battery
```

{% configuration %}
  monitored_conditions:
    description: The conditions types to monitor; valid values are specified below
    required: true
    type: list
{% endconfiguration %}

The following conditions can be monitored:

* (`presence`): On means in range, Off means out of range.
* (`motion`): On when a movement was detected, Off when clear.
* (`door`): On when a door is open, Off when the door is closed.
* (`cold`): On means temperature become too cold, Off means normal.
* (`heat`): On means hot, Off means normal.
* (`dry`): On means too dry (humidity), Off means normal.
* (`wet`): On means too wet (humidity), Off means normal.
* (`light`): On means light detected, Off means no light.
* (`moisture`): On means moisture detected (wet), Off means no moisture (dry).
* (`low_battery`): On means tag battery is low, Off means normal.
