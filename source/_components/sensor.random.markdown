---
layout: page
title: "Random Sensor"
description: "Instructions on how to integrate random number sensors into Home Assistant."
date: 2016-10-30 12:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Utility
ha_iot_class: "Local Polling"
ha_release: 0.32
ha_qa_scale: internal
---


The `random` sensor platform is creating random sensor values (integers) out of a given range. Returned values form a [discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution), meaning that each integer value in the range configured is equally likely to be drawn. This can be useful if you want to test automation rules. It generates a new value every time it is polled.

## {% linkable_title Configuration %}

To enable the random sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: random
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: Random Sensor
minimum:
  description: Lower limit for the values.
  required: false
  type: string
  default: 0
maximum:
  description: Upper limit for the values.
  required: false
  type: integer
  default: 20
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
{% endconfiguration %}

