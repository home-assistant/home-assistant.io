---
title: "MQTT Logging"
description: "Instructions on how to setup MQTT Logging within Home Assistant."
logo: mqtt.png
---

<<<<<<< HEAD
The [logger](/components/logger/) integration allows the logging of received MQTT messages.
=======
The [logger](/integrations/logger/) integration allows the logging of received MQTT messages.
>>>>>>> upstream/next

```yaml
# Example configuration.yaml entry
logger:
  default: warning
  logs:
    homeassistant.components.mqtt: debug
```

