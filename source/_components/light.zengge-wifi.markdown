---
layout: page
title: "Zengge Wi-Fi"
description: "Instructions on how to integrate Zengge Wi-Fi bulbs into Home Assistant."
date: 2018-12-26 16:30
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

To enable the light, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: zengge-wifi
    host: IP_ADDRESS
```

{% configuration %}
name:
  description: The name to use when displaying this bulb.
  required: false
  type: string
  default: Zengge Bulb
host:
  description: "The IP address of your Zengge Wi-Fi bulb, eg. `192.168.1.100`."
  required: true
  type: string
{% endconfiguration %}

## {% linkable_title Adding multiple lights %}

You are able to add multiple lights by just adding multiple `zengge-wifi` platforms.

```yaml
light:
  - platform: zengge-wifi
    host: IP_ADDRESS_1
  - platform: zengge-wifi
    host: IP_ADDRESS_2
```