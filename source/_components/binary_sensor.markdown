---
layout: page
title: "Binary Sensor"
description: "Instructions on how-to setup binary sensors with Home Assistant."
date: 2015-11-20 14:00
sidebar: true
comments: false
sharing: true
footer: true
---

Binary sensors gather information about the state of devices which have a "digital" return value (either 1 or 0). These can be switches, contacts, pins, etc. These sensors only have two states: **0/off/low/closed/false** and **1/on/high/open/true**.  Knowing that there are only two states allows Home Assistant to represent these sensors in a better way in the frontend according to their functionality.

The way these sensors are displayed in the frontend can be modified in the [customize section](/getting-started/customizing-devices/). The following device classes are supported for binary sensors:

- **None**: Generic on/off. This is the default and doesn't need to be set.
- **battery**: `On` means low, `Off` means normal
- **cold**: `On` means cold
- **connectivity**: `On` means connection present, `Off` means no connection
- **gas**: `On` means gas detected
- **heat**: `On` means hot
- **light**: Lightness threshold
- **moisture**: `On` means wet
- **motion**: `On` means motion detected
- **moving**: `On` means moving, `Off` means stopped
- **occupancy**: `On` means occupied, `Off` means not occupied
- **opening**: `On` means open, `Off` means closed
- **plug**: `On` means device is plugged in, `Off` means device is unplugged
- **power**: Power, over-current, etc.
- **presence**: `On` means Home, `Off` means Away
- **problem**: `On` means a problem was detected, `Off` means the status is OK
- **safety**: `On` means unsafe, `Off` means safe
- **smoke**: `On` means smoke detected
- **sound**: `On` means sound detected, `Off` means no sound
- **vibration**: `On` means vibration detected, `Off` means no vibration

For analog sensors please check the [component overview](https://home-assistant.io/components/#sensor).
