---
layout: page
title: "API Stream Sensor"
description: "Instructions on how to count clients using the API stream within Home Assistant."
date: 2016-11-19 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_release: 0.33
ha_iot_class: "Local Push"
---

The `api_stream` sensor platform shows how many clients are connected to the stream API 

To add the connected clients to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: api_streams
```

