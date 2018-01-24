---
layout: page
title: "ZigBee Switch"
description: "Instructions on how to set up ZigBee switches within Home Assistant."
date: 2016-01-28 11:52
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: Switch
ha_release: 0.12
ha_iot_class: "Local Polling"
---

A ZigBee switch in this context is a device connected to one of the digital output pins on a ZigBee module. It can simply be switched on and off. By default, a switch is considered `on` when the ZigBee device's digital output is held `high` and considered `off` when it is held `low`. This behavior can be inverted by setting the `on_state` configuration variable to `low`.

To configure a digital output pin as switch, add the following to your `configuration.yaml` file:

```yaml
switch:
  - name: Pond Fountain
    platform: zigbee
    pin: 0
    address: 0013A20040791FA2
    on_state: low
```

Configuration variables:

- **name** (*Required*): The name you would like to give the switch in Home Assistant.
- **pin** (*Required*): The number identifying which pin to use.
- **address**: The long 6 4bit address of the remote ZigBee device whose digital output pin you would like to switch. Do not include this variable if you want to switch the local ZigBee device's pins.
- **on_state**: Either `high` (default) or `low`, depicting whether the digital output pin is pulled `high` or `low` when the switch is turned on.
