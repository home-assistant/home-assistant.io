---
title: "Thermostat started cooling"
trigger: climate.started_cooling
domain: climate
description: "Triggers after one or more thermostats start cooling."
related_triggers:
  - climate.started_heating
  - climate.started_drying
  - climate.hvac_mode_changed
---

The **Thermostat started cooling** trigger fires after a thermostat {% term entity %} begins actively cooling. This trigger monitors the `hvac_action` attribute rather than the HVAC mode. A thermostat can be set to **Cool** mode but still be idle if the current temperature already meets the target. The trigger only fires when the thermostat actually starts producing cool air.

Use this trigger to react to the start of active cooling, for example to turn on a fan to distribute cool air or to close window coverings to block out heat.

When you target more than one thermostat, the **Trigger when** option controls when it fires. You can have it fire the first time any targeted thermostat starts cooling, only after all targeted thermostats have started cooling, or every single time any of them start cooling.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Thermostat started cooling** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat started cooling**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple thermostats are targeted.
7. Under **For at least**, set how long the thermostat must stay in the cooling state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted thermostat starts cooling.
    - **First**: fires only when the first of a group starts cooling.
    - **All**: fires only after every targeted thermostat is cooling.
For at least:
  description: How long the thermostat must stay in the cooling state before the trigger fires. Default is zero (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat started cooling** is referred to as `climate.started_cooling`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.started_cooling
  target:
    entity_id: climate.living_room
{% endexample %}

This fires every time `climate.living_room` begins actively cooling.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted thermostat starts cooling.
    - `first`: fires only when the first thermostat starts cooling.
    - `all`: fires only after every targeted thermostat is cooling.
  required: false
  type: string
  default: each
for:
  description: |
    How long the thermostat must stay in the cooling state before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the thermostat has been cooling for 10 seconds, which helps avoid false triggers from brief cooling cycles.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger monitors the `hvac_action` attribute, not the HVAC mode. The climate entity must be actively producing cool air, not just set to a cooling mode.
- This trigger fires when `hvac_action` changes to **Cooling**.
- Use this trigger to react to actual cooling activity rather than just the device being set to a cooling mode.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: close blinds when first thermostat starts cooling

When the first thermostat in the living room area starts cooling and continues cooling for at least 1 minute, close all blinds to block out sunlight and help the air conditioning work more efficiently. The delay avoids closing blinds during brief cooling cycles, and firing on the first thermostat prevents redundant blind closures.

- **Trigger**: Thermostat started cooling
  - **Target**: Living room area
  - **Trigger when**: First
  - **For at least**: 1 minute
- **Action**: Close cover

{% details "YAML example for closing blinds when cooling starts" %}

{% example %}
automation: |
  alias: "Close blinds when cooling"
  triggers:
    - trigger: climate.started_cooling
      target:
        area_id: living_room
      options:
        behavior: first
        for: "00:01:00"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

### Automation: turn on fans when all thermostats are cooling

When all thermostats labeled as main climate controls start cooling, turn on ceiling fans to help distribute the cool air throughout the house. This waits until every targeted thermostat is cooling before activating the fans.

- **Trigger**: Thermostat started cooling
  - **Target**: Main thermostats (by label)
  - **Trigger when**: All
- **Action**: Turn on fan

{% details "YAML example for running fans when all thermostats cool" %}

{% example %}
automation: |
  alias: "Run fans when all thermostats cooling"
  triggers:
    - trigger: climate.started_cooling
      target:
        label_id: main_thermostats
      options:
        behavior: all
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.living_room_ceiling
      data:
        percentage: 50
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
