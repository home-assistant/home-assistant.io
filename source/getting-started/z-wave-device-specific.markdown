---
layout: page
title: "Z-Wave Device Specific Settings"
description: "Extended instructions how to setup Z-Wave."
date: 2016-03-24 08:49 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

##### {% linkable_title Aeon Minimote %}

Here's a handy configuration for the Aeon Labs Minimote that defines all possible button presses. Put it into `automation.yaml`.

```yaml
- alias: Minimote Button 1 Pressed
  trigger:
    platform: event
    event_type: zwave.scene_activated
    event_data:
      entity_id: aeon_labs_minimote_1
      scene_id: 1

- alias: Minimote Button 1 Held
  trigger:
    platform: event
    event_type: zwave.scene_activated
    event_data:
      entity_id: aeon_labs_minimote_1
      scene_id: 2

- alias: Minimote Button 2 Pressed
  trigger:
    platform: event
    event_type: zwave.scene_activated
    event_data:
      entity_id: aeon_labs_minimote_1
      scene_id: 3

- alias: Minimote Button 2 Held
  trigger:
    platform: event
    event_type: zwave.scene_activated
    event_data:
      entity_id: aeon_labs_minimote_1
      scene_id: 4

- alias: Minimote Button 3 Pressed
  trigger:
    platform: event
    event_type: zwave.scene_activated
    event_data:
      entity_id: aeon_labs_minimote_1
      scene_id: 5

- alias: Minimote Button 3 Held
  trigger:
    platform: event
    event_type: zwave.scene_activated
    event_data:
      entity_id: aeon_labs_minimote_1
      scene_id: 6

- alias: Minimote Button 4 Pressed
  trigger:
    platform: event
    event_type: zwave.scene_activated
    event_data:
      entity_id: aeon_labs_minimote_1
      scene_id: 7

- alias: Minimote Button 4 Held
  trigger:
    platform: event
    event_type: zwave.scene_activated
    event_data:
      entity_id: aeon_labs_minimote_1
      scene_id: 8
```

##### {% linkable_title Aeotec MultiSensor 6 %}

In order for Home Assistant to recognize well the motion sensor, you will need to change its configuration from `Basic Set (default)` to `Binary Sensor report`. Currently there's no way to do this in Home Assistant but you can use ozwcp (OpenZWave control panel), Domoticz or similar to do it
