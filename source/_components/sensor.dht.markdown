---
layout: page
title: "DHT Sensor"
description: "Instructions how to integrate DHTxx sensors within Home Assistant."
date: 2015-08-30 19:15
sidebar: true
comments: false
sharing: true
footer: true
ha_category: DIY
---


The `dht` sensor platform allows you to get the current temperature and humidity from a DHT11, DHT22, or AM2302 device.

To use your DHTxx sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: dht
  sensor: DHT22
  pin: 23
  name: Living Room
  monitored_conditions:
    - temperature
    - humidity
```

Configuration variables:

- **sensor** (*Required*): The sensor type, supported devices are DHT11, DHT22, and AM2302
- **pin** (*Required*): The pin the sensor is connected to.
- **name** (*Optional*): The name of the sensor
- **monitored_conditions** array: Conditions to monitor.
	- **temperature**:
	- **humidity**: 

Available conditions are only *temperature* and *humidity*.

The name of the pin to which the sensor is connected has different names on different platforms. 'P8_11' for Beaglebone, '23' for Raspberry Pi.

<p class='note warning'>
As this requires access to the GPIO, you will need to run Home Assistant as root.
</p>

