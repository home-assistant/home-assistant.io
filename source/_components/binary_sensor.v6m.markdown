---
layout: page
title: "V6M Binary Sensor"
description: "Configuring a V6M sensor."
date: 2018-10-05 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: v6m.jpg
ha_category: Binary Sensor 
featured: False
ha_release: 0.01
ha_iot_class: "Local Polling"
---

To enable this sensor, you first have to set up [v6m](/components/v6m/), and add the following lines to your `configuration.yaml` file.

## {% linkable_title Configuration %}

Unfortunately, the sensors on the V6M are polled every second. This limits the use of these sensors to inputs that remain on/off for at least the polling interval.

``` yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: v6m
    sensors:
        0: "Tripwire"
        1: "Weight Sensor"
```

{% configuration %}
sensors:
  description: A list of sensors.
  required: true
  type: list
  keys:
    num:
      description: The sensor number starting at 0.
      required: true
      type: int between 0 and 7
    name:
      description: The name of the sensor (component).
      required: true
      type: string
{% endconfiguration %}
