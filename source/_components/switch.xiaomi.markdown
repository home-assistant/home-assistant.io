---
layout: page
title: "Xiaomi Switch"
description: "Instructions how to setup the Xiaomi switch within Home Assistant."
date: 2017-07-21 16:34
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Switch
ha_release: "0.50"
ha_iot_class: "Local Polling"
---


The `xiaomi` switch platform allows you to get data from your [Xiaomi](http://www.mi.com/en/) switches.

The requirement is that you have setup [Xiaomi](/components/xiaomi/).

## Button Switch (Round Type)
When the Button Switch (Round Type) is pressed a 'click' event is raised. This event will have one of 3 types:

* single
* double
* long_click_press

These can be used to trigger different automations from the same switch. For example:

```
# Turn on the kitchen lights with a single press
- alias: kitchen lights
  trigger:
    - platform: event
      event_type: click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: single
  action:
    - service: light.turn_on
      data:
        entity_id: light.kitchen_lights

# Turn on the dining room lights with a double press
- alias: dining room light
  trigger:
    - platform: event
      event_type: click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: double
  action:
    - service: light.turn_on
      data:
        entity_id: light.dining_room_lights

# Turn on the garden lights with a long press
- alias: garden lights
  trigger:
    - platform: event
      event_type: click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: long_click_press
  action:
    - service: light.turn_on
      data:
        entity_id: light.garden_lights
```
