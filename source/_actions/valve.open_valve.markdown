---
title: "Open valve"
action: valve.open_valve
domain: valve
description: "Opens a valve."
related_actions:
  - valve.close_valve
  - valve.set_valve_position
  - valve.stop_valve
  - valve.toggle
---

Use this action to fully open a valve, for example a water, gas, or air valve.

{% include actions/ui_header.md %}

To open a valve from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the valve you want to open.
6. From the actions shown for that target, select **Open valve**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `valve.open_valve`. A basic example looks like this:

{% example %}
action: |
  action: valve.open_valve
  target:
    entity_id: valve.garden_water
{% endexample %}

This opens `valve.garden_water`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with valves that support opening.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: open a valve in the morning

Open a valve at a set time, for example to start watering the garden.

- **Trigger**: Time: 07:15
- **Action**: Open valve
  - **Target**: Garden water valve

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Open the garden water valve in the morning"
    triggers:
      - trigger: time
        at: "07:15:00"
    actions:
      - action: valve.open_valve
        target:
          entity_id: valve.garden_water
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
