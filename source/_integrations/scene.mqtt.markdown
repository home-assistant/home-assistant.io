---
title: "MQTT Scene"
description: "Instructions on how to integrate MQTT scenes into Home Assistant."
ha_category:
  - Scene
ha_release: 2020.12
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` scene platform lets you control your MQTT enabled scenes.

## Configuration

To enable a MQTT scene in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - scene:
      command_topic: zigbee2mqtt/living_room_group/set
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
command_topic:
  description: The MQTT topic to publish `payload_on` to activate the scene.
  required: false
  type: string
device:
  description: "Information about the device this scene is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an HTTP or HTTPS link.'
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
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
entity_category:
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
  required: false
  type: string
entity_picture:
  description: "Picture URL for the entity."
  required: false
  type: string
encoding:
  description: The encoding of the published messages.
  required: false
  type: string
  default: "utf-8"
icon:
  description: Icon for the scene.
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
name:
  description: The name to use when displaying this scene.
  required: false
  type: string
  default: MQTT Scene
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
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
payload_on:
  description: The payload that will be sent to `command_topic` when activating the MQTT scene.
  required: false
  type: string
  default: "ON"
platform:
  description: Must be `scene`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
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
unique_id:
  description: An ID that uniquely identifies this scene entity. If two scenes have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
{% endconfiguration %}

{% important %}
Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

## Examples

In this section, you will find some real-life examples of how to use the MQTT Scene.

### Full configuration

The example below shows a full configuration for a scene.

```yaml
# Example configuration.yaml entry
mqtt:
  - scene:
      unique_id: living_room_party_scene
      name: "Party Scene"
      command_topic: "home/living_room/party_scene/set"
      availability:
        - topic: "home/living_room/party_scene/available"
      payload_on: "ON"
      qos: 0
      retain: true
      device:
        name: "Living Room"
        identifiers: "livingroom_lights" 
```

### Use with a JSON Payload

The example below shows a configuration using a JSON payload.

```yaml
# Example configuration.yaml entry
mqtt:
  - scene:
      name: Living Room Blue Scene
      unique_id: living_room_blue_scene
      command_topic: "home/living_room/set"
      payload_on: '{"activate_scene": "Blue Scene"}'
```
