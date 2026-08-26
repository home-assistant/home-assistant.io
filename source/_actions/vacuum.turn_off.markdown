---
title: Turn off vacuum
action: vacuum.turn_off
domain: vacuum
description: "Turns off a vacuum cleaner."
---

The **Turn off vacuum cleaner** action turns off a supported vacuum cleaner.

Use it when your vacuum supports a separate power state and you want to shut it down after cleaning or before maintenance.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Turn off vacuum cleaner**.
4. Choose the vacuum, area, or device to turn off.
5. Select **Save**.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.turn_off
  target:
    entity_id: vacuum.downstairs
{% endexample %}

This turns off `vacuum.downstairs`.

The `entity_id` target is optional. If omitted, all targeted supported vacuums turn off.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum, area, or device to turn off.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works for vacuums that support turning off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn off the vacuum after it returns to the dock

If your vacuum supports a separate power state, this automation turns it off after it has finished cleaning and returned to the dock.

- **Trigger**: Vacuum cleaner returned to dock
- **Action**: Turn off vacuum
- **Target**: Downstairs vacuum

{% details "YAML example for turning off a vacuum after docking" %}

{% example %}
automation: |
  alias: "Turn off vacuum after docking"
  triggers:
    - trigger: vacuum.returned_to_dock
      target:
        entity_id: vacuum.downstairs
  actions:
    - action: vacuum.turn_off
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
