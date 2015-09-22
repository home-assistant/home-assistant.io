---
layout: page
title: "MQTT switch support"
description: "Instructions how to integrate MQTT switches into Home Assistant."
date: 2015-08-30 23:38
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/mqtt.png' class='brand pull-right' />
In an ideal scenario, the MQTT device will have a state topic to publish
state changes. If these messages are published with RETAIN flag, the MQTT
switch will receive an instant state update after subscription and will
start with correct state. Otherwise, the initial state of the switch will
be false/off.

When a state topic is not available, the switch will work in optimistic mode.
In this mode, the switch will immediately change state after every command.
Otherwise, the switch will wait for state confirmation from device
(message from state_topic).

Optimistic mode can be forced, even if state topic is available.
Try to enable it, if experiencing incorrect switch operation.

```yaml
# Example configuration.yml entry
switch:
  platform: mqtt
  name: "Bedroom Switch"
  state_topic: "home/bedroom/switch1"
  command_topic: "home/bedroom/switch1/set"
  qos: 0
  payload_on: "ON"
  payload_off: "OFF"
  optimistic: false
```

Configuration variables:

- **name** (*Optional*): The name of the switch. Default is 'MQTT Switch'.
- **state_topic** (*Optional*): The MQTT topic subscribed to receive state updates.
- **command_topic** (*Required*): The MQTT topic to publish commands to change the switch state.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
- **payload_on** (*Optional*): The payload that represents enabled state. Default is "ON".
- **payload_off** (*Optional*): The payload that represents disabled state. Default is "OFF".
- **optimistic** (*Optional*): Flag that defines if switch works in optimistic mode. Default is true if no state topic defined, else false.

<p class='note warning'>
Make sure that your topics match exact. <code>some-topic/</code> and <code>some-topic</code> are different topics.
</p>
