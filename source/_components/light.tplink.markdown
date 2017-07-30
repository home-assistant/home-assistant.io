---
layout: page
title: "TPLink Bulb"
description: "Instructions how to integrate TPLink bulbs into Home Assistant."
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


The `tplink` light platform allows you to control the state of your [TPLink smart bulb](http://www.tp-link.com/en/products/list-5609.html).

Supported units:

- LB100
- LB110
- LB120
- LB130

To use your TPLink light in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: tplink
    host: IP_ADDRESS
```

Configuration variables:

- **host** (*Required*): The IP address of your TP-Link bulb, eg. `192.168.1.32`.
- **name** (*Optional*): The name to use when displaying this bulb.


