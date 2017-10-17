---
layout: page
title: "Vultr"
description: "Instructions how to integrate Vultr sensor within Home Assistant."
date: 2017-10-17 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: vultr.png
ha_release: "0.56"
ha_category: System Monitor
ha_iot_class: "Cloud Polling"
---


The `vultr` sensor will allow you to view current bandwidth usage and pending charges against your [Vultr](https://www.vultr.com/) virtual private server(s).

Then add the data to your `configuration.yaml` file as shown in the example:

```yaml
sensor:
  - platform: vultr
    monitored_conditions:
      - current_bandwidth_gb
      - pending_charges
    subs:
      - "123456"
      - "567899"
```

Configuration variables:

- **subs** (*Required*): List of Vultr subscriptions to monitor
- **monitored_conditions** array (*Optional*): List of items you want to monitor for each subscription. Defaults to all of them if omitted.
  - **current_bandwidth_gb**: The current (invoice period) bandwidth usage in Giga Bytes (GB).
  - **pending_charges**: The current charges that have built up for this subscription. Value is in US Dollars (US$).
