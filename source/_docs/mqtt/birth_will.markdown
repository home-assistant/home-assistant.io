---
layout: page
title: "MQTT Birth and Last will"
description: "Instructions how to setup MQTT birth and last will messages within Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
---

MQTT supports so-called Birth and Last Will and Testament (LWT) messages. The former is used to send a message after the service has started, and the latter is used to notify other clients about a disconnect or ungracefully lost connection.

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

Configuration variables:

- **birth_message** (*Optional*):
  - **topic** (*Required*): The MQTT topic to publish the message.
  - **payload** (*Required*): The message content.
  - **qos** (*Optional*): The maximum QoS level of the topic. Default is 0.
  - **retain** (*Optional*): If the published message should have the retain flag on or not. Defaults to `True`.
- **will_message** (*Optional*):
  - **topic** (*Required*): The MQTT topic to publish the message.
  - **payload** (*Required*): The message content.
  - **qos** (*Optional*): The maximum QoS level of the topic. Default is 0.
  - **retain** (*Optional*): If the published message should have the retain flag on or not. Defaults to `True`.
