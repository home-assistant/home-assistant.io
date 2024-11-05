---
title: "MQTT Number"
description: "Instructions on how to interact with a device exposing a Number through MQTT from within Home Assistant."
ha_category:
  - Number
ha_release: 2021.2
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` Number platform allows you to integrate devices that might expose configuration options through MQTT into Home Assistant as a Number. Every time a message under the `topic` in the configuration is received, the number entity will be updated in Home Assistant and vice-versa, keeping the device and Home Assistant in-sync.

## Configuration

To enable MQTT Number in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - number:
      command_topic: my-device/threshold
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
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
availability_mode:
   description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
   required: false
   type: string
   default: latest
command_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate the payload to send to `command_topic`.
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish commands to change the number.
  required: true
  type: string
device:
  description: "Information about the device this Number is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
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
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
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
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
device_class:
  description: The [type/class](/integrations/number/#device-class) of the number. The `device_class` can be `null`.
  required: false
  type: device_class
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
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as number attributes. Implies `force_update` of the current number state when a message is received on this topic.
  required: false
  type: string
min:
  description: Minimum value.
  required: false
  type: float
  default: 1
max:
  description: Maximum value.
  required: false
  type: float
  default: 100
mode:
  description: Control how the number should be displayed in the UI. Can be set to `box` or `slider` to force a display mode.
  required: false
  type: string
  default: '"auto"'
name:
  description: The name of the Number. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
  required: false
  type: string
optimistic:
  description: Flag that defines if number works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no `state_topic` defined, else `false`."
payload_reset:
  description: A special payload that resets the state to `unknown` when received on the `state_topic`.
  required: false
  type: string
  default: '"None"'
platform:
  description: Must be `number`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
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
  default: false
state_topic:
  description: The MQTT topic subscribed to receive number values. An empty payload is ignored.
  required: false
  type: string
step:
  description: Step value. Smallest value `0.001`.
  required: false
  type: float
  default: 1
unique_id:
  description: An ID that uniquely identifies this Number. If two Numbers have the same unique ID Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
unit_of_measurement:
  description: Defines the unit of measurement of the sensor, if any. The `unit_of_measurement` can be `null`.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the value."
  required: false
  type: template
{% endconfiguration %}

{% important %}
Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}
