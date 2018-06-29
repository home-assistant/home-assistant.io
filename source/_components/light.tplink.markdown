---
layout: page
title: "TP-Link Bulb"
description: "Instructions on how to integrate TP-Link bulbs into Home Assistant."
date: 2017-07-25 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tp-link.png
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: "0.50"
---


The `tplink` light platform allows you to control the state of your [TP-Link smart bulb](http://www.tp-link.com/en/products/list-5609.html).

Supported units:

- LB100
- LB110
- LB120
- LB130

To use your TP-Link light in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: tplink
    host: IP_ADDRESS
```

{% configuration %}
name:
  description: The name to use when displaying this bulb.
  required: false
  type: string
  default: TP-Link Light
host:
  description: "The IP address of your TP-Link bulb, eg. `192.168.1.32`."
  required: true
  type: string
{% endconfiguration %}

