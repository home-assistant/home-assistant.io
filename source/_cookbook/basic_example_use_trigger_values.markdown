---
layout: page
title: "Example using use_trigger_values"
description: "Basic example how to use use_trigger_values in automation"
date: 2015-10-08 19:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

Turn on lights during daytime when it's dark enough < 200 lux.

```yaml
automation:
  - alias: 
    trigger:
      - platform: numeric_state
        entity_id: sensor.sensor_luminance
        below: 200
      - platform: time
        after: "08:00"
        before: "23:00"
    condition: use_trigger_values
    action:
      service: homeassistant.turn_on
      entity_id: group.basic_lights

automation 2:
  - alias: 
    trigger:
      - platform: numeric_state
        entity_id: sensor.sensor_luminance
        above: 200
      - platform: time
        after: "23:00"
    action:
      service: homeassistant.turn_off
      entity_id: group.basic_lights
```
