---
title: "Velbus"
description: "Access and control your Velbus devices."
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

## Configuration

The gateway needs to be configured by adding the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for a USB or serial interface
velbus:
  port: '/dev/ttyUSB00'
```

```yaml
# Example configuration.yaml entry for a TCP/IP interface
velbus:
  port: '127.0.0.1:3678'
```

{% configuration %}
port:
  description: The port where your board is connected to your Home Assistant host.
  required: true
  type: string
{% endconfiguration %}
