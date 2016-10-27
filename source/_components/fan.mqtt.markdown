---
layout: page
title: "MQTT Fan"
description: "Instructions how to integrate MQTT fans into Home Assistant."
date: 2016-08-27 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Fan
ha_release: 0.27
ha_iot_class: depends
---

The `mqtt` fan platform let you control your MQTT enabled fans.

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with `RETAIN` flag, the MQTT fan will receive an instant state update after subscription and will start with correct state. Otherwise, the initial state of the fan will be `false`.

When a `state_topic` is not available, the fan will work in optimistic mode. In this mode, the fan will immediately change state after every command. Otherwise, the fan will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced even if a `state_topic` is available. Try to enable it if you are experiencing incorrect fan operation.

To enable MQTT fans in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
fan:
- platform: mqtt
  name: "Bedroom Fan"
  state_topic: "bedroom_fan/on/state"
  command_topic: "bedroom_fan/on/set"
  oscillation_state_topic: "bedroom_fan/oscillation/state"
  oscillation_command_topic: "bedroom_fan/oscillation/set"
  speed_state_topic: "bedroom_fan/speed/state"
  speed_command_topic: "bedroom_fan/speed/set"
  qos: 0
  payload_on: "true"
  payload_off: "false"
  payload_oscillation_on: "true"
  payload_oscillation_off: "false"
  payload_low_speed: "low"
  payload_medium_speed: "medium"
  payload_high_speed: "high"
  speeds:
    - low
    - medium
    - high
```

Configuration variables:

- **name** (*Optional*): The name of the fan. Default is 'MQTT Fan'.
- **state_topic** (*Optional*): The MQTT topic subscribed to receive state updates.
- **command_topic** (*Required*): The MQTT topic to publish commands to change the lock state.
- **oscillation_state_topic** (*Optional*): The MQTT topic subscribed to receive oscillation state updates.
- **oscillation_command_topic** (*Optional*): The MQTT topic to publish commands to change the oscillation state.
- **speed_state_topic** (*Optional*): The MQTT topic subscribed to receive speed state updates.
- **speed_command_topic** (*Optional*): The MQTT topic to publish commands to change speed state.
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
- **payload_on** (*Optional*): The payload that represents the running state. Default is "ON".
- **payload_off** (*Optional*): The payload that represents the stop state. Default is "OFF".
- **payload_oscillation_on** (*Optional*): The payload that represents the oscillation on state. Default is "oscillate_on".
- **payload_oscillation_off** (*Optional*): The payload that presents the oscillation off state. Default is "oscillate_off"
- **payload_low_speed** (*Optional*): The payload that represents the fan's low speed.
- **payload_medium_speed** (*Optional*): The payload that represents the fan's medium speed.
- **payload_high_speed** (*Optional*): The payload that represents the fan's high speed.
- **speeds** (*Optional*): List of available speeds on the fan. Default is "off", "low", "med", and "high".
- **optimistic** (*Optional*): Flag that defines if lock works in optimistic mode. Default is `true` if no state topic defined, else `false`.
- **retain** (*Optional*): If the published message should have the retain flag on or not.
- **state_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the state payload.
- **oscillation_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the oscillation payload.
- **speed_value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the speed payload.

<p class='note warning'>
Make sure that your topic is an exact match. `some-topic/` and `some-topic` are different topics.
</p>
