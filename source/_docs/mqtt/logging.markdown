---
layout: page
title: "MQTT Logging"
description: "Instructions how to setup MQTT Logging within Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
---

The [logger](/components/logger/) component allow the logging of received MQTT messages.

```yaml
# Example configuration.yaml entry
logger:
  default: warning
  logs:
    homeassistant.components.mqtt: debug
```

