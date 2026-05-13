---
title: "Thermostat turned off"
trigger: climate.turned_off
domain: climate
description: "Triggers after one or more thermostats turn off."
related_triggers:
  - climate.turned_on
  - climate.hvac_mode_changed
---

The **Thermostat turned off** trigger fires after a thermostat {% term entity %} turns off. Use it to react the moment the thermostat is shut down, whether it was switched off manually, by a schedule, through a {% term automation %}, or by a voice command.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Thermostat turned off** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat turned off**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple thermostats are targeted.
7. Under **For at least**, set how long the thermostat must stay off before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - **Each** (`any` in YAML, default): fire every time any targeted thermostat turns off.
    - **First** (`first` in YAML): fire only when the first of a group turns off.
    - **All** (`last` in YAML): fire only after every targeted thermostat is off.
For at least:
  description: How long the thermostat must stay off before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat turned off** is referred to as `climate.turned_off`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.turned_off
  target:
    entity_id: climate.living_room
{% endexample %}

This fires every time `climate.living_room` transitions to the off state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI, default): fire every time any targeted thermostat turns off.
    - `first` (**First** in the UI): fire only when the first thermostat turns off.
    - `last` (**All** in the UI): fire only after every targeted thermostat is off.
  required: false
  type: string
  default: any
for:
  description: |
    How long the thermostat must stay off before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the thermostat has stayed off for 10 seconds, which helps ignore accidental toggles or brief power losses.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use this trigger to save energy by turning off lights or adjusting other systems when the thermostat is no longer needed.
- Thermostats turn off when their HVAC mode is set to **Off**, which is different from the thermostat being idle while in another mode.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off fans when all thermostats are off

When all thermostats in the living room area turn off and stay off for 5 minutes, turn off the ceiling fans to save energy and reduce noise. The delay prevents the fans from turning off during brief manual adjustments, and waiting for all thermostats ensures complete shutdown.

- **Trigger**: Thermostat turned off
  - **Target**: Living room area
  - **Trigger when**: All
  - **For at least**: 5 minutes
- **Action**: Turn off fan

{% details "YAML example for turning off fans when all thermostats stop" %}

{% example %}
automation: |
  alias: "Turn off fans when all thermostats off"
  triggers:
    - trigger: climate.turned_off
      target:
        area_id: living_room
      options:
        behavior: last
        for: "00:05:00"
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.living_room_ceiling
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
