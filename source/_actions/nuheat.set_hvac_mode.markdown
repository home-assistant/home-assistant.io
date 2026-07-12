---
title: "Set HVAC mode"
action: climate.set_hvac_mode
domain: nuheat
description: "Sets the HVAC mode for a NuHeat thermostat."
related_actions:
  - climate.set_hvac_mode
---

Use this action to set the HVAC mode for a NuHeat thermostat.

{% include actions/ui_header.md %}

To set the HVAC mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the NuHeat thermostat.
6. From the actions shown for that target, select **Set HVAC mode**.
7. Select the **HVAC mode**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
HVAC mode:
  description: The HVAC mode to set.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.set_hvac_mode`. A basic example looks like this:

{% example %}
action: |
  action: climate.set_hvac_mode
  target:
    entity_id: climate.bathroom_floor
  data:
    hvac_mode: heat
{% endexample %}

### Options in YAML

{% options_yaml %}
hvac_mode:
  description: The HVAC mode to set.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- NuHeat thermostats do not have an off mode.
- Setting the temperature to the minimum temperature and changing the mode to `heat` puts the thermostat in `Permanent Hold` and stops heating unless freeze protection is needed.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
