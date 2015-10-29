---
layout: page
title: "Automation examples using the sun"
description: "Automation examples that use the sun."
date: 2015-10-08 19:05
sidebar: false
comments: false
sharing: true
footer: true
---

#### Turn on the living room lights 45 minutes before sunset if anyone home

```yaml
automation:
  trigger:
    platform: sun
    event: sunset
    offset: "-00:45:00"
  condition:
    platform: state
    entity_id: group.all_devices
    state: home
  action:
    service: homeassistant.turn_on
    entity_id: group.living_room_lights
```

#### Natural wake up light

_Note, Philips Hue is currently the only light platform that support transitions._

```yaml
automation:
  trigger:
    platform: time
    after: "07:15:00"
  action:
    service: light.turn_on
    entity_id: light.bedroom
    data:
      # 900 seconds = 15 minutes
      transition: 900
```