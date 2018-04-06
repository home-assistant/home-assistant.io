---
layout: page
title: "MQTT Discovery"
description: "Instructions on how to setup MQTT Discovery within Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
---

The discovery of MQTT devices will enable one to use MQTT devices with only minimal configuration effort on the side of Home Assistant. The configuration is done on the device itself and the topic used by the device. Similar to the [HTTP binary sensor](/components/binary_sensor.http/) and the [HTTP sensor](/components/sensor.http/). The basic idea is that the device itself adds its configuration into your `configuration.yaml` automatically. To prevent multiple identical entries if a device reconnects a unique identifier is necessary. Two parts are required on the device side: The configuration topic which contains the necessary device type and unique identifier and the remaining device configuration without the device type.

Supported by MQTT discovery:

- [Binary sensors](/components/binary_sensor.mqtt/)
- [Cameras](/components/camera.mqtt/)
- [Covers](/components/cover.mqtt/)
- [Fans](/components/fan.mqtt/)
- [Lights](/components/light.mqtt/)
- [Sensors](/components/sensor.mqtt/)
- [Switches](/components/switch.mqtt/)


To enable MQTT discovery, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt:
  discovery: true
  discovery_prefix: homeassistant
```
Configuration variables:

- **discovery** (*Optional*): If the MQTT discovery should be enabled or not. Defaults to `False`.
- **discovery_prefix** (*Optional*): The prefix for the discovery topic. Defaults  to `homeassistant`.

The discovery topic need to follow a specific format:

```text
<discovery_prefix>/<component>/[<node_id>/]<object_id>/<>
```

- `<component>`: One of the supported components, eg. `binary_sensor`.
- `<node_id>`: (*Optional*) id of the node providing the topic.
- `<object_id>`: "The ID of the device. This is only to allow for separate topics for each device and is not used for the `entity_id`."
- `<>`: The topic `config` or `state` which defines the current action.

The payload will be checked like an entry in your `configuration.yaml` file if a new device is added. This means that missing variables will be filled with the platform's default values. All configuration variables which are *required* must be present in the initial payload send to `/config`.

The `<node_id>` level can be used by clients to only subscribe to their own (command) topics by using one wildcard topic like `<discovery_prefix>/+/<node_id>/+/set`.

### {% linkable_title Support by third-party tools %}

The following firmware for ESP8266, ESP32 and Sonoff unit has built-in support for MQTT discovery:

- [Sonoff-Tasmota](https://github.com/arendst/Sonoff-Tasmota) (starting with 5.11.1e)
- [esphomelib](https://github.com/OttoWinter/esphomelib)
- [ESPurna](https://github.com/xoseperez/espurna)
- [Arilux AL-LC0X LED controllers](https://github.com/mertenats/Arilux_AL-LC0X)

### {% linkable_title Examples %}

A motion detection device which can be represented by a [binary sensor](/components/binary_sensor.mqtt/) for your garden would sent its configuration as JSON payload to the Configuration topic. After the first message to `config`, then the MQTT messages sent to the state topic will update the state in Home Assistant.

- Configuration topic: `homeassistant/binary_sensor/garden/config`
- State topic: `homeassistant/binary_sensor/garden/state`
- Payload:  `{"name": "garden", "device_class": "motion"}`

To create a new sensor manually. For more details please refer to the [MQTT testing section](/docs/mqtt/testing/).

```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/config" -m '{"name": "garden", "device_class": "motion"}'
```
Update the state.

```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/state" -m ON
```

Setting up a switch is similar but requires a `command_topic` as mentionend in the [MQTT switch documentation](/components/switch.mqtt/).

- Configuration topic: `homeassistant/switch/irrigation/config`
- State topic: `homeassistant/switch/irrigation/state`
- Payload:  `{"name": "garden", "command_topic": "homeassistant/switch/irrigation/set"}`

```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/switch/irrigation/config" \
  -m '{"name": "garden", "command_topic": "homeassistant/switch/irrigation/set"}'
```
Set the state.

```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/switch/irrigation/set" -m ON
```

Setting up a sensor with multiple measurement values requires multiple consecutive configuration topic submissions.

- Configuration topic no1: `homeassistant/sensor/sensorBedroomT/config`
- Configuration payload no1: `{"device_class": "sensor", "name": "Temperature", "state_topic": "homeassistant/sensor/sensorBedroom/state", "unit_of_measurement": "°C", "value_template": "{% raw %}{{ value_json.temperature}}{% endraw %}" }`
- Configuration topic no2: `homeassistant/sensor/sensorBedroomH/config`
- Configuration payload no2: `{"device_class": "sensor", "name": "Humidity", "state_topic": "homeassistant/sensor/sensorBedroom/state", "unit_of_measurement": "%", "value_template": "{% raw %}{{ value_json.humidity}}{% endraw %}" }`
- Common state payload: `{ "temperature": 23.20, "humidity": 43.70 }`


