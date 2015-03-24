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

Andythigpen has contributed a script component. This allows users to create a sequence of service calls and delays. Scripts can be started using the service `script/turn_on` and interrupted using the service `script/turn_off`. A separate page has been added to the frontend to see the status of your scripts.

```yaml
# Example configuration.yaml entry
script:
  # Turns on the bedroom lights and then the living room lights 1 minute later
  wakeup:
    alias: Wake Up
    sequence:
      - alias: Bedroom lights on
        execute_service: light.turn_on
        service_data:
          entity_id: group.bedroom
      - delay:
          # supports seconds, milliseconds, minutes, hours, etc.
          minutes: 1
      - alias: Living room lights on
        execute_service: light.turn_on
        service_data:
          entity_id: group.living_room
```
