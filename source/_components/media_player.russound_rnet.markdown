---
layout: page
title: "Russound RNET"
description: "Instructions on how to integrate Russound RNET devices into Home Assistant."
date: 2016-07-21 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: russound.png
ha_category: Media Player
ha_release: 0.25
ha_iot_class: "Local Polling"
---

The `russound_rnet` platform allows you to control Russound devices that make use of the RNET protocol.

This has initially been tested against a Russound CAV6.6 unit with six zones and six sources.

Connecting to the Russound device is only possible by TCP, you can make use of a TCP to Serial gateway such as [tcp_serial_redirect](https://github.com/pyserial/pyserial/blob/master/examples/tcp_serial_redirect.py)

To add a device to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: russound_rnet
    host: 192.168.1.10
    port: 1337
    name: Russound
    zones:
      1:
        name: Main Bedroom
      2:
        name: Living Room
      3:
        name: Kitchen
      4:
        name: Bathroom
      5:
        name: Dining Room
      6:
        name: Guest Bedroom
    sources:
      - name: Sonos
      - name: Sky+
```

Configuration variables:

- **host** (*Required*): The IP of the TCP gateway
- **port** (*Required*): The port of the TCP gateway
- **name** (*Required*): The name of the device
- **zones** (*Required*): This is the list of zones available
- **sources** (*Required*): The list of sources available, these must be in order as they are connected to the device
