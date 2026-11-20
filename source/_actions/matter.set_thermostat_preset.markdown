---
title: "Set thermostat preset"
action: matter.set_thermostat_preset
domain: matter
description: "Creates a new preset on a Matter thermostat, or edits an existing one."
related_actions:
  - matter.clear_thermostat_preset
  - climate.set_preset_mode
---

Use this action to create a new preset on a Matter thermostat, or to change the name or setpoints of an existing one. A preset is a set of target temperatures that the thermostat stores for a scenario, such as home, away, or sleep. You select the active preset with the [Set preset mode](/actions/climate.set_preset_mode/) action.

- To add a preset, leave **Preset mode** empty and select a **Preset scenario**.
- To edit a preset, enter its name in **Preset mode**, as shown in the thermostat's list of preset modes. You can't change the scenario of an existing preset.

Your thermostat must support the Matter Thermostat cluster's presets feature for this action to work.

{% include actions/ui_header.md %}

To set a thermostat preset from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the thermostat you want to manage.
6. From the actions shown for that target, under **Matter**, select **Set thermostat preset**.
7. Fill in the preset details you want to set.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Preset mode:
  description: The existing preset to edit, as shown in the thermostat's preset modes. Leave empty to add a new preset.
  required: false
Preset scenario:
  description: The scenario for a new preset. Required when adding a preset. See the list of scenarios below.
  required: false
Name:
  description: The display name for the preset, up to 64 characters. Required for a `user_defined` preset. Only used for scenarios that support custom names.
  required: false
Heating setpoint:
  description: The heating target temperature for the preset, in °C. Leave empty to keep the current value of an existing preset.
  required: false
Cooling setpoint:
  description: The cooling target temperature for the preset, in °C. Leave empty to keep the current value of an existing preset.
  required: false
{% endoptions_ui %}

The available preset scenarios are:

- `occupied`: Someone is home. Shown as the `home` preset mode.
- `unoccupied`: Nobody is home. Shown as the `away` preset mode.
- `sleep`: Everyone is asleep.
- `wake`: Everyone is waking up.
- `vacation`: Nobody is home for a longer time.
- `going_to_sleep`: Everyone is getting ready to sleep.
- `user_defined`: A preset of your own, shown with the name you give it.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.set_thermostat_preset`. This example adds a preset:

{% example %}
action: |
  action: matter.set_thermostat_preset
  target:
    entity_id: climate.living_room
  data:
    preset_scenario: user_defined
    name: "Guests"
    heating_setpoint: 21.5
{% endexample %}

This example changes the heating setpoint of the existing `home` preset:

{% example %}
action: |
  action: matter.set_thermostat_preset
  target:
    entity_id: climate.living_room
  data:
    preset_mode: home
    heating_setpoint: 20
{% endexample %}

### Options in YAML

{% options_yaml %}
preset_mode:
  description: The existing preset to edit, as shown in the thermostat's `preset_modes` attribute. Omit this field to add a new preset.
  required: false
  type: string
preset_scenario:
  description: The scenario for a new preset. Required when adding a preset, and not allowed together with `preset_mode`. See the list of scenarios above.
  required: false
  type: string
name:
  description: The display name for the preset, up to 64 characters. Required for a `user_defined` preset.
  required: false
  type: string
heating_setpoint:
  description: The heating target temperature for the preset, in °C.
  required: false
  type: float
cooling_setpoint:
  description: The cooling target temperature for the preset, in °C.
  required: false
  type: float
{% endoptions_yaml %}

{% include actions/targets.md entity_type="Matter thermostat" example="climate.living_room" %}

## Good to know

- A new preset needs the setpoints its thermostat uses: a heating setpoint on a thermostat that heats, and a cooling setpoint on one that cools.
- The thermostat limits how many presets it stores, in total and for each scenario, and the temperatures it accepts. Home Assistant checks these limits before it changes anything and tells you which one was reached.
- When a thermostat has more than one preset of a scenario, the built-in preset keeps the plain scenario name, such as `home`. The other presets of that scenario show their name in brackets, such as `home (Guests)`. If they have no name, they show a short identifier from the thermostat instead.
- The action needs a Matter Server version that supports atomic writes. If your Matter Server is too old, update it first.

{% include actions/stuck.md %}

{% include actions/related.md %}
