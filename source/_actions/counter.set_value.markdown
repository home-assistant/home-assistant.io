---
title: "Set counter value"
action: counter.set_value
domain: counter
description: "Sets a counter to a specific value."
related_actions:
  - counter.increment
  - counter.decrement
  - counter.reset
---

Use this action to set a counter to a specific value, instead of stepping it up or down. This is handy when you know the exact number you want, for example to restock a supplies counter after you buy a new pack.

{% include actions/ui_header.md %}

To set a counter to a specific value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the counter you want to set.
6. From the actions shown for that target, select **Set counter value**.
7. Set the **Value** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Value:
  description: The value to set the counter to. Must be 0 or a positive whole number.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `counter.set_value`. A basic example looks like this:

{% example %}
action: |
  action: counter.set_value
  target:
    entity_id: counter.paper_towels
  data:
    value: 12
{% endexample %}

This sets `counter.paper_towels` to 12.

### Options in YAML

{% options_yaml %}
value:
  description: The value to set the counter to. Must be 0 or a positive whole number.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The value must be 0 or a positive whole number.
- The value must be a multiple of the counter's step size, and within the configured minimum and maximum. If it isn't, the action fails.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: restock a supplies counter

Set a counter to a known amount when you restock, for example to reset a paper towel count after buying a new pack.

- **Trigger**: Restock button pressed
- **Action**: Set counter value
  - **Target**: Paper towels
  - **Value**: 12

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Restock the paper towel counter"
    triggers:
      - trigger: state
        entity_id: input_button.paper_towels_restocked
    actions:
      - action: counter.set_value
        target:
          entity_id: counter.paper_towels
        data:
          value: 12
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
