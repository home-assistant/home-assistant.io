---
layout: page
title: "Automation Examples"
description: "Some automation examples to get you started."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
---

```yaml
# Example of entry in configuration.yaml
automation:
# Turns on lights 1 hour before sunset if people are home
# and if people get home between 16:00-23:00
- alias: 'Rule 1 Light on in the evening'
  trigger:
    # Prefix the first line of each trigger configuration
    # with a '-' to enter multiple
    - platform: sun
      event: sunset
      offset: '-01:00:00'
    - platform: state
      entity_id: group.all_devices
      state: 'home'
  condition:
    # Prefix the first line of each condition configuration
    # with a '-'' to enter multiple
    - condition: state
      entity_id: group.all_devices
      state: 'home'
    - condition: time
      after: '16:00:00'
      before: '23:00:00'
  action:
    service: homeassistant.turn_on
    entity_id: group.living_room

# Turn off lights when everybody leaves the house
- alias: 'Rule 2 - Away Mode'
  trigger:
    platform: state
    entity_id: group.all_devices
    state: 'not_home'
  action:
    service: light.turn_off
    entity_id: group.all_lights

# Notify when Paulus leaves the house in the evening
- alias: 'Leave Home notification'
  trigger:
    platform: zone
    event: leave
    zone: zone.home
    entity_id: device_tracker.paulus
  condition:
    condition: time
    after: '20:00'
  action:
    service: notify.notify
    data:
      message: 'Paulus left the house'
```
