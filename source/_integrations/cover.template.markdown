---
title: "Template Cover"
description: "Instructions on how to integrate Template Covers into Home Assistant."
ha_category:
  - Cover
ha_release: 0.48
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: template
---

The `template` platform can create covers that combine integrations and provides
the ability to run scripts or invoke services for each of the open,
close, stop, position and tilt commands of a cover.

## Configuration

To enable Template Covers in your installation,
add the following to your `configuration.yaml` file:

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
          service: script.open_garage_door
        close_cover:
          service: script.close_garage_door
        stop_cover:
          service: script.stop_garage_door
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
        description: Defines a template to get the state of the cover. Valid values are `open`/`true` or `opening`/`closing`/`closed`/`false`. [`value_template`](#value_template) and [`position_template`](#position_template) cannot be specified concurrently.
        required: exclusive
        type: template
      position_template:
        description: Defines a template to get the position of the cover. Legal values are numbers between `0` (closed) and `100` (open). [`value_template`](#value_template) and [`position_template`](#position_template) cannot be specified concurrently.
        required: exclusive
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
        description: Defines a template to get the `available` state of the component. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If `availability_template` is not configured, the component will always be `available`.
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
        description: Defines an action to set to a cover position (between `0` and `100`).
        required: false
        type: action
      set_cover_tilt_position:
        description: Defines an action to set the tilt of a cover (between `0` and `100`).
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
        description: Defines a template to get the tilt state of the cover. Legal values are numbers between `0` (closed) and `100` (open).
        required: false
        type: template
{% endconfiguration %}

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

## Optimistic Mode

In optimistic mode, the cover position state is maintained internally. This mode
is automatically enabled if neither [`value_template`](#value_template) or
[`position_template`](#position_template) are specified. Note that this is
unlikely to be very reliable without some feedback mechanism, since there is
otherwise no way to know if the cover is moving properly. The cover can be
forced into optimistic mode by using the [`optimistic`](#optimistic) attribute.
There is an equivalent mode for `tilt_position` that is enabled when
[`tilt_template`](#tilt_template) is not specified or when the
[`tilt_optimistic`](#tilt_optimistic) attribute is used.

## Examples

In this section you will find some real-life examples of how to use this cover.

### Garage Door

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
          - condition:
            condition: state
            entity_id: sensor.garage_door
            state: 'off'
          - service: switch.turn_on
            target:
              entity_id: switch.garage_door
        close_cover:
          - condition:
            condition: state
            entity_id: sensor.garage_door
            state: 'on'
          - service: switch.turn_off
            target:
              entity_id: switch.garage_door
        stop_cover:
          service: switch.turn_on
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

### Multiple Covers

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
          service: script.cover_group
          data:
            modus: "open"
        close_cover:
          service: script.cover_group
          data:
            modus: "close"
        stop_cover:
          service: script.cover_group
          data:
            modus: "stop"
        set_cover_position:
          service: script.cover_group_position
          data:
            position: "{{position}}"
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
      - service: "cover.{{modus}}_cover"
        target:
          entity_id:
            - cover.bedroom
            - cover.livingroom
  cover_group_position:
    sequence:
      - service: cover.set_cover_position
        target:
          entity_id:
            - cover.bedroom
            - cover.livingroom
        data:
          position: "{{position}}"

automation:
  - alias: "Close covers at night"
    trigger:
      - platform: sun
        event: sunset
        offset: "+00:30:00"
    action:
      - service: cover.set_cover_position
        target:
          entity_id: cover.cover_group
        data:
          position: 25
```

{% endraw %}

### Change The Icon

This example shows how to change the icon based on the cover state.

{% raw %}

```yaml
cover:
  - platform: template
    covers:
      cover_group:
        friendly_name: "Cover Group"
        open_cover:
          service: script.cover_group
          data:
            modus: "open"
        close_cover:
          service: script.cover_group
          data:
            modus: "close"
        stop_cover:
          service: script.cover_group
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

### Change The Entity Picture

This example shows how to change the entity picture based on the cover state.

{% raw %}

```yaml
cover:
  - platform: template
    covers:
      cover_group:
        friendly_name: "Cover Group"
        open_cover:
          service: script.cover_group
          data:
            modus: "open"
        close_cover:
          service: script.cover_group
          data:
            modus: "close"
        stop_cover:
          service: script.cover_group
          data:
            modus: "stop"
        value_template: "{{is_state('sensor.cover_group', 'open')}}"
        icon_template: >-
          {% if is_state('sensor.cover_group', 'open') %}
            /local/cover-open.png
          {% else %}
            /local/cover-closed.png
          {% endif %}
```

{% endraw %}
