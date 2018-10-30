---
layout: page
title: Zigbee Light
description: "Instructions on how to set up Zigbee lights within Home Assistant."
date: 2016-01-28 12:38
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: Light
ha_release: 0.12
ha_iot_class: "Local Polling"
---

A Zigbee light in this context is a light connected to one of the digital output pins on a Zigbee module. It can simply be switched on and off. By default, a light is considered `on` when the Zigbee device's digital output is held `high` and considered `off` when it is held `low`. This behavior can be inverted by setting the `on_state` configuration variable to `low`.

To configure a digital output pin as light, add the following to your `configuration.yaml` file:

```yaml
light:
  - name: Desk Lamp
    platform: zigbee
    pin: 0
```

{% configuration %}
name:
  description: The name you would like to give the light in Home Assistant.
  required: true
  type: string
pin:
  description: The number identifying which pin to use.
  required: true
  type: integer
address:
  description: The long 64-bit address of the remote Zigbee device whose digital output pin you would like to switch. Do not include this variable if you want to switch the local Zigbee device's pins.
  required: false
  type: string
on_state:
  description: Either `high` or `low`, depicting whether the digital output pin is pulled `high` or `low` when the light is turned on.
  required: false
  default: high
  type: string
{% endconfiguration %}
