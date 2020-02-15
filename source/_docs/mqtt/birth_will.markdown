---
title: "MQTT Birth and Last will"
description: "Instructions on how to setup MQTT birth and last will messages within Home Assistant."
logo: mqtt.png
---

MQTT supports so-called Birth and Last Will and Testament (LWT) messages. The former is used to send a message after the service has started, and the latter is used to notify other clients about an ungracefully disconnected client.

To integrate MQTT Birth and Last Will messages into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt:
  birth_message:
    topic: 'hass/status'
    payload: 'online'
  will_message:
    topic: 'hass/status'
    payload: 'offline'
```

{% configuration %}
birth_message:
  description: Birth Message.
  required: false
  type: list
  keys:
    topic:
      description: The MQTT topic to publish the message.
      required: true
      type: string
    payload:
      description: The message content.
      required: true
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
  description: Will Message
  required: false
  type: list
  keys:
    topic:
      description: The MQTT topic to publish the message.
      required: true
      type: string
    payload:
      description: The message content.
      required: true
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
