---
layout: page
title: "MQTT Discovery"
description: "Instructions how to setup MQTT Discovery within Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
redirect_from: /components/mqtt/#discovery
---

The discovery of MQTT devices will enable one to use MQTT devices with only minimal configuration effort on the side of Home Assistant. The configuration is done on the device itself and the topic used by the device. Similar to the [HTTP binary sensor](/components/binary_sensor.http/) and the [HTTP sensor](/components/sensor.http/). Only support for binary sensor is available at the moment.

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
<discovery_prefix>/<component>/<object_id>/<>
```

- `<component>`: One of the supported components, eg. `binary_sensor`.
- `<object_id>`: The ID of the device. This will become the `entity_id` in Home Assistant.
- `<config>`: The topic `config` or `state` which defines the current action.

The payload will be checked like an entry in your `configuration.yaml` file if a new device is added. This means that missing variables will be filled with the platform's default values.

### {% linkable_title Example %}

A motion detection device which can be represented by a [binary sensor](/components/binary_sensor.mqtt/) for your garden would sent its configuration as JSON payload to the Configuration topic. After the first message to `config`, then the MQTT messages sent to the State topic will update the state in Home Assistant.

- Configuration topic: `homeassistant/binary_sensor/garden/config`
- State topic: `homeassistant/binary_sensor/garden/state`
- Payload:  `{"name": "garden", "sensor_class": "motion"}`

To create a new sensor manually. For more details please refer to the [MQTT testing section](/component/mqtt_testing).

```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/config" -m '{"name": "garden", "sensor_class": "motion"}'
```
Update the state.

```bash
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "homeassistant/binary_sensor/garden/state" -m ON
```

