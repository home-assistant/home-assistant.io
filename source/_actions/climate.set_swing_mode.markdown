---
title: "Set thermostat swing mode"
action: climate.set_swing_mode
domain: climate
description: "Sets the swing mode of a climate device."
related_actions:
  - climate.set_swing_horizontal_mode
  - climate.set_fan_mode
  - climate.set_hvac_mode
---

Use this action to set the swing mode of a climate device, for example to control how an air conditioner directs airflow.

{% include actions/ui_header.md %}

To set the swing mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the climate device you want to control.
6. From the actions shown for that target, select **Set thermostat swing mode**.
7. Set the **Swing mode** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Swing mode:
  description: The swing mode to set, such as off, vertical, horizontal, or both. The available modes depend on the climate device.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.set_swing_mode`. A basic example looks like this:

{% example %}
action: |
  action: climate.set_swing_mode
  target:
    entity_id: climate.living_room
  data:
    swing_mode: both
{% endexample %}

This sets the swing mode of `climate.living_room` to both.

### Options in YAML

{% options_yaml %}
swing_mode:
  description: The swing mode to set, such as off, vertical, horizontal, or both. The available modes depend on the climate device.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The available swing modes depend on the climate device.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: spread airflow when cooling starts

Set a climate device to swing the airflow in both directions when it starts cooling.

- **Trigger**: Indoor temperature rises above 26 °C
- **Action**: Set thermostat swing mode
  - **Target**: Living room thermostat
  - **Swing mode**: both

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Spread the airflow when cooling starts"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.living_room_temperature
        above: 26
    actions:
      - action: climate.set_swing_mode
        target:
          entity_id: climate.living_room
        data:
          swing_mode: both
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
