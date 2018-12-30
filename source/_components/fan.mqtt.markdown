---
layout: page
title: "MQTT Fan"
description: "Instructions on how to integrate MQTT fans into Home Assistant."
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

The `mqtt` fan platform lets you control your MQTT enabled fans.

## {% linkable_title Configuration %}

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT fan will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the fan will be `false` / `off`.

When a `state_topic` is not available, the fan will work in optimistic mode. In this mode, the fan will immediately change state after every command. Otherwise, the fan will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced even if a `state_topic` is available. Try to enable it if you are experiencing incorrect fan operation.

To enable MQTT fans in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
fan:
  - platform: mqtt
    command_topic: "bedroom_fan/on/set"
```

{% configuration %}
command_topic:
  description: The MQTT topic to publish commands to change the fan state.
  required: true
  type: string
name:
  description: The name of the fan.
  required: false
  type: string
  default: MQTT Fan
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
payload_on:
  description: The payload that represents the running state.
  required: false
  type: string
  default: "ON"
payload_off:
  description: The payload that represents the stop state.
  required: false
  type: string
  default: "OFF"
state_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the state."
  required: false
  type: string
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
optimistic:
  description: Flag that defines if lock works in optimistic mode
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: true
oscillation_state_topic:
  description: The MQTT topic subscribed to receive oscillation state updates.
  required: false
  type: string
oscillation_command_topic:
  description: The MQTT topic to publish commands to change the oscillation state.
  required: false
  type: string
payload_oscillation_on:
  description: The payload that represents the oscillation on state.
  required: false
  type: string
  default: oscillate_on
payload_oscillation_off:
  description: The payload that represents the oscillation off state.
  required: false
  type: string
  default: oscillate_off
oscillation_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the oscillation."
  required: false
  type: string
speed_state_topic:
  description: The MQTT topic subscribed to receive speed state updates.
  required: false
  type: string
speed_command_topic:
  description: The MQTT topic to publish commands to change speed state.
  required: false
  type: string
payload_low_speed:
  description: The payload that represents the fan's low speed.
  required: false
  type: string
  default: low
payload_medium_speed:
  description: The payload that represents the fan's medium speed.
  required: false
  type: string
  default: medium
payload_high_speed:
  description: The payload that represents the fan's high speed.
  required: false
  type: string
  default: high
speed_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the speed payload."
  required: false
  type: string
speeds:
  description: "List of speeds this fan is capable of running at. Valid entries are `off`, `low`, `medium` and `high`."
  required: false
  type: string list
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
  description: An ID that uniquely identifies this fan. If two fans have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
device:
  description: "Information about the device this fan is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    identifiers:
      description: A list of IDs that uniquely identify the device. For example a serial number.
      required: false
      type: list, string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list, tuple
    manufacturer:
      description: The manufacturer of the device.
      required: false
      type: string
    model:
      description: The model of the device.
      required: false
      type: string
    name:
      description: The name of the device.
      required: false
      type: string
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
{% endconfiguration %}

<p class='note warning'>
Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.
</p>

## {% linkable_title Examples %}

In this section you find some real-life examples of how to use this fan.

### {% linkable_title Full configuration %}

The example below shows a full configuration for a MQTT fan.

```yaml
# Example configuration.yaml entry
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
