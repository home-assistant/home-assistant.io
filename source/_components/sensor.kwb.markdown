---
layout: page
title: "KWB Easyfire Sensor"
description: "Instructions on how to integrate the KWB Easyfire sensor into Home Assistant."
date: 2017-03-06 14:10
sidebar: true
comments: false
sharing: true
footer: true
logo: kwb.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: "0.40"
---

The `kwb` component integrates the sensors of KWB Easyfire pellet central heating units with the Comfort3 controller (http://www.kwbheizung.de/de/produkte/kwb-comfort-3.html) into Home Assistant.

Direct connection via serial (RS485) or via telnet terminal server is supported. The serial cable has to be attached to the control unit port 25 (which is normally used for detached control terminals).

Since this serial protocol is proprietary and closed, only most temperature sensors and a few control relays are supported, the rest is still WIP (see https://www.mikrocontroller.net/topic/274137).

Direct connection via serial port:

```yaml
# Example configuration.yaml entry
- platform: kwb
    name: kwb
    device: "/dev/ttyUSB0"
    type: serial
    raw: false
```

Telnet terminal server with a serial-ethernet converter:

```yaml
# Example configuration.yaml entry
  - platform: kwb
    name: kwb
    host: <ip>
    port: 23
    type: tcp
    raw: false
```

Configuration variables:

*Required if used with a serial-ethernet converter*

- **host**: The IP-address of the serial server
- **port**: The TCP-port of the serial server
- **type**: tcp

*Required if used directly with a serial port*

- **device**: The serial device of the machine
- **type**: serial

*Optional for both cases*

- **name**: The name of the device used in the frontend
- **raw**: Should the raw serial output be shown as a sensor
