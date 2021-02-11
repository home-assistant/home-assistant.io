---
title: "MQTT HVAC"
description: "Instructions on how to integrate MQTT HVAC into Home Assistant."
ha_category:
  - Climate
ha_release: 0.55
ha_iot_class: Local Polling
ha_domain: mqtt
---

The `mqtt` climate platform lets you control your MQTT enabled HVAC devices.

## Configuration

To enable this climate platform in your installation, first add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: mqtt
```

{% configuration %}
action_template:
  description: A template to render the value received on the `action_topic` with.
  required: false
  type: template
action_topic:
  description: >-
    The MQTT topic to subscribe for changes of the current action. If this is set, the climate graph uses the value received as data source.
    Valid values: `off`, `heating`, `cooling`, `drying`, `idle`, `fan`.
  required: false
  type: string
aux_command_topic:
  description: The MQTT topic to publish commands to switch auxiliary heat.
  required: false
  type: string
aux_state_template:
  description: A template to render the value received on the `aux_state_topic` with.
  required: false
  type: template
aux_state_topic:
  description: The MQTT topic to subscribe for changes of the auxiliary heat mode. If this is not set, the auxiliary heat mode works in optimistic mode (see below).
  required: false
  type: string
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
away_mode_command_topic:
  description: The MQTT topic to publish commands to change the away mode.
  required: false
  type: string
away_mode_state_template:
  description: A template to render the value received on the `away_mode_state_topic` with.
  required: false
  type: template
away_mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC away mode. If this is not set, the away mode works in optimistic mode (see below).
  required: false
  type: string
current_temperature_template:
  description: A template with which the value received on `current_temperature_topic` will be rendered.
  required: false
  type: template
current_temperature_topic:
  description: The MQTT topic on which to listen for the current temperature.
  required: false
  type: string
device:
  description: 'Information about the device this HVAC device is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set.'
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [list, string]
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
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
fan_mode_command_template:
  description: A template to render the value sent to the `fan_mode_command_topic` with.
  required: false
  type: template
fan_mode_command_topic:
  description: The MQTT topic to publish commands to change the fan mode.
  required: false
  type: string
fan_mode_state_template:
  description: A template to render the value received on the `fan_mode_state_topic` with.
  required: false
  type: template
fan_mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC fan mode. If this is not set, the fan mode works in optimistic mode (see below).
  required: false
  type: string
fan_modes:
  description: A list of supported fan modes.
  required: false
  default: ['auto', 'low', 'medium', 'high']
  type: list
hold_command_template:
  description: A template to render the value sent to the `hold_command_topic` with.
  required: false
  type: template
hold_command_topic:
  description: The MQTT topic to publish commands to change the hold mode.
  required: false
  type: string
hold_state_template:
  description: A template to render the value received on the `hold_state_topic` with.
  required: false
  type: template
hold_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC hold mode. If this is not set, the hold mode works in optimistic mode (see below).
  required: false
  type: string
hold_modes:
  description: A list of available hold modes.
  required: false
  type: list
initial:
  description: Set the initial target temperature.
  required: false
  type: integer
  default: 21
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
max_temp:
  description: Maximum set point available.
  type: float
  required: false
min_temp:
  description: Minimum set point available.
  type: float
  required: false
mode_command_template:
  description: A template to render the value sent to the `mode_command_topic` with.
  required: false
  type: template
mode_command_topic:
  description: The MQTT topic to publish commands to change the HVAC operation mode.
  required: false
  type: string
mode_state_template:
  description: A template to render the value received on the `mode_state_topic` with.
  required: false
  type: template
mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC operation mode. If this is not set, the operation mode works in optimistic mode (see below).
  required: false
  type: string
modes:
  description: A list of supported modes. Needs to be a subset of the default values.
  required: false
  default: ['auto', 'off', 'cool', 'heat', 'dry', 'fan_only']
  type: list
name:
  description: The name of the HVAC.
  required: false
  type: string
  default: MQTT HVAC
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
payload_off:
  description: The payload that represents disabled state.
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The payload that represents enabled state.
  required: false
  type: string
  default: "ON"
power_command_topic:
  description: The MQTT topic to publish commands to change the power state. This is useful if your device has a separate power toggle in addition to mode.
  required: false
  type: string
precision:
  description: The desired precision for this device. Can be used to match your actual thermostat's precision. Supported values are `0.1`, `0.5` and `1.0`.
  required: false
  type: float
  default: 0.1 for Celsius and 1.0 for Fahrenheit.
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
swing_mode_command_template:
  description: A template to render the value sent to the `swing_mode_command_topic` with.
  required: false
  type: template
swing_mode_command_topic:
  description: The MQTT topic to publish commands to change the swing mode.
  required: false
  type: string
swing_mode_state_template:
  description: A template to render the value received on the `swing_mode_state_topic` with.
  required: false
  type: template
swing_mode_state_topic:
  description: The MQTT topic to subscribe for changes of the HVAC swing mode. If this is not set, the swing mode works in optimistic mode (see below).
  required: false
  type: string
swing_modes:
  description: A list of supported swing modes.
  required: false
  default: ['on', 'off']
  type: list
temperature_command_template:
  description: A template to render the value sent to the `temperature_command_topic` with.
  required: false
  type: template
temperature_command_topic:
  description: The MQTT topic to publish commands to change the target temperature.
  required: false
  type: string
temperature_high_command_template:
  description: A template to render the value sent to the `temperature_high_command_topic` with.
  required: false
  type: template
temperature_high_command_topic:
  description: The MQTT topic to publish commands to change the high target temperature.
  required: false
  type: string
temperature_high_state_template:
  description: A template to render the value received on the `temperature_high_state_topic` with.
  required: false
  type: template
temperature_high_state_topic:
  description: The MQTT topic to subscribe for changes in the target high temperature. If this is not set, the target high temperature works in optimistic mode (see below).
  required: false
  type: string
temperature_low_command_template:
  description: A template to render the value sent to the `temperature_low_command_topic` with.
  required: false
  type: template
temperature_low_command_topic:
  description: The MQTT topic to publish commands to change the target low temperature.
  required: false
  type: string
temperature_low_state_template:
  description: A template to render the value received on the `temperature_low_state_topic` with.
  required: false
  type: template
temperature_low_state_topic:
  description: The MQTT topic to subscribe for changes in the target low temperature. If this is not set, the target low temperature works in optimistic mode (see below).
  required: false
  type: string
temperature_state_template:
  description: A template to render the value received on the `temperature_state_topic` with.
  required: false
  type: template
temperature_state_topic:
  description: The MQTT topic to subscribe for changes in the target temperature. If this is not set, the target temperature works in optimistic mode (see below).
  required: false
  type: string
temperature_unit:
  description: Defines the temperature unit of the device, `C` or `F`. If this is not set, the temperature unit is set to the system temperature unit.
  required: false
  type: string
temp_step:
  description: Step size for temperature set point.
  type: float
  required: false
  default: 1
unique_id:
   description: An ID that uniquely identifies this HVAC device. If two HVAC devices have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
value_template:
  description: Default template to render the payloads on *all* `*_state_topic`s with.
  type: template
  required: false
{% endconfiguration %}

#### Optimistic mode

If a property works in *optimistic mode* (when the corresponding state topic is not set), Home Assistant will assume that any state changes published to the command topics did work and change the internal state of the entity immediately after publishing to the command topic. If it does not work in optimistic mode, the internal state of the entity is only updated when the requested update is confirmed by the device through the state topic.

#### Using Templates

For all `*_state_topic`s, a template can be specified that will be used to render the incoming payloads on these topics. Also, a default template that applies to all state topis can be specified as `value_template`. This can be useful if you received payloads are e.g., in JSON format. Since in JSON, a quoted string (e.g., `"foo"`) is just a string, this can also be used for unquoting.

Say you receive the operation mode `"auto"` via your `mode_state_topic`, but the mode is actually called just `auto`, here's what you could do:

{% raw %}

```yaml
climate:
  - platform: mqtt
    name: Study
    modes:
      - "off"
      - "heat"
      - "auto"
    mode_command_topic: "study/ac/mode/set"
    mode_state_topic: "study/ac/mode/state"
    mode_state_template: "{{ value_json }}"
```

{% endraw %}

This will parse the incoming `"auto"` as JSON, resulting in `auto`. Obviously, in this case you could also just set `value_template: {% raw %}"{{ value_json }}"{% endraw %}`.

Similarly for `*_command_topic`s, a template can be specified to render the outgoing payloads on these topics. 

### Example

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
    precision: 1.0
```
