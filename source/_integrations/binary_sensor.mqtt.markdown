---
title: "MQTT Binary Sensor"
description: "Instructions on how to integrate MQTT binary sensors within Home Assistant."
ha_category:
  - Binary Sensor
ha_release: 0.9
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` binary sensor platform uses an MQTT message received to set the binary sensor's state to `on` or `off`.

The state will be updated only after a new message is published on `state_topic` matching `payload_on` or `payload_off`. If these messages are published with the `retain` flag set,
the binary sensor will receive an instant state update after subscription and Home Assistant will display the correct state on startup.
Otherwise, the initial state displayed in Home Assistant will be `unknown`.

Stateless devices such as buttons, remote controls etc are better represented by [MQTT device triggers](/integrations/device_trigger.mqtt/) than by binary sensors.

## Configuration

The `mqtt` binary sensor platform optionally supports an `availability_topic` to receive online and offline messages (birth and LWT messages) from the MQTT device. During normal operation, if the MQTT sensor device goes offline (i.e., publishes `payload_not_available` to `availability_topic`), Home Assistant will display the binary sensor as `unavailable`. If these messages are published with the `retain` flag set, the binary sensor will receive an instant update after subscription and Home Assistant will display the correct availability state of the binary sensor when Home Assistant starts up. If the `retain` flag is not set, Home Assistant will display the binary sensor as `unavailable` when Home Assistant starts up. If no `availability_topic`
is defined, Home Assistant will consider the MQTT device to be `available` and will display its state.

To use an MQTT binary sensor in your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    state_topic: "home-assistant/window/contact"
```

{% configuration %}
availability_topic:
  description: "The MQTT topic subscribed to receive birth and LWT messages from the MQTT device. If `availability_topic` is not defined, the binary sensor will always be considered `available` and its state will be `on`, `off` or `unknown`. If `availability_topic` is defined, the binary sensor will be considered as `unavailable` by default and the sensor's state will be `unavailable`."
  required: false
  type: string
device:
  description: "Information about the device this binary sensor is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
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
device_class:
  description: Sets the [class of the device](/integrations/binary_sensor/#device-class), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
expire_after:
  description: "Defines the number of seconds after the sensor's state expires if it's not updated. After expiry, the sensor's state becomes `unavailable` if `availability_topic` is defined and `unknown` otherwise."
  required: false
  type: integer
force_update:
  description: Sends update events (which results in update of [state object](/docs/configuration/state_object/)'s `last_changed`) even if the sensor's state hasn't changed. Useful if you want to have meaningful value graphs in history or want to create an automation that triggers on *every* incoming state message (not only when the sensor's new state is different to the current one).
  required: false
  type: boolean
  default: false
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name of the binary sensor.
  required: false
  type: string
  default: MQTT Binary Sensor
off_delay:
  description: "For sensors that only send `on` state updates (like PIRs), this variable sets a delay in seconds after which the sensor's state will be updated back to `off`."
  required: false
  type: integer
payload_available:
  description: The string that represents the `online` state.
  required: false
  type: string
  default: online
payload_not_available:
  description: The string that represents the `offline` state.
  required: false
  type: string
  default: offline
payload_off:
  description: The string that represents the `off` state. It will be compared to the message in the `state_topic` (see `value_template` for details)
  required: false
  type: string
  default: "OFF"
payload_on:
  description: The string that represents the `on` state. It will be compared to the message in the `state_topic` (see `value_template` for details)
  required: false
  type: string
  default: "ON"
qos:
  description: The maximum QoS level to be used when receiving messages.
  required: false
  type: integer
  default: 0
state_topic:
  description: The MQTT topic subscribed to receive sensor's state.
  required: true
  type: string
unique_id:
  description: An ID that uniquely identifies this sensor. If two sensors have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) that returns a string to be compared to `payload_on`/`payload_off`. Available variables: `entity_id`. Remove this option when 'payload_on' and 'payload_off' are sufficient to match your payloads (i.e no pre-processing of original message is required)."
  required: false
  type: string
{% endconfiguration %}

## Examples

In this section, you will find some real-life examples of how to use this sensor.

### Full configuration

To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages.

To set the state of the binary sensor manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/window/contact -m "OFF"
```

The example below shows a full configuration for a binary sensor:

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    name: "Window Contact Sensor"
    state_topic: "home-assistant/window/contact"
    payload_on: "ON"
    payload_off: "OFF"
    availability_topic: "home-assistant/window/availability"
    payload_available: "online"
    payload_not_available: "offline"
    qos: 0
    device_class: opening
    value_template: '{{ value.x }}'
```

{% endraw %}

### Toggle the binary sensor each time a message is received on state_topic

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    state_topic: "lab_button/cmnd/POWER"
    value_template: "{%if is_state(entity_id,\"on\")-%}OFF{%-else-%}ON{%-endif%}"
```

{% endraw %}

### Get the state of a device with ESPEasy

Assuming that you have flashed your ESP8266 unit with [ESPEasy](https://github.com/letscontrolit/ESPEasy). Under "Config" is a name ("Unit Name:") set for your device (here it's "bathroom"). A configuration for a "Controller" for MQTT with the protocol "OpenHAB MQTT" is present and the entries ("Controller Subscribe:" and "Controller Publish:") are adjusted to match your needs. In this example, the topics are prefixed with "home". Also, add a "Switch Input" in the "Devices" tap with the name "switch" and "button" as value.

As soon as the unit is online, you will get the state of the attached button.

```txt
home/bathroom/status Connected
...
home/bathroom/switch/button 1
```

The configuration will look like the example below:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    name: Bathroom
    state_topic: "home/bathroom/switch/button"
    payload_on: "1"
    payload_off: "0"
```
