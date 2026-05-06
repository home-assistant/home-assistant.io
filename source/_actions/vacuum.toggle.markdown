---
title: Toggle vacuum power
action: vacuum.toggle
domain: vacuum
description: "Toggles a vacuum cleaner on or off."
---

The **Toggle vacuum cleaner** action switches a supported vacuum cleaner between on and off.

Use it when you want one automation to flip the vacuum power state without first checking whether it is already on or off.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Toggle vacuum cleaner**.
4. Choose the vacuum, area, or device to control.
5. Select **Save**.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.toggle
  target:
    entity_id: vacuum.downstairs
{% endexample %}

This toggles the power state of `vacuum.downstairs`.

The `entity_id` target is optional. If omitted, all targeted supported vacuums toggle.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum, area, or device to toggle.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works for vacuums that support both turning on and turning off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: toggle the vacuum power from a helper button

If you want a quick manual control, this automation toggles the vacuum power whenever a helper button is pressed.

- **Trigger**: Helper button pressed
- **Action**: Toggle vacuum power
- **Target**: Downstairs vacuum

{% details "YAML example for toggling vacuum power" %}

{% example %}
automation: |
  alias: "Toggle vacuum power"
  triggers:
    - trigger: state
      entity_id: input_button.toggle_vacuum_power
  actions:
    - action: vacuum.toggle
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
