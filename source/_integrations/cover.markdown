---
title: Cover
description: Instructions on how to integrate covers into Home Assistant.
ha_category:
  - Cover
ha_release: 0.27
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: cover
---

Home Assistant can give you an interface to control covers such as rollershutters, blinds, and garage doors.

## Device Class

The way these sensors are displayed in the frontend can be modified in the [customize section](/docs/configuration/customizing-devices/). The following device classes are supported for covers:

- **None**: Generic cover. This is the default and doesn't need to be set.
- **awning**: Control of an awning, such as an exterior retractable window, door, or patio cover.
- **blind**: Control of blinds, which are linked slats that expand or collapse to cover an opening or may be tilted to partially covering an opening, such as window blinds.
- **curtain**: Control of curtains or drapes, which is often fabric hung above a window or door that can be drawn open.
- **damper**: Control of a mechanical damper that reduces airflow, sound, or light.
- **door**: Control of a door or gate that provides access to an area.
- **garage**: Control of a garage door that provides access to a garage.
- **gate**: Control of a gate. Gates are found outside of a structure and are typically part of a fence.
- **shade**: Control of shades, which are a continuous plane of material or connected cells that expanded or collapsed over an opening, such as window shades.
- **shutter**: Control of shutters, which are linked slats that swing out/in to covering an opening or may be tilted to partially cover an opening, such as indoor or exterior window shutters.
- **window**: Control of a physical window that opens and closes or may tilt.

## Services

### Cover control services

Available services: `cover.open_cover`, `cover.close_cover`, `cover.stop_cover`, `cover.toggle`, `cover.open_cover_tilt`, `cover.close_cover_tilt`, `cover.stop_cover_tilt`, `cover.toggle_tilt`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of covers. Use `entity_id: all` to target all.

### Service `cover.set_cover_position`

Set cover position of one or multiple covers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of covers. Use `entity_id: all` to target all.
| `position` | no | Integer between 0 and 100.

#### Automation example 

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: cover.set_cover_position
      target:
        entity_id: cover.demo
      data:
        position: 50
```

### Service `cover.set_cover_tilt_position`

Set cover tilt position of one or multiple covers.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of covers. Use `entity_id: all` to target all.
| `tilt_position` | no | Integer between 0 and 100.

#### Automation example 

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: cover.set_cover_tilt_position
      target:
        entity_id: cover.demo
      data:
        tilt_position: 50
```
