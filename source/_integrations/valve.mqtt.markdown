---
title: "MQTT Valve"
description: "Instructions on how to integrate MQTT valves into Home Assistant."
ha_category:
  - Valve
ha_iot_class: Configurable
ha_release: 2024.1
ha_domain: mqtt
---

The `mqtt` valve platform allows you to control an MQTT valve (such a gas or water valve).

## Configuration

A valve entity can be have the following states: `open`, `opening`, `closed` or `closing`.

### Valve controlled by states

If a `state_topic` is configured, the entity's state will be updated only after an MQTT message is received on `state_topic` matching `state_open`, `state_opening`, `state_closed` or `state_closing`. Commands configured through `payload_open`, `payload_closed`, and `payload_stop` will be published to `command_topic` to control the valve.

To use your MQTT valve in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry for a value that is set by open or close command
mqtt:
  - valve:
      command_topic: "home-assistant/valve/set"
      state_topic: "home-assistant/valve/state"
```

### Valve controlled by position

If the valve supports reporting its position (the `reports_position` config option is set to `true`), a numeric state is expected on `state_topic`, but state updates are still allowed for `state_opening` and `state_closing`. Also, a JSON format is supported. It allows both `state` and `position` to be reported together.

Example of a JSON state update:

```json
{"state": "opening", "position": 10}
```

The wanted position value or `payload_stop` will be published to `command_topic` to control the valve when the actions `valve.open`, `value.close`, or `value.set_position` are called.

To use your MQTT valve in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry for a valve that reports position
mqtt:
  - valve:
      command_topic: "home-assistant/valve/set"
      state_topic: "home-assistant/valve/state"
      reports_position: true
```

### Optimistic operation

If a `state_topic` is not defined, the valve will work in optimistic mode. In this mode, the valve will immediately change state (`open` or `closed`) after every command sent by Home Assistant. It won't wait for an update from the device. Optimistic mode can be forced by setting `optimistic` to `true`, even if a `state_topic` is defined. Try to enable it if you are experiencing an incorrect valve operation.


{% configuration %}
availability:
  description: "A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`."
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
    value_template:
      description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the device's availability from the `topic`. To determine the devices's availability, the result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the device's availability from the `availability_topic`. To determine the devices's availability, the result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: "The MQTT topic subscribed to receive birth and LWT messages from the MQTT valve device. If an `availability` topic is not defined, the valve availability state will always be `available`. If an `availability` topic is defined, the valve availability state will be `unavailable` by default. Must not be used together with `availability`."
  required: false
  type: string
command_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate the payload to send to `command_topic`.
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish commands to control the valve. The value sent can be a value defined by `payload_open`, `payload_close` or `payload_stop`. If `reports_position` is set to `true`, a numeric value will be published instead.
  required: false
  type: string
device:
  description: "Information about the device this valve is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of the identifiers or connections must be present to identify the device."
  required: false
  type: map
  keys:
    configuration_url:
      description: "A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL."
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example, the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    hw_version:
      description: The hardware version of the device.
      required: false
      type: string
    identifiers:
      description: A list of IDs that uniquely identify the device. For example, a serial number.
      required: false
      type: [list, string]
    manufacturer:
      description: The manufacturer of the device.
      required: false
      type: string
    model:
      description: The model of the device.
      required: false
      type: string
    model_id:
      description: The model identifier of the device.
      required: false
      type: string
    name:
      description: The name of the device.
      required: false
      type: string
    serial_number:
      description: "The serial number of the device."
      required: false
      type: string
    suggested_area:
      description: Suggest an area if the device isn’t in one yet.
      required: false
      type: string
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.
      required: false
      type: string
device_class:
  description: Sets the [class of the device](/integrations/valve/#device_class), changing the device state and icon that is displayed on the frontend. The `device_class` can be `null`.
  required: false
  type: string
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received and published messages. Set to `""` to disable decoding of incoming payload.
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: "The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity."
  required: false
  type: string
entity_picture:
  description: "Picture URL for the entity."
  required: false
  type: string
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`. A usage example can be found in the [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. A usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name of the valve. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT valve
object_id:
  description: Used instead of `name` to have the `entity_id` generated automatically.
  required: false
  type: string
optimistic:
  description: Flag that defines if a switch works in optimistic mode.
  required: false
  type: boolean
  default: "`false` if the state or position topic is defined; `true` otherwise."
payload_available:
  description: The payload that represents the online state.
  required: false
  type: string
  default: online
payload_close:
  description: The command payload that closes the valve. Is only used when `reports_position` is set to `false` (default). The `payload_close` is not allowed if `reports_position` is set to `true`. Can be set to `null` to disable the valve's close option.
  required: false
  type: string
  default: CLOSE
payload_not_available:
  description: The payload that represents the offline state.
  required: false
  type: string
  default: offline
payload_open:
  description: The command payload that opens the valve. Is only used when `reports_position` is set to `false` (default). The `payload_open` is not allowed if `reports_position` is set to `true`. Can be set to `null` to disable the valve's open option.
  required: false
  type: string
  default: OPEN
payload_stop:
  description: The command payload that stops the valve. When not configured, the valve will not support the `valve.stop` action.
  required: false
  type: string
platform:
  description: Must be `valve`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
position_closed:
  description: Number which represents closed position. The valve's position will be scaled to the(`position_closed`...`position_open`) range when an action is performed and scaled back when a value is received.
  required: false
  type: integer
  default: 0
position_open:
  description: Number which represents open position. The valve's position will be scaled to (`position_closed`...`position_open`) range when an is performed and scaled back when a value is received.
  required: false
  type: integer
  default: 100
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
reports_position:
  description: "Set to `true` if the value reports the position or supports setting the position. Enabling the `reports_position` option will cause the position to be published instead of a payload defined by `payload_open`, `payload_close` or `payload_stop`. When receiving messages, `state_topic` will accept numeric payloads or one of the following state messages: `open`, `opening`, `closed`, or `closing`."
  required: false
  type: boolean
  default: false
retain:
  description: Defines if published messages should have the retain flag set.
  required: false
  type: boolean
  default: false
state_closed:
  description: The payload that represents the closed state. Is only allowed when `reports_position` is set to `False` (default).
  required: false
  type: string
  default: closed
state_closing:
  description: The payload that represents the closing state.
  required: false
  type: string
  default: closing
state_open:
  description: The payload that represents the open state. Is only allowed when `reports_position` is set to `False` (default).
  required: false
  type: string
  default: open
state_opening:
  description: The payload that represents the opening state.
  required: false
  type: string
  default: opening
state_topic:
  description: The MQTT topic subscribed to receive valve state messages. State topic accepts a state payload (`open`, `opening`, `closed`, or `closing`) or, if `reports_position` is supported, a numeric value representing the position. In a JSON format with variables `state` and `position` both values can received together. A "None" state value resets to an `unknown` state. An empty string is ignored.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this valve. If two valves have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) that can be used to extract the payload for the `state_topic` topic. The rendered value should be a defined state payload or, if reporting a `position` is supported and `reports_position` is set to `true`, a numeric value is expected representing the position. See also `state_topic`."
  required: false
  type: template
{% endconfiguration %}

{% note %}
MQTT valve expects position values to be in the range of 0 to 100, where 0 indicates a closed position and 100 indicates a fully open position.
If `position_open` or `position_closed` are set to a different range (for example, 40 to 140), when sending a command to the device, the range will be adjusted to the device range. For example, position 0 will send a value of 40 to device. When the device receives a position payload, it will be adjusted back to the 0 to 100 range. In our example, the device value of 40 will report valve position 0.
`position_open` and `position_closed` can also be used to reverse the direction of the device: If `position_closed` is set to 100 and `position_open` is set to `0`, the device operation will be inverted. For example, when setting the position to 40, a value of 60 will be sent to the device.
{% endnote %}

## Examples

This section provides some examples showing how you can use this platform.

### Full configuration for a value that does not report position

The example below shows a full configuration for a valve that does not report position.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - valve:
      name: "MQTT valve"
      command_template: '{"x": {{ value }} }'
      command_topic: "home-assistant/valve/set"
      state_topic: "home-assistant/valve/state"
      availability:
        - topic: "home-assistant/valve/availability"
      qos: 0
      reports_position: false
      retain: true
      payload_open: "OPEN"
      payload_close: "CLOSE"
      payload_stop: "STOP"
      state_open: "open"
      state_opening: "opening"
      state_closed: "closed"
      state_closing: "closing"
      payload_available: "online"
      payload_not_available: "offline"
      optimistic: false
      value_template: "{{ value_json.x }}"
```

{% endraw %}

### Sample configuration of a valve that reports the position

The example below shows a sample configuration for a valve that reports the position using JSON messages.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - valve:
      name: "MQTT valve"
      command_template: '{"x": {{ value }} }'
      command_topic: "home-assistant/valve/set"
      state_topic: "home-assistant/valve/state"
      availability:
        - topic: "home-assistant/valve/availability"
      reports_position: true
      value_template: "{{ value_json.x }}"
```

{% endraw %}

### Configuration for disabling valve commands

The example below shows a configuration for a valve that does not have a close command.
Setting the `payload_close` to empty or to `null` disables the close command and will not show the close button.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - valve:
      payload_open: "on"
      payload_close: 
      payload_stop: "on"
```

{% endraw %}

An MQTT valve will support `open` and `close` commands if a `command_topic` is set. The MQTT valve supports `stop` if `payload_stop` is set.

### Testing your configuration

To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages. This allows you to operate your valve manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/valve/set -m "CLOSE"
```
