---
title: "Using time interval and input boolean"
description: "Automation to get a random color every 2 minutes that can be turned on/off."
ha_category: Automation Examples
---

#### Change Hue light on interval to random color based on state of an input boolean 

_Note, Philips Hue is currently the only light platform that support the random effect._

```yaml
input_boolean:
  loop_livingcolors:
    name: Loop LivingColors
    initial: off
    icon: mdi:spotlight

automation:
# Changes Hue light every two minutes to random color if input boolean is set to on
- alias: "Set LivingColors to random color"
  trigger:
    platform: time_pattern
    minutes: "/2"
  condition:
    condition: state
    entity_id: input_boolean.loop_livingcolors
    state: "on"
  action:
    service: light.turn_on
    target:
      entity_id: light.woonkamer_livingcolors
    data:
      effect: random
      transition: 5
      brightness: 255
```
