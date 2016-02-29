---
layout: page
title: "Binary Sensor"
description: "Instructions how to setup your binary sensors with Home Assistant."
date: 2015-11-20 14:00
sidebar: true
comments: false
sharing: true
footer: true
---

Binary sensors are gathering information about state of switches, contacts, pins, and alike. The return value of those sensors is usually digital (1/0). This means that those sensors knows only two states: **off/low/open** and **on/high/closed**.

Knowing that there are only two states allows Home Assistant to represent the sensor better in the frontend.

For analog sensors please check the [component overview](https://home-assistant.io/components/#sensor).

Most binary sensors supports the `SENSOR_CLASSES` which let you specify the type of your sensor. The following types are supoorted:

- **None**: Generic on/off
- **opening**: Door, window, etc
- **motion**: Motion sensor
- **gas'**: CO, CO2, etc
- **smoke'**: Smoke detector
- **moisture**: Specifically a wetness sensor
- **light**: Lightness threshold
- **power**: Power, over-current, etc
- **safety**: Generic on=unsafe, off=safe
- **heat**: On means hot (or too hot)
- **cold**: On means cold (or too cold)
- **moving**: On means moving, Off means stopped
- **sound**: On means sound detected, Off means no sound
- **vibration**: On means vibration detected, Off means no vibration

