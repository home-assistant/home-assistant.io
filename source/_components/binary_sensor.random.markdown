---
layout: page
title: "Random Binary Sensor"
description: "Instructions how to integrate random state sensors into Home Assistant."
date: 2017-10-27 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.57
---


The `random` binary sensor platform is creating random states (`True`, 1, `on` or `False`, 0, `off`). This can be useful if you want to test automation rules. It generates a new state every time it is polled.

To enable the random binary sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: random
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
{% endconfiguration %}

See the [entity component options](/docs/configuration/platform_options/) to control how often the main component polls the random binary sensor. The default is 30 seconds.

