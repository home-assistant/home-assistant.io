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

A motion detection device for your garden would sent its configuration as JSON payload `{"name": "garden", "sensor_class": "motion"}` to the topic `homeassistant/binary_sensor/garden/config`. After the first message to `config`, then the MQTT messages sent to `state`, eg. `homeassistant/binary_sensor/garden/state`, will update the state in Home Assistant.

