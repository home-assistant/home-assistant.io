---
title: "MQTT Device Tracker"
description: "Instructions on how to use MQTT to track devices in Home Assistant."
ha_category:
  - Presence Detection
ha_iot_class: Configurable
ha_release: 0.7.3
ha_domain: mqtt
---


The `mqtt` device tracker platform allows you to define new device_trackers through [manual YAML configuration](#yaml-configuration) in `configuration.yaml` and also to automatically discover device_trackers through a [discovery schema](#discovery-schema) using the MQTT Discovery protocol.

## YAML Configuration

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mqtt
    devices:
      paulus_oneplus: "location/paulus"
      annetherese_n4: "location/annetherese"
```

{% configuration %}
devices:
  description: List of devices with their topic.
  required: true
  type: list
qos:
  description: The QoS level of the topic.
  required: false
  type: integer
payload_home:
  description: The payload value that represents the 'home' state for the device.
  required: false
  type: string
  default: "home"
payload_not_home:
  description: The payload value that represents the 'not_home' state for the device.
  required: false
  type: string
  default: "not_home"
source_type:
  description: Attribute of a device tracker that affects state when being used to track a [person](/integrations/person/). Valid options are `gps`, `router`, `bluetooth`, or `bluetooth_le`.
  required: false
  type: string
{% endconfiguration %}

## Complete YAML example configuration

```yaml
# Complete configuration.yaml entry
device_tracker:
  - platform: mqtt
    devices:
      paulus_oneplus: "location/paulus"
      annetherese_n4: "location/annetherese"
    qos: 1
    payload_home: "present"
    payload_not_home: "not present"
    source_type: bluetooth
```

## YAML Usage

To set the state of the device_tracker then you need to publish a JSON message to the topic (e.g., via mqtt.publish service). As an example, the following JSON message would set the `paulus_oneplus` device_tracker to `home`:

```json
{
  "topic": "location/paulus",
  "payload": "present"
}
```

## Discovery Schema

MQTT device_trackers are also supported through [MQTT discovery](/docs/mqtt/discovery/). This is different to the YAML configuration from above. Here, the device_tracker can be created via a discovery topic that follows the following topic name convention: `<discovery_prefix>/device_tracker/[<node_id>/]<object_id>/config` and the JSON message content of a specific format as defined below.

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
device:
  description: "Information about the device this device tracker is a part of that ties it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html)."
  required: false
  type: map
  keys:
    connections:
      description: "A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `'connections': ['mac', '02:5b:26:a8:dc:12']`."
      required: false
      type: [list, map]
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
    name:
      description: The name of the device.
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
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as device_tracker attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
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
payload_home:
  description: The payload value that represents the 'home' state for the device.
  required: false
  type: string
  default: home
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
payload_not_home:
  description: The payload value that represents the 'not_home' state for the device.
  required: false
  type: string
  default: not_home
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
source_type:
  description: Attribute of a device tracker that affects state when being used to track a [person](/integrations/person/). Valid options are `gps`, `router`, `bluetooth`, or `bluetooth_le`.
  required: false
  type: string
state_topic:
  description: The MQTT topic subscribed to receive device tracker state changes.
  required: true
  type: string
unique_id:
  description: "An ID that uniquely identifies this device_tracker. If two device_trackers have the same unique ID, Home Assistant will raise an exception."
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) that returns a device tracker state."
  required: false
  type: template
{% endconfiguration %}

## Discovery Example

You can use the discovery protocol to create a new device tracker and set it's state using the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages.

To create the device_tracker:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/device_tracker/a4567d663eaf/config -m '{"state_topic": "a4567d663eaf/state", "name": "My Tracker", "payload_home": "home", "payload_not_home": "not_home"}'
```

To set the state of the device tracker to "home":

```bash
mosquitto_pub -h 127.0.0.1 -t a4567d663eaf/state -m 'home'
```
