---
layout: page
title: "Switchmate"
description: "Instructions on how to have Switchmate switches."
date: 2018-08-17 22:41
sidebar: true
comments: false
sharing: true
footer: true
logo: switchmate.png
ha_category: Switch
ha_release: 0.77
ha_iot_class: "Local Polling"
---

This `Switchmate` switch platform allow you to control Switchmate [devices]( https://www.mysimplysmarthome.com/products/switchmate-switches/).

To enable it, add the following lines to your `configuration.yaml`:

```yaml
switch:
  - platform: switchmate
    mac: 'cb:25:0b......'
```

{% configuration %}
mac:
  description: Device MAC address.
  required: true
  type: string
name:
  description: The name used to display the switch in the frontend.
  required: false
  type: string 
{% endconfiguration %}

