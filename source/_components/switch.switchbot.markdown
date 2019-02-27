---
layout: page
title: "Switchbot"
description: "Instructions on how to set up Switchbot switches."
date: 2018-09-03 22:41
sidebar: true
comments: false
sharing: true
footer: true
logo: switchbot.png
ha_category: Switch
ha_release: 0.78
ha_iot_class: "Local Polling"
---

This `Switchbot` switch platform allows you to control Switchbot [devices]( https://www.switch-bot.com/).

To enable it, add the following lines to your `configuration.yaml`:

```yaml
switch:
  - platform: switchbot
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
