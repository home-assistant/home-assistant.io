---
title: "Set V40 min"
action: osoenergy.set_v40_min
domain: osoenergy
description: "Sets the minimum quantity of water at 40°C for an OSO Energy water heater."
related_actions:
  - osoenergy.turn_on
  - osoenergy.turn_off
---

Use this action to set the minimum quantity of water at 40°C for a water heater. When the available capacity drops below this value, the heater turns on to guard against running out of warm water.

{% include actions/ui_header.md %}

To set the minimum quantity from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater you want to set.
6. From the actions shown for that target, select **OSO Energy: Set V40 min**.
7. Set the **V40 min** value you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
V40 min:
  description: The minimum quantity of water at 40°C, in liters. Must be between 200 and 550.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `osoenergy.set_v40_min`. A basic example looks like this:

{% example %}
action: |
  action: osoenergy.set_v40_min
  target:
    entity_id: water_heater.heater
  data:
    v40_min: 240
{% endexample %}

This sets the minimum quantity of water at 40°C to 240 liters.

### Options in YAML

{% options_yaml %}
v40_min:
  description: >
    The minimum quantity of water at 40°C, in liters. Must be between 200
    and 550.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md domain="water_heater" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}
{% include actions/stuck.md %}

{% include actions/related.md %}
