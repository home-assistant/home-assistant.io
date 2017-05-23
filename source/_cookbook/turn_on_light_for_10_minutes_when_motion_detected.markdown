---
layout: page
title: "Turn on lights for 10 minutes after motion detected"
description: "Turn on lights for 10 minutes when motion detected."
date: 2015-10-08 19:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

#### {% linkable_title Turn on lights with a resettable off timer %}

This recipe will turn on a light when there is motion and turn off the light when ten minutes has passed without any motion events.

```yaml
automation:
  alias: Turn on kitchen lights when there is movement
  trigger:
    - platform: state
      entity_id: sensor.motion_sensor
      to: 'on'
  action:
    service: homeassistant.turn_on
    entity_id: script.timed_lamp

script:
  timed_lamp:
    alias: "Turn on lamp and set timer"
    sequence:
      # Cancel ev. old timers
      - service: script.turn_off
        data:
           entity_id: script.timer_off
      - service: light.turn_on
        data:
          entity_id: light.kitchen
      # Set new timer
      - service: script.turn_on
        data:
          entity_id: script.timer_off

  timer_off:
    alias: "Turn off lamp after 10 minutes"
    sequence:
      - delay:
          minutes: 10
      - service: light.turn_off
        data:
          entity_id: light.kitchen
```
