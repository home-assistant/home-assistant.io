---
title: "MQTT Infrared"
description: "Instructions on how to interact with a device exposing infrared capabilities through MQTT from within Home Assistant."
ha_category:
  - Infrared
ha_release: 2026.7
ha_iot_class: Configurable
ha_domain: mqtt
---

The **MQTT Infrared** {% term integration %} allows you to integrate infrared emitter or receiver devices via MQTT.

## Configuration

To use an MQTT infrared entity in your installation, [add an MQTT device as a subentry](/integrations/mqtt/#configuration), or add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

The MQTT infrared platform supports a configuration schema for infrared emitter and receiver devices.

### Infrared emitter schema

```yaml
# Example configuration.yaml entry
mqtt:
  - infrared:
      schema: emitter
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
  description: "Defines a [template](/docs/configuration/templating/#using-command-templates-with-mqtt) to generate the payload to send to `command_topic`. Available variables for templating are `timings`, a list of integers that represent the microseconds a pulse is on (positive int) and off (negative int), `modulation`, the modulation frequency for the signal and `repeat_count`, the number of times the signal sequence is to be repeated. The signal data is derived from the commands that are provided via the [infrared protocols](https://github.com/home-assistant-libs/infrared-protocols) library."
  required: false
  type: template
command_topic:
  description: "The MQTT topic to publish the MQTT signal payload. Without a `command_template` defined, a [JSON payload](#infrared-signal-schema) will be published when an infrared command is issued."
  required: true
  type: string
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `infrared.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available.  If the entity ID already exists, it will be created with a number appended. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
device:
  description: "Device information for this infrared entity. Used to link the entity to a device in the [device registry](https://developers.home-assistant.io/docs/device_registry_index). Only works when [`unique_id`](#unique_id) is set. At least one of `identifiers` or `connections` is required to identify the device."
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
  description: The MQTT topic subscribed to for receiving a JSON dictionary payload that sets the entity attributes. Implies `force_update` of the current state when a message is received on this topic.
  required: false
  type: string
message_expiry_interval:
  description: "Controls how long queued or retained messages sent from Home Assistant persist at the broker for offline subscribers. This option prevents the broker from retaining stale messages. The expected value for this option is a JSON mapping, for example, `{\"days\": 1, \"hours\": 2, \"minutes\": 20, \"seconds\": 30}` or `{\"seconds\": 3600}`."
  required: false
  type: map
  keys:
    days:
      description: "Number of days published messages are queued or retained for offline subscribers."
      required: false
      type: integer
    hours:
      description: "Number of hours published messages are queued or retained for offline subscribers."
      required: false
      type: integer
    minutes:
      description: "Number of minutes published messages are queued or retained for offline subscribers."
      required: false
      type: integer
    seconds:
      description: "Number of seconds published messages are queued or retained for offline subscribers."
      required: false
      type: integer
name:
  description: The name of the infrared entity. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: "MQTT Infrared"
platform:
  description: Must be `infrared`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
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
schema:
  description: "The configuration schema, must be \"emitter\"."
  required: true
  type: string
unique_id:
  description: An ID that uniquely identifies this infrared entity. If two infrared entities have the same unique ID Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
{% endconfiguration %}

### Infrared receiver schema

```yaml
# Example configuration.yaml entry
mqtt:
  - infrared:
      schema: receiver
      state_topic: state-topic
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
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `infrared.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available.  If the entity ID already exists, it will be created with a number appended. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
device:
  description: "Device information for this infrared entity. Used to link the entity to a device in the [device registry](https://developers.home-assistant.io/docs/device_registry_index). Only works when [`unique_id`](#unique_id) is set. At least one of `identifiers` or `connections` is required to identify the device."
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
  description: The MQTT topic subscribed to for receiving a JSON dictionary payload that sets the entity attributes. Implies `force_update` of the current state when a message is received on this topic.
  required: false
  type: string
message_expiry_interval:
  description: "Controls how long queued or retained messages sent from Home Assistant persist at the broker for offline subscribers. This option prevents the broker from retaining stale messages. The expected value for this option is a JSON mapping, for example, `{\"days\": 1, \"hours\": 2, \"minutes\": 20, \"seconds\": 30}` or `{\"seconds\": 3600}`."
  required: false
  type: map
  keys:
    days:
      description: "Number of days published messages are queued or retained for offline subscribers."
      required: false
      type: integer
    hours:
      description: "Number of hours published messages are queued or retained for offline subscribers."
      required: false
      type: integer
    minutes:
      description: "Number of minutes published messages are queued or retained for offline subscribers."
      required: false
      type: integer
    seconds:
      description: "Number of seconds published messages are queued or retained for offline subscribers."
      required: false
      type: integer
name:
  description: The name of the infrared entity. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: "MQTT Infrared"
platform:
  description: Must be `infrared`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
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
schema:
  description: "The configuration schema, must be \"receiver\"."
  required: true
  type: string
state_topic:
  description: "The MQTT topic subscribed to receive a [JSON payload](#infrared-signal-schema) with `timings` as required attribute and and `modulation` as optional attribute. The `timings` attribute must hold a list of integers representing the on and off timings in microseconds the infrared emitter was on (positive) or off (negative). The `modulation` of the infrared signal in Hz, typical 38 kHz."
  required: true
  type: string
unique_id:
  description: An ID that uniquely identifies this infrared entity. If two infrared entities have the same unique ID Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-value-templates-with-mqtt) to extract the infrared signal messages from the payload received on `state_topic`."
  required: false
  type: template
{% endconfiguration %}

## Infrared signal schema

The signal data schema is derived from the commands that are provided via the [infrared protocols](https://github.com/home-assistant-libs/infrared-protocols) library.

By default, an infrared receiver entity expects a JSON payload that has a required `timings` and `modulation` attribute. The `timings` attribute must hold a list of integers representing the on and off timings in microseconds the infrared emitter was on (positive) or off (negative). The `modulation` of the infrared signal in Hz, typical 38 kHz.

An example message to receive:

```json
{
    "timings":[9000,-4500,562,-1687,562,-1687,562,-562,562,-1687,562,-1687,562,
    -1687,562,-1687,562,-1687,562,-562,562,-562,562,-1687,562,-562,562,-562,562,
    -562,562,-562,562,-562,562,-1687,562,-1687,562,-1687,562,-562,562,-1687,562,
    -1687,562,-1687,562,-1687,562,-562,562,-562,562,-562,562,-1687,562,-562,562,
    -562,562,-562,562,-562,562],
    "modulation":38000
}
```

The message should contain the `timings` attribute and optional the `modulation` attribute, any other attributes in the JSON message will be ignored.

An example message that is sent when a command is issued:

```json
{
    "timings":[9000,-4500,562,-1687,562,-1687,562,-562,562,-1687,562,-1687,562,
    -1687,562,-1687,562,-1687,562,-562,562,-562,562,-1687,562,-562,562,-562,562,
    -562,562,-562,562,-562,562,-1687,562,-1687,562,-1687,562,-562,562,-1687,562,
    -1687,562,-1687,562,-1687,562,-562,562,-562,562,-562,562,-1687,562,-562,562,
    -562,562,-562,562,-562,562],
    "modulation":38000,
    "repeat_count":0
}
```

## Examples

This is an example of a manual configured MQTT `infrared` receiver item.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - infrared:
      name: "My Infrared receiver"
      schema: "receiver"
      icon: mdi:ab-testing
      state_topic: "ir/receive-signal"
```

{% endraw %}

This is an example of a manual configured MQTT `infrared` emitter item.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - infrared:
      name: "My Infrared emitter"
      schema: "emitter"
      icon: mdi:ab-testing
      command_topic: "ir/send-signal"
```

{% endraw %}
