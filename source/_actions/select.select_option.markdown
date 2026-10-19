---
title: "Select option"
action: select.select_option
domain: select
description: "Selects a specific option of a select entity."
related_actions:
  - select.select_first
  - select.select_last
  - select.select_next
  - select.select_previous
---

Use this action to set a select entity to a specific option, for example to choose a preset, mode, or profile a device offers.

{% include actions/ui_header.md %}

To select an option from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the select entity you want to set.
6. From the actions shown for that target, select **Select option**.
7. Set the **Option** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Option:
  description: The option to select. It must be one of the options the entity offers.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `select.select_option`. A basic example looks like this:

{% example %}
action: |
  action: select.select_option
  target:
    entity_id: select.washing_machine_program
  data:
    option: "Eco"
{% endexample %}

This sets `select.washing_machine_program` to the `Eco` option.

### Options in YAML

{% options_yaml %}
option:
  description: The option to select. It must be one of the options the entity offers.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with select entities.
- The action fails if the option you provide is not in the entity's list of available options.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: choose a quiet mode in the evening

Set a select entity to a specific option at a set time, for example to switch a device to a quiet mode.

- **Trigger**: Time: 22:00
- **Action**: Select option
  - **Target**: Air purifier mode
  - **Option**: Night

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Switch the air purifier to night mode"
    triggers:
      - trigger: time
        at: "22:00:00"
    actions:
      - action: select.select_option
        target:
          entity_id: select.air_purifier_mode
        data:
          option: "Night"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
