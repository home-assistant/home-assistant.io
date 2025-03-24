---
title: "Template cover"
description: "Instructions on how to integrate template covers into Home Assistant."
ha_category:
  - Cover
  - Helper
ha_release: 0.48
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: template
ha_platforms:
  - cover
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `template` platform can create covers that combine integrations and provides
the ability to run scripts or invoke actions for each of the open,
close, stop, position and tilt commands of a cover.

## Configuration

To enable Template Covers in your installation,
add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}

```yaml
# Example configuration.yaml entry
cover:
  - platform: template
    covers:
      garage_door:
        device_class: garage
        friendly_name: "Garage Door"
        value_template: "{{ states('sensor.garage_door')|float > 0 }}"
        open_cover:
          action: script.open_garage_door
        close_cover:
          action: script.close_garage_door
        stop_cover:
          action: script.stop_garage_door
```

{% endraw %}

{% configuration %}
  covers:
    description: List of your covers.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      unique_id:
        description: An ID that uniquely identifies this cover. Set this to a unique value to allow customization through the UI.
        required: false
        type: string
      value_template:
        description: Defines a template to get the state of the cover. Valid output values from the template are `open`, `opening`, `closing` and `closed` which are directly mapped to the corresponding states. In addition, `true` is valid as a synonym to `open` and `false` as a synonym to `closed`. If [both a `value_template` and a `position_template`](#combining-value_template-and-position_template) are specified, only `opening` and `closing` are set from the `value_template`. If the template produces a `None` value the state will be set to `unknown`.
        required: false
        type: template
      position_template:
        description: Defines a template to get the position of the cover. Legal values are numbers between `0` (closed) and `100` (open). If the template produces a `None` value the current position will be set to `unknown`.
        required: false
        type: template
      icon_template:
        description: Defines a template to specify which icon to use.
        required: false
        type: template
      entity_picture_template:
        description: Defines a template for the entity picture of the cover.
        required: false
        type: template
      availability_template:
        description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that the string comparison is not case sensitive; `"TrUe"` and `"yEs"` are allowed.
        required: false
        type: template
        default: true
      device_class:
        description: Sets the [class of the device](/integrations/cover/), changing the device state and icon that is displayed on the frontend.
        required: false
        type: string
      open_cover:
        description: Defines an action to open the cover. If [`open_cover`](#open_cover) is specified, [`close_cover`](#close_cover) must also be specified. At least one of [`open_cover`](#open_cover) and [`set_cover_position`](#set_cover_position) must be specified.
        required: inclusive
        type: action
      close_cover:
        description: Defines an action to close the cover.
        required: inclusive
        type: action
      stop_cover:
        description: Defines an action to stop the cover.
        required: false
        type: action
      set_cover_position:
        description: Defines an action to set to a cover position (between `0` and `100`). The variable `position` will contain the entity's set position.
        required: false
        type: action
      set_cover_tilt_position:
        description: Defines an action to set the tilt of a cover (between `0` and `100`). The variable `tilt` will contain the entity's set tilt position.
        required: false
        type: action
      optimistic:
        description: Force cover position to use [optimistic mode](#optimistic-mode).
        required: false
        type: boolean
        default: false
      tilt_optimistic:
        description: Force cover tilt position to use [optimistic mode](#optimistic-mode).
        required: false
        type: boolean
        default: false
      tilt_template:
        description: Defines a template to get the tilt state of the cover. Legal values are numbers between `0` (closed) and `100` (open).  If the template produces a `None` value the current tilt state will be set to `unknown`.
        required: false
        type: template
{% endconfiguration %}

### Template and action variables

State-based template entities have the special template variable `this` available in their templates and actions. The `this` variable aids [self-referencing](/integrations/template#self-referencing) of an entity's state and attribute in templates and actions.

## Considerations

If you are using the state of a platform that takes extra time to load, the
Template Cover may get an `unknown` state during startup. This results in error
messages in your log file until that platform has completed loading.
If you use `is_state()` function in your template, you can avoid this situation.
For example, you would replace
{% raw %}`{{ states.cover.source.state == 'open' }}`{% endraw %}
with this equivalent that returns `true`/`false` and never gives an unknown
result:
{% raw %}`{{ is_state('cover.source', 'open') }}`{% endraw %}

## Optimistic mode

In optimistic mode, the cover position state is maintained internally. This mode
is automatically enabled if neither [`value_template`](#value_template) or
[`position_template`](#position_template) are specified. Note that this is
unlikely to be very reliable without some feedback mechanism, since there is
otherwise no way to know if the cover is moving properly. The cover can be
forced into optimistic mode by using the [`optimistic`](#optimistic) attribute.
There is an equivalent mode for `tilt_position` that is enabled when
[`tilt_template`](#tilt_template) is not specified or when the
[`tilt_optimistic`](#tilt_optimistic) attribute is used.

## Combining `value_template` and `position_template`

If both a [`value_template`](#value_template) and a [`position_template`](#position_template) are specified only `opening` and `closing` states are set directly from the `value_template`, the `open` and `closed` states will instead be derived from the cover position.

| value_template output | result                               |
| --------------------- | ------------------------------------ |
| open                  | state defined by `position_template` |
| closed                | state defined by `position_template` |
| true                  | state defined by `position_template` |
| false                 | state defined by `position_template` |
| opening               | state set to `opening`               |
| closing               | state set to `closing`               |
| <any other output>    | No change of state or position       |

## Examples

In this section you will find some real-life examples of how to use this cover.

### Garage door

This example converts a garage door with a controllable switch and position
sensor into a cover. The condition check is optional, but suggested if you
use the same switch to open and close the garage.

{% raw %}

```yaml
cover:
  - platform: template
    covers:
      garage_door:
        device_class: garage
        friendly_name: "Garage Door"
        position_template: "{{ states('sensor.garage_door') }}"
        open_cover:
          - condition: state
            entity_id: sensor.garage_door
            state: "off"
          - action: switch.turn_on
            target:
              entity_id: switch.garage_door
        close_cover:
          - condition: state
            entity_id: sensor.garage_door
            state: "on"
          - action: switch.turn_off
            target:
              entity_id: switch.garage_door
        stop_cover:
          action: switch.turn_on
          target:
            entity_id: switch.garage_door
        icon_template: >-
          {% if states('sensor.garage_door')|float > 0 %}
            mdi:garage-open
          {% else %}
            mdi:garage
          {% endif %}
```

{% endraw %}

### Multiple covers

This example allows you to control two or more covers at once.

{% raw %}

```yaml
homeassistant:
  customize:
    cover_group:
      assumed_state: true

cover:
  - platform: template
    covers:
      cover_group:
        friendly_name: "Cover Group"
        open_cover:
          action: script.cover_group
          data:
            modus: "open"
        close_cover:
          action: script.cover_group
          data:
            modus: "close"
        stop_cover:
          action: script.cover_group
          data:
            modus: "stop"
        set_cover_position:
          action: script.cover_group_position
          data:
            position: "{{position}}"
        set_cover_tilt_position:
          action: script.cover_group_tilt_position
          data:
            tilt: "{{tilt}}"
        value_template: "{{is_state('sensor.cover_group', 'open')}}"
        icon_template: >-
          {% if is_state('sensor.cover_group', 'open') %}
            mdi:window-open
          {% else %}
            mdi:window-closed
          {% endif %}

sensor:
  - platform: template
    sensors:
      cover_group:
        value_template: >-
          {% if is_state('cover.bedroom', 'open') %}
            open
          {% elif is_state('cover.livingroom', 'open') %}
            open
          {% else %}
            closed
          {% endif %}

script:
  cover_group:
    sequence:
      - action: "cover.{{modus}}_cover"
        target:
          entity_id:
            - cover.bedroom
            - cover.livingroom
  cover_group_position:
    sequence:
      - action: cover.set_cover_position
        target:
          entity_id:
            - cover.bedroom
            - cover.livingroom
        data:
          position: "{{position}}"

automation:
  - alias: "Close covers at night"
    triggers:
      - trigger: sun
        event: sunset
        offset: "+00:30:00"
    actions:
      - action: cover.set_cover_position
        target:
          entity_id: cover.cover_group
        data:
          position: 25
```

{% endraw %}

### Change the icon

This example shows how to change the icon based on the cover state.

{% raw %}

```yaml
cover:
  - platform: template
    covers:
      cover_group:
        friendly_name: "Cover Group"
        open_cover:
          action: script.cover_group
          data:
            modus: "open"
        close_cover:
          action: script.cover_group
          data:
            modus: "close"
        stop_cover:
          action: script.cover_group
          data:
            modus: "stop"
        value_template: "{{is_state('sensor.cover_group', 'open')}}"
        icon_template: >-
          {% if is_state('sensor.cover_group', 'open') %}
            mdi:window-open
          {% else %}
            mdi:window-closed
          {% endif %}
```

{% endraw %}

### Change the entity picture

This example shows how to change the entity picture based on the cover state.

{% raw %}

```yaml
cover:
  - platform: template
    covers:
      cover_group:
        friendly_name: "Cover Group"
        open_cover:
          action: script.cover_group
          data:
            modus: "open"
        close_cover:
          action: script.cover_group
          data:
            modus: "close"
        stop_cover:
          action: script.cover_group
          data:
            modus: "stop"
        value_template: "{{is_state('sensor.cover_group', 'open')}}"
        entity_picture_template: >-
          {% if is_state('sensor.cover_group', 'open') %}
            /local/cover-open.png
          {% else %}
            /local/cover-closed.png
          {% endif %}
```

{% endraw %}
