---
title: "Decrement counter"
action: counter.decrement
domain: counter
description: "Decreases a counter by its step size."
related_actions:
  - counter.increment
  - counter.reset
  - counter.set_value
---

Use this action to decrease a counter by its configured step size, for example to count down a stock of supplies as they are used. The step size defaults to 1, but you can set a different step when you create the counter.

If the counter has a minimum, it stops at that minimum and does not go lower.

{% include actions/ui_header.md %}

To decrement a counter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the counter you want to decrease.
6. From the actions shown for that target, select **Decrement counter**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `counter.decrement`. A basic example looks like this:

{% example %}
action: |
  action: counter.decrement
  target:
    entity_id: counter.dishwasher_tablets
{% endexample %}

This decreases `counter.dishwasher_tablets` by its step size.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- The counter goes down by its step size, not always by 1. The step is whatever you set when you created the counter.
- When the counter reaches its minimum, it stays there and does not decrease further.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: count down a stock of supplies

Decrease a counter each time something is used, for example to keep track of how many dishwasher tablets you have left.

- **Trigger**: Dishwasher finishes a cycle
- **Action**: Decrement counter
  - **Target**: Dishwasher tablets

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Count down dishwasher tablets"
    triggers:
      - trigger: state
        entity_id: sensor.dishwasher
        to: "finished"
    actions:
      - action: counter.decrement
        target:
          entity_id: counter.dishwasher_tablets
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
