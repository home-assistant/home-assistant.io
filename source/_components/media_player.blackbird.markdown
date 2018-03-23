---
layout: page
title: "Blackbird 8x8 HDMI Matrix Switch"
description: "Instructions on how to integrate Monoprice Blackbird 4k 8x8 HDBaseT Matrix Switch into Home Assistant."
date: 2018-03-23 16:45
sidebar: true
comments: false
sharing: true
footer: true
logo: monoprice.svg
ha_category: Media Player
ha_release: 0.66
ha_iot_class: "Local Polling"
---

The `blackbird` platform allows you to control [Monoprice Blackbird Matrix Switch](https://www.monoprice.com/product?p_id=21819) using a serial connection.

To add a Blackbird device to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: blackbird
    port: /dev/ttyUSB0
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
      7:
        name: Outside
      8:
        name: Theater
    sources:
      1: 
        name: BluRay
      3:
        name: Chromecast
      8:
        name: AppleTV
```

Configuration variables:

- **port** (*Required*): The serial port to which Blackbird matrix switch is connected
- **zones** (*Required*): This is the list of zones available. Valid zones are 1,2,3,4,5,6,7,8. Each zone must have a name assigned to it.
- **sources** (*Required*): The list of sources available. Valid source numbers are 1,2,3,4,5,6,7,8. Each source number corresponds to the input number on the Blackbird matrix switch. Similar to zones, each source must have a name assigned to it.

### {% linkable_title Service `BLACKBIRD_SETALLZONES` %}

Set all zones to the same input source. This service allows you to immediately synchronize all the TVs in your home. Regardless of `entity_id` provided, all zones will be updated. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String that points at an `entity_id` of a zone.
| `source` | no | String of source name to activate.
