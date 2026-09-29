---
title: "Turn off water heater"
action: water_heater.turn_off
domain: water_heater
description: "Turns off a water heater."
related_actions:
  - water_heater.turn_on
  - water_heater.set_temperature
  - water_heater.set_operation_mode
  - water_heater.set_away_mode
---

Use this action to turn off a water heater, for example to stop heating water while you are away.

{% include actions/ui_header.md %}

To turn off a water heater from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater you want to turn off.
6. From the actions shown for that target, select **Turn off water heater**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `water_heater.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: water_heater.turn_off
  target:
    entity_id: water_heater.demo
{% endexample %}

This turns off `water_heater.demo`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with water heater entities.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn off a water heater overnight

Turn off a water heater at a set time, for example to save energy while everyone is asleep.

- **Trigger**: Time: 23:30
- **Action**: Turn off water heater
  - **Target**: Utility room water heater

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Turn off the water heater overnight"
    triggers:
      - trigger: time
        at: "23:30:00"
    actions:
      - action: water_heater.turn_off
        target:
          entity_id: water_heater.utility_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
