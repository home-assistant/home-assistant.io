---
title: "Select next input select option"
action: input_select.select_next
domain: input_select
description: "Selects the next option of an input select."
related_actions:
  - input_select.select_previous
  - input_select.select_option
---

Use this action to move one or more input selects to the next option in their list. An input select is a helper you can use in automations and scripts to pick from a list of predefined options.

{% include actions/ui_header.md %}

To select the next option from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input select you want to change.
6. From the actions shown for that target, select **Select next input select option**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Cycle:
  description: When enabled, selecting the next option after the last one cycles back to the first option.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_select.select_next`. A basic example looks like this:

{% example %}
action: |
  action: input_select.select_next
  target:
    entity_id: input_select.who_cooks
{% endexample %}

This selects the next option on the `input_select.who_cooks` helper.

### Options in YAML

{% options_yaml %}
cycle:
  description: When enabled, selecting the next option after the last one cycles back to the first option.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- By default, the selection cycles from the last option back to the first. Set `cycle` to `false` to stop at the last option instead.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
