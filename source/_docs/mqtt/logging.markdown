---
title: "MQTT Logging"
description: "Instructions on how to setup MQTT Logging within Home Assistant."
logo: mqtt.png
---

The [logger](/integrations/logger/) integration allows the logging of received MQTT messages.

```yaml
# Example configuration.yaml entry
logger:
  default: warning
  logs:
    homeassistant.components.mqtt: debug
```
