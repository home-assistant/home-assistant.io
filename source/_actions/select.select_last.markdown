---
title: "Select last option"
action: select.select_last
domain: select
description: "Selects the last option of a select entity."
related_actions:
  - select.select_first
  - select.select_next
  - select.select_option
  - select.select_previous
---

Use this action to set a select entity to the last option in its list, for example to jump to the end of a list of presets.

{% include actions/ui_header.md %}

To select the last option from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the select entity you want to set.
6. From the actions shown for that target, select **Select last option**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `select.select_last`. A basic example looks like this:

{% example %}
action: |
  action: select.select_last
  target:
    entity_id: select.washing_machine_program
{% endexample %}

This sets `select.washing_machine_program` to its last option.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with select entities.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: jump to the last option with a button

Set a select entity to its last option when you press a button.

- **Trigger**: Button is pressed
- **Action**: Select last option
  - **Target**: Fan speed preset

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Jump to the last fan speed preset"
    triggers:
      - trigger: state
        entity_id: input_button.fan_max
    actions:
      - action: select.select_last
        target:
          entity_id: select.fan_speed_preset
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
