---
layout: page
title: "Automation for rainy days"
description: "Basic example how to use weather conditions to set states"
date: 2015-10-08 19:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

This requires a [Dark Sky](/components/sensor.darksky/) sensor with the condition `precip_intensity` that tells if it's raining or not. You could also experiment with other attributes such as `cloud_cover`.

Turn on a light in the living room when it starts raining, someone is home, and it's afternoon or later.

```yaml
automation:
  - alias: 'Rainy Day'
    trigger:
      - platform: state
        entity_id: sensor.precip_intensity
        to: 'rain'
    condition:
      - condition: state
        entity_id: group.all_devices
        state: 'home'
      - condition: time
        after: '14:00'
        before: '23:00'
    action:
      service: light.turn_on
      entity_id: light.couch_lamp
```

And then of course turn off the lamp when it stops raining but only if it's within an hour before sunset.

```yaml
  - alias: 'Rain is over'
    trigger:
      - platform: state
        entity_id: sensor.precip_intensity
        to: 'None'
    condition:
      - condition: sun
        after: 'sunset'
        after_offset: '-01:00:00'
    action:
      service: light.turn_off
      entity_id: light.couch_lamp
```

