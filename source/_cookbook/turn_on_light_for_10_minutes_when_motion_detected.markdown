---
layout: page
title: "Turn off lights 10 minutes after motion detected"
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

Or in the case of multiple sensors/triggers:

```yaml
automation:
- alias: Turn on hallway lights when the doorbell rings, the front door opens or if there is movement
  trigger:
  - platform: state
    entity_id: sensor.motion_sensor, binary_sensor.front_door, binary_sensor.doorbell
    to: 'on'
  action:
  - service: homeassistant.turn_on
    data:
      entity_id:
        - light.hallway_0
        - light.hallway_1
  - service: timer.start
    data:
      entity_id: timer.hallway

- alias: Turn off hallway lights 10 minutes after trigger
  trigger:
    platform: event
    event_type: timer.finished
    event_data:
      entity_id: timer.hallway
  action:
    service: homeassistant.turn_off
    data:
      entity_id:
        - light.hallway_0
        - light.hallway_1

timer:
  hallway:
    duration: '00:10:00'
```

You can also restrict lights from turning on based on time of day and implement transitions for fading lights on and off.

```yaml
- alias: Motion Sensor Lights On
  trigger:
    platform: state
    entity_id: binary_sensor.ecolink_pir_motion_sensor_sensor
    to: 'on'
  condition: 
    condition: time
    after: '07:30'
    before: '23:30'
  action:
    service: homeassistant.turn_on
    entity_id: group.office_lights
    data: 
      transition: 15


- alias: Motion Sensor Lights Off
  trigger:
    - platform: state
      entity_id: binary_sensor.ecolink_pir_motion_sensor_sensor
      to: 'off'
      for:
        minutes: 15
  action:
    - service: homeassistant.turn_off
      entity_id: group.office_lights
      data: 
        transition: 160
```
