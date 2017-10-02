---
layout: page
title: "Monoprice 6-Zone Amplifier"
description: "Instructions on how to integrate Monoprice 6-Zone Home Audio Controller into Home Assistant."
date: 2017-10-22 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: russound.png
ha_category: Media Player
ha_release: 0.25
ha_iot_class: "Local Polling"
---

The `monoprice` platform allows you to control [Monoprice 6-Zone Amplifier](https://www.monoprice.com/product?p_id=10761)

Connecting to the Monoprice amplifier is possible by using serial connection.

To add a device to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: monoprice
    port: /dev/ttyUSB0
    zones:
      11:
        name: Main Bedroom
      12:
        name: Living Room
      13:
        name: Kitchen
      14:
        name: Bathroom
      15:
        name: Dining Room
      16:
        name: Guest Bedroom
    sources:
      1: 
        name: Sonos
      5:
        name: Chromecast
```

Configuration variables:

- **port** (*Required*): The serial port to which Monoprice amplifier is connected
- **zones** (*Required*): This is the list of zones available. Valid zones are 11,12,13,14,15,16. In case multiple Monoprice devices are stacked together the list of valid zones is extended by 21,22,23,24,25,26 for the second device and 31,32,33,34,35,36 for the third devices. Each zone must have a name assigned to it.
- **sources** (*Required*): The list of sources available. Valid source numbers are 1,2,3,4,5,6. Each source number corresponds to the input number on the Russound amplifier. Similar to zones, each source must have a name assigned to it.
