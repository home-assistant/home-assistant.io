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
ha_release: "0.58"
ha_iot_class: "Cloud Polling"
requirement: none
---

The `vultr` binary sensor platform allows you to monitor your [Vultr](https://www.vultr.com/) subscription to see if it is powered on or not.

To use this binary sensor, you first have to set up your [Vultr hub](/components/vultr/).

<p class='note'>
The following examples assume a subscription that has an ID of `123456` and a label of `Web Server`
</p>

Minimal `configuration.yaml` (produces `binary_sensor.vultr_web_server`):

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: vultr
    subscription: 123456
```

{% configuration %}
subscription:
  description: The subscription you want to monitor, this can be found in the URL when viewing a server.
  required: true
  type: string
name:
  description: The name you want to give this binary sensor.
  required: false
  default: "Vultr {subscription label}"
  type: string
{% endconfiguration %}


Full `configuration.yaml` (produces `binary_sensor.totally_awesome_server`):

```yaml
binary_sensor:
  - platform: vultr
    name: totally_awesome_server
    subscription: 12345
```

