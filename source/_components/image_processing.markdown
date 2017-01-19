---
layout: page
title: "Image Processing"
description: "Instructions how to setup image processing with Home Assistant."
date: 2017-01-09 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.36
---

Image processing enables Home Assistant to process image from [cameras][/components/#camera]. Only camera entities are supported as sources.

For interval control, use `scan_interval` in platform.

## {% linkable_title ALPR %}

Alpr entities attribute have a vehicle counter `vehicles` and all found plates as `plates`.

This event is trigger after OpenALPR found a new licence plate.

```yaml
# Example configuration.yaml automation entry
automation:
- alias: Open garage door
  trigger:
    platform: event
    event_type: found_plate
    event_data:
      entity_id: openalpr.camera_garage_1
      plate: BE2183423
...
```

The following event attributes will be present: `entity_id`, `plate`, `confidence`
