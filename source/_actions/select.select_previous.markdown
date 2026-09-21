---
title: "Select previous option"
action: select.select_previous
domain: select
description: "Selects the previous option of a select entity."
related_actions:
  - select.select_first
  - select.select_last
  - select.select_next
  - select.select_option
---

Use this action to move a select entity to the previous option in its list, for example to step back through a list of presets one at a time.

{% include actions/ui_header.md %}

To select the previous option from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the select entity you want to step back.
6. From the actions shown for that target, select **Select previous option**.
7. Optionally, turn off **Cycle** if you do not want the first option to wrap back to the last.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Cycle:
  description: Whether the selection cycles from the first option back to the last. Enabled by default.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `select.select_previous`. A basic example looks like this:

{% example %}
action: |
  action: select.select_previous
  target:
    entity_id: select.washing_machine_program
{% endexample %}

This moves `select.washing_machine_program` to its previous option.

### Options in YAML

{% options_yaml %}
cycle:
  description: Whether the selection cycles from the first option back to the last.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with select entities.
- If the current option is unknown, the last option is selected.
- By default, moving past the first option wraps back to the last. Set `cycle` to `false` to stop at the first option instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: step to the previous option with a button

Move a select entity to its previous option each time you press a button.

- **Trigger**: Button is pressed
- **Action**: Select previous option
  - **Target**: Light scene preset

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Step to the previous light scene preset"
    triggers:
      - trigger: state
        entity_id: input_button.previous_scene
    actions:
      - action: select.select_previous
        target:
          entity_id: select.light_scene_preset
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
