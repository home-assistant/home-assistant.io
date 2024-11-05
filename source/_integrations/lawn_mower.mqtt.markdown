---
title: "MQTT lawn mower"
description: "Instructions on how to integrate MQTT lawn mowers into Home Assistant."
ha_category:
  - Lawn mower
ha_release: 2023.9
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` `lawn_mower` platform allows controlling a lawn mower over MQTT.

## Configuration

To enable MQTT lawn mower in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - lawn_mower:
      command_topic: topic
      name: "Test Lawn Mower"
```

{% configuration %}
activity_state_topic:
  description: The MQTT topic subscribed to receive an update of the activity. Valid activities are `mowing`, `paused`, `docked`, and `error`. Use `value_template` to extract the activity state from a custom payload. When payload `none` is received, the activity state will be reset to `unknown`.  
  required: false
  type: string
activity_value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the value."
  required: false
  type: template
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
      description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the device's availability from the `topic`. To determine the device's availability, the result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
availability_mode:
   description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
   required: false
   type: string
   default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `availability_topic`. To determine the devices's availability, the result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
device:
  description: "Information about the device this lawn mower is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when the [`unique_id`](#unique_id) is set. At least one of the identifiers or connections must be present to identify the device."
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://`, or an internal `homeassistant://` URL.'
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
      description: 'A list of IDs that uniquely identify the device. For example, a serial number.'
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
      description: 'Suggest an area if the device isn’t in one yet.'
      required: false
      type: string
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs or parent devices of a sub-device. This is used to show the device topology in Home Assistant.'
      required: false
      type: string
dock_command_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate the payload to send to `dock_command_topic`. The `value` parameter in the template will be set to `dock`.
  required: false
  type: template
dock_command_topic:
  description: The MQTT topic that publishes commands when the `lawn_mower.dock` action is performed. The value `dock` is published when the action is used. Use a `dock_command_template` to publish a custom format.
  required: false
  type: string
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received and published messages. Set to `""` to disable decoding of the incoming payload.
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
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as entity attributes. Implies `force_update` of the current activity state when a message is received on this topic.
  required: false
  type: string
name:
  description: The name of the lawn mower. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
  required: false
  type: string
optimistic:
  description: Flag that defines if the lawn mower works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no `activity_state_topic` defined, else `false`."
pause_command_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate the payload to send to `pause_command_topic`. The `value` parameter in the template will be set to `pause`.
  required: false
  type: template
pause_command_topic:
  description: The MQTT topic that publishes commands when the `lawn_mower.pause` action is performed. The value `pause` is published when the action is used. Use a `pause_command_template` to publish a custom format.
  required: false
  type: string
platform:
  description: Must be `lawn_mower`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
start_mowing_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate the payload to send to `start_mowing_command_topic`. The `value` parameter in the template will be set to `start_mowing`.
  required: false
  type: template
start_mowing_command_topic:
  description: The MQTT topic that publishes commands when the `lawn_mower.start_mowing` action is performed. The value `start_mowing` is published when the action used. Use a `start_mowing_command_template` to publish a custom format.
  required: false
  type: string
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
unique_id:
  description: An ID that uniquely identifies this lawn mower. If two lawn mowers have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
{% endconfiguration %}

{% important %}
Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

## Example

The example below shows how to use a single command topic with a command template.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - lawn_mower:
      name: "Lawn Mower Plus"
      activity_state_topic: "lawn_mower_plus/state"
      activity_value_template: "{{ value_json.activity }}" 
      pause_command_topic: "lawn_mower_plus/set"
      pause_command_template: '{"activity": "{{ value }}"}' 
      dock_command_topic: "lawn_mower_plus/set"
      dock_command_template: '{"activity": "{{ value }}"}' 
      start_mowing_command_topic: "lawn_mower_plus/set"
      start_mowing_command_template: '{"activity": "{{ value }}"}' 
```

{% endraw %}
