---
layout: page
title: ZigBee Light
description: "Instructions on how to set up ZigBee lights within Home Assistant."
date: 2016-01-28 12:38
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: Light
---

A ZigBee light in this context is a light connected to one of the digital output pins on a ZigBee module. It can simply be switched on and off. By default, a light is considered 'on' when the ZigBee device's digital output is held 'high' and considered 'off' when it is held 'low'. This behaviour can be inverted by setting the `on_state` configuration variable to `low`.

To configure a digital output pin as a light, use the following variables:

- **name** (*Required*): The name you'd like to give the light in Home Assistant.
- **platform** (*Required*): Set to `zigbee`.
- **pin** (*Required*): The number identifying which pin to use.
- **address**: The long 64bit address of the remote ZigBee device whose digital output pin you'd like to switch. Do not include this variable if you want to switch the local ZigBee device's pins.
- **on_state**: Either `high` (default) or `low`, depicting whether the digital output pin is pulled high or low when the light is turned on.

#### Example

```yaml
light:
  - name: Desk Lamp
    platform: zigbee
    pin: 0
    address: 0013A20040791FA2
    on_state: low
```
