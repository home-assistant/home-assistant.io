---
layout: page
title: "Random Sensor"
description: "Instructions how to integrate random number sensors into Home Assistant."
date: 2016-10-30 12:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.32
---


The `random` sensor platform is creating random sensor values (integers) out of a given range. This can be useful if you want to test automation rules. It generates a new value every time it is polled.

To enable the random sensor, add the following lines to your `configuration.yaml`:

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
  type: int
  default: 20
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
{% endconfiguration %}

See the [entity component options][entity-docs] to control how often the main component polls the random sensor. The default is 30 seconds.

[entity-docs]: https://home-assistant.io/docs/configuration/platform_options/
