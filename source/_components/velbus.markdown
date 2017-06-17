---
layout: page
title: "Velbus"
description: "Access and control your Velbus devices."
date: 2017-06-17 16.58
sidebar: true
comments: false
sharing: true
footer: true
logo: velbus.png
ha_category: Hub
ha_iot_class: "Local Push"
ha_release: 0.47
---

The `velbus` component supports the Velbus USB and Serial gateways.

The gateway needs to be manually configured by adding the following lines to your `configuration.yaml` file:

```yaml
[velbus]
serial_port = "/dev/ttyUSB00"
lights:
  - module: 0xda
    channel: 1
    name: "Kitchen Light"
binary_sensors:
  - module: 0xea
    channel: 2
    name: "Kitchen Switch"
```

Configuration variables:

- **serial_port** (*Required*): The serial device that is connected to Velbus controller
- **lights** (*Optional*): List of lights with their Velbus module address, channel and human-readable name
- **binary_sensors** (*Optional*): List of binary sensors with their Velbus module address, channel and human-readable name. Binary sensors has an optional boolean **is_pushbutton** attribute to indicate that the sensor is a push button (and thus will change state to off right after on state has been received.)
