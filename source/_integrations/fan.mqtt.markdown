---
title: "MQTT Fan"
description: "Instructions on how to integrate MQTT fans into Home Assistant."
ha_category:
  - Fan
ha_release: 0.27
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` fan platform lets you control your MQTT enabled fans.

## Configuration

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
availability:
  description: A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`.
  required: false
  type: list
  keys:
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
    topic:
      description: An MQTT topic subscribed to receive availability (online/offline) updates.
      required: true
      type: string
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the fan state.
  required: true
  type: string
device:
  description: "Information about the device this fan is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: [list, map]
    identifiers:
      description: A list of IDs that uniquely identify the device. For example a serial number.
      required: false
      type: [string, list]
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
    suggested_area:
      description: 'Suggest an area if the device isn’t in one yet.'
      required: false
      type: string
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name of the fan.
  required: false
  type: string
  default: MQTT Fan
optimistic:
  description: Flag that defines if lock works in optimistic mode
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
oscillation_command_topic:
  description: The MQTT topic to publish commands to change the oscillation state.
  required: false
  type: string
oscillation_state_topic:
  description: The MQTT topic subscribed to receive oscillation state updates.
  required: false
  type: string
oscillation_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the oscillation."
  required: false
  type: string
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_high_speed:
  description: DEPRECATED - The payload that represents the fan's high speed.
  required: false
  type: string
  default: high
payload_low_speed:
  description: DEPRECATED - The payload that represents the fan's low speed.
  required: false
  type: string
  default: low
payload_medium_speed:
  description: DEPRECATED - The payload that represents the fan's medium speed.
  required: false
  type: string
  default: medium
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
payload_off:
  description: The payload that represents the stop state.
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The payload that represents the running state.
  required: false
  type: string
  default: "ON"
payload_oscillation_off:
  description: The payload that represents the oscillation off state.
  required: false
  type: string
  default: oscillate_off
payload_oscillation_on:
  description: The payload that represents the oscillation on state.
  required: false
  type: string
  default: oscillate_on
percentage_command_topic:
  description: The MQTT topic to publish commands to change the fan speed state based on a percentage.
  required: false
  type: string
percentage_state_topic:
  description: The MQTT topic subscribed to receive fan speed based on percentage.
  required: false
  type: string
percentage_value_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from fan percentage speed.
  required: false
  type: string
preset_mode_command_topic:
  description: The MQTT topic to publish commands to change the preset mode.
  required: false
  type: string
preset_mode_state_topic:
  description: The MQTT topic to publish commands to change the preset mode.
  required: false
  type: string
preset_mode_value_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the preset_mode payload.
  required: false
  type: string
preset_modes:
  description: List of preset modes this fan is capable of running at. Common examples include `auto`, `smart`, `whoosh`, `eco` and `breeze`.
  required: false
  type: [list]
  default: []
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: true
speed_command_topic:
  description: DEPRECATED - The MQTT topic to publish commands to change speed state.
  required: false
  type: string
speed_range_min:
  description: The minimum of numeric output range (`off` not included).
  required: false
  type: integer
  default: 1
speed_range_max:
  description: The maximum of numeric output range (representing 100%).
  required: false
  type: integer
  default: 100
speed_state_topic:
  description: DEPRECATED - The MQTT topic subscribed to receive speed state updates.
  required: false
  type: string
speed_value_template:
  description: "DEPRECATED - Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the speed payload."
  required: false
  type: string
speeds:
  description: "DEPRECATED - List of speeds this fan is capable of running at. Valid entries are `off`, `low`, `medium` and `high`."
  required: false
  type: [string, list]
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
state_value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the state."
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this fan. If two fans have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.

</div>

## Examples

In this section you find some real-life examples of how to use this fan.

### Full configuration

The example below shows a full configuration for a MQTT fan using percentage and preset modes.

```yaml
# Example using percentage based speeds with preset modes configuration.yaml
fan:
  - platform: mqtt
    name: "Bedroom Fan"
    state_topic: "bedroom_fan/on/state"
    command_topic: "bedroom_fan/on/set"
    oscillation_state_topic: "bedroom_fan/oscillation/state"
    oscillation_command_topic: "bedroom_fan/oscillation/set"
    percentage_state_topic: "bedroom_fan/speed/percentage_state"
    percentage_command_topic: "bedroom_fan/speed/percentage"
    preset_mode_state_topic: "bedroom_fan/speed/preset_mode_state"
    preset_mode_command_topic: "bedroom_fan/speed/preset_mode"
    preset_modes:
       -  "auto"
       -  "smart"
       -  "whoosh"
       -  "eco"
       -  "breeze"
    qos: 0
    payload_on: "true"
    payload_off: "false"
    payload_oscillation_on: "true"
    payload_oscillation_off: "false"
    speed_range_min: 1
    speed_range_max: 100
```
