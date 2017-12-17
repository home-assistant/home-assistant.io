---
layout: page
title: "MQTT Binary Sensor"
description: "Instructions how to integrate MQTT binary sensors within Home Assistant."
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

The binary sensor state will be updated only after a new message is published on `state_topic` matching `payload_on` or `payload_off`. If these messages are published with the `retain` flag set, the binary sensor will receive an instant state update after subscription and Home Assistant will display the correct state on startup. Otherwise, the initial state displayed in Home Assistant will be `unknown`.

The `mqtt` binary sensor platform optionally supports an `availability_topic` to receive online and offline messages (birth and LWT messages) from the MQTT device. During normal operation, if the MQTT cover device goes offline (i.e. publishes `payload_not_available` to `availability_topic`), Home Assistant will display the binary sensor as `unavailable`. If these messages are published with the `retain` flag set, the binary sensor will receive an instant update after subscription and Home Assistant will display the correct availability state of the binary sensor when Home Assistant starts up. If the `retain` flag is not set, Home Assistant will display the binary sensor as `unavailable` when Home Assistant starts up. If no `availability_topic` is defined, Home Assistant will consider the MQTT device to be available.

To use an MQTT binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mqtt
    state_topic: "home-assistant/window/contact"
```

Configuration variables:

- **name** (*Optional*): The name of the binary sensor. Default is `MQTT Binary Sensor`.
- **state_topic** (*Required*): The MQTT topic subscribed to receive sensor values.
- **payload_on** (*Optional*): The payload that represents the on state. Default is `ON`.
- **payload_off** (*Optional*): The payload that represents the off state. Default is `OFF`.
- **availability_topic** (*Optional*): The MQTT topic subscribed to receive birth and LWT messages from the MQTT device. If `availability_topic` is not defined, the binary sensor availability state will always be `available`. If `availability_topic` is defined, the binary sensor availability state will be `unavailable` by default.
- **payload_available** (*Optional*): The payload that represents the online state. Default is `online`.
- **payload_not_available** (*Optional*): The payload that represents the offline state. Default is `offline`.
- **qos** (*Optional*): The maximum QoS level to be used when receiving messages. Default is `0`.
- **device_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
- **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.

To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages. To set the state of the binary sensor manually:

```bash
$  mosquitto_pub -h 127.0.0.1 -t home-assistant/window/contact -m "OFF"
```

The example below shows a full configuration for a binary sensor:

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
    value_template: '{% raw %}{{ value.x }}{% endraw %}'
```
