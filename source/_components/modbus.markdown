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
ha_iot_class: "Local Push"
---


[Modbus](http://www.modbus.org/) is a serial communication protocol to control PLCs (Programmable logic controller). It currently supports sensors and switches which can be controlled over serial, TCP, and UDP connections.

To add modbus to your installation, add the following to your `configuration.yaml` file:

For a network connection:

```yaml
# Example configuration.yaml entry for a TCP connection
modbus:
  type: tcp
  host: IP_ADDRESS
  port: 2020
```

Configuration variables:

- **type** (*Required*): Type of the connection to Modbus. Possible values are:
  - *tcp*: Modbus TCP protocol according to "MODBUS Messaging Implementation Guide version 1.0b" provided by Schneider Automation,
  - *udp*: Modbus TCP form, but using UDP for transport (removes the overheads required for TCP),
  - *rtuovertcp*: Modbus RTU message transmitted with a TCP/IP wrapper and sent over a network instead of serial lines.
- **host** (*Required*): The IP address of your Modbus device, eg. 192.168.1.1.
- **port** (*Required*): The port for the communication.
- **timeout** (*Optional*): Timeout for slave response in seconds. (default: 3)

For a serial connection:

```yaml
# Example configuration.yaml entry for a serial connection
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

- **type** (*Required*): Type of the connection to Modbus.
- **method** (*Required*): Method of the connection to Modbus.
- **port** (*Required*): The port where your Modbus device is connected to your Home Assistant host.
- **baudrate** (*Required*): The speed for the serial connection.
- **stopbits** (*Required*): The stopbits for the serial connection.
- **bytesize** (*Required*): The bytesize for the serial connection.
- **parity** (*Required*): The parity for the serial connection.
- **timeout** (*Optional*): Timeout for slave response in seconds. (default: 3)

### {% linkable_title Services %}


| Service | Description |
| ------- | ----------- |
| write_register | Write register. Requires `unit`, `address` and `value` fields. `value` can be either single value or an array |


## {% linkable_title Building on top of Modbus %}

 - [Modbus Binary Sensor](/components/binary_sensor.modbus/)
 - [Modbus Sensor](/components/sensor.modbus/)
 - [Modbus Switch](/components/switch.modbus/)
 - [Modbus Thermostat](/components/climate.modbus/)
