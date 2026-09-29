---
title: "Select next option"
action: select.select_next
domain: select
description: "Selects the next option of a select entity."
related_actions:
  - select.select_first
  - select.select_last
  - select.select_option
  - select.select_previous
---

Use this action to move a select entity to the next option in its list, for example to step through a list of presets one at a time.

{% include actions/ui_header.md %}

To select the next option from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the select entity you want to step forward.
6. From the actions shown for that target, select **Select next option**.
7. Optionally, turn off **Cycle** if you do not want the last option to wrap back to the first.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Cycle:
  description: Whether the selection cycles from the last option back to the first. Enabled by default.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `select.select_next`. A basic example looks like this:

{% example %}
action: |
  action: select.select_next
  target:
    entity_id: select.washing_machine_program
{% endexample %}

This moves `select.washing_machine_program` to its next option.

### Options in YAML

{% options_yaml %}
cycle:
  description: Whether the selection cycles from the last option back to the first.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with select entities.
- If the current option is unknown, the first option is selected.
- By default, moving past the last option wraps back to the first. Set `cycle` to `false` to stop at the last option instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: step to the next option with a button

Move a select entity to its next option each time you press a button.

- **Trigger**: Button is pressed
- **Action**: Select next option
  - **Target**: Light scene preset

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Step to the next light scene preset"
    triggers:
      - trigger: state
        entity_id: input_button.next_scene
    actions:
      - action: select.select_next
        target:
          entity_id: select.light_scene_preset
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
