---
title: "Set thermostat HVAC mode"
action: climate.set_hvac_mode
domain: climate
description: "Sets the HVAC mode of a climate device."
related_actions:
  - climate.set_temperature
  - climate.set_preset_mode
  - climate.turn_on
  - climate.turn_off
---

Use this action to set the HVAC mode of a climate device, for example to switch a thermostat between heating, cooling, or off.

{% include actions/ui_header.md %}

To set the HVAC mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the climate device you want to control.
6. From the actions shown for that target, select **Set thermostat HVAC mode**.
7. Set the **HVAC mode** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
HVAC mode:
  description: The HVAC mode to set, such as heat, cool, or off. The available modes depend on the climate device.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.set_hvac_mode`. A basic example looks like this:

{% example %}
action: |
  action: climate.set_hvac_mode
  target:
    entity_id: climate.living_room
  data:
    hvac_mode: heat
{% endexample %}

This sets `climate.living_room` to heat mode.

### Options in YAML

{% options_yaml %}
hvac_mode:
  description: The HVAC mode to set, such as heat, cool, or off. The available modes depend on the climate device.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The available HVAC modes depend on the climate device. Common modes are `off`, `heat`, `cool`, `heat_cool`, `auto`, `dry`, and `fan_only`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch to cooling on a hot afternoon

Set a climate device to cool when the indoor temperature rises above a threshold.

- **Trigger**: Indoor temperature rises above 26 °C
- **Action**: Set thermostat HVAC mode
  - **Target**: Living room thermostat
  - **HVAC mode**: cool

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Switch the thermostat to cooling on a hot afternoon"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.living_room_temperature
        above: 26
    actions:
      - action: climate.set_hvac_mode
        target:
          entity_id: climate.living_room
        data:
          hvac_mode: cool
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
