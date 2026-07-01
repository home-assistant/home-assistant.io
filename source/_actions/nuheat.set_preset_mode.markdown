---
title: "Set preset mode"
action: climate.set_preset_mode
domain: nuheat
description: "Sets the preset mode for a NuHeat thermostat."
related_actions:
  - climate.set_preset_mode
---

Use this action to set how a NuHeat thermostat follows or holds its schedule.

{% include actions/ui_header.md %}

To set the preset mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the NuHeat thermostat.
6. From the actions shown for that target, select **Set preset mode**.
7. Select the **Preset mode**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Preset mode:
  description: The preset mode to set. Available values are `Run Schedule`, `Temporary Hold`, and `Permanent Hold`.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.set_preset_mode`. A basic example looks like this:

{% example %}
action: |
  action: climate.set_preset_mode
  target:
    entity_id: climate.bathroom_floor
  data:
    preset_mode: "Run Schedule"
{% endexample %}

### Options in YAML

{% options_yaml %}
preset_mode:
  description: The preset mode to set. Available values are `Run Schedule`, `Temporary Hold`, and `Permanent Hold`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- Use `Run Schedule` to return the thermostat to its normal schedule.
- Use `Temporary Hold` or `Permanent Hold` when you want the thermostat to hold a selected temperature instead of following its schedule.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
