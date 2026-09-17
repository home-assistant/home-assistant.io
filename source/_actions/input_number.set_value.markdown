---
title: "Set input number value"
action: input_number.set_value
domain: input_number
description: "Sets the value of an input number."
related_actions:
  - input_number.increment
  - input_number.decrement
---

Use this action to set one or more input numbers to a specific value. An input number is a helper you can use in automations and scripts to store and control a numeric value, shown as a slider or a numeric input box.

{% include actions/ui_header.md %}

To set an input number value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the input number you want to set.
6. From the actions shown for that target, select **Set input number value**.
7. Enter the **Value** you want to set.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Value:
  description: The target value to set.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `input_number.set_value`. A basic example looks like this:

{% example %}
action: |
  action: input_number.set_value
  target:
    entity_id: input_number.target_temperature
  data:
    value: 21
{% endexample %}

This sets the `input_number.target_temperature` helper to `21`.

### Options in YAML

{% options_yaml %}
value:
  description: The target value to set.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The value must be within the `min` and `max` range you configured for the input number, and it follows the configured `step`.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
