---
layout: page
title: "LaCrosse Sensor"
description: "Instructions how to integrate LaCrosse sensor data received from Jeelink into Home Assistant."
date: 2017-10-29 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_release: 0.56
ha_iot_class: "Local Polling"
---

The `lacrosse` sensor platform is using the data provided by a [`Jeelink`](https://www.digitalsmarties.net/products/jeelink) USB dongle.

Since the sensor change their ID after each powercycle/battery change you can check what sensor IDs are availble by using the command-line tool `pylacrosse` from the pylacrosse package.

```bash
$ sudo pylacrosse -D /dev/ttyUSB0 scan
```

To setup a lacrosse sensor to your installation, add the following to your `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: lacrosse
    device: /dev/ttyUSB0
    baud: 57600
    sensors:
      kitchen_humidity:
        friendly_name: Kitchen Humidity
        type: humidity
        id: 72
      kitchen_temperature:
        friendly_name: Kitchen Temperature
        type: temperature
        id: 72
      kitchen_lacrosse_battery:
        friendly_name: Kitchen Sensor Battery
        type: battery
        id: 72
```
{% endraw %}

{% configuration %}
  device:
    description: The serial baudrate.
    required: true
    type: string
  baud:
    description: The serial baudrate.
    required: true
  sensors:
    description: A list of your sensors.
    required: true
    type: map
    name:
      description: The name of the sensor.
      required: true
      type: string
    friendly_name:
      description: A friendly name of the sensor.
     required: true
     type: string
    type:
      description: The type of the sensor.
      required: true
      type: string
    id:
      description: The LaCrosse Id of the sensor.
      required: true
      type: int

{% endconfiguration %}
