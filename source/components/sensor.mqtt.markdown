---
layout: page
title: "MQTT Sensor support"
description: "Instructions how to integrate MQTT sensors within Home Assistant."
date: 2015-05-30 23:21
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/mqtt.png' class='brand pull-right' />
This generic sensor implementation uses the MQTT message payload
as the sensor value. If messages in this state_topic are published
with RETAIN flag, the sensor will receive an instant update with
last known value. Otherwise, the initial state will be undefined.

```yaml
# Example configuration.yml entry
sensor:
  platform: mqtt
  name: "MQTT Sensor"
  state_topic: "home/bedroom/temperature"
  unit_of_measurement: "°C"
```

- **name**: The name of the sensor. Default is 'MQTT Sensor'. *Optional*
- **state_topic**: The MQTT topic subscribed to receive sensor values. *Required*
- **unit_of_measurement**: Defines the units of measurement of the sensor, if any. *Optional*
