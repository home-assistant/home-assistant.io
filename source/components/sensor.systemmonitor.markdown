---
layout: page
title: "Monitor server resources"
description: "Instructions how to integrate server resources within Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

Theodor has contributed a new sensor platform to allow you to monitor disk usage, memory usage, CPU usage and running processes. This platform has superseded the process component which is now considered deprecated.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: systemmonitor
    resources:
      - type: disk_use_percent
        arg: /home
      - type: memory_free
      - type: process
        arg: kodi
```
