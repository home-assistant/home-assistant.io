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

Configuration variables:

- **ID: Name** (*Optional*): Entry for a sensor with the name for it and its ID.
- **only_named** (*Optional*): Only show the named sensors. Set to `True` to hide sensors.
- **temperature_scale** (*Optional*): The scale of the temperature value.
- **datatype_mask** (*Optional*): Mask to determine which sensor values to show based on. Please check the [TellCore tellcore.constants documentation](https://tellcore-py.readthedocs.org/en/v1.1.2/constants.html#module-tellcore.constants) for details.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Full configuration %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tellstick
    135: Outside
    21: Inside
    only_named: True
    temperature_scale: "°C"
    datatype_mask: 1
```
