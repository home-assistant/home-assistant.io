---
layout: page
title: "Automation example using time interval and input boolean"
description: "Automation example using time interval and input boolean."
date: 2016-02-07 22:35
sidebar: false
comments: false
sharing: true
footer: true
---

#### {% linkable_title Change Hue light on interval to random color based on state of a input boolean  %}

_Note, Philips Hue is currently the only light platform that support the random effect._

```yaml
input_boolean:
  loop_livingcolors:
    name: Loop LivingColors
    initial: off
    icon: mdi:spotlight

automation:
# Changes Hue light every two minutes to random color if input boolean is set to on
- alias: 'Set LivingColors to random color'
  trigger:
    - platform: time
      minutes: '/2'
      seconds: 0
  condition:
    - platform: input_boolean
      entity_id: input_boolean.loop_livingcolors
      state: on
  action:
    service: light.turn_on
    entity_id:
      - light.woonkamer_livingcolors
    data:
      effect: random
      transition: 5
      brightness: 255
```
