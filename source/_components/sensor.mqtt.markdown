---
layout: component
title: "MQTT Sensor"
description: "Instructions how to integrate MQTT sensors within Home Assistant."
date: 2015-05-30 23:21
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Sensor
---


This MQTT sensor implementation uses the MQTT message payload as the sensor value. If messages in this state_topic are published with *RETAIN* flag, the sensor will receive an instant update with last known value. Otherwise, the initial state will be undefined.

To use your MQTT sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
sensor:
  platform: mqtt
  state_topic: "home/bedroom/temperature"
  name: "MQTT Sensor"
  qos: 0
  unit_of_measurement: "°C"
```

Configuration variables:

- **state_topic** (*Required*): The MQTT topic subscribed to receive sensor values.
- **name** (*Optional*): The name of the sensor. Default is 'MQTT Sensor'. 
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0.
- **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.
