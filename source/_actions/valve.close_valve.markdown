---
title: "Close valve"
action: valve.close_valve
domain: valve
description: "Closes a valve."
related_actions:
  - valve.open_valve
  - valve.set_valve_position
  - valve.stop_valve
  - valve.toggle
---

Use this action to fully close a valve, for example a water, gas, or air valve.

{% include actions/ui_header.md %}

To close a valve from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the valve you want to close.
6. From the actions shown for that target, select **Close valve**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `valve.close_valve`. A basic example looks like this:

{% example %}
action: |
  action: valve.close_valve
  target:
    entity_id: valve.garden_water
{% endexample %}

This closes `valve.garden_water`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with valves that support closing.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: close a valve at night

Close a valve at a set time, for example to shut off the water supply overnight.

- **Trigger**: Time: 23:00
- **Action**: Close valve
  - **Target**: Main water valve

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Close the main water valve at night"
    triggers:
      - trigger: time
        at: "23:00:00"
    actions:
      - action: valve.close_valve
        target:
          entity_id: valve.main_water
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
