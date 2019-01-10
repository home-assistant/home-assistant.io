---
layout: page
title: "MQTT HVAC"
description: "Instructions on how to integrate MQTT HVAC into Home Assistant."
date: 2017-07-31 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Climate
ha_release: 0.55
ha_iot_class: "Local Polling"
---

The `mqtt` climate platform lets you control your MQTT enabled HVAC devices.

The platform currently works in optimistic mode, which means it does not obtain states from MQTT topics, but it sends and remembers control commands.

It uses a sensor under the hood to obtain the current temperature.

## {% linkable_title Configuration %}

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: mqtt
```

{% configuration %}
name:
  description: The name of the HVAC.
  required: false
  type: string
  default: MQTT HVAC
unique_id:
   description: An ID that uniquely identifies this HVAC device. If two HVAC devices have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: Defines if published messages should have the retain flag set.
  required: false
  type: boolean
  default: false
send_if_off:
  description: "Set to `false` to suppress sending of all MQTT messages when the current mode is `Off`."
  required: false
  type: boolean
  default: true
initial:
  description: Set the initial target temperature.
  required: false
  type: number
  default: 21
payload_on:
  description: The payload that represents enabled state.
  required: false
  type: string
  default: "ON"
payload_off:
  description: The payload that represents disabled state.
  required: false
  type: string
  default: "OFF"
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
value_template:
  description: Default template to render the payloads on *all* `*_state_topic`s with.
  type: template
  required: false
current_temperature_topic:
  description: The MQTT topic on which to listen for the current temperature.
  required: false
  type: string
current_temperature_template:
  description: A template with which the value received on `current_temperature_topic` will be rendered.
  required: false
  type: template
power_command_topic:
  description: The MQTT topic to publish commands to change the power state. This is useful if your device has a separate power toggle in addition to mode.
  required: false
  type: string
mode_command_topic:
  description: The MQTT topic to publish commands to change the HVAC operation mode.
  required: false
  type: string
mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC operation mode. If this is not set, the operation mode works in optimistic mode (see below).
  required: false
  type: string
mode_state_template:
  description: A template to render the value received on the `mode_state_topic` with.
  required: false
  type: template
modes:
  description: A list of supported modes.
  required: false
  default: ['auto', 'off', 'cool', 'heat', 'dry', 'fan_only']
  type: list
temperature_command_topic:
  description: The MQTT topic to publish commands to change the target temperature.
  required: false
  type: string
temperature_state_topic:
  description: The MQTT topic to subscribe for changes in the target temperature. If this is not set, the target temperature works in optimistic mode (see below).
  required: false
  type: string
temperature_state_template:
  description: A template to render the value received on the `temperature_state_topic` with.
  required: false
  type: template
fan_mode_command_topic:
  description: The MQTT topic to publish commands to change the fan mode.
  required: false
  type: string
fan_mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC fan mode. If this is not set, the fan mode works in optimistic mode (see below).
  required: false
  type: string
fan_mode_state_template:
  description: A template to render the value received on the `fan_mode_state_topic` with.
  required: false
  type: template
fan_modes:
  description: A list of supported fan modes.
  required: false
  default: ['auto', 'low', 'medium', 'high']
  type: list
swing_mode_command_topic:
  description: The MQTT topic to publish commands to change the swing mode.
  required: false
  type: string
swing_mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC swing mode. If this is not set, the swing mode works in optimistic mode (see below).
  required: false
  type: string
swing_mode_state_template:
  description: A template to render the value received on the `swing_mode_state_topic` with.
  required: false
  type: template
swing_modes:
  description: A list of supported swing modes.
  required: false
  default: ['on', 'off']
  type: list
away_mode_command_topic:
  description: The MQTT topic to publish commands to change the away mode.
  required: false
  type: string
away_mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC away mode. If this is not set, the away mode works in optimistic mode (see below).
  required: false
  type: string
away_mode_state_template:
  description: A template to render the value received on the `away_mode_state_topic` with.
  required: false
  type: template
hold_command_topic:
  description: The MQTT topic to publish commands to change the hold mode.
  required: false
  type: string
hold_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC hold mode. If this is not set, the hold mode works in optimistic mode (see below).
  required: false
  type: string
hold_state_template:
  description: A template to render the value received on the `hold_state_topic` with.
  required: false
  type: template
aux_command_topic:
  description: The MQTT topic to publish commands to switch auxiliary heat.
  required: false
  type: string
aux_state_topic:
  description: The MQTT topic to subscribe for changes of the auxiliary heat mode. If this is not set, the auxiliary heat mode works in optimistic mode (see below).
  required: false
  type: string
aux_state_template:
  description: A template to render the value received on the `aux_state_topic` with.
  required: false
  type: template
min_temp:
  description: Minimum set point available.
  type: number
  required: false
max_temp:
  description: Maximum set point available.
  type: number
  required: false
temp_step:
  description: Step size for temperature set point.
  type: number
  required: false
  default: 1
device:
  description: 'Information about the device this HVAC device is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
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

#### {% linkable_title Optimistic mode %}

If a property works in *optimistic mode* (when the corresponding state topic is not set), Home Assistant will assume that any state changes published to the command topics did work and change the internal state of the entity immediately after publishing to the command topic. If it does not work in optimistic mode, the internal state of the entity is only updated when the requested update is confirmed by the device through the state topic.

#### {% linkable_title Using Templates %}

For all `*_state_topic`s, a template can be specified that will be used to render the incoming payloads on these topics. Also, a default template that applies to all state topis can be specified as `value_template`. This can be useful if you received payloads are e.g., in JSON format. Since in JSON, a quoted string (e.g., `"foo"`) is just a string, this can also be used for unquoting.

Say you receive the operation mode `"auto"` via your `mode_state_topic`, but the mode is actually called just `auto`, here's what you could do:

{% raw %}
```yaml
climate:
  - platform: mqtt
    name: Study
    modes:
      - "off"
      - "on"
      - "auto"
    mode_command_topic: "study/ac/mode/set"
    mode_state_topic: "study/ac/mode/state"
    mode_state_template: "{{ value_json }}"
```
{% endraw %}

This will parse the incoming `"auto"` as JSON, resulting in `auto`. Obviously, in this case you could also just set `value_template: {% raw %}"{{ value_json }}"{% endraw %}`.


### {% linkable_title Example %}

A full configuration example looks like the one below.

```yaml
# Full example configuration.yaml entry
climate:
  - platform: mqtt
    name: Study
    modes:
      - "off"
      - "cool"
      - "fan_only"
    swing_modes:
      - "on"
      - "off"
    fan_modes:
      - "high"
      - "medium"
      - "low"
    power_command_topic: "study/ac/power/set"
    mode_command_topic: "study/ac/mode/set"
    temperature_command_topic: "study/ac/temperature/set"
    fan_mode_command_topic: "study/ac/fan/set"
    swing_mode_command_topic: "study/ac/swing/set"
```
