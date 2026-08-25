---
title: "Set thermostat fan mode"
action: climate.set_fan_mode
domain: climate
description: "Sets the fan mode of a climate device."
related_actions:
  - climate.set_swing_mode
  - climate.set_swing_horizontal_mode
  - climate.set_hvac_mode
---

Use this action to set the fan mode of a climate device, for example to change the fan speed of an air conditioner.

{% include actions/ui_header.md %}

To set the fan mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the climate device you want to control.
6. From the actions shown for that target, select **Set thermostat fan mode**.
7. Set the **Fan mode** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Fan mode:
  description: The fan mode to set, such as low, medium, or high. The available modes depend on the climate device.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.set_fan_mode`. A basic example looks like this:

{% example %}
action: |
  action: climate.set_fan_mode
  target:
    entity_id: climate.living_room
  data:
    fan_mode: low
{% endexample %}

This sets the fan of `climate.living_room` to low.

### Options in YAML

{% options_yaml %}
fan_mode:
  description: The fan mode to set, such as low, medium, or high. The available modes depend on the climate device.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The available fan modes depend on the climate device.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: increase fan speed on a hot afternoon

Set a climate device to a higher fan speed when the room gets warm.

- **Trigger**: Indoor temperature rises above 26 °C
- **Action**: Set thermostat fan mode
  - **Target**: Living room thermostat
  - **Fan mode**: high

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Increase the fan speed on a hot afternoon"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.living_room_temperature
        above: 26
    actions:
      - action: climate.set_fan_mode
        target:
          entity_id: climate.living_room
        data:
          fan_mode: high
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
