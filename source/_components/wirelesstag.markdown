---
layout: page
title: "WirelessTag"
description: "Instructions on how to integrate your Wireless Tags sensors within Home Assistant."
date: 2018-03-26 21:32
comments: false
sidebar: true
sharing: true
footer: true
logo: wirelesstag.png
ha_category: Hub
ha_iot_class: "Local Push"
---

The `wirelesstag` implementation allows you to integrate your [wirelesstag.net](http://wirelesstag.net) sensors tags in Home Assistant.

To enable tags set up with your [wirelesstag.net](http://wirelesstag.net) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
wirelesstag:
  username: you@example.com
  password: secret
```

{% configuration %}
  username:
    description: Username for your [wirelesstag.net](http://wirelesstag.net) account.
    required: true
    type: string
  password:
    description: Password for your [wirelesstag.net](http://wirelesstag.net) account.
    required: true
    type: string
{% endconfiguration %}

Finish your configuration by visiting the [WirelessTag binary sensor](/components/binary_sensor.wirelesstag/), [WirelessTag sensor](/components/sensor.wirelesstag/), or [WirelessTag switch](/components/switch.wirelesstag/) documentation.