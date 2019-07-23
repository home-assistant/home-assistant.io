---
layout: page
title: "Velbus"
description: "Access and control your Velbus devices."
date: 2017-06-17 16.58
sidebar: true
comments: false
sharing: true
footer: true
logo: velbus.png
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: "0.50"
redirect_from:
  - /components/climate.velbus/
  - /components/sensor.velbus/
  - /components/binary_sensor.velbus/
  - /components/switch.velbus/
---

The `velbus` integration supports the Velbus USB, Velbus serial and a TCP/IP gateway.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Climate
- Sensor
- Switch
- Cover

## Configuration

There are 2 options in configuring the velbus component:

- Via the Home Assistant user interface where it will let you enter the portstring to connect to the velbus bus.
- Via the Home Assistant `configuration.yaml` file.

```yaml
# Example configuration.yaml entry for a USB or serial interface
velbus:
  port: '<portstring>'
```

## Port String

The portstring used in the user interface or the configuration file can have 2 formats:

- For a serial device: /dev/ttyUSB00
- For a tcp/ip device: 127.0.0.1:3678

{% configuration %}
port:
  description: The port where your board is connected to your Home Assistant host.
  required: true
  type: string
{% endconfiguration %}
