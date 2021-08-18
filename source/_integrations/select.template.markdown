---
title: "Template Select"
description: "Instructions on how to integrate Template Selects into Home Assistant."
ha_category:
  - Select
ha_release: 0.81
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: template
---

The `template` integration creates select that can combine components or break out attribute(s) from an entity.

This can simplify the GUI and make it easier to write automations.

In optimistic mode, the select will immediately change state after every command. Otherwise, the select will wait for state confirmation from the template. Try to enable it, if experiencing incorrect select operation.

## Configuration

To enable Template Selects in your installation, add the following to your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
select:
  - platform: template
    name: Sound Mode
    value_template: "{{ state_attr('media_player.speaker', 'sound_mode') }}"
    options_template: "{{ state_attr('media_player.speaker', 'sound_mode_list') }}"
    select_option:
      service: media_player.select_sound_mode
      target:
        entity_id: media_player.speaker
      data_template:
        sound_mode: "{{ option }}"
```

{% endraw %}

{% configuration %}
  name:
    description: Name to use in the frontend.
    required: false
    type: string
    default: Template Select
  unique_id:
    description: An ID that uniquely identifies this select. Set this to a unique value to allow customization through the UI.
    required: false
    type: string
  value_template:
    description: Defines a template to set the value of the select.
    required: true
    type: template
  options_template:
    description: Defines a template to set the available options for the select.
    required: true
    type: template
  availability_template:
    description: Defines a template to get the `available` state of the component. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If `availability_template` is not configured, the component will always be `available`.
    required: false
    type: template
    default: true
 select_option:
    description: Defines an action to run when the select current_option changes.
    required: true
    type: action
  optimistic:
    description: Flag that defines if lock works in optimistic mode.
    required: false
    type: boolean
    default: false
{% endconfiguration %}

## Considerations

If you are using the state of a platform that takes extra time to load, the Template Select may get an `unknown` state during startup. This results in error messages in your log file until that platform has completed loading. If you use `is_state()` function in your template, you can avoid this situation.

For example, you would replace {% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an unknown result: {% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}
