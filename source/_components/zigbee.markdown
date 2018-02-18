---
layout: page
title: "ZigBee"
description: "Instructions on how to integrate a ZigBee network with Home Assistant."
date: 2016-01-27 17:10
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: DIY
ha_release: 0.12
ha_iot_class: "Local Polling"
---

[ZigBee](http://www.zigbee.org/what-is-zigbee/) integration for Home Assistant allows you to utilize modules such as the [XBee](http://www.digi.com/lp/xbee) as wireless General Purpose Input/Output (GPIO) devices. The component requires a local ZigBee device to be connected to a serial port. Through this it will send and receive commands to and from other devices on the ZigBee mesh network.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](../binary_sensor.zigbee) (digital input pins)
- [Sensor](../sensor.zigbee) (analog input pins and temperature sensor)
- [Light](../light.zigbee) (digital output pins)
- [Switch](../switch.zigbee) (digital output pins)

The local ZigBee device (assuming XBee) must have an up to date Router or Coordinator API firmware installed.

A `zigbee` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
zigbee:
```

- **device** (*Optional*): The serial port to which the local ZigBee device is connected. Defaults to `/dev/ttyUSB0`
- **baud** (*Optional*): The baud rate at which to communicate with the local ZigBee device. Defaults to `9600`

To find the possible serial port names of your device, run:

```bash
$ ls /dev/ttyUSB*
```

<p class='note'>
The port may also appear as /dev/ttyACM* if you're communicating with the ZigBee device through an Arduino.
</p>

### {% linkable_title Example %}

```yaml
# Example configuration.yaml entry
zigbee:
  device: /dev/ttyACM1
  baud: 115200
```
