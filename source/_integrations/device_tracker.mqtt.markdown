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


The `mqtt` device tracker {% term integration %} allows you to define new device_trackers through [manual YAML configuration](#yaml-configuration) in {% term "`configuration.yaml`" %} and also to automatically discover device_trackers [using the MQTT Discovery protocol](#using-the-discovery-protocol).

## Configuration

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file:

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
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: "The MQTT topic subscribed to receive a JSON dictionary message containing device tracker attributes.
  This topic can be used to set the location of the device tracker under the following conditions:

- If the attributes in the JSON message include `longitude`, `latitude`, and `gps_accuracy` (optional).\n
- If the device tracker is within a configured [zone](/integrations/zone/).\n

  If these conditions are met, it is not required to configure `state_topic`.\n\n
  Be aware that any location message received at `state_topic`  overrides the location received via `json_attributes_topic` until a message configured with `payload_reset` is received at `state_topic`. For a more generic usage example of the `json_attributes_topic`, refer to the [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation."
  required: false
  type: string
name:
  description: The name of the MQTT device_tracker.
  required: false
  type: string
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
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
payload_reset:
  description: The payload value that will have the device's location automatically derived from Home Assistant's zones.
  required: false
  type: string
  default: '"None"'
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
state_topic:
  description: The MQTT topic subscribed to receive device tracker state changes. The states defined in `state_topic` override the location states defined by the `json_attributes_topic`. This state override is turned inactive if the `state_topic` receives a message containing `payload_reset`. The `state_topic` can only be omitted if `json_attributes_topic` is used. An empty payload is ignored. Valid payloads are `not_home`, `home` or any other custom location or zone name. Payloads for `not_home`, `home` can be overridden with the `payload_not_home`and `payload_home` config options.
  required: false
  type: string
unique_id:
  description: "An ID that uniquely identifies this device_tracker. If two device_trackers have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery."
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) that returns a device tracker state."
  required: false
  type: template
{% endconfiguration %}

## Examples

### Using the discovery protocol

The device_tracker can be created via publishing to a discovery topic that follows the following [MQTT Discovery](/integrations/mqtt/#mqtt-discovery#discovery-topic) topic name format: `<discovery_prefix>/device_tracker/[<node_id>/]<object_id>/config`.

You can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages.

To create the device_tracker:

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/config -m '{"state_topic": "homeassistant/device_tracker/a4567d663eaf/state", "name": "My Tracker", "payload_home": "home", "payload_not_home": "not_home"}'
```

To set the state of the device tracker to "home":

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/state -m 'home'
```

To set the state of the device tracker to a named location:

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/state -m 'location_name'
```

If the device supports GPS coordinates then they can be sent to Home Assistant by specifying an attributes topic (i.e. "json_attributes_topic") in the configuration payload:

- Attributes topic: `homeassistant/device_tracker/a4567d663eaf/attributes`
- Example attributes payload:

Example message to be received at topic `homeassistant/device_tracker/a4567d663eaf/attributes`:

```json
{
  "latitude": 32.87336,
  "longitude": -117.22743,
  "gps_accuracy": 1.2
 }
```

To create the device_tracker with GPS coordinates support:

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/config -m '{"json_attributes_topic": "homeassistant/device_tracker/a4567d663eaf/attributes", "name": "My Tracker"}'
```

{% note %}

Using `state_topic` is optional when using `json_attributes_topic` to determine the state of the device tracker.

{% endnote %}

To set the state of the device tracker to specific coordinates:

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/device_tracker/a4567d663eaf/attributes -m '{"latitude": 32.87336, "longitude": -117.22743, "gps_accuracy": 1.2}'
```


### YAML configuration

The following example shows how to configure the same device tracker through configuration.yaml

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - device_tracker:
      name: "My Tracker"
      state_topic: "a4567d663eaf/state"
      payload_home: "home"
      payload_not_home: "not_home"
```

{% endraw %}
