---
layout: page
title: "Opple Light"
description: "Instructions on how to integrate Opple lights into Home Assistant."
date: 2018-09-21 10:40
sidebar: true
comments: false
sharing: true
footer: true
logo: opple.png
ha_category: Light
ha_release: 0.80
ha_iot_class: "Local Polling"
---


The `opple` light platform allows you to control the state of your Opple smart light.

The platform supports all Opple lights with Wi-Fi support or lights that can be controlled by the App.

e.g.

![demo](https://img.alicdn.com/imgextra/i2/138006397/TB2mgp_XSOI.eBjSspmXXatOVXa_!!138006397.jpg)
![demo2](https://img.alicdn.com/imgextra/i3/138006397/TB2etN_XHOJ.eBjy1XaXXbNupXa_!!138006397.jpg)

To use your Opple light in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: opple
    name: LIGHT_NAME
    host: IP_ADDRESS
```

{% configuration %}
name:
  description: The name to use when displaying this light.
  required: false
  type: string
  default: opple light
host:
  description: "The IP address of your Opple light, eg. `192.168.0.21`."
  required: true
  type: string
{% endconfiguration %}

