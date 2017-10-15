---
layout: page
title: "http_rgb"
description: "Instructions how to setup http_rgb lights within Home Assistant."
date: 2017-10-13 14:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: 0.56
---

The `http_rgb` light platform lets you control lights that use a simple [HTTP API protocol](https://github.com/robhowlett/http_rgb/blob/master/README.md#protocol).

To enable `http_rgb` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: http_rgb
    host: IP_ADDRESS
```

{% configuration %}
  host:
    description: The IP address of the device you're controlling.
    required: true
    type: string
  name:
    description: Name to use in the frontend.
    required: false
    type: string
{% endconfiguration %}
