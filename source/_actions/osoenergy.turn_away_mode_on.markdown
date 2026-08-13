---
title: "Set away mode"
action: osoenergy.turn_away_mode_on
domain: osoenergy
description: "Turns on away mode for an OSO Energy water heater for a set period."
related_actions:
  - osoenergy.turn_on
  - osoenergy.turn_off
---

Use this action to turn on away mode for a water heater for a set number of days, for example while you are on holiday. Away mode activates the holiday mode of the water heater.

{% include actions/ui_header.md %}

To turn on away mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater you want to set.
6. From the actions shown for that target, select **OSO Energy: Set away mode**.
7. Set the number of **Duration days** to keep away mode active.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration days:
  description: The number of days to keep away mode active. Must be between 1 and 365.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `osoenergy.turn_away_mode_on`. A basic example looks like this:

{% example %}
action: |
  action: osoenergy.turn_away_mode_on
  target:
    entity_id: water_heater.heater
  data:
    duration_days: 7
{% endexample %}

This turns on away mode for seven days.

### Options in YAML

{% options_yaml %}
duration_days:
  description: >
    The number of days to keep away mode active. Must be between 1 and 365.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="water_heater" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
