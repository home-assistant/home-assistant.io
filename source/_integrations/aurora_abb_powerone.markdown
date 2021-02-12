---
title: Aurora ABB Solar PV
description: Instructions on how to integrate an Aurora ABB Powerone solar inverter within Home Assistant.
ha_category:
  - Sensor
  - Energy
ha_release: 0.96
ha_iot_class: Local Polling
ha_codeowners:
  - '@davet2001'
ha_domain: aurora_abb_powerone
ha_platforms:
  - sensor
---

This implements a direct RS485 connection to a solar inverter in the 
PVI-3.0/3.6/4.2-TL-OUTD ABB series, and may work on others.
The inverter was formerly made by PowerOne who got taken over by ABB.

The TCP/IP method of communicating with inverters is supported by the 
Python library, but not by this implementation in this integration.

This integration provides a single sensor which reports the live power output
in watts.

Note the PV inverter will be unresponsive to communications when in darkness, 
so the value 'unknown' will be displayed during the night.

## Configuration

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: aurora_abb_powerone
    device: "SERIAL_PORT"
```

{% configuration %}
device:
  description: The serial port your RS485 adaptor is connected to.
  required: true
  type: string
address:
  description: The address of the inverter - only need to set this if you have changed your inverter away from the default address of 2.
  required: false
  type: integer
  default: 2
name:
  description: Name of the sensor to use in the frontend.
  required: false
  default: Solar PV
  type: string
{% endconfiguration %}

```yaml
# Example configuration.yaml entry for aurora_abb_powerone platform
sensor:
  - platform: aurora_abb_powerone
    address: 2
    device: "/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A50285BI-if00-port0"
```
