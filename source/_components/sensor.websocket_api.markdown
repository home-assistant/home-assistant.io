---
layout: page
title: "Websocket Connections Sensor"
description: "Instructions on how to count connected clients within Home Assistant."
date: 2019-03-20 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Utility
ha_release: 0.33
ha_iot_class: Local Push
ha_qa_scale: internal
redirect_from: 
  - /components/sensor.api_stream/
  - /components/sensor.api_streams/

---

The `websocket_api` sensor platform shows how many clients are connected to the stream API.

## {% linkable_title Configuration %}

To add the connected clients to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: websocket_api
```

### {% linkable_title Note %}

This replaces the previous `api_streams` sensor.
