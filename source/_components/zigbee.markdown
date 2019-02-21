---
layout: page
title: "Zigbee"
description: "Instructions on how to integrate a Zigbee network with Home Assistant."
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

[Zigbee](http://www.zigbee.org/what-is-zigbee/) integration for Home Assistant allows you to utilize modules such as the [XBee](http://www.digi.com/lp/xbee) as wireless General Purpose Input/Output (GPIO) devices. The component requires a local Zigbee device to be connected to a serial port. Through this, it will send and receive commands to and from other devices on the Zigbee mesh network.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](../binary_sensor.zigbee) (digital input pins)
- [Sensor](../sensor.zigbee) (analog input pins and temperature sensor)
- [Light](../light.zigbee) (digital output pins)
- [Switch](../switch.zigbee) (digital output pins)

## {% linkable_title Configuration %}

The local Zigbee device (assuming XBee) must have an up to date Router or Coordinator API firmware installed.

A `zigbee` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
zigbee:
```

{% configuration %}
device:
  description: The serial port to which the local Zigbee device is connected.
  required: false
  type: string
  default: "`/dev/ttyUSB0`"
baud:
  description: The baud rate at which to communicate with the local Zigbee device.
  required: false
  type: integer
  default: 9600
{% endconfiguration %}

To find the possible serial port names of your device, run:

```bash
ls /dev/ttyUSB*
```

<p class='note'>
The port may also appear as /dev/ttyACM* if you're communicating with the Zigbee device through an Arduino.
</p>

### {% linkable_title Example %}

```yaml
# Example configuration.yaml entry
zigbee:
  device: /dev/ttyACM1
  baud: 115200
```
