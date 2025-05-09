---
title: "Template fan"
description: "Instructions how to setup the template fans within Home Assistant."
ha_category:
  - Fan
  - Helper
ha_release: 0.69
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: template
ha_platforms:
  - fan
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Template** {% term integration %} creates fans that combine integrations and provides the
ability to run scripts or invoke actions for each of the `turn_on`, `turn_off`, `set_percentage`,
`set_preset_mode`, `set_oscillating`, and `set_direction` commands of a fan.

## Configuration

To enable template fans in your installation, add the following to your
{% term "`configuration.yaml`" %} file:

{% raw %}

```yaml
# Example configuration.yaml entry
fan:
  - platform: template
    fans:
      bedroom_fan:
        friendly_name: "Bedroom fan"
        value_template: "{{ states('input_boolean.state') }}"
        percentage_template: "{{ states('input_number.percentage') }}"
        preset_mode_template: "{{ states('input_select.preset_mode') }}"
        oscillating_template: "{{ states('input_select.osc') }}"
        direction_template: "{{ states('input_select.direction') }}"
        turn_on:
          action: script.fan_on
        turn_off:
          action: script.fan_off
        set_percentage:
          action: script.fans_set_speed
          data:
            percentage: "{{ percentage }}"
        set_preset_mode:
          action: script.fans_set_preset_mode
          data:
            preset_mode: "{{ preset_mode }}"
        set_oscillating:
          action: script.fan_oscillating
          data:
            oscillating: "{{ oscillating }}"
        set_direction:
          action: script.fan_direction
          data:
            direction: "{{ direction }}"
        speed_count: 6
        preset_modes:
          - 'auto'
          - 'smart'
          - 'whoosh'
```

{% endraw %}

{% configuration %}
  fans:
    description: List of your fans.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      unique_id:
        description: An ID that uniquely identifies this fan. Set this to a unique value to allow customization through the UI.
        required: false
        type: string
      value_template:
        description: "Defines a template to get the state of the fan. Valid values: `on`, `off`"
        required: true
        type: template
      percentage_template:
        description: Defines a template to get the speed percentage of the fan.
        required: false
        type: template
      preset_mode_template:
        description: Defines a template to get the preset mode of the fan.
        required: false
        type: template
      oscillating_template:
        description: "Defines a template to get the osc state of the fan. Valid values: `true`, `false`"
        required: false
        type: template
      direction_template:
        description: "Defines a template to get the direction of the fan. Valid values: `forward`, `reverse`"
        required: false
        type: template
      availability_template:
        description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that the string comparison not case sensitive; `"TrUe"` and `"yEs"` are allowed.
        required: false
        type: template
        default: true
      turn_on:
        description: Defines an action to run when the fan is turned on.
        required: true
        type: action
      turn_off:
        description: Defines an action to run when the fan is turned off.
        required: true
        type: action
      set_percentage:
        description: Defines an action to run when the fan is given a speed percentage command.
        required: false
        type: action
      set_preset_mode:
        description: Defines an action to run when the fan is given a preset command.
        required: false
        type: action
      set_oscillating:
        description: Defines an action to run when the fan is given an osc state command.
        required: false
        type: action
      set_direction:
        description: Defines an action to run when the fan is given a direction command.
        required: false
        type: action
      preset_modes:
        description: List of preset modes the fan is capable of. This is an arbitrary list of strings and must not contain any speeds.
        required: false
        type: [string, list]
        default: []
      speed_count:
        description: The number of speeds the fan supports. Used to calculate the percentage step for the `fan.increase_speed` and `fan.decrease_speed` actions.
        required: false
        type: integer
        default: 100
{% endconfiguration %}

### Template and action variables

State-based template entities have the special template variable `this` available in their templates and actions. The `this` variable aids [self-referencing](/integrations/template#self-referencing) of an entity's state and attribute in templates and actions.

## Converting from speeds to percentage

When converting a fan with 3 speeds from the old fan entity model, the following percentages can be used:
 
0 - `off`
33 - `low`
66 - `medium`
100 - `high`

## Examples

### Helper fan

This example uses an input_boolean and an input_number to mimic a fan, and 
the example shows multiple actions for `set_percentage`.

{% raw %}

```yaml
fan:
  - platform: template
    fans:
      helper_fan:
        friendly_name: "Helper Fan"
        value_template: "{{ states('input_boolean.state') }}"
        turn_on:
          - action: input_boolean.turn_on
            target:
              entity_id: input_boolean.state
        turn_off:
          - action: input_boolean.turn_off
            target:
              entity_id: input_boolean.state
        percentage_template: >
          {{ states('input_number.percentage') if is_state('input_boolean.state', 'on') else 0 }}
        speed_count: 6
        set_percentage:
          - action: input_boolean.turn_{{ 'on' if percentage > 0 else 'off' }}
            target:
              entity_id: input_boolean.state
          - action: input_number.set_value
            target:
              entity_id: input_number.percentage
            data:
              value: "{{ percentage }}"
```

{% endraw %}

### Preset modes fan

This example uses an existing fan with only a percentage. It extends the 
percentage value into useable preset modes without a helper entity.

{% raw %}

```yaml
fan:
  - platform: template
    fans:
      preset_mode_fan:
        friendly_name: "Preset Mode Fan Example"
        value_template: "{{ states('fan.percentage_fan') }}"
        turn_on:
          - action: fan.turn_on
            target:
              entity_id: fan.percentage_fan
        turn_off:
          - action: fan.turn_off
            target:
              entity_id: fan.percentage_fan
        percentage_template: >
          {{ state_attr('fan.percentage_fan', 'percentage') }}
        speed_count: 3
        set_percentage:
          - action: fan.set_percentage
            target:
              entity_id: fan.percentage_fan
            data:
              percentage: "{{ percentage }}"
        preset_modes:
          - "off"
          - "low"
          - "medium"
          - "high"
        preset_mode_template: >
          {% if is_state('fan.percentage_fan', 'on') %}
            {% if state_attr('fan.percentage_fan', 'percentage') == 100  %}
              high
            {% elif state_attr('fan.percentage_fan', 'percentage') == 66 %}
              medium
            {% else %}
              low
            {% endif %}
          {% else %}
            off
          {% endif %}
        set_preset_mode:
          - action: fan.set_percentage
            target:
              entity_id: fan.percentage_fan
            data:
              percentage: >-
                {% if preset_mode == 'high' %}
                  100
                {% elif preset_mode == 'medium' %}
                  66
                {% elif preset_mode == 'low' %}
                  33
                {% else %}
                  0
                {% endif %}
```

{% endraw %}
