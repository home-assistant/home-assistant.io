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

Binary sensors are gathering information about state of switches, contacts, pins, and alike. The return value of those sensors is usually digital (1/0). This means that those sensors knows only two states: **0/off/low/open/false** and **1/on/high/closed/true**.

Knowing that there are only two states allows Home Assistant to represent the sensor better in the frontend.

Most binary sensors support the `sensor_class:`  which let you specify the type of your sensor. The following types are supported:

- **None**: Generic on/off
- **cold**: On means cold (or too cold)
- **connectivity**: On means connection present, Off means no connection
- **gas**: CO, CO2, etc
- **heat**: On means hot (or too hot)
- **light**: Lightness threshold
- **moisture**: Specifically a wetness sensor
- **motion**: Motion sensor
- **moving**: On means moving, Off means stopped
- **occupancy**: On means occupied, Off means not occupied
- **opening**: Door, window, etc
- **power**: Power, over-current, etc
- **safety**: On means unsafe, Off means safe
- **smoke**: Smoke detector
- **sound**: On means sound detected, Off means no sound
- **vibration**: On means vibration detected, Off means no vibration

For analog sensors please check the [component overview](https://home-assistant.io/components/#sensor).
