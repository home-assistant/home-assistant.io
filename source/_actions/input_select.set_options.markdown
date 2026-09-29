---
title: "Set input select options"
action: input_select.set_options
domain: input_select
description: "Sets the options of an input select."
related_actions:
  - input_select.select_option
  - input_select.reload
---

Use this action to replace the full list of options for one or more input selects. An input select is a helper you can use in automations and scripts to pick from a list of predefined options.

{% include actions/ui_header.md %}

To set the options from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input select you want to change.
6. From the actions shown for that target, select **Set input select options**.
7. Enter the **Options** you want to set.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Options:
  description: The full list of options to set. At least one option is required.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_select.set_options`. A basic example looks like this:

{% example %}
action: |
  action: input_select.set_options
  target:
    entity_id: input_select.who_cooks
  data:
    options:
      - "Alice"
      - "Bob"
      - "Paulus"
{% endexample %}

This replaces the options of the `input_select.who_cooks` helper with the three listed values.

### Options in YAML

{% options_yaml %}
options:
  description: The full list of options to set. At least one option is required.
  required: true
  type: list
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action replaces the entire list of options. The currently selected option is kept only if it is still part of the new list.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
