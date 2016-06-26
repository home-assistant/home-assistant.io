---
layout: page
title: "Homematic Sensor"
description: "Instructions how to integrate Homematic senors within Home Assistant."
date: 2016-06-25 12:58
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Sensor
ha_release: 0.23
---


The `homematic` sensor platform lets you view various [Homematic](http://www.homematic.com/) sensors within Home Assistant.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
sensor:
  platform: homematic
  address: LEQ1234567
  name: Dishwasher
  param: POWER
```

Configuration variables:

- **platform** (*Required*: Needed to let Home Assistant know this is a Homematic rollershutter.
- **address** (*Required*): The serial number of the device, eg. LEQ1234567
- **name** (*Optional*): Name to identify the device.
- **button** (*Optional*): Channel of the device to monitor (default: 1)
- **param** (*Optional*):  For devices with multiple channels and possible events, you may define which event type you want to attatch to this entity.

Currently the following devices are supported:
- Thermostats / Weather sensors (param: TEMPERATURE, HUMIDITY)
- Switch Powermeter (param: POWER, CURRENT, VOLTAGE, FREQUENCY, ENERGY_COUNTER)
- Motion detectors (param: BIRGHTNESS)
- Rotary (no parameters needed)
