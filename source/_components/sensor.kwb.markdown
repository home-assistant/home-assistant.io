---
layout: page
title: "KWB Easyfire Sensor"
description: "Instructions how to integrate the KWB Easyfire sensor into Home Assistant."
date: 2017-03-06 14:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.40
---

The `kwb` component integrates the sensors of KWB Easyfire pellet central heating units with the Comfort3 controller (http://www.kwbheizung.de/de/produkte/kwb-comfort-3.html) into Home Assistant.

Direct connection via serial (RS485) or via telnet terminal server is supported. The serial cable has to be attached to the control unit port 25 (which is normally used for detached control terminals).

Since this serial protocol is proprietary and closed, only most temperature sensors and a few control relais are supported, the rest is still WIP (see https://www.mikrocontroller.net/topic/274137).

```yaml
  - platform: kwb
    name: kwb
    host: <ip>
    port: 23
    type: tcp
    raw: False
```

or

```yaml
  - platform: kwb
    name: kwb
    device: "/dev/ttyUSB0"
    type: serial
    raw: False
```
