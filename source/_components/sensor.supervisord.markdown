---
layout: page
title: "Supervisord"
description: "Instructions how to integrate Supervisord within Home Assistant."
date: 2016-05-13 22:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.20
---

The `supervisord` platform allows you to track the states of [Supervisor](http://supervisord.org/).

```yaml
# Example configuration.yaml entry
sensor:
  platform: supervisord
  url: http://192.168.1.1:9001/RPC2
```

Configuration variables:

- **url** (*Optional*): The URL to track. Default to `http://localhost:9001/RPC2`.

