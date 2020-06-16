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
---

This implements a direct RS485 connection to a solar inverter in the 
PVI-3.0/3.6/4.2-TL-OUTD ABB series, and may work on others.
The inverter was formerly made by PowerOne who got taken over by ABB.

The TCP/IP method of communicating with inverters is supported by the 
Python library, but not by this implementation in this integration.

This integration creates the inverter as a device with two sensors, reporting live power output in Watts and device temperature.

Note the PV inverter will be unresponsive to communications when in darkness, 
so the sensors will report 'Unavailable' during the night.

The RS485 connection can be made using a low cost USB-RS485 converter.  It works using a 2-wire interface but an interface with a separate ground reference may be more reliable.

## Configuration

Configuration should be done via the user interface. The inverter will need to be on (i.e. in daylight) and connected correctly in order to do the first time setup.  Normally it is sufficient to select the correct serial port and leave the default address `2`.

Configuration via `configuration.yaml` is now deprecated but does still work.

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: aurora_abb_powerone
    device: 'SERIAL_PORT'
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
    device: '/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A50285BI-if00-port0'
```
