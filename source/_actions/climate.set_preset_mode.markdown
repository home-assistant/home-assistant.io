---
title: "Set thermostat preset mode"
action: climate.set_preset_mode
domain: climate
description: "Sets the preset mode of a climate device."
related_actions:
  - climate.set_hvac_mode
  - climate.set_temperature
  - climate.set_fan_mode
---

Use this action to set the preset mode of a climate device, for example to switch a thermostat to an energy-saving or away preset.

{% include actions/ui_header.md %}

To set the preset mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the climate device you want to control.
6. From the actions shown for that target, select **Set thermostat preset mode**.
7. Set the **Preset mode** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Preset mode:
  description: The preset mode to set, such as eco or away. The available presets depend on the climate device.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.set_preset_mode`. A basic example looks like this:

{% example %}
action: |
  action: climate.set_preset_mode
  target:
    entity_id: climate.living_room
  data:
    preset_mode: eco
{% endexample %}

This sets `climate.living_room` to the eco preset.

### Options in YAML

{% options_yaml %}
preset_mode:
  description: The preset mode to set, such as eco or away. The available presets depend on the climate device.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The available presets depend on the climate device. An away preset, for example, often sets the target temperature to an energy-saving value, which is handy for a vacation mode.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch to the away preset when you leave

Set a climate device to an energy-saving preset when nobody is home.

- **Trigger**: Person leaves home
- **Action**: Set thermostat preset mode
  - **Target**: Living room thermostat
  - **Preset mode**: away

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Switch the thermostat to the away preset when you leave"
    triggers:
      - trigger: state
        entity_id: person.home_owner
        to: not_home
    actions:
      - action: climate.set_preset_mode
        target:
          entity_id: climate.living_room
        data:
          preset_mode: away
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
