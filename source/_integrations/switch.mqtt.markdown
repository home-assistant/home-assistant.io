---
title: "MQTT Switch"
description: "Instructions on how to integrate MQTT switches into Home Assistant."
ha_category:
  - Switch
ha_release: 0.7
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` switch platform lets you control your MQTT enabled switches.

## Configuration

In an ideal scenario, the MQTT device will have a `state_topic` to publish state changes. If these messages are published with a `RETAIN` flag, the MQTT switch will receive an instant state update after subscription, and will start with the correct state. Otherwise, the initial state of the switch will be `false` / `off`.

When a `state_topic` is not available, the switch will work in optimistic mode. In this mode, the switch will immediately change state after every command. Otherwise, the switch will wait for state confirmation from the device (message from `state_topic`).

Optimistic mode can be forced, even if the `state_topic` is available. Try to enable it, if experiencing incorrect switch operation.

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: mqtt
    command_topic: "home/bedroom/switch1/set"
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
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to change the switch state.
  required: false
  type: string
device:
  description: "Information about the device this switch is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
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
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
  default: MQTT Switch
optimistic:
  description: Flag that defines if switch works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if no `state_topic` defined, else `false`."
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
  description: The payload that represents `off` state. If specified, will be used for both comparing to the value in the `state_topic` (see `value_template` and `state_off` for details) and sending as `off` command to the `command_topic`.
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The payload that represents `on` state. If specified, will be used for both comparing to the value in the `state_topic` (see `value_template` and `state_on`  for details) and sending as `on` command to the `command_topic`.
  required: false
  type: string
  default: "ON"
qos:
  description: The maximum QoS level of the state topic. Default is 0 and will also be used to publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
state_off:
  description: The payload that represents the `off` state. Used when value that represents `off` state in the `state_topic` is different from value that should be sent to the `command_topic` to turn the device `off`.
  required: false
  type: string
  default: "`payload_off` if defined, else OFF"
state_on:
  description: The payload that represents the `on` state. Used when value that represents `on` state in the `state_topic` is different from value that should be sent to the `command_topic` to turn the device `on`.
  required: false
  type: string
  default: "`payload_on` if defined, else ON"
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this switch device. If two switches have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract device's state from the `state_topic`. To determine the switches's state result of this template will be compared to `state_on` and `state_off`."
  required: false
  type: string
{% endconfiguration %}

<div class='note warning'>

Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.

</div>

## Examples

In this section, you will find some real-life examples of how to use this sensor.

### Full configuration

The example below shows a full configuration for a switch.

```yaml
# Example configuration.yaml entry
switch:
  - platform: mqtt
    unique_id: bedroom_switch
    name: "Bedroom Switch"
    state_topic: "home/bedroom/switch1"
    command_topic: "home/bedroom/switch1/set"
    availability:
      - topic: "home/bedroom/switch1/available"
    payload_on: "ON"
    payload_off: "OFF"
    state_on: "ON"
    state_off: "OFF"
    optimistic: false
    qos: 0
    retain: true
```

For a check, you can use the command line tools `mosquitto_pub` shipped with `mosquitto` to send MQTT messages. This allows you to operate your switch manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home/bedroom/switch1 -m "ON"
```

### Set the state of a device with ESPEasy

Assuming that you have flashed your ESP8266 unit with [ESPEasy](https://github.com/letscontrolit/ESPEasy). Under "Config" is a name ("Unit Name:") set for your device (here it's "bathroom"). A configuration for a "Controller" for MQTT with the protocol "OpenHAB MQTT" is present and the entries ("Controller Subscribe:" and "Controller Publish:") are adjusted to match your needs. In this example, the topics are prefixed with "home". There is no further configuration needed as the [GPIOs](https://www.letscontrolit.com/wiki/index.php/GPIO) can be controlled with MQTT directly.

Manually you can set pin 13 to high with `mosquitto_pub` or another MQTT tool:

```bash
mosquitto_pub -h 127.0.0.1 -t home/bathroom/gpio/13 -m "1"
```

The configuration will look like the example below:

```yaml
# Example configuration.yaml entry
switch:
  - platform: mqtt
    name: bathroom
    state_topic: "home/bathroom/gpio/13"
    command_topic: "home/bathroom/gpio/13"
    payload_on: "1"
    payload_off: "0"
```
