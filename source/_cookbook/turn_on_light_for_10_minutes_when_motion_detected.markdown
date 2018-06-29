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

#### {% linkable_title Turn on lights with a resetable off timer %}

This recipe will turn on a light when there is motion and turn off the light when ten minutes has passed without any motion events.

```yaml
automation:
- alias: Turn on kitchen light when there is movement
  trigger:
    platform: state
    entity_id: sensor.motion_sensor
    to: 'on'
  action:
    service: homeassistant.turn_on
    entity_id: light.kitchen_light

- alias: Turn off kitchen light 10 minutes after last movement
  trigger:
    platform: state
    entity_id: sensor.motion_sensor
    to: 'off'
    for:
      minutes: 10
  action:
    service: homeassistant.turn_off
    entity_id: light.kitchen_light
```
