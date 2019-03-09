---
layout: page
title: "Random Binary Sensor"
description: "Instructions on how to integrate random state sensors into Home Assistant."
date: 2017-10-27 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Utility
ha_iot_class: "Local Polling"
ha_release: 0.57
ha_qa_scale: internal
---

The `random` binary sensor platform is creating random states (`true`, 1, `on` or `false`, 0, `off`). This can be useful if you want to test automation rules. It generates a new state every time it is polled.

## {% linkable_title Configuration %}

To enable the random binary sensor, add the following lines to your `configuration.yaml` file:

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
  default: Random Binary Sensor
{% endconfiguration %}
