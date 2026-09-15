---
title: "Stop valve"
action: valve.stop_valve
domain: valve
description: "Stops a moving valve."
related_actions:
  - valve.close_valve
  - valve.open_valve
  - valve.set_valve_position
  - valve.toggle
---

Use this action to stop a valve while it is opening or closing, leaving it at its current position.

{% include actions/ui_header.md %}

To stop a valve from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the valve you want to stop.
6. From the actions shown for that target, select **Stop valve**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `valve.stop_valve`. A basic example looks like this:

{% example %}
action: |
  action: valve.stop_valve
  target:
    entity_id: valve.garden_water
{% endexample %}

This stops `valve.garden_water` at its current position.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with valves that support stopping.
- Stopping leaves the valve at its current position, somewhere between fully open and fully closed.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: stop a valve when a leak is detected

Stop a valve immediately when a leak sensor reports water, so it does not keep moving.

- **Trigger**: State: Leak sensor turns on
- **Action**: Stop valve
  - **Target**: Garden water valve

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Stop the garden water valve on a leak"
    triggers:
      - trigger: state
        entity_id: binary_sensor.garden_leak
        to: "on"
    actions:
      - action: valve.stop_valve
        target:
          entity_id: valve.garden_water
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
