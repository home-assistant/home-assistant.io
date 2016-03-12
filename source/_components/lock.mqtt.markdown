---
layout: page
title: "MQTT Lock"
description: "Instructions how to integrate MQTT locks into Home Assistant."
date: 2016-02-28 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Lock
---

The `mqtt` lock platform let you control your MQTT enabled locks.

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with RETAIN flag, the MQTT lock will receive an instant state update after subscription and will start with correct state. Otherwise, the initial state of the switch will be false/unlocked.

When a `state_topic` is not available, the lock will work in optimistic mode. In this mode, the lock will immediately change state after every command. Otherwise, the lock will wait for state confirmation from device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try to enable it, if experiencing incorrect lock operation.

To enable MQTT locks in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
lock:
  platform: mqtt
  name: Frontdoor 
  state_topic: "home/frontdoor/"
  command_topic: "home/frontdoor/set"
  payload_lock: "LOCK"
  payload_unlock: "UNLOCK"
  optimistic: false
  qos: 0
  retain: true
  value_template: '{% raw %}{{ value.x }}{% endraw %}'
```

Configuration variables:

- **name** (*Optional*): The name of the lock. Default is 'MQTT Lock'.
- **state_topic** (*Optional*): The MQTT topic subscribed to receive state updates.
- **command_topic** (*Required*): The MQTT topic to publish commands to change the lock state.
- **payload_lock** (*Optional*): The payload that represents enabled/locked state. Default is "LOCK".
- **payload_unlock** (*Optional*): The payload that represents disabled/unlocked state. Default is "UNLOCK".
- **optimistic** (*Optional*): Flag that defines if lock works in optimistic mode. Default is true if no state topic defined, else false.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
- **retain** (*Optional*): If the published message should have the retain flag on or not.
- **value_template** (*Optional*): Defines a [template](/getting-started/templating/) to extract a value from the payload.

<p class='note warning'>
Make sure that your topic match exact. `some-topic/` and `some-topic` are different topics.
</p>
