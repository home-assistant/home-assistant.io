---
title: "Clear thermostat preset"
action: matter.clear_thermostat_preset
domain: matter
description: "Removes a preset from a Matter thermostat."
related_actions:
  - matter.set_thermostat_preset
  - climate.set_preset_mode
---

Use this action to remove a preset from a Matter thermostat, for example a preset you added for guests who have left.

Your thermostat must support the Matter Thermostat cluster's presets feature for this action to work.

{% include actions/ui_header.md %}

To clear a thermostat preset from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the thermostat you want to manage.
6. From the actions shown for that target, under **Matter**, select **Clear thermostat preset**.
7. Enter the **Preset mode** to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Preset mode:
  description: The preset to remove, as shown in the thermostat's preset modes.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.clear_thermostat_preset`. A basic example looks like this:

{% example %}
action: |
  action: matter.clear_thermostat_preset
  target:
    entity_id: climate.living_room
  data:
    preset_mode: "Guests"
{% endexample %}

### Options in YAML

{% options_yaml %}
preset_mode:
  description: The preset to remove, as shown in the thermostat's `preset_modes` attribute.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md entity_type="Matter thermostat" example="climate.living_room" %}

## Good to know

- Built-in presets can't be removed.
- The active preset can't be removed. Select another preset first with the [Set preset mode](/actions/climate.set_preset_mode/) action.
- The thermostat also refuses to remove a preset that one of its schedules uses.

{% include actions/stuck.md %}

{% include actions/related.md %}
