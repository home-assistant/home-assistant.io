---
title: "Template Number"
description: "Instructions on how to integrate Template Numbers into Home Assistant."
ha_category:
  - Number
ha_release: 2021.9
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: template
---

The `template` integration creates numbers that can combine components or break out attribute(s) from an entity.

This can simplify the GUI and make it easier to write automations.

In optimistic mode, the number will immediately change state after every command. Otherwise, the number will wait for state confirmation from the template. Try to enable it, if experiencing incorrect number operation.

## Configuration

To enable Template Numbers in your installation, add the following to your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
number:
  - platform: template
    name: Volume
    value_template: "{{ state_attr('media_player.speaker', 'volume_level') }}"
    step_template: "{{ 0.01 }}"
    minimum_template: "{{ 0 }}"
    maximum_template: "{{ 1 }}"
    set_value:
      service: media_player.volume_set
      target:
        entity_id: media_player.speaker
      data_template:
        volume_level: "{{ value }}"
```

{% endraw %}

{% configuration %}
  name:
    description: Name to use in the frontend.
    required: false
    type: string
    default: Template Number
  unique_id:
    description: An ID that uniquely identifies this number. Set this to a unique value to allow customization through the UI.
    required: false
    type: string
  value_template:
    description: Defines a template to set the value of the number.
    required: true
    type: template
  step_template:
    description: Defines a template to set the step value for the number.
    required: true
    type: template
  minimum_template:
    description: Defines a template to set the minimum value for the number.
    required: false
    type: template
    default: 1.0
  maximum_template:
    description: Defines a template to set the maximum value for the number.
    required: false
    type: template
    default: 100.0
  availability_template:
    description: Defines a template to get the `available` state of the component. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If `availability_template` is not configured, the component will always be `available`.
    required: false
    type: template
    default: true
 set_value:
    description: Defines an action to run when the number value changes.
    required: true
    type: action
  optimistic:
    description: Flag that defines if lock works in optimistic mode.
    required: false
    type: boolean
    default: false
{% endconfiguration %}

## Considerations

If you are using the state of a platform that takes extra time to load, the Template Number may get an `unknown` state during startup. This results in error messages in your log file until that platform has completed loading. If you use `is_state()` function in your template, you can avoid this situation.

For example, you would replace {% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an unknown result: {% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}
