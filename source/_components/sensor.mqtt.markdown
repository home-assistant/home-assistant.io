---
layout: page
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


This `mqtt` sensor platform uses the MQTT message payload as the sensor value. If messages in this `state_topic` are published with *RETAIN* flag, the sensor will receive an instant update with last known value. Otherwise, the initial state will be undefined.

To use your MQTT sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
sensor:
  platform: mqtt
  state_topic: "home/bedroom/temperature"
  name: "MQTT Sensor"
  qos: 0
  unit_of_measurement: "°C"
  value_template: '{% raw %}{{ value.x }}{% endraw %}'
```

Configuration variables:

- **state_topic** (*Required*): The MQTT topic subscribed to receive sensor values.
- **name** (*Optional*): The name of the sensor. Default is 'MQTT Sensor'. 
- **qos** (*Optional*): The maximum QoS level of the state topic. Default is 0.
- **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.
- **value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the payload.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Get battery level %}

If you are using the [Owntracks](components/device_tracker.owntracks/) and enable the reporting of the battery level then you can use a MQTT sensor to keep track of your battery. A regular MQTT message from Owntracks looks like this: 

```bash
owntracks/tablet/tablet {"_type":"location","lon":7.21,"t":"u","batt":92,"tst":144995643,"tid":"ta","acc":27,"lat":46.12}
```

Thus the trick is extract the battery level from the payload.

```yaml
# Example configuration.yml entry
sensor:
  platform: mqtt
  state_topic: "owntracks/tablet/tablet"
  name: "Battery Tablet"
  unit_of_measurement: "%"
  value_template: '{{ value_json.batt }}'
```

