---
title: Turn on vacuum
action: vacuum.turn_on
domain: vacuum
description: "Turns on a vacuum cleaner."
---

The **Turn on vacuum cleaner** action turns on a supported vacuum cleaner.

Use it when your vacuum supports a separate power state and you want to make sure it is powered on before you run another action.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Turn on vacuum cleaner**.
4. Choose the vacuum, area, or device to turn on.
5. Select **Save**.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.turn_on
  target:
    entity_id: vacuum.downstairs
{% endexample %}

This turns on `vacuum.downstairs`.

The `entity_id` target is optional. If omitted, all targeted supported vacuums turn on.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum, area, or device to turn on.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works for vacuums that support turning on.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn on the vacuum before a scheduled cleaning run

If your vacuum uses a separate power state, this automation turns it on a few minutes before a scheduled cleaning run starts.

- **Trigger**: Time: 08:55
- **Action**: Turn on vacuum
- **Target**: Downstairs vacuum

{% details "YAML example for turning on a vacuum before cleaning" %}

{% example %}
automation: |
  alias: "Turn on vacuum before cleaning"
  triggers:
    - trigger: time
      at: "08:55:00"
  actions:
    - action: vacuum.turn_on
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
