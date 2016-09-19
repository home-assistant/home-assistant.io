---
layout: page
title: "Modbus"
description: "Instructions how to integrate Modbus within Home Assistant."
date: 2015-04-25 9:16
sidebar: true
comments: false
sharing: true
footer: true
logo: modbus.png
ha_category: Hub
ha_release: pre 0.7
---


[Modbus](http://www.modbus.org/) is a serial communication protocol to control PLCs (Programmable logic controller). It currently supports sensors and switches which can be controlled over serial, TCP, and UDP connections.

To add modbus to your installation, add the following to your `configuration.yaml` file:

For a network connection:

```yaml
# Modbus TCP
modbus:
  type: tcp
  host: IP_ADDRESS
  port: 2020
```

Configuration variables:

- **type** (*Required*): Type of the connection to Modbus.
- **host** (*Required*): The IP address of your router, eg. 192.168.1.1.
- **port** (*Required*): The port for the comminication.

For a serial connection:

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
```

Configuration variables:

- **type** (*Required*): Type of the connection to Modebus.
- **method** (*Required*): Method of the connection to Modbus.
- **port** (*Required*): The port where your Modbus device is connected to your Home Assistant host.
- **baudrate** (*Required*): The speed for the serial connection.
- **stopbits** (*Required*): The stopbits for the serial connection.
- **bytesize** (*Required*): The bytesize for the serial connection.
- **parity** (*Required*): The parity for the serial connection.

### {% linkable_title Services %}


| Service | Description |
| ------- | ----------- |
| write_register | Write register. Requires `unit`, `address` and `value` fields. `value` can be either single value or an array |


## {% linkable_title Building on top of Modbus %}

 - [Modbus Binary Sensor](/components/binary_sensor.modbus/)
 - [Modbus Sensor](/components/sensor.modbus/)
 - [Modbus Switch](/components/switch.modbus/)
