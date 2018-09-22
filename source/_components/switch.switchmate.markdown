---
layout: page
title: "Switchmate"
description: "Instructions on how to set up Switchmate switches."
date: 2018-08-17 22:41
sidebar: true
comments: false
sharing: true
footer: true
logo: switchmate-logo-rgb.png
ha_category: Switch
ha_release: 0.78
ha_iot_class: "Local Polling"
---

This `Switchmate` switch platform allows you to control Switchmate [devices]( https://www.mysimplysmarthome.com/products/switchmate-switches/).

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
flip_on_off:
  description: Option to flip the on/off state.
  required: false
  type: boolean 
  default: false
{% endconfiguration %}


The component is tested with SwitchMate Lighting Control Rocker and SwitchMate Lighting Control Toggle.
