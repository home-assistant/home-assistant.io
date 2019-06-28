---
layout: page
title: "Aurora ABB Powerone PV Inverter Sensor"
description: "Instructions on how to integrate an Aurora ABB Powerone solar inverter within Home Assistant."
date: 2019-06-27 23:30
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category:
  - Sensor
  - Energy
ha_release: 0.96
ha_iot_class: Local Polling
---

This implements a direct RS485 connection to a solar inverter in the 
PVI-3.0/3.6/4.2-TL-OUTD ABB series, and may work on others.
The inverter was formerly made by PowerOne who got taken over by ABB.

The TCP/IP method of commuicating with inverters is supported by the 
python library, but not by this implementation of the homeassistant component.

The component provides a single sensor which reports the live power output
in watts.

Note the PV inverter will be unresponsive to communications when in darkness.

This is caught by the implementation which returns 'None' if there is no 
response.

## {% linkable_title Configuration %}

Add the following to your `configuration.yaml` file, replacing the text after 
rs485 with the serial port that your device is connected to.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: aurora_abb_powerone
    rs485: '/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A50285BI-if00-port0'
```

{% configuration %}
rs485:
  description: The serial port your RS485 adaptor is connected to.
  required: true
  type: string
address:
  description: The address of the inverter - only need to set this if you have changed your inverter away from the default address of 2.
  required: false
  default: SolarEdge
  type: integer
{% endconfiguration %}

```yaml
# Example configuration.yaml entry for aurora_abb_powerone platform
sensor:
  - platform: aurora_abb_powerone
    rs485: '/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A50285BI-if00-port0'
```
