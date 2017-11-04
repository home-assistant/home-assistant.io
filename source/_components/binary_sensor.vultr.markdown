---
layout: page
title: "Vultr Binary Sensor"
description: "Instructions on how to set up Vultr binary sensors within Home Assistant."
date: 2017-10-17 21:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: vultr.png
ha_release: "0.57"
ha_iot_class: "Cloud Polling"
---

The `vultr` binary sensor platform allows you to monitor your [Vultr](https://www.vultr.com/) subscription to see if it is powered on or not.

To use this binary sensor, you first have to set up your [Vultr hub](/components/vultr/).

<p class='note'>
The following examples assume a subscription that has an ID of `123456` and a label of `Web Server`
</p>

Minimal `configuration.yaml` (produces `binary_sensor.vultr_web_server`):
```yaml
binary_sensor:
  - platform: vultr
    subscription: 123456
```

Full `configuration.yaml` (produces `binary_sensor.totally_awesome_server`):
```yaml
binary_sensor:
  - platform: vultr
    name: totally_awesome_server
    subscription: 12345
```

Configuration variables:

- **subscription** (*Required*): The subscription you want to monitor, this can be found in the URL when viewing a server
- **name** (*Optional*): The name you want to give this binary sensor, defaults to `Vultr {subscription label}`
