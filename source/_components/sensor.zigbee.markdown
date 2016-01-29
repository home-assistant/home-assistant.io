---
layout: component
title: ZigBee Sensor
description: "Instructions on how to set up ZigBee sensors within Home Assistant."
date: 2016-01-28 10:08
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: Sensor
---

There are two types of ZigBee sensor available to Home Assistant:

- [Analog input pin](#analog-input-pin)
- [Temperature sensor](#temperature-sensor) (XBee Pro)

## {% linkable_title Analog Input Pin %}

The analog input pins on an XBee (non-Pro) will read 0V to 1.2V. This is translated by the [xbee-helper](https://github.com/flyte/xbee-helper) library into a percentage. The maximum voltage your ZigBee device will read is configurable using the `max_volts` configuration variable.

To configure an analog input pin sensor, use the following variables:

- **name** (*Required*): The name you'd like to give the sensor in Home Assistant.
- **platform** (*Required*): Set to `zigbee`.
- **type** (*Required*): Set to `analog`.
- **pin** (*Required*): The number identifying which pin to sample.
- **address**: The long 64bit address of the remote ZigBee device whose analog input pin you'd like to sample. Do not include this variable if you want to sample the local ZigBee device's pins.
- **max_volts**: The maximum voltage which the analog input pin is able to read. Default: `1.2`

#### Example

```yaml
sensor:
  - name: My Analog Input
    platform: zigbee
    type: analog
    pin: 0
    address: 0013A2004233D138
```

See the [Digi knowledge base](http://knowledge.digi.com/articles/Knowledge_Base_Article/Digital-and-analog-sampling-using-XBee-radios) for more XBee sampling details.

## {% linkable_title Temperature Sensor %}

The XBee Pro (and perhaps other third party modules) contains a thermometer device which can be read by using the `TP` AT command. To set this up as a temperature sensor device in Home Assistant use the following config variables:

- **name** (*Required*): The name you'd like to give the temperature sensor in Home Assistant
- **platform** (*Required*): Set to `zigbee`
- **type** (*Required*): Set to `temperature`
- **address**: The long 64bit address of the remote ZigBee device whose temperature sensor you'd like to sample. Do not include this variable if you want to sample the local ZigBee device's temperature.

#### Example

```yaml
sensor:
  - name: Living Room Temperature
    platform: zigbee
    type: temperature
    address: 0013A20050E752C5
```