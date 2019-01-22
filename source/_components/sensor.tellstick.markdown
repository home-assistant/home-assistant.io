---
layout: page
title: "TellStick Sensor"
description: "Instructions on how to integrate TellStick sensors into Home Assistant."
date: 2015-08-06 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: telldus_tellstick.png
ha_category: Sensor
ha_iot_class: "Local Polling"
---

The `tellstick` sensor platform allows you to get current meteorological data from a [TellStick](http://www.telldus.se/products/tellstick) device.

To use your TellStick device, you first have to set up your [Tellstick hub](/components/tellstick/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tellstick
```

{% configuration %}
sensor:
  description: "Entry for a sensor with the ID and its name, e.g., ID: Name."
  required: false
  type: string
only_named:
  description: Only show the named sensors. Set to `true` to hide sensors.
  required: false
  default: false
  type: boolean
temperature_scale:
  description: The scale of the temperature value.
  required: false
  default: °C
  type: string
datatype_mask:
  description: Mask to determine which sensor values to show based on. Please check the [TellCore tellcore.constants documentation](https://tellcore-py.readthedocs.org/en/v1.1.2/constants.html#module-tellcore.constants) for details.
  required: false
  default: 127
  type: integer
{% endconfiguration %}

## {% linkable_title Examples %}

In this section you find some real-life examples of how to use this sensor.

### {% linkable_title Full configuration %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tellstick
    135: Outside
    21: Inside
    only_named: true
    temperature_scale: "°C"
    datatype_mask: 1
```
