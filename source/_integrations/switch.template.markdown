---
title: "Template Switch"
description: "Instructions on how to integrate Template Switches into Home Assistant."
ha_category:
  - Switch
ha_release: 0.13
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: template
---

The `template` platform creates switches that combines components.

For example, if you have a garage door with a toggle switch that operates the motor and a sensor that allows you know whether the door is open or closed, you can combine these into a switch that knows whether the garage door is open or closed.

This can simplify the GUI and make it easier to write automations.

## Configuration

To enable Template Switches in your installation, add the following to your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
switch:
  - platform: template
    switches:
      skylight:
        value_template: "{{ is_state('sensor.skylight', 'on') }}"
        turn_on:
          service: switch.turn_on
          target:
            entity_id: switch.skylight_open
        turn_off:
          service: switch.turn_off
          target:
            entity_id: switch.skylight_close
```

{% endraw %}

{% configuration %}
  switches:
    description: List of your switches.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      unique_id:
        description: An ID that uniquely identifies this switch. Set this to a unique value to allow customization through the UI.
        required: false
        type: string
      value_template:
        description: Defines a template to set the state of the switch. If not defined, the switch will optimistically assume all commands are successful.
        required: false
        type: template
        default: optimistic
      availability_template:
        description: Defines a template to get the `available` state of the component. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If `availability_template` is not configured, the component will always be `available`.
        required: false
        type: template
        default: true
      turn_on:
        description: Defines an action to run when the switch is turned on.
        required: true
        type: action
      turn_off:
        description: Defines an action to run when the switch is turned off.
        required: true
        type: action
      icon_template:
        description: Defines a template for the icon of the switch.
        required: false
        type: template
      entity_picture_template:
        description: Defines a template for the picture of the switch.
        required: false
        type: template
{% endconfiguration %}

## Considerations

If you are using the state of a platform that takes extra time to load, the Template Switch may get an `unknown` state during startup. This results in error messages in your log file until that platform has completed loading. If you use `is_state()` function in your template, you can avoid this situation. For example, you would replace {% raw %}`{{ states.switch.source.state == 'on') }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an unknown result: {% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}

## Examples

In this section you find some real-life examples of how to use this switch.

### Copy Switch

This example shows a switch that copies another switch.

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      copy:
        value_template: "{{ is_state('switch.source', 'on') }}"
        turn_on:
          service: switch.turn_on
          target:
            entity_id: switch.target
        turn_off:
          service: switch.turn_off
          target:
            entity_id: switch.target
```

{% endraw %}

### Toggle Switch

This example shows a switch that takes its state from a sensor and toggles a switch.

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      blind:
        friendly_name: "Blind"
        value_template: "{{ is_state_attr('switch.blind_toggle', 'sensor_state', 'on') }}"
        turn_on:
          service: switch.toggle
          target:
            entity_id: switch.blind_toggle
        turn_off:
          service: switch.toggle
          target:
            entity_id: switch.blind_toggle
```

{% endraw %}

### Sensor and Two Switches

This example shows a switch that takes its state from a sensor, and uses two
momentary switches to control a device.

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      skylight:
        friendly_name: "Skylight"
        value_template: "{{ is_state('sensor.skylight', 'on') }}"
        turn_on:
          service: switch.turn_on
          target:
            entity_id: switch.skylight_open
        turn_off:
          service: switch.turn_on
          target:
            entity_id: switch.skylight_close
```

{% endraw %}

### Change The Icon

This example shows how to change the icon based on the day/night cycle.

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      garage:
        value_template: "{{ is_state('cover.garage_door', 'on') }}"
        turn_on:
          service: cover.open_cover
          target:
            entity_id: cover.garage_door
        turn_off:
          service: cover.close_cover
          target:
            entity_id: cover.garage_door
        icon_template: >-
          {% if is_state('cover.garage_door', 'open') %}
            mdi:garage-open
          {% else %}
            mdi:garage
          {% endif %}
```

{% endraw %}

### Change The Entity Picture

This example shows how to change the entity picture based on the day/night cycle.

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      garage:
        value_template: "{{ is_state('cover.garage_door', 'on') }}"
        turn_on:
          service: cover.open_cover
          target:
            entity_id: cover.garage_door
        turn_off:
          service: cover.close_cover
          target:
            entity_id: cover.garage_door
        entity_picture_template: >-
          {% if is_state('cover.garage_door', 'open') %}
            /local/garage-open.png
          {% else %}
            /local/garage-closed.png
          {% endif %}
```

{% endraw %}
