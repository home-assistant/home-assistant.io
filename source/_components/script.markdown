---
layout: page
title: "Scripts"
description: "Instructions how to setup scripts within Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

The script component allows users to create a sequence of service calls and delays. Scripts can be
started using the service `script/turn_on` and interrupted using the service `script/turn_off`.

```yaml
# Example configuration.yaml entry
script:
  # Turns on the bedroom lights and then the living room lights 1 minute later
  wakeup:
    alias: Wake Up
    sequence:
      - event: logbook_entry
        event_data:
          name: Paulus
          message: is waking up
          # Optional
          entity_id: device_tracker.paulus
          domain: light
      - alias: Bedroom lights on
        service: light.turn_on
        data:
          entity_id: group.bedroom
      - delay:
          # supports seconds, milliseconds, minutes, hours, etc.
          minutes: 1
      - alias: Living room lights on
        service: light.turn_on
        data:
          entity_id: group.living_room
```
