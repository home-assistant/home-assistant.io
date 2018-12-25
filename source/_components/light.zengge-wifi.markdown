---
layout: page
title: "Zengge Wi-Fi"
description: "Instructions on how to integrate Zengge Wi-Fi bulbs into Home Assistant."
date: 2017-01-14 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: zengge.png
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: 0.85
---

The `zengge-wifi` platform allows you to integrate your [Zengge Wi-Fi bulbs](http://www.zengge.com/) into Home Assistant.

## {% linkable_title Configuration %}

To enable the lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: zengge-wifi
    devices:
      "192.168.1.39":
        name: Living Room
```

{% configuration %}
devices:
  description: The list of your devices/bulbs.
  required: true
  type: list
  keys:
    ip_address:
      description: The IP address of the bulb.
      required: true
      type: list
      keys:
        name:
          description: The friendly name for the frontend.
          required: false
          type: string
{% endconfiguration %}
