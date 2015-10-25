---
layout: page
title: "Modbus"
description: "Instructions how to integrate Modbus within Home Assistant."
date: 2015-04-25 9:16
sidebar: false
comments: false
sharing: true
footer: true
logo: modbus.png
ha_category: Hub
---

<img src='/images/supported_brands/modbus.png' class='brand pull-right' />
[Modbus](http://www.modbus.org/) is a serial communication protocol to control PLCs (Programmable logic controller). It currently supports sensors and switches which can be controlled over serial, TCP, and UDP connections.

To add modbus to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
modbus:
  type: serial
  method: rtu
  port: /dev/ttyUSB0
  baudrate: 9600
  stopbits: 1
  bytesize: 8
  parity: N

sensor:
  platform: modbus
  slave: 1
  registers:
    16:
      name: My integer sensor
        unit: C
    24:
      bits:
        0:
          name: My boolean sensor
        2:
          name: My other boolean sensor
    coils:
        0:
            name: My coil switch

switch:
  platform: modbus
  slave: 1
  registers:
    24:
      bits:
        0:
          name: My switch
        2:
          name: My other switch
```
