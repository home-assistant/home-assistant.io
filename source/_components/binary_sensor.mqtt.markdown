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

The `mqtt` binary sensor platform uses an MQTT message payload
to set the binary sensor to one of two states: `on` or `off`.

The binary sensor state will be updated only after a new message is published on
`state_topic` matching `payload_on` or `payload_off`.
If these messages are published with the `retain` flag set,
the binary sensor will receive an instant state update after subscription and
Home Assistant will display the correct state on startup.
Otherwise, the initial state displayed in Home Assistant will be `unknown`.

## {% linkable_title Configuration %}

The `mqtt` binary sensor platform optionally supports an `availability_topic` to
receive online and offline messages (birth and LWT messages) from the MQTT
device. During normal operation, if the MQTT cover device goes offline
(i.e., publishes `payload_not_available` to `availability_topic`), Home
Assistant will display the binary sensor as `unavailable`. If these messages are
published with the `retain` flag set, the binary sensor will receive an instant
update after subscription and Home Assistant will display the correct
availability state of the binary sensor when Home Assistant starts up.
If the `retain` flag is not set, Home Assistant will display the binary sensor
as `unavailable` when Home Assistant starts up. If no `availability_topic`
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
name:
  description: The name of the binary sensor.
  required: false
  type: string
  default: MQTT Binary Sensor
state_topic:
  description: The MQTT topic subscribed to receive sensor values.
  required: true
  type: string
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
  description: >
    "The MQTT topic subscribed to receive birth and LWT messages from the MQTT
    device. If `availability_topic` is not defined, the binary sensor availability
    state will always be `available`. If `availability_topic` is defined,
    the binary sensor availability state will be `unavailable` by default."
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
qos:
  description: The maximum QoS level to be used when receiving messages.
  required: false
  type: integer
  default: 0
unique_id:
  description: >
    An ID that uniquely identifies this sensor. If two sensors have
    the same unique ID, Home Assistant will raise an exception.
  required: false
  type: string
device_class:
  description: >
    "The [type/class](/components/binary_sensor/) of
    the sensor to set the icon in the frontend."
  required: false
  type: string
value_template:
  description: >
    "Defines a [template](/docs/configuration/templating/#processing-incoming-data)
    to extract a value from the payload."
  required: false
  type: string
force_update:
  description: >
    Sends update events even if the value has not changed.
    Useful if you want to have meaningful value graphs in history.
  reqired: false
  type: boolean
  default: false
{% endconfiguration %}

## {% linkable_title Examples %}

In this section, you will find some real-life examples of how to use this sensor.

### {% linkable_title Full configuration %}

To test, you can use the command line tool `mosquitto_pub` shipped with
`mosquitto` or the `mosquitto-clients` package to send MQTT messages.
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

### {% linkable_title Get the state of a device with ESPEasy %}

Assuming that you have flashed your ESP8266 unit with
[ESPEasy](https://github.com/letscontrolit/ESPEasy).
Under "Config" is a name ("Unit Name:") set for your device
(here it's "bathroom"). A configuration for a "Controller" for MQTT with the
protocol "OpenHAB MQTT" is present and the entries ("Controller Subscribe:" and
"Controller Publish:") are adjusted to match your needs.
In this example, the topics are prefixed with "home". Also, add a "Switch Input"
in the "Devices" tap with the name "switch" and "button" as value.

As soon as the unit is online, you will get the state of the attached button.

```bash
home/bathroom/status Connected
...
home/bathroom/switch/button 1
```

The configuration will look like the example below:

{% raw %}
```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    name: Bathroom
    state_topic: "home/bathroom/switch/button"
    payload_on: "1"
    payload_off: "0"
```
{% endraw %}
