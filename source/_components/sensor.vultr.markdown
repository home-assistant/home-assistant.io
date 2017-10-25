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


The `vultr` sensor will allow you to view current bandwidth usage and pending charges against your [Vultr](https://www.vultr.com/) virtual private server.

To use this sensor, you must set up your [Vultr hub](/components/vultr/).

<p class='note'>
The following examples assume a subscription that has an ID of `123456` and a label of `Web Server`
</p>

minimal `configuration.yaml` example:
```yaml
sensor:
  - platform: vultr
    subscription: 123456
```

Creates two sensors, `sensor.web_server_current_bandwidth_used` and `sensor.web_server_pending_charges`.


Full `configuration.yaml` example:
```yaml
sensor:
  - platform: vultr
    name: Web Server
    subscription: 123456
    monitored_conditions:
      - current_bandwidth_used
      - pending_charges
```

Creates two sensors, `sensor.web_server` and `sensor.web_server_2`.

Configuration variables:

- **name** (*Optional*): The name to give this sensor, defaults to `{Vultr subscription label} {monitored condition name}`.
- **subscription** (*Required*): The Vultr subscription to monitor, this can be found in the URL when viewing a subscription
- **monitored_conditions** array (*Optional*): List of items you want to monitor for each subscription. Defaults to all of them if omitted.
  - **current_bandwidth_used**: The current (invoice period) bandwidth usage in Gigabytes (GB).
  - **pending_charges**: The current charges that have built up for this subscription. Value is in US Dollars (US$).
