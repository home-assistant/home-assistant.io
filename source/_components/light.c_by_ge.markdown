---
layout: page
title: "C by GE"
description: "Instructions on how to setup C by GE bulbs within Home Assistant."
date: 2018-12-10 18:38
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Push"
logo: ge.png
ha_release: 0.85
---

Support for [C by GE bulbs](https://www.cbyge.com/). These are Bluetooth LE bulbs that are available in plain white ("Life") and tunable white ("Sleep") versions.

## {% linkable_title Setup %}

Configure the bulbs using the C by GE app and then quit it. Note that the number of devices that can control your bulbs is equal to the number of bulbs you have configured - if you have one bulb then only one of Home Assistant and your phone can control it at one time, while if you have two bulbs then both Home Assistant and your phone can be connected simultaneously. This is because the bulbs form a mesh network that allows them to communicate with each other directly, rather than the control device having to connect to every device itself.

## {% linkable_title Configuration %}

To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: c_by_ge
    name: email_address
    password: password
```

{% configuration %}
name:
  description: The username used in the C by GE app.
  required: true
  type: string
password:
  description: The password used in the C by GE app.
  required: true
  type: string
{% endconfiguration %}
