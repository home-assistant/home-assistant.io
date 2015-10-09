---
layout: page
title: "Motion detected light"
description: "Turn on lights for 10 minutes when motion detected."
date: 2015-10-08 19:05
sidebar: false
comments: false
sharing: true
footer: true
---

#### Turn on lights with a resettable off timer ####

This recipe will turn on a light when there is motion and turn off the light when ten minutes has passed without any motion events . 

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
      - execute_service: script.turn_off
        service_data: 
           entity_id: script.timer_off
      - execute_service: light.turn_on
        service_data:
          entity_id: light.kitchen
      # Set new timer 
      - execute_service: script.turn_on
        service_data:
          entity_id: script.timer_off

  timer_off:
    alias: "Turn off lamp after 10 minutes"
    sequence:
      - delay:
          minutes: 10
      - execute_service: light.turn_off
        service_data: 
          entity_id: light.kitchen
```
