---
layout: page
title: "ZigBee Binary Sensor"
description: "Instructions on how to set up ZigBee binary sensors within Home Assistant."
date: 2016-01-28 12:38
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: Binary Sensor
---

A `zigbee` binary sensor in this context is a device connected to one of the digital input pins on a [ZigBee](http://www.zigbee.org/) module. The states reported by such a device are limited to 'on' or 'off'. By default, a binary sensor is considered 'on' when the ZigBee device's digital input pin is held 'high' and considered 'off' when it is held 'low'. This behaviour can be inverted by setting the `on_state` configuration variable to `low`.

To enable the ZigBee binary sensors in your installation, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: zigbee
    name: Hallway PIR Sensor
    pin: 0
    address: 0013A20040892FA2
    on_state: low
```

Configuration variables:

- **name** (*Required*): The name you'd like to give the binary sensor in Home Assistant.
- **platform** (*Required*): Set to `zigbee`.
- **pin** (*Required*): The number identifying which pin to use.
- **address**: The long 64bit address of the remote ZigBee device whose digital input pin you'd like to sample. Do not include this variable if you want to sample the local ZigBee device's pins.
- **on_state**: Either `high` (default) or `low`, depicting whether the binary sensor is considered 'on' when the pin is 'high' or 'low'.

