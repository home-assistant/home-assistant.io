---
title: "Thermostat started heating"
trigger: climate.started_heating
domain: climate
description: "Triggers after one or more thermostats start heating."
related_triggers:
  - climate.started_cooling
  - climate.started_drying
  - climate.hvac_mode_changed
---

The **Thermostat started heating** trigger fires after a thermostat {% term entity %} begins actively heating. This trigger monitors the `hvac_action` attribute rather than the HVAC mode. A thermostat can be set to **Heat** mode but still be idle if the current temperature already meets the target. The trigger only fires when the thermostat actually starts producing heat.

Use this trigger to react to the start of active heating, for example to turn on a fan to distribute warm air or to close window coverings to retain heat.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Thermostat started heating** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat started heating**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple thermostats are targeted.
7. Under **For at least**, set how long the thermostat must stay in the heating state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - **Each** (`any` in YAML, default): fires every time any targeted thermostat starts heating.
    - **First** (`first` in YAML): fires only when the first of a group starts heating.
    - **All** (`last` in YAML): fires only after every targeted thermostat is heating.
For at least:
  description: How long the thermostat must stay in the heating state before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat started heating** is referred to as `climate.started_heating`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.started_heating
  target:
    entity_id: climate.living_room
{% endexample %}

This fires every time `climate.living_room` begins actively heating.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI, default): fire every time any targeted thermostat starts heating.
    - `first` (**First** in the UI): fire only when the first thermostat starts heating.
    - `last` (**All** in the UI): fire only after every targeted thermostat is heating.
  required: false
  type: string
  default: any
for:
  description: |
    How long the thermostat must stay in the heating state before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the thermostat has been heating for 10 seconds, which helps avoid false triggers from brief heating cycles.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger monitors the `hvac_action` attribute, not the HVAC mode. The climate entity must be actively producing heat, not just set to a heating mode.
- This trigger fires when `hvac_action` changes to **Heating**.
- Use this trigger to react to actual heating activity rather than just the device being set to a heating mode.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: close blinds when first thermostat starts heating

When the first thermostat in the living room area starts heating and continues heating for at least 2 minutes, close all blinds to help retain heat and improve efficiency. The delay prevents the blinds from closing during brief heating cycles, and triggering on the first thermostat avoids multiple blind closures.

- **Trigger**: Thermostat started heating
  - **Target**: Living room area
  - **Trigger when**: First
  - **For at least**: 2 minutes
- **Action**: Close cover

{% details "YAML example for closing blinds when heating starts" %}

{% example %}
automation: |
  alias: "Close blinds when heating"
  triggers:
    - trigger: climate.started_heating
      target:
        area_id: living_room
      options:
        behavior: first
        for: "00:02:00"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

### Automation: turn on fans when all thermostats are heating

When all thermostats in the bedroom area start heating, turn on ceiling fans on low speed to help distribute the warm air throughout the rooms. Waiting for all thermostats ensures the entire area is being heated before activating air circulation.

- **Trigger**: Thermostat started heating
  - **Target**: Bedroom area
  - **Trigger when**: All
- **Action**: Turn on fan

{% details "YAML example for running fans when all thermostats heat" %}

{% example %}
automation: |
  alias: "Run fans when all thermostats heating"
  triggers:
    - trigger: climate.started_heating
      target:
        area_id: bedroom
      options:
        behavior: last
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_ceiling
      data:
        percentage: 30
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
