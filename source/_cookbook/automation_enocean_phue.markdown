---
title: "Switch Philips Hue with enocean"
description: "Automation to switch a Philips Hue lamp with an enocean switch."
ha_category: Automation Examples
---

Assume that you have an enocean wall switch and some Philips Hue lamps. The enocean wall switch will fire the event button_pressed and pass along several parameters which is used to turn on/off the lamps.

event_data:

* which
* pushed
* onoff
* id
* devname

```yaml
enocean:
  device: /dev/ttyUSB0

binary_sensor:
  - platform: enocean
    id: [0x00,0x01,0x02,0x03]
    name: living_room_switch

automation:
  - alias: "Turn on living room light"
    trigger:
      platform: event
      event_type: button_pressed
      event_data:
        onoff: 1
        devname: living_room_switch
    action:
      service: light.turn_on
      target:
        entity_id: light.hue_color_lamp_3

  - alias: "Turn off living room light"
    trigger:
      platform: event
      event_type: button_pressed
      event_data:
        onoff: 0
        devname: living_room_switch
    action:
      service: light.turn_off
      target:
        entity_id: light.hue_color_lamp_3
```
