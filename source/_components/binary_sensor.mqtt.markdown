---
layout: page
title: "MQTT Binary Sensor"
description: "Instructions on how to integrate MQTT binary sensors within Home Assistant."
date: 2015-05-30 23:21
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Binary Sensor
ha_release: 0.9
ha_iot_class: "depends"
---

The `mqtt` binary sensor platform uses an MQTT message payload to set the binary sensor to one of two states: `on` or `off`.

The binary sensor state will be updated only after a new message is published on `state_topic` matching `payload_on` or `payload_off`. If these messages are published with the `retain` flag set,
the binary sensor will receive an instant state update after subscription and Home Assistant will display the correct state on startup.
Otherwise, the initial state displayed in Home Assistant will be `unknown`.

## {% linkable_title Configuration %}

The `mqtt` binary sensor platform optionally supports an `availability_topic` to receive online and offline messages (birth and LWT messages) from the MQTT device. During normal operation, if the MQTT sensor device goes offline (i.e., publishes `payload_not_available` to `availability_topic`), Home Assistant will display the binary sensor as `unavailable`. If these messages are published with the `retain` flag set, the binary sensor will receive an instant update after subscription and Home Assistant will display the correct availability state of the binary sensor when Home Assistant starts up. If the `retain` flag is not set, Home Assistant will display the binary sensor as `unavailable` when Home Assistant starts up. If no `availability_topic`
is defined, Home Assistant will consider the MQTT device to be available.

To use an MQTT binary sensor in your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    state_topic: "home-assistant/window/contact"
```

{% configuration %}
state_topic:
  description: The MQTT topic subscribed to receive sensor values.
  required: true
  type: string
name:
  description: The name of the binary sensor.
  required: false
  type: string
  default: MQTT Binary Sensor
payload_on:
  description: The payload that represents the on state.
  required: false
  type: string
  default: "ON"
payload_off:
  description: The payload that represents the off state.
  required: false
  type: string
  default: "OFF"
availability_topic:
  description: "The MQTT topic subscribed to receive birth and LWT messages from the MQTT device. If `availability_topic` is not defined, the binary sensor availability state will always be `available`. If `availability_topic` is defined, the binary sensor availability state will be `unavailable` by default."
  required: false
  type: string
payload_available:
  description: The payload that represents the online state.
  required: false
  type: string
  default: online
payload_not_available:
  description: The payload that represents the offline state.
  required: false
  type: string
  default: offline
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
  reqired: false
  type: string
qos:
  description: The maximum QoS level to be used when receiving messages.
  required: false
  type: integer
  default: 0
unique_id:
  description: An ID that uniquely identifies this sensor. If two sensors have the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
device_class:
  description: The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload. Available variables: `entity_id`."
  required: false
  type: string
force_update:
  description: Sends update events even if the value hasn't changed. Useful if you want to have meaningful value graphs in history.
  required: false
  type: boolean
  default: False
off_delay:
  description: "For sensors that only sends `On` state updates, this variable sets a delay in seconds after which the sensor state will be updated back to `Off`."
  required: false
  type: integer
device:
  description: "Information about the device this binary sensor is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set."
  required: false
  type: map
  keys:
    identifiers:
      description: A list of IDs that uniquely identify the device. For example a serial number.
      required: false
      type: list, string
    connections:
      description: "A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `'connections': ['mac', '02:5b:26:a8:dc:12']`."
      required: false
      type: list, tuple
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
{% endconfiguration %}

## {% linkable_title Examples %}

In this section, you will find some real-life examples of how to use this sensor.

### {% linkable_title Full configuration %}

To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages.

To set the state of the binary sensor manually:

```bash
$  mosquitto_pub -h 127.0.0.1 -t home-assistant/window/contact -m "OFF"
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

### {% linkable_title Toggle the binary sensor each time a message is received on state_topic %}
{% raw %}
```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    state_topic: "lab_button/cmnd/POWER"
    value_template: "{%if is_state(entity_id,\"on\")-%}OFF{%-else-%}ON{%-endif%}"
```
{% endraw %}

### {% linkable_title Get the state of a device with ESPEasy %}

Assuming that you have flashed your ESP8266 unit with [ESPEasy](https://github.com/letscontrolit/ESPEasy). Under "Config" is a name ("Unit Name:") set for your device (here it's "bathroom"). A configuration for a "Controller" for MQTT with the protocol "OpenHAB MQTT" is present and the entries ("Controller Subscribe:" and "Controller Publish:") are adjusted to match your needs. In this example, the topics are prefixed with "home". Also, add a "Switch Input" in the "Devices" tap with the name "switch" and "button" as value.

As soon as the unit is online, you will get the state of the attached button.

```
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
<<<<<<< HEAD
=======

>>>>>>> current
