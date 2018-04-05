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
ha_iot_class: "Local Push and Cloud Polling"
ha_release: 0.67
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

<p class='note'>
  To enable local push notifications from the Tags Manager, you need to add the IP address of the Tags Manager into whitelist in `http` component; i.e., add it to `trusted_networks`. See the [HTTP](/components/http/) for details.
  Additionally, you need add at least one [WirelessTag binary sensor](/components/binary_sensor.wirelesstag/) in config to start receiving local push notifications.
</p>

<p class='note warning'>
  Tags Manager supports local push notifications for `http` schema only. So if your hass uses `https`, local push notifications are disabled and data is received via cloud polling.
</p>