---
layout: page
title: "MQTT Lock"
description: "Instructions on how to integrate MQTT locks into Home Assistant."
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

## {% linkable_title Configuration %}

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT lock will receive an instant state update after subscription and will start with correct state. Otherwise, the initial state of the lock will be `false` / unlocked.

When a `state_topic` is not available, the lock will work in optimistic mode. In this mode, the lock will immediately change state after every command. Otherwise, the lock will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if state topic is available. Try to enable it, if experiencing incorrect lock operation.

To enable MQTT locks in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lock:
  - platform: mqtt
    command_topic: "home/frontdoor/set"
```

{% configuration %}
command_topic:
  description: The MQTT topic to publish commands to change the lock state.
  required: true
  type: string
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
name:
  description: The name of the lock.
  required: false
  type: string
  default: MQTT Lock
payload_lock:
  description: The payload that represents enabled/locked state.
  required: false
  type: string
  default: LOCK
payload_unlock:
  description: The payload that represents disabled/unlocked state.
  required: false
  type: string
  default: UNLOCK
optimistic:
  description: Flag that defines if lock works in optimistic mode.
  required: false
  type: string
  default: "`true` if no `state_topic` defined, else `false`."
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload."
  required: false
  type: string
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates.
  required: false
  type: string
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
unique_id:
   description: An ID that uniquely identifies this lock. If two locks have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
device:
  description: 'Information about the device this lock is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
  required: false
  type: map
  keys:
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: list, string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    manufacturer:
      description: 'The manufacturer of the device.'
      required: false
      type: string
    model:
      description: 'The model of the device.'
      required: false
      type: string
    name:
      description: 'The name of the device.'
      required: false
      type: string
    sw_version:
      description: 'The firmware version of the device.'
      required: false
      type: string
{% endconfiguration %}

<p class='note warning'>
Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.
</p>

## {% linkable_title Examples %}

In this section you will find some real-life examples of how to use this lock.

### {% linkable_title Full configuration %}

The example below shows a full configuration for a MQTT lock.

{% raw %}
```yaml
# Example configuration.yaml entry
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
    value_template: '{{ value.x }}'
```
{% endraw %}

Keep an eye on retaining messages to keep the state as you don't want to unlock your door by accident when you restart something.

For a check you can use the command line tools `mosquitto_pub` shipped with `mosquitto` to send MQTT messages. This allows you to operate your lock manually:

```bash
$  mosquitto_pub -h 127.0.0.1 -t home-assistant/frontdoor/set -m "LOCK"
```

