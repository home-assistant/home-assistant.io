---
layout: page
title: "Vultr Sensor"
description: "Instructions on how to integrate Vultr sensor within Home Assistant."
date: 2017-10-17 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: vultr.png
ha_release: "0.57"
ha_category: System Monitor
ha_iot_class: "Cloud Polling"
---


The `vultr` sensor will allow you to view current bandwidth usage and pending charges against your [Vultr](https://www.vultr.com/) subscription.

To use this sensor, you must set up your [Vultr hub](/components/vultr/).

<p class='note'>
The following examples assume a subscription that has an ID of `123456` and a label of `Web Server`
</p>

Minimal `configuration.yaml` (produces `sensor.vultr_web_server_current_bandwidth_used` and `sensor.vultr_web_server_pending_charges`):
```yaml
sensor:
  - platform: vultr
    subscription: 123456
```

Full `configuration.yaml` using `{}` to format condition name (produces `sensor.server_current_bandwidth_used` and `sensor.server_pending_charges`):
```yaml
sensor:
  - platform: vultr
    name: Server {}
    subscription: 123456
    monitored_conditions:
      - current_bandwidth_used
      - pending_charges
```

Custom `configuration.yaml` with only one condition monitored (produces `sensor.web_server_bandwidth`):
```yaml
sensor:
  - platform: vultr
    name: Web Server Bandwidth
    subscription: 123456
    monitored_conditions:
      - current_bandwidth_used
```

Configuration variables:

- **subscription** (*Required*): The Vultr subscription to monitor, this can be found in the URL when viewing a subscription
- **name** (*Optional*): The name to give this sensor, defaults to `Vultr {Vultr subscription label} {monitored condition name}`.
- **monitored_conditions** array (*Optional*): List of items you want to monitor for each subscription. Defaults to all of them if omitted.
  - **current_bandwidth_used**: The current (invoice period) bandwidth usage in Gigabytes (GB).
  - **pending_charges**: The current (invoice period) charges that have built up for this subscription. Value is in US Dollars (US$).
