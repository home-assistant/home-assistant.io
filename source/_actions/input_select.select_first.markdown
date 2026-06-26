---
title: "Select first input select option"
action: input_select.select_first
domain: input_select
description: "Selects the first option of an input select."
related_actions:
  - input_select.select_last
  - input_select.select_option
---

Use this action to select the first option of one or more input selects. An input select is a helper you can use in automations and scripts to pick from a list of predefined options.

{% include actions/ui_header.md %}

To select the first option from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input select you want to change.
6. From the actions shown for that target, select **Select first input select option**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_select.select_first`. A basic example looks like this:

{% example %}
action: |
  action: input_select.select_first
  target:
    entity_id: input_select.who_cooks
{% endexample %}

This selects the first option on the `input_select.who_cooks` helper.

{% include actions/targets.md %}

## Good to know

- The first option is the one at the top of the list configured for the input select.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
