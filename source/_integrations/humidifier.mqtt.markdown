---
title: "MQTT Humidifier"
description: "Instructions on how to integrate MQTT humidifiers into Home Assistant."
ha_category:
  - Humidifier
ha_release: 2021.8
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` humidifier platform lets you control your MQTT enabled humidifiers.

## Configuration

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT humidifier will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state of the humidifier will be `unknown`. A MQTT device can reset the current state to `unknown` using a `None` payload.

When a `state_topic` is not available, the humidifier will work in optimistic mode. In this mode, the humidifier will immediately change state after every command. Otherwise, the humidifier will wait for state confirmation from the device (message from `state_topic`). The initial state is set to `False` / `off` in optimistic mode.

Optimistic mode can be forced even if a `state_topic` is available. Try to enable it if you are experiencing incorrect humidifier operation.

To enable MQTT humidifiers in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - humidifier:
      command_topic: "bedroom_humidifier/on/set"
      target_humidity_command_topic: "bedroom_humidifier/humidity/set"
```

{% configuration %}
action_template:
  description: A template to render the value received on the `action_topic` with.
  required: false
  type: template
action_topic:
  description: >-
    The MQTT topic to subscribe for changes of the current action.
    Valid values: `off`, `humidifying`, `drying`, `idle`
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
    value_template:
      description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
current_humidity_template:
  description: A template with which the value received on `current_humidity_topic` will be rendered.
  required: false
  type: template
current_humidity_topic:
  description: The MQTT topic on which to listen for the current humidity. A `"None"` value received will reset the current humidity. Empty values (`'''`) will be ignored.
  required: false
  type: string
command_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate the payload to send to `command_topic`.
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish commands to change the humidifier state.
  required: true
  type: string
device:
  description: "Information about the device this humidifier is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL.'
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    hw_version:
      description: The hardware version of the device.
      required: false
      type: string
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
device_class:
  description: The [device class](/integrations/humidifier/#device-class) of the MQTT device. Must be either `humidifier`, `dehumidifier` or `null`.
  required: false
  type: string
  default: humidifier
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
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
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
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
max_humidity:
  description: The minimum target humidity percentage that can be set.
  required: false
  type: float
  default: 100
min_humidity:
  description: The maximum target humidity percentage that can be set.
  required: false
  type: float
  default: 0
name:
  description: The name of the humidifier. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT humidifier
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
  required: false
  type: string
optimistic:
  description: Flag that defines if humidifier works in optimistic mode
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
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
  description: The payload that represents the stop state.
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The payload that represents the running state.
  required: false
  type: string
  default: "ON"
payload_reset_humidity:
  description: A special payload that resets the `target_humidity` state attribute to an `unknown` state when received at the `target_humidity_state_topic`. When received at `current_humidity_topic` it will reset the current humidity state.
  required: false
  type: string
  default: '"None"'
payload_reset_mode:
  description: A special payload that resets the `mode` state attribute to an `unknown` state when received at the `mode_state_topic`.
  required: false
  type: string
  default: '"None"'
target_humidity_command_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate the payload to send to `target_humidity_command_topic`.
  required: false
  type: template
target_humidity_command_topic:
  description: The MQTT topic to publish commands to change the humidifier target humidity state based on a percentage.
  required: true
  type: string
target_humidity_state_topic:
  description: The MQTT topic subscribed to receive humidifier target humidity.
  required: false
  type: string
target_humidity_state_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract a value for the humidifier `target_humidity` state.
  required: false
  type: template
mode_command_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate the payload to send to `mode_command_topic`.
  required: false
  type: template
mode_command_topic:
  description: The MQTT topic to publish commands to change the `mode` on the humidifier. This attribute ust be configured together with the `modes` attribute.
  required: false
  type: string
mode_state_topic:
  description: The MQTT topic subscribed to receive the humidifier `mode`.
  required: false
  type: string
mode_state_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract a value for the humidifier `mode` state.
  required: false
  type: template
modes:
  description: List of available modes this humidifier is capable of running at. Common examples include `normal`, `eco`, `away`, `boost`, `comfort`, `home`, `sleep`, `auto` and `baby`. These examples offer built-in translations but other custom modes are allowed as well.  This attribute ust be configured together with the `mode_command_topic` attribute.
  required: false
  type: [list]
  default: []
platform:
  description: Must be `humidifier`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: true
state_topic:
  description: The MQTT topic subscribed to receive state updates. A "None" payload resets to an `unknown` state. An empty payload is ignored. Valid state payloads are `OFF` and `ON`. Custom `OFF` and `ON` values can be set with the `payload_off` and `payload_on` config options.
  required: false
  type: string
state_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract a value from the state."
  required: false
  type: template
unique_id:
  description: An ID that uniquely identifies this humidifier. If two humidifiers have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
{% endconfiguration %}

{% important %}
Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

## Examples

In this section you find some real-life examples of how to use this humidifier.

### Full configuration

The example below shows a full configuration for a MQTT humidifier including modes.

{% raw %}

```yaml
# Example configuration.yaml
mqtt:
  - humidifier:
      name: "Bedroom humidifier"
      device_class: "humidifier"
      state_topic: "bedroom_humidifier/on/state"
      action_topic: "bedroom_humidifier/action"
      command_topic: "bedroom_humidifier/on/set"
      current_humidity_topic: "bedroom_humidifier/humidity/current"
      target_humidity_command_topic: "bedroom_humidifier/humidity/set"
      target_humidity_state_topic: "bedroom_humidifier/humidity/state"
      mode_state_topic: "bedroom_humidifier/mode/state"
      mode_command_topic: "bedroom_humidifier/preset/preset_mode"
      modes:
        - "normal"
        - "eco"
        - "away"
        - "boost"
        - "comfort"
        - "home"
        - "sleep"
        - "auto"
        - "baby"
      qos: 0
      payload_on: "true"
      payload_off: "false"
      min_humidity: 30
      max_humidity: 80
```

{% endraw %}
