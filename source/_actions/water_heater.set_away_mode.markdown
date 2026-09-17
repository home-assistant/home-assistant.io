---
title: "Set water heater away mode"
action: water_heater.set_away_mode
domain: water_heater
description: "Turns away mode on or off for a water heater."
related_actions:
  - water_heater.set_temperature
  - water_heater.set_operation_mode
  - water_heater.turn_on
  - water_heater.turn_off
---

Use this action to turn away mode on or off for a water heater, for example to save energy while you are away from home.

{% include actions/ui_header.md %}

To set away mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater you want to set.
6. From the actions shown for that target, select **Set water heater away mode**.
7. Turn **Away mode** on or off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Away mode:
  description: Turn away mode on or off.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `water_heater.set_away_mode`. A basic example looks like this:

{% example %}
action: |
  action: water_heater.set_away_mode
  target:
    entity_id: water_heater.demo
  data:
    away_mode: true
{% endexample %}

This turns away mode on for `water_heater.demo`.

### Options in YAML

{% options_yaml %}
away_mode:
  description: Turn away mode on or off. Use `true` to enable away mode or `false` to disable it.
  required: true
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with water heater entities that support away mode.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: enable away mode when everyone leaves

Turn on away mode for a water heater when the last person leaves home.

- **Trigger**: State: Person changes to not_home
- **Action**: Set water heater away mode
  - **Target**: Utility room water heater
  - **Away mode**: on

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Enable water heater away mode when everyone leaves"
    triggers:
      - trigger: state
        entity_id: person.alex
        to: "not_home"
    actions:
      - action: water_heater.set_away_mode
        target:
          entity_id: water_heater.utility_room
        data:
          away_mode: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
