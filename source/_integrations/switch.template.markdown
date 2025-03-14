---
title: "Template Switch"
description: "Instructions on how to integrate Template Switches into Home Assistant."
ha_category:
  - Switch
  - Helper
ha_release: 0.13
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: template
ha_config_flow: true
ha_platforms:
  - switch
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `template` platform creates switches that combines components.

For example, if you have a garage door with a toggle switch that operates the motor and a sensor that allows you know whether the door is open or closed, you can combine these into a switch that knows whether the garage door is open or closed.

This can simplify the GUI and make it easier to write automations.

{% include integrations/config_flow.md %}

{% important %}
To be able to add **{% my helpers title="Helpers" %}** via the user interface, you should have `default_config:` in your {% term "`configuration.yaml`" %}. It should already be there by default unless you removed it.
{% endimportant %}

{% note %}
Configuration using our user interface provides a more limited subset of options, making this integration more accessible while covering most use cases.

If you need more specific features for your use case, the manual [YAML-configuration section](#yaml-configuration) of this integration might provide them.
{% endnote %}

## YAML Configuration

To enable Template Switches in your installation, add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}

```yaml
# Example configuration.yaml entry
switch:
  - platform: template
    switches:
      skylight:
        value_template: "{{ is_state('sensor.skylight', 'on') }}"
        turn_on:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        turn_off:
          action: switch.turn_off
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
        description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that the string comparison not case sensitive; `"TrUe"` and `"yEs"` are allowed.
        required: false
        type: template
        default: true
      turn_on:
        description: Defines an action or list of actions to run when the switch is turned on.
        required: true
        type: action
      turn_off:
        description: Defines an action or list of actions to run when the switch is turned off.
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

### Template and action variables

State-based template entities have the special template variable `this` available in their templates and actions. The `this` variable aids [self-referencing](/integrations/template#self-referencing) of an entity's state and attribute in templates and actions.

## Considerations

If you are using the state of a platform that takes extra time to load, the Template Switch may get an `unknown` state during startup. This results in error messages in your log file until that platform has completed loading. If you use `is_state()` function in your template, you can avoid this situation. For example, you would replace {% raw %}`{{ states.switch.source.state == 'on') }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an unknown result: {% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}

## Examples

In this section you find some real-life examples of how to use this switch.

### Invert a Switch

This example shows a switch that is the inverse of another switch.

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      invert:
        value_template: "{{ not is_state('switch.target', 'on') }}"
        availability_template: "{{ has_value('switch.target') }}"
        turn_on:
          action: switch.turn_off
          target:
            entity_id: switch.target
        turn_off:
          action: switch.turn_on
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
          action: switch.toggle
          target:
            entity_id: switch.blind_toggle
        turn_off:
          action: switch.toggle
          target:
            entity_id: switch.blind_toggle
```

{% endraw %}

### Multiple actions for turn_on or turn_off

This example shows multiple actions for turn_on and turn_off.

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      copy:
        value_template: "{{ is_state('switch.source', 'on') }}"
        turn_on:
          - action: switch.turn_on
            target:
              entity_id: switch.target
          - action: light.turn_on
            target:
              entity_id: light.target
            data:
              brightness_pct: 40
        turn_off:
          - action: switch.turn_off
            target:
              entity_id: switch.target
          - action: light.turn_off
            target:
              entity_id: light.target
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
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        turn_off:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_close
```

{% endraw %}

### Change The Icon

This example shows how to change the icon based on the state of the garage door.

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      garage:
        value_template: "{{ is_state('cover.garage_door', 'open') }}"
        turn_on:
          action: cover.open_cover
          target:
            entity_id: cover.garage_door
        turn_off:
          action: cover.close_cover
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

This example shows how to change the entity picture based on the state of the garage door.

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      garage:
        value_template: "{{ is_state('cover.garage_door', 'open') }}"
        turn_on:
          action: cover.open_cover
          target:
            entity_id: cover.garage_door
        turn_off:
          action: cover.close_cover
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
