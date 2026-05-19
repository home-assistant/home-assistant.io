---
title: "MQTT Date"
description: "Instructions on how to interact with a device exposing a date control capability through MQTT from within Home Assistant."
ha_category:
  - Date
ha_release: 2026.5
ha_iot_class: Configurable
ha_domain: mqtt
---

The **MQTT Date** {% term integration %} allows you to integrate devices that expose a control to set the date.

## Configuration

To use an MQTT date entity in your installation, [add an MQTT device as a subentry](/integrations/mqtt/#configuration), or add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
mqtt:
  - date:
      command_topic: command-topic
```

Alternatively, a more advanced approach is to set it up via [MQTT discovery](/integrations/mqtt/#mqtt-discovery).

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
    value_template:
      description: "Defines a [template](/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the device's availability from the `topic`. To determine the device's availability, the result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
availability_mode:
   description:  When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the most recent `payload_available` or `payload_not_available` received on any configured availability topic determines availability.
   required: false
   type: string
   default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the device's availability from the `availability_topic`. To determine the device's availability, the result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
command_template:
  description: Defines a [template](/docs/configuration/templating/#using-command-templates-with-mqtt) to generate the payload to send to `command_topic`.
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish the date value that is set in ISO format.
  required: true
  type: string
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `date.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available.  If the entity ID already exists, it will be created with a number appended. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
device:
  description: "Device information for this time entity. Used to link the entity to a device in the [device registry](https://developers.home-assistant.io/docs/device_registry_index). Only works when [`unique_id`](#unique_id) is set. At least one of `identifiers` or `connections` is required to identify the device."
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL.'
      required: false
      type: string
    connections:
      description: 'A list of device connections to the outside world, each specified as a tuple of `[connection_type, connection_identifier]`. For example, the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
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
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
enabled_by_default:
  description: Controls whether this entity is enabled by default. When set to `true`, the entity is enabled and usable immediately. Disabled entities are hidden by default until you enable them from the device page.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding used for received payloads and published messages. Set to `""` to disable decoding of incoming payload.
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
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to for receiving a JSON dictionary payload that sets the entity attributes. Implies `force_update` of the current daye state when a message is received on this topic.
  required: false
  type: string
name:
  description: The name of the date entity. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: "MQTT Date"
platform:
  description: Must be `date`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
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
  description: "The MQTT topic subscribed to receive date state updates. Date state updates should contain a parable date string, e.a. '2025-12-01' or '1 March 2025'. If a date/time structure is passed, only the date component will be used. Can be used with `value_template` to render the incoming payload to a parsable date string."
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this date entity. If two date entities have the same unique ID Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the date state value from the payload received on `state_topic`."
  required: false
  type: template
{% endconfiguration %}

{% important %}
Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

## Examples

This is an example of a manual configured MQTT `date` item.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - date:
      name: "Scheduled task"
      icon: mdi:ab-testing
      command_topic: "date_selector/set"
      state_topic: "date_selector/state"
```

{% endraw %}
