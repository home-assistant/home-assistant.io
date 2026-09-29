---
title: "Decrement input number"
action: input_number.decrement
domain: input_number
description: "Decrements the value of an input number by 1 step."
related_actions:
  - input_number.increment
  - input_number.set_value
---

Use this action to decrease one or more input numbers by their configured step. An input number is a helper you can use in automations and scripts to store and control a numeric value.

{% include actions/ui_header.md %}

To decrement an input number from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input number you want to decrement.
6. From the actions shown for that target, select **Decrement input number**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_number.decrement`. A basic example looks like this:

{% example %}
action: |
  action: input_number.decrement
  target:
    entity_id: input_number.target_temperature
{% endexample %}

This decreases the `input_number.target_temperature` helper by its configured step.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- The value decreases by the `step` you configured for the input number and never goes below the configured `min`.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
