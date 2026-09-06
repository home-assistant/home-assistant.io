---
title: "Increment counter"
action: counter.increment
domain: counter
description: "Increases a counter by its step size."
related_actions:
  - counter.decrement
  - counter.reset
  - counter.set_value
---

Use this action to increase a counter by its configured step size, for example to count how often something happens, like a door opening or a routine running. The step size defaults to 1, but you can set a different step when you create the counter.

If the counter has a maximum, it stops at that maximum and does not go higher.

{% include actions/ui_header.md %}

To increment a counter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the counter you want to increase.
6. From the actions shown for that target, select **Increment counter**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `counter.increment`. A basic example looks like this:

{% example %}
action: |
  action: counter.increment
  target:
    entity_id: counter.front_door_openings
{% endexample %}

This increases `counter.front_door_openings` by its step size.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- The counter goes up by its step size, not always by 1. The step is whatever you set when you created the counter.
- When the counter reaches its maximum, it stays there and does not increase further.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: count how often the front door opens

Increase a counter each time a sensor reports an event, for example to count how many times the front door opens.

- **Trigger**: Front door contact sensor opens
- **Action**: Increment counter
  - **Target**: Front door openings

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Count front door openings"
    triggers:
      - trigger: state
        entity_id: binary_sensor.front_door
        to: "on"
    actions:
      - action: counter.increment
        target:
          entity_id: counter.front_door_openings
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
