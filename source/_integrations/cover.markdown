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

Home Assistant can give you an interface to control covers such as roller shutters, blinds, and garage doors.

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
- **shutter**: Control of shutters. Shutters are linked slats that can be raised or lowered to cover an opening, such as window or door roller shutters. Some shutters, for example, some indoor or exterior window shutters, swing out or in to cover an opening or may be tilted to provide partial cover.
- **window**: Control of a physical window that opens and closes or may tilt.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}

## Cover automation examples

You can use cover triggers and conditions to adjust lighting, remind yourself when something is still open, and run routines that depend on whether a cover is open or closed.

{% include docs/paste_yaml_tip.md %}

### Automation: turn off the office lamp when the blind opens after sunrise

If daylight is enough for the room, this automation turns off the office lamp when the blind opens in the morning.

- **Trigger**: Blind opened
  - **Target**: Office blind
- **Action**: Turn off light
  - **Target**: Office lamp

{% details "YAML example for turning off the office lamp" %}

{% example %}
automation: |
  alias: "Turn off the office lamp when the blind opens"
  triggers:
    - trigger: cover.blind_opened
      target:
        entity_id: cover.office_blind
  conditions:
    - condition: sun
      after: sunrise
  actions:
    - action: light.turn_off
      target:
        entity_id: light.office_lamp
{% endexample %}

{% enddetails %}

### Automation: close the bedroom shutter at sunset if it is still open

At sunset, this automation checks whether the bedroom shutter is still open. If it is, Home Assistant closes it for the night.

- **Trigger**: Sun: Sunset
- **Condition**: Shutter is open
  - **Target**: Bedroom shutter
- **Action**: Close cover

{% details "YAML example for closing the bedroom shutter at sunset" %}

{% example %}
automation: |
  alias: "Close the bedroom shutter at sunset"
  triggers:
    - trigger: sun
      event: sunset
  conditions:
    - condition: cover.shutter_is_open
      target:
        entity_id: cover.bedroom_shutter
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.bedroom_shutter
{% endexample %}

{% enddetails %}

## Known limitations

The triggers and conditions documented on this page work only with `cover` entities that use the `awning`, `blind`, `curtain`, `shade`, or `shutter` device class.
