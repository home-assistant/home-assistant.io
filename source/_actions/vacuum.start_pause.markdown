---
title: Start or pause cleaning
action: vacuum.start_pause
domain: vacuum
description: "Starts, pauses, or resumes a vacuum cleaner's cleaning task."
---

The **Start/pause vacuum cleaner** action starts, pauses, or resumes a supported vacuum cleaner's cleaning task.

Use it when you want a single action to handle the current cleaning state without first checking whether the vacuum is idle, cleaning, or paused.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Start/pause vacuum cleaner**.
4. Choose the vacuum, area, or device to control.
5. Select **Save**.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.start_pause
  target:
    entity_id: vacuum.downstairs
{% endexample %}

This starts, pauses, or resumes `vacuum.downstairs`, depending on its current state.

The `entity_id` target is optional. If omitted, all targeted supported vacuums receive the command.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum, area, or device to control.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works for vacuums that support start/pause control.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start or pause cleaning with one helper button

If you want one control for both actions, this automation uses a helper button to start cleaning when the vacuum is idle and pause it when it is already running.

- **Trigger**: Helper button pressed
- **Action**: Start or pause cleaning
- **Target**: Downstairs vacuum

{% details "YAML example for starting or pausing a vacuum" %}

{% example %}
automation: |
  alias: "Start or pause vacuum"
  triggers:
    - trigger: state
      entity_id: input_button.vacuum_start_pause
  actions:
    - action: vacuum.start_pause
      target:
        entity_id: vacuum.downstairs
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
