---
layout: page
title: "Particulate matter Sensor"
description: "Instructions how to integrate Particulate matter (PM) sensors within Home Assistant."
date: 2015-08-09 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Sensor
ha_release: 0.26
ha_iot_class: "Local Push"
---


The `serial_pm` sensor platform allows you to use your Particulate matter (PM) sensors with Home Assistant.

To use your PM sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
sensor:
  platform: serial_pm
  serial_device: /dev/tty.SLAB_USBtoUART
  name: Nova
  brand: novafitness
```

Configuration variables:

- **serial_device** (*Required*): The port where the sensor is connected.
- **name** (*Optional*): The name of the sensor. 
- **brand** (*Required*): The type or brand of the sensor.

