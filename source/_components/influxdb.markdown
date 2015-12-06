---
layout: component
title: "InfluxDB"
description: "Record events in InfluxDB."
date: 2015-12-6 13:08
sidebar: true
comments: false
sharing: true
footer: true
logo: influxdb.png
ha_category: Other
---

This component will allow you to record events to an InfluxDB database.

<p class='note warning'>
If you use Home Assistant 0.9, load this component as `influx`.
</p>

```yaml
# Example configuration.yaml entry
influxdb:
  host: DB_HOST_IP_ADDRESS
  # Optional, default: 8086
  port: 20000
  # Optional, default: home_assistant
  database: DB_TO_STORE_EVENTS
  # Optional
  username: MY_USER
  password: MY_PASS
```
