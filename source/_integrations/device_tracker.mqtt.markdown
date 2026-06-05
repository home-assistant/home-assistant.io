---
title: "MQTT device tracker"
description: "Instructions on how to use MQTT to track devices in Home Assistant."
ha_category:
  - Presence detection
ha_iot_class: Configurable
ha_release: 0.7.3
ha_domain: mqtt
related:
  - docs: /docs/configuration/
    title: Configuration file
---


The **MQTT device tracker** {% term integration %} allows you to define new device_trackers through [manual YAML configuration](#yaml-configuration) in {% term "`configuration.yaml`" %} and also to automatically discover device_trackers [using the MQTT Discovery protocol](#using-the-discovery-protocol).

## Configuration

To use an MQTT device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
mqtt:
  - device_tracker:
      name: "annetherese_n4"
      state_topic: "location/annetherese"
  - device_tracker:
      name: "paulus_oneplus"
      state_topic: "location/paulus"
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
      description: "Defines a [template](/docs/templating/where-to-use/#mqtt) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/templating/where-to-use/#mqtt) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `device_tracker.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available.  If the entity ID already exists, the entity ID will be created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
device:
  description: "Information about the device this device tracker is a part of that ties it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). At least one of identifiers or connections must be present to identify the device."
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
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
group:
  description: A list of unique IDs of the member device tracker entities. Set this if the device tracker entity represents a device tracker group.
  required: false
  type: list
json_attributes_template:
  description: "Defines a [template](/docs/templating/where-to-use/#mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: "The MQTT topic is subscribed to receive a JSON dictionary containing device tracker attributes and is used to update the location of the device tracker.\n
The JSON message must include either:\n

- `in_zones`, **or**\n
- `longitude`, `latitude`, and optionally `gps_accuracy`.

A device tracker is considered to be located *within a zone* when the `in_zones` attribute is provided.\n

You can provide location information in one of two ways:\n

1. **Coordinates** — by including `longitude`, `latitude`, and optionally `gps_accuracy`.\n  
2. **Zone reference** — by setting `in_zones` to the zone’s `friendly_name`, `object_id`, or `entity_id`.\n

The `in_zones` attribute must be list of strings.  
Each value must match a Home Assistant zone’s `entity_id`, `object_id`, or `friendly_name`.\n
For example, the default zone with entity_id `zone.home` typically has:\n

- `friendly_name`: **Home** (depending on language settings and customization)\n
- `object_id`: **home**\n

For a more general usage example of `json_attributes_topic`, refer to the [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation."
  required: false
  type: string
name:
  description: The name of the MQTT device_tracker.
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
platform:
  description: Must be `device_tracker`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
source_type:
  description: Attribute of a device tracker that affects state when being used to track a [person](/integrations/person/). Valid options are `gps`, `router`, `bluetooth`, or `bluetooth_le`.
  required: false
  type: string
unique_id:
  description: "An ID that uniquely identifies this device_tracker. If two device_trackers have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery."
  required: false
  type: string
{% endconfiguration %}

## Examples

### Using the discovery protocol

The device_tracker can be created via publishing to a discovery topic that follows the following [MQTT Discovery](/integrations/mqtt/#mqtt-discovery#discovery-topic) topic name format: `<discovery_prefix>/device_tracker/[<node_id>/]<object_id>/config`.

You can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages.

To create the device_tracker:

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/config -m '{"json_attributes_topic": "homeassistant/device_tracker/a4567d663eaf/location_attrs", "name": "My Tracker"}'
```

An MQTT device tracker can link to a zone with:

1. GPS based coordinates
2. A list of zones (either zone entity IDs, object IDs or names) the device tracker is linked to.

Example message with GPS based coordinates to be received at topic `homeassistant/device_tracker/a4567d663eaf/location_attrs`:

```json
{
  "latitude": 32.87336,
  "longitude": -117.22743,
  "gps_accuracy": 1.2
 }
```

Example message with GPS based coordinates to be received at topic `homeassistant/device_tracker/a4567d663eaf/location_attrs`:

```json
{
  "in_zones": ["home"]
}
```

To set the state of the device tracker to specific coordinates:

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/attributes -m '{"latitude": 32.87336, "longitude": -117.22743, "gps_accuracy": 1.2}'
```

To set the state of the device tracker with linked zones:

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/attributes -m '{"in_zones": ["home"]}'
```

### YAML configuration

The following example shows how to configure the same device tracker through configuration.yaml

```yaml
# Example configuration.yaml entry
mqtt:
  - device_tracker:
      name: "My Tracker"
      json_attributes_topic: "a4567d663eaf/location_attrs"
```
