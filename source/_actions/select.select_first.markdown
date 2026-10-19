---
title: "Select first option"
action: select.select_first
domain: select
description: "Selects the first option of a select entity."
related_actions:
  - select.select_last
  - select.select_next
  - select.select_option
  - select.select_previous
---

Use this action to set a select entity to the first option in its list, for example to jump back to the start of a list of presets.

{% include actions/ui_header.md %}

To select the first option from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the select entity you want to set.
6. From the actions shown for that target, select **Select first option**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `select.select_first`. A basic example looks like this:

{% example %}
action: |
  action: select.select_first
  target:
    entity_id: select.washing_machine_program
{% endexample %}

This sets `select.washing_machine_program` to its first option.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with select entities.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reset a select to its first option each morning

Set a select entity back to its first option at a set time, for example to start each day from a known preset.

- **Trigger**: Time: 06:00
- **Action**: Select first option
  - **Target**: Thermostat preset

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Reset the thermostat preset each morning"
    triggers:
      - trigger: time
        at: "06:00:00"
    actions:
      - action: select.select_first
        target:
          entity_id: select.thermostat_preset
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
