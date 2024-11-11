---
title: "MQTT Event"
description: "Instructions on how to integrate MQTT events into Home Assistant."
ha_category:
  - Event
ha_release: 2023.8
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` event platform allows you to process event info from an MQTT message. Events are signals that are emitted when something happens, for example, when a user presses a physical button like a doorbell or when a button on a remote control is pressed. With the event some event attributes can be sent to become available as an attribute on the entity. MQTT events are stateless. For example, a doorbell does not have a state like being "on" or "off" but instead is momentarily pressed.

## Configuration

```yaml
# Example configuration.yaml entry
mqtt:
  - event:
      state_topic: "home/doorbell/state"
      event_types:
        - press
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
  description: "Information about the device this event is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
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
device_class:
  description: The [type/class](/integrations/event/#device-class) of the event to set the icon in the frontend. The `device_class` can be `null`.
  required: false
  type: device_class
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the published messages.
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
event_types:
  description: A list of valid `event_type` strings.
  required: true
  type: list
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
name:
  description: The name to use when displaying this event.
  required: false
  type: string
  default: MQTT Event
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
platform:
  description: Must be `event`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
state_topic:
  description: The MQTT topic subscribed to receive JSON event payloads. The JSON payload should contain the `event_type` element. The event type should be one of the configured `event_types`. Note that replayed retained messages will be discarded.
  required: true
  type: string
unique_id:
  description: An ID that uniquely identifies this event entity. If two events have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the value and render it to a valid JSON event payload. If the template throws an error, the current state will be used instead."
  required: false
  type: template
{% endconfiguration %}

{% important %}
Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

### Full configuration with JSON data

The example below shows a full configuration for an event MQTT entity.

```yaml
# Example configuration.yaml entry
mqtt:
  - event:
      state_topic: "home/doorbell/state"
      event_types:
        - "press"
        - "hold"
      availability:
        - topic: "home/doorbell/available"
      qos: 0
      device_class: "doorbell"
```

The event information is extracted from a JSON formatted MQTT message.
To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages.

To set trigger the `mqtt` event entity manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home/doorbell/available -m "online"
mosquitto_pub -h 127.0.0.1 -t home/doorbell/state -m '{"event_type": "hold"}'
```

Besides the required `event_type` element, the payload can contain additional event attributes.
These additional attribute updates will be exposed as attributes on the `mqtt` event entity.

The example below demonstrates how event attributes can be added to the event data.

```bash
mosquitto_pub -h 127.0.0.1 -t home/doorbell/state -m '{"event_type": "press", "duration": 0.1}'
```

### Example: processing event data using a value template

In many cases, translation of an existing published payload is needed.
The example config below translates the payload `{"Button1": {"Action": "SINGLE"}}` of
the device `Button1` with event type `single` to the required format.
An extra attribute `button` will be set to `Button1` and be added to the entity,
but only if the `Action` property is set. Empty dictionaries will be ignored.

{% raw %}

```yaml
mqtt:
  - event:
      name: "Desk button"
      state_topic: "desk/button/state"
      event_types:
        - single
        - double
      device_class: "button"
      value_template: |
        { {% for key in value_json %}
        {% if value_json[key].get("Action") %}
        "button": "{{ key }}",
        "event_type": "{{ value_json[key].Action | lower }}"
        {% endif %}
        {% endfor %} }
```

{% endraw %}
