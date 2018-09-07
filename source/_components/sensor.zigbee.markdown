---
layout: page
title: ZigBee Sensor
description: "Instructions on how to set up ZigBee sensors within Home Assistant."
date: 2016-01-28 10:08
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: Sensor
ha_release: 0.12
ha_iot_class: "Local Polling"
---

There are two types of [ZigBee](http://www.zigbee.org/) sensor available to Home Assistant:

- [Analog input pin](#analog-input-pin)
- [Temperature sensor](#temperature-sensor) (XBee Pro)

To configure an analog input pin sensor, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zigbee
    name: My Analog ZigBee Input
    type: analog
    pin: 0
    address: 0013A2004233D138
```

Configuration variables:

- **name** (*Required*): The name you would like to give the sensor in Home Assistant.
- **type** (*Required*): Set to `analog` or `temperature`.
- **pin** (*Optional*): The number identifying which pin to sample.
- **address** (*Optional*): The long 64 bit address of the remote ZigBee device whose pin you would like to sample. Do not include this variable if you want to sample the local ZigBee device's pins.
- **max_volts** (*Optional*): The maximum voltage which the input pin is able to read. Defaults to `1.2`.


## {% linkable_title Examples %}

### {% linkable_title Analog Input Pin %}

The analog input pins on an XBee (non-Pro) will read 0V to 1.2 V. This is translated by the [xbee-helper](https://github.com/flyte/xbee-helper) library into a percentage. The maximum voltage your ZigBee device will read is configurable using the `max_volts` configuration variable.

To configure an analog input pin sensor, add the following to your `configuration.yaml` file:

```yaml
## Example configuration.yaml entry
sensor:
  - platform: zigbee
    name: My Analog ZigBee Input
    type: analog
    pin: 0
    address: 0013A2004233D138
```

See the [Digi knowledge base](http://knowledge.digi.com/articles/Knowledge_Base_Article/Digital-and-analog-sampling-using-XBee-radios) for more XBee sampling details.

## {% linkable_title Temperature Sensor %}

The XBee Pro (and perhaps other third party modules) contains a thermometer device which can be read by using the `TP` AT command.

To configure a temperature sensor device, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zigbee
    name: Living Room Temperature ZigBee
    type: temperature
    address: 0013A20050E752C5
```

