---
layout: component
title: "MQTT Eventstream"
description: "Instructions how to setup MQTT eventstream within Home Assistant."
date: 2016-01-13 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Others
---

The `mqtt_eventstream` components two Home Assistant instances via MQTT.

To integrate MQTT Eventstream into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt_eventstream:
  publish_topic: MyServerName
  subscribe_topic: OtherHaServerName
```

Configuration variables:

- **publish_topic** (*Required*): Topic for pushlishing local events
- **subscribe_topic** (*Required*): Topic to recieve events from the remote server.

