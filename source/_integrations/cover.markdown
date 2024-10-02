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
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

Home Assistant can give you an interface to control covers such as rollershutters, blinds, and garage doors.

{% include integrations/building_block_integration.md %}

## The state of a cover

A cover can have the following states:

- **Opening**: The cover is in the process of opening to reach a set position.
- **Open**: The cover has reached the open position.
- **Closing**: The cover is in the process of closing to reach a set position.
- **Closed**: The cover has reached the closed position.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.


How the state of a cover is represented in the frontend depends on the device class.

## Device class

{% include integrations/device_class_intro.md %}

The screenshot shows different icons representing different device classes for covers:

<p class='img'>
<img src='/images/screenshots/cover_classes_icons.png' />
List of cover examples.
</p>

Example of various device classes icons in `open` and `closed` state. The open image in this example has `state_color: true` specified in the Entities card configuration to receive the icon coloring.

The following device classes are supported for covers.

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

## Actions

### Cover control actions

Available actions: `cover.open_cover`, `cover.close_cover`, `cover.stop_cover`, `cover.toggle`, `cover.open_cover_tilt`, `cover.close_cover_tilt`, `cover.stop_cover_tilt`, `cover.toggle_tilt`

| Data attribute | Optional | Description                                                                                          |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`    | yes      | String or list of strings that point at `entity_id`'s of covers. Use `entity_id: all` to target all. |

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.demo
```

### Action `cover.set_cover_position`

Set cover position of one or multiple covers.

| Data attribute | Optional | Description                                                                                          |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`    | yes      | String or list of strings that point at `entity_id`'s of covers. Use `entity_id: all` to target all. |
| `position`     | no       | Integer between 0 and 100.                                                                           |

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: cover.set_cover_position
      target:
        entity_id: cover.demo
      data:
        position: 50
```

### Action `cover.set_cover_tilt_position`

Set cover tilt position of one or multiple covers.

| Data attribute  | Optional | Description                                                                                          |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`     | yes      | String or list of strings that point at `entity_id`'s of covers. Use `entity_id: all` to target all. |
| `tilt_position` | no       | Integer between 0 and 100.                                                                           |

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: cover.set_cover_tilt_position
      target:
        entity_id: cover.demo
      data:
        tilt_position: 50
```
