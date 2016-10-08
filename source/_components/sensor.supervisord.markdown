---
layout: page
title: "Supervisord"
description: "Instructions how to integrate Supervisord within Home Assistant."
date: 2016-05-13 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: supervisord.png
ha_category: System Monitor
ha_release: "0.20"
---

The `supervisord` platform allows you to track the states of [Supervisord](http://supervisord.org/).

To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: supervisord
```

Configuration variables:

- **url** (*Optional*): The URL to track. Default to `http://localhost:9001/RPC2`.

