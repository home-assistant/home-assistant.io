---
title: "MQTT Birth and Last will"
description: "Instructions on how to setup MQTT birth and last will messages within Home Assistant."
logo: mqtt.png
---

Home Assistant's MQTT integration supports so-called Birth and Last Will and Testament (LWT) messages. The former is used to send a message after the service has started, and the latter is used to notify other clients about a disconnected client. Please note that the LWT message will be sent both in case of a clean (e.g. Home Assistant shutting down) and in case of an unclean (e.g. Home Assistant crashing or losing its network connection) disconnect.

By default, Home Assistant sends `online` and `offline` to `homeassistant/status`.

To customize the MQTT Birth and Last Will messages, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt:
  birth_message:
    topic: "hass/status"
    payload: "online"
  will_message:
    topic: "hass/status"
    payload: "offline"
```

{% configuration %}
birth_message:
  description: Birth Message. Set to the empty dict, `{}`, to disable publishing a birth message.
  required: false
  type: map
  keys:
    topic:
      description: The MQTT topic to publish the message.
      required: false
      default: homeassistant/status
      type: string
    payload:
      description: The message content.
      required: false
      default: online
      type: string
    qos:
      description: The maximum QoS level of the topic.
      required: false
      default: 0
      type: integer
    retain:
      description: If the published message should have the retain flag on or not.
      required: false
      default: false
      type: boolean
will_message:
  description: Will Message. Set to the empty dict, `{}`, to disable publishing a will message.
  required: false
  type: map
  keys:
    topic:
      description: The MQTT topic to publish the message.
      required: false
      default: homeassistant/status
      type: string
    payload:
      description: The message content.
      required: false
      default: offline
      type: string
    qos:
      description: The maximum QoS level of the topic.
      required: false
      default: 0
      type: integer
    retain:
      description: If the published message should have the retain flag on or not.
      required: false
      default: false
      type: boolean
{% endconfiguration %}
