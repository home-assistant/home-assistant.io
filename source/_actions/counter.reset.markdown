---
title: "Reset counter"
action: counter.reset
domain: counter
description: "Resets a counter to its initial value."
related_actions:
  - counter.increment
  - counter.decrement
  - counter.set_value
---

Use this action to set a counter back to its initial value, for example to start a new counting cycle. The initial value is the one you set when you created the counter, and it defaults to 0.

A common use is resetting a daily counter at midnight so it starts fresh each day.

{% include actions/ui_header.md %}

To reset a counter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the counter you want to reset.
6. From the actions shown for that target, select **Reset counter**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `counter.reset`. A basic example looks like this:

{% example %}
action: |
  action: counter.reset
  target:
    entity_id: counter.daily_reminders
{% endexample %}

This sets `counter.daily_reminders` back to its initial value.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- The counter returns to its initial value, which is the value you set when you created it. It is not always 0.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reset a daily counter at midnight

Set a counter back to its initial value at a set time, for example to start counting from zero again each day.

- **Trigger**: Time: 00:00
- **Action**: Reset counter
  - **Target**: Daily reminders

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Reset the daily reminder counter at midnight"
    triggers:
      - trigger: time
        at: "00:00:00"
    actions:
      - action: counter.reset
        target:
          entity_id: counter.daily_reminders
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
