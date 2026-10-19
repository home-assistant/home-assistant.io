---
title: "Set valve position"
action: valve.set_valve_position
domain: valve
description: "Moves a valve to a specific position."
related_actions:
  - valve.close_valve
  - valve.open_valve
  - valve.stop_valve
  - valve.toggle
---

Use this action to move a valve to a specific position, for example to half-open a water valve instead of fully opening it.

{% include actions/ui_header.md %}

To set a valve position from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the valve you want to set.
6. From the actions shown for that target, select **Set valve position**.
7. Set the **Position** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Position:
  description: The position to move the valve to, from 0 (fully closed) to 100 (fully open).
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `valve.set_valve_position`. A basic example looks like this:

{% example %}
action: |
  action: valve.set_valve_position
  target:
    entity_id: valve.garden_water
  data:
    position: 50
{% endexample %}

This moves `valve.garden_water` to the halfway position.

### Options in YAML

{% options_yaml %}
position:
  description: The position to move the valve to, from 0 (fully closed) to 100 (fully open).
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with valves that support setting a specific position.
- The position is a percentage from 0 (fully closed) to 100 (fully open).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: half-open a valve to reduce flow

Move a valve to a partial position, for example to lower the water flow during the day.

- **Trigger**: Time: 12:00
- **Action**: Set valve position
  - **Target**: Garden water valve
  - **Position**: 50

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Reduce the garden water flow at midday"
    triggers:
      - trigger: time
        at: "12:00:00"
    actions:
      - action: valve.set_valve_position
        target:
          entity_id: valve.garden_water
        data:
          position: 50
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
