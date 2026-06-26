---
title: "Select input select option"
action: input_select.select_option
domain: input_select
description: "Selects an option of an input select."
related_actions:
  - input_select.set_options
  - input_select.select_next
---

Use this action to select a specific option of one or more input selects. An input select is a helper you can use in automations and scripts to pick from a list of predefined options.

{% include actions/ui_header.md %}

To select an option from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input select you want to change.
6. From the actions shown for that target, select **Select input select option**.
7. Enter the **Option** you want to select.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Option:
  description: The option to select.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_select.select_option`. A basic example looks like this:

{% example %}
action: |
  action: input_select.select_option
  target:
    entity_id: input_select.who_cooks
  data:
    option: "Paulus"
{% endexample %}

This selects the `Paulus` option on the `input_select.who_cooks` helper.

### Options in YAML

{% options_yaml %}
option:
  description: The option to select.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The option you select must be one of the options configured for the input select.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
