---
title: "Template lawn mower"
description: "Instructions how to setup template lawn mowers within Home Assistant."
ha_category:
  - Lawn mower
ha_release: 2024.5.0
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: template
---

The `template` platform creates lawn mowers that combine integrations and provides the
ability to run scripts or invoke services for each of the start, pause, stop,
return_to_base, clean_spot, locate and set_fan_speed commands of a lawn mower.

To enable Template Lawn mowers in your installation, add the following to your
`configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
lawn_mower:
  - platform: template
    lawn_mowers:
      garden_lawn_mower:
        start_mowing:
          service: script.lawn_mower_start_mowing
```

{% endraw %}

{% configuration %}
  lawn_mowers:
    description: List of your lawn mowers.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      unique_id:
        description: An ID that uniquely identifies this lawn mower. Set this to a unique value to allow customization through the UI.
        required: false
        type: string
      value_template:
        description: "Defines a template to get the state of the lawn mower. Valid value: `docked`/`mowing`/`paused`/`error`"
        required: false
        type: template
      attribute_templates:
        description: Defines templates for attributes of the sensor.
        required: false
        type: map
        keys:
          "attribute: template":
            description: The attribute and corresponding template.
            required: true
            type: template          
      availability_template:
        description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that the string comparison not case sensitive; `"TrUe"` and `"yEs"` are allowed.
        required: false
        type: template
        default: true
      start_mowing:
        description: Defines an action to run when the lawn mower has started mowing.
        required: false
        type: action
      pause:
        description: Defines an action to run when the lawn mower is paused.
        required: false
        type: action
      dock:
        description: Defines an action to run when the lawn mower is given a dock command.
        required: false
        type: action
{% endconfiguration %}

### Template and action variables

State-based template entities have the special template variable `this` available in their templates and actions. The `this` variable aids [self-referencing](/integrations/template#self-referencing) of an {% term entity %}'s state and attribute in templates and actions.

## Examples

### Lawn mower with state

This example shows how to use templates to specify the state of the lawn mower.

{% raw %}

```yaml
lawn_mower:
  - platform: template
    lawn_mowers:
      garden_lawn_mower:
        value_template: "{{ states('sensor.lawn_mower_state') }}"
        start_mowing:
            service: script.lawn_mower_start_mowing
        pause:
            service: script.lawn_mower_pause
        dock:
            service: script.lawn_mower_dock
```

{% endraw %}
