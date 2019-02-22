---
layout: page
title: "Covers"
description: "Instructions on how to integrate covers into Home Assistant."
date: 2016-06-28 17:30
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant can give you an interface to control covers such as rollershutters, blinds, and garage doors.

The display style of each entity can be modified in the [customize section](/getting-started/customizing-devices/). Besides the basic ones like `friendly_name` or `hidden`, the following attributes are supported for covers:
 
| Attribute | Default | Description |
| --------- | ------- | ----------- |
| `device_class` | | see below
| `assumed_state` | `false` | If set to `true`, cover buttons will always be enabled

### {% linkable_title Device Class %}

The way these sensors are displayed in the frontend can be modified in the [customize section](/docs/configuration/customizing-devices/). The following device classes are supported for covers:

- **None**: Generic cover. This is the default and doesn't need to be set.
- **awning**: Control of a awning, such as for a windor or patio.
- **blind**: Control of window blinds.
- **curtain**: Control of window or call coverings, such as curtains and drapes.
- **damper**: Control of ventilation damper or digital window tint/film and integrated digital window privacy filters.
- **door**: Control of a door (more generic than garage door).
- **garage**: Control of a garage door or gate (more specific than a door).
- **shade**: Control of shades, such as for a window, patio or pergola.
- **shutter**: Control of shutters, such as for a window or door.
- **window**: Control of a window opening.

## {% linkable_title Services %}

### {% linkable_title Cover control services %}

Available services: `cover.open_cover`, `cover.close_cover`, `cover.stop_cover`, `cover.open_cover_tilt`, `cover.close_cover_tilt`, `cover.stop_cover_tilt`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of covers. Else targets all.

### {% linkable_title Service `cover.set_cover_position` %}

Set cover position of one or multiple covers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of covers. Else targets all.
| `position` | no | Integer between 0 and 100.

#### {% linkable_title Automation example  %}

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: cover.set_cover_position
      data:
        entity_id: cover.demo
        position: 50
```

### {% linkable_title Service `cover.set_cover_tilt_position` %}

Set cover tilt position of one or multiple covers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of covers. Else targets all.
| `position` | no | Integer between 0 and 100.

#### {% linkable_title Automation example  %}

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: cover.set_cover_tilt_position
      data:
        entity_id: cover.demo
        position: 50
```
