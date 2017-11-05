---
layout: page
title: "Vultr Switch"
description: "Instructions on how to set up Vultr switches within Home Assistant."
date: 2017-10-17 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: vultr.png
ha_category: Switch
ha_release: "0.57"
ha_iot_class: "Cloud Polling"
---

The `vultr` switch platform allows you to control (start/stop) your [Vultr](https://www.vultr.com/) subscription.

To control your Vultr subscription, you first have to set up your [Vultr hub](/components/vultr/).

<p class='note'>
The following examples assume a subscription that has an ID of `123456` and a label of `Web Server`
</p>

Minimal `configuration.yaml` (produces `switch.vultr_web_server`):
```yaml
switch:
  - platform: vultr
    subscription: 123456
```

Full `configuration.yaml` (produces `switch.amazing_server`):
```yaml
switch:
  - platform: vultr
    name: Amazing Server
    subscription: 123456
```

Configuration variables:

- **subscription** (*Required*): List of droplets you want to control.
- **name** (*Optional*): The name you want to give this switch, defaults to `Vultr {subscription label}`
