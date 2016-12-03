---
layout: page
title: "MQTT Eventstream"
description: "Instructions how to setup MQTT eventstream within Home Assistant."
date: 2016-01-13 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Other
ha_release: 0.11
---

The `mqtt_eventstream` components connects two Home Assistant instances via MQTT.

To integrate MQTT Eventstream into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt_eventstream:
  publish_topic: MyServerName
  subscribe_topic: OtherHaServerName
```

Configuration variables:

- **publish_topic** (*Required*): Topic for publishing local events
- **subscribe_topic** (*Required*): Topic to receive events from the remote server.

