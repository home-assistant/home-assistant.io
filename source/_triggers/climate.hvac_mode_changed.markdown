---
title: "Thermostat mode changed"
trigger: climate.hvac_mode_changed
domain: climate
description: "Triggers when the mode of one or more thermostats changes."
related_triggers:
  - climate.turned_on
  - climate.turned_off
---

The **Thermostat mode changed** trigger fires after the HVAC mode of a climate {% term entity %} changes. Climate entities include thermostats, air conditioners, heat pumps, and evaporative coolers. The HVAC mode determines what the device is set to do: **Off**, **Heat**, **Cool**, **Auto**, **Dry**, **Fan only**, or **Heat/Cool**. Use this trigger when you want to react to the user changing the device's operational mode, regardless of whether it is actively heating, cooling, or idle.

Note: The UI labels this trigger as "Thermostat," but it works with all climate entities.

You choose one or more modes, and the trigger reacts when the thermostat switches to one of them.

{% include triggers/ui_header.md %}

To use **Thermostat mode changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat mode changed**.
6. Under **Modes**, select one or more modes you want to monitor.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple thermostats are targeted.
8. Under **For at least**, set how long the thermostat must remain in the new mode before the trigger fires. Leave it at zero to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Modes:
  description: The HVAC mode or modes the thermostat must switch to for the trigger to fire. Typical modes include **Off**, **Heat**, **Cool**, **Auto**, **Dry**, **Fan only**, and **Heat/Cool**, though the exact modes available depend on your device.
  required: true
Trigger when:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted thermostat changes mode.
    - **First**: fires only on the first mode change.
    - **All**: fires only after every targeted thermostat changes mode.
  required: false
For at least:
  description: How long the thermostat must remain in the new mode before the trigger fires. Useful to ignore brief mode changes. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat mode changed** is referred to as `climate.hvac_mode_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.hvac_mode_changed
  target:
    entity_id: climate.living_room
  options:
    hvac_mode: "heat"
{% endexample %}

This reacts when `climate.living_room` switches to the **Heat** mode.

### Options in YAML

{% options_yaml %}
hvac_mode:
  description: >
    The HVAC mode or modes the thermostat must switch to for the trigger to fire. Accepts a single mode string or a list of modes. Typical modes include `off`, `heat`, `cool`, `auto`, `dry`, `fan_only`, and `heat_cool`, though the exact modes available depend on your device.
  required: true
  type: string
behavior:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted thermostat changes mode.
    - `first`: fires only on the first mode change.
    - `all`: fires only after every targeted thermostat changes mode.
  required: false
  type: string
  default: each
for:
  description: |
    How long the thermostat must remain in the new mode before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the thermostat has stayed in the new mode for 10 seconds, which is useful to ignore brief mode changes. For a list of all accepted formats, refer to [Durations in automations and scripts](/docs/automation/durations/).
  required: false
  type: [string, integer, map]
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The target climate entity must support the HVAC mode you want to use.
- The available modes depend entirely on the device. Check your climate entity's documentation or the entity's attributes to see which modes are supported.
- The trigger only reacts when the thermostat changes to one of the selected modes, not when it changes from a selected mode to a mode that isn't selected. It also doesn't react when the thermostat switches between two selected modes. For example, with **Heat** and **Cool** selected, switching from **Heat** to **Cool** doesn't make the trigger react.
- The HVAC mode is different from the current HVAC action. The mode is what you set the device to do, while the action is what the device is currently doing, such as heating, cooling, or idle.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: adjust lights when first thermostat switches to auto mode

When the first thermostat in the bedroom area switches to auto mode and stays in that mode for at least 30 seconds, dim all lights to create a comfortable ambiance for sleep. The delay prevents lights from dimming during accidental mode changes, and firing on the first thermostat avoids multiple light adjustments.

- **Trigger**: Thermostat mode changed
  - **Target**: Bedroom area
  - **Modes**: Auto
  - **Trigger when**: First
  - **For at least**: 30 seconds
- **Action**: Turn on light

{% details "YAML example for adjusting lights on auto mode" %}

{% example %}
automation: |
  alias: "Dim lights on auto mode"
  triggers:
    - trigger: climate.hvac_mode_changed
      target:
        area_id: bedroom
      options:
        hvac_mode: "auto"
        behavior: first
        for: "00:00:30"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.bedroom_ceiling
      data:
        brightness_pct: 30
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
