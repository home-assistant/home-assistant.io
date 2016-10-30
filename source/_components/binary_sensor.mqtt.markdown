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
ha_iot_class: "Depends"
---


The `mqtt` binary sensor platform uses the MQTT message payload as the sensor value. If messages in this `state_topic` are published with *RETAIN* flag, the sensor will receive an instant update with the last known value. Otherwise, the initial state will be off.

To use your MQTT binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
binary_sensor:
  - platform: mqtt
    state_topic: "home-assistant/window/contact"
```

Configuration variables:

- **state_topic** (*Required*): The MQTT topic subscribed to receive sensor values.
- **name** (*Optional*): The name of the sensor. Default is 'MQTT Sensor'. 
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0.
- **payload_on** (*Optional*): The payload that represents on state. Default is "ON".
- **payload_off** (*Optional*): The payload that represents  state. Default is "OFF".
- **sensor_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
- **value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the payload.

For a quick check you can use the commandline tools shipped with `mosquitto` to send MQTT messages. Set the state of a sensor manually:

```bash
$  mosquitto_pub -h 127.0.0.1 -t home-assistant/window/contact -m "OFF"
```

An extended configuration for the same sensor could look like this if you want/need to be more specific.

```yaml
# Example configuration.yml entry
binary_sensor:
  platform: mqtt
  state_topic: "home-assistant/window/contact"
  name: "Windows contact"
  qos: 0
  payload_on: "1"
  payload_off: "0"
  sensor_class: opening
  value_template: '{% raw %}{{ value.x }}{% endraw %}'
```

