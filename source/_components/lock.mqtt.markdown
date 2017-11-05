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
ha_release: 0.15
ha_iot_class: depends
---

The `mqtt` lock platform lets you control your MQTT enabled locks.

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT lock will receive an instant state update after subscription and will start with correct state. Otherwise, the initial state of the lock will be `false` / unlocked.

When a `state_topic` is not available, the lock will work in optimistic mode. In this mode, the lock will immediately change state after every command. Otherwise, the lock will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try to enable it, if experiencing incorrect lock operation.

To enable MQTT locks in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
lock:
  - platform: mqtt
    command_topic: "home/frontdoor/set"
```

Configuration variables:

- **command_topic** (*Required*): The MQTT topic to publish commands to change the lock state.
- **name** (*Optional*): The name of the lock. Default is 'MQTT Lock'.
- **state_topic** (*Optional*): The MQTT topic subscribed to receive state updates.
- **payload_lock** (*Optional*): The payload that represents enabled/locked state. Default is "LOCK".
- **payload_unlock** (*Optional*): The payload that represents disabled/unlocked state. Default is "UNLOCK".
- **optimistic** (*Optional*): Flag that defines if lock works in optimistic mode. Default is `true` if no `state_topic` defined, else `false`.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
- **retain** (*Optional*): If the published message should have the retain flag on or not.
- **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.

<p class='note warning'>
Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.
</p>

## {% linkable_title Examples %}

In this section you will find some real life examples of how to use this lock.

### {% linkable_title Full configuration %}

The example below shows a full configuration for a MQTT lock.

```yaml
# Example configuration.yml entry
lock:
  - platform: mqtt
    name: Frontdoor 
    state_topic: "home-assistant/frontdoor/"
    command_topic: "home-assistant/frontdoor/set"
    payload_lock: "LOCK"
    payload_unlock: "UNLOCK"
    optimistic: false
    qos: 1
    retain: true
    value_template: '{% raw %}{{ value.x }}{% endraw %}'
```

Keep an eye on retaining messages to keep the state as you don't want to unlock your door by accident when you restart something. 

For a check you can use the command line tools `mosquitto_pub` shipped with `mosquitto` to send MQTT messages. This allows you to operate your lock manually:

```bash
$  mosquitto_pub -h 127.0.0.1 -t home-assistant/frontdoor/set -m "LOCK"
```

