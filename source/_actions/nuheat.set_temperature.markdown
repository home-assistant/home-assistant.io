---
title: "Set target temperature"
action: climate.set_temperature
domain: nuheat
description: "Sets the target temperature for a NuHeat thermostat."
related_actions:
  - climate.set_temperature
---

Use this action to set the target floor temperature for a NuHeat thermostat.

{% include actions/ui_header.md %}

To set the temperature from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the NuHeat thermostat.
6. From the actions shown for that target, select **Set target temperature**.
7. Enter the **Temperature**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Temperature:
  description: The target temperature to set.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.set_temperature`. A basic example looks like this:

{% example %}
action: |
  action: climate.set_temperature
  target:
    entity_id: climate.bathroom_floor
  data:
    temperature: 24
{% endexample %}

### Options in YAML

{% options_yaml %}
temperature:
  description: The target temperature to set.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- If the thermostat is in auto mode, setting the temperature puts it in a temporary hold.
- If the thermostat is in heat mode, setting the temperature puts it in a permanent hold.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
