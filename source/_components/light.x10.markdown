---
layout: page
title: "X10"
description: "Instructions on how to setup X10 devices within Home Assistant."
date: 2016-07-27
sidebar: true
comments: false
sharing: true
footer: true
logo: x10.gif
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: 0.25
---

The `x10` light platform allows you to control your X10 based lights with Home Assistant.

Requires [Heyu x10](http://www.heyu.org) and a CM11A or a CM17A "FireCracker" interface.

To enable those lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: x10
    devices:
      - id: a2
        name: Guest Room
      - id: a3
        name: Bedroom Lamp
```

{% configuration %}
devices:
  description: A list of devices.
  required: true
  type: list
  keys:
    id:
      description: Device identifier. Composed of house code and unit id.
      required: true
      type: string
    name:
      description: A friendly name for the device.
      required: true
      type: string
{% endconfiguration %}
