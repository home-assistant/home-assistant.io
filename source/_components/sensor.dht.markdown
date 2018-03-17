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
ha_release: 0.7
logo: dht.png
ha_iot_class: "Local Polling"
---


The `dht` sensor platform allows you to get the current temperature and humidity from a DHT11, DHT22, or AM2302 device.
The user who starts Home Assistant needs the rights to access GPIOs. This can be done by adding it the GPIO group.

```
sudo adduser homeassistant gpio
```

To use your DHTxx sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: dht
  sensor: DHT22
  pin: 23
  monitored_conditions:
    - temperature
    - humidity
```

Configuration variables:

- **sensor** (*Required*): The sensor type, supported devices are DHT11, DHT22, and AM2302.
- **pin** (*Required*): The pin the sensor is connected to.
- **name** (*Optional*): The name of the sensor.
- **monitored_conditions** array (*Required*): Conditions to monitor. Available conditions are only *temperature* and *humidity*.
- **temperature_offset** (*Optional*): Add or subtract a value from the temperature.
- **humidity_offset** (*Optional*): Add or subtract a value from the humidity.

The name of the pin to which the sensor is connected has different names on different platforms. 'P8_11' for Beaglebone, '23' for Raspberry Pi.

### {% linkable_title Example %}

An example for a Raspberry Pi 3 with a DHT22 sensor connected to GPIO4 (pin 7):

```yaml
sensor:
  - platform: dht
    sensor: DHT22
    pin: 4
    temperature_offset: 2.1
    humidity_offset: -3.2
    monitored_conditions:
      - temperature
      - humidity
```
