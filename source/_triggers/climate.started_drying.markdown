---
title: "Thermostat started drying"
trigger: climate.started_drying
domain: climate
description: "Triggers after one or more thermostats start drying."
related_triggers:
  - climate.started_heating
  - climate.started_cooling
  - climate.hvac_mode_changed
---

The **Thermostat started drying** trigger fires after a thermostat {% term entity %} begins actively drying. This trigger monitors the `hvac_action` attribute rather than the HVAC mode. A thermostat can be set to **Dry** mode but still be idle if the current humidity already meets the target. The trigger only fires when the thermostat actually starts the drying process.

Use this trigger to react to the start of active drying, for example to close windows to prevent more humid air from entering or to turn on additional ventilation to help remove moisture.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Thermostat started drying** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat started drying**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple thermostats are targeted.
7. Under **For at least**, set how long the thermostat must stay in the drying state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - **Each** (`any` in YAML, default): fires every time any targeted thermostat starts drying.
    - **First** (`first` in YAML): fires only when the first of a group starts drying.
    - **All** (`last` in YAML): fires only after every targeted thermostat is drying.
For at least:
  description: How long the thermostat must stay in the drying state before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat started drying** is referred to as `climate.started_drying`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.started_drying
  target:
    entity_id: climate.living_room
{% endexample %}

This fires every time `climate.living_room` begins actively drying.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI, default): fire every time any targeted thermostat starts drying.
    - `first` (**First** in the UI): fire only when the first thermostat starts drying.
    - `last` (**All** in the UI): fire only after every targeted thermostat is drying.
  required: false
  type: string
  default: any
for:
  description: |
    How long the thermostat must stay in the drying state before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the thermostat has been drying for 10 seconds, which helps avoid false triggers from brief drying cycles.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger monitors the `hvac_action` attribute, not the HVAC mode. The climate entity must be actively drying, not just set to a drying mode.
- This trigger fires when `hvac_action` changes to **Drying**.
- Use this trigger to react to actual drying activity rather than just the device being set to a drying mode.
- Drying mode is typically used to reduce humidity without significantly changing the temperature.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: close windows when first thermostat starts drying

When the first thermostat in the living room area starts drying and continues for at least 30 seconds, close any motorized windows to prevent more humid air from entering and making the system work harder. The brief delay ensures the system has stabilized, and firing on the first thermostat avoids multiple window closures.

- **Trigger**: Thermostat started drying
  - **Target**: Living room area
  - **Trigger when**: First
  - **For at least**: 30 seconds
- **Action**: Close cover

{% details "YAML example for closing windows when drying starts" %}

{% example %}
automation: |
  alias: "Close windows when drying"
  triggers:
    - trigger: climate.started_drying
      target:
        area_id: living_room
      options:
        behavior: first
        for: "00:00:30"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_window
{% endexample %}

{% enddetails %}

### Automation: turn on fans when all thermostats are drying

When all thermostats with drying capability have started drying, turn on ventilation fans to help remove moisture more quickly. This waits until every targeted thermostat is drying before activating the fans for maximum effectiveness.

- **Trigger**: Thermostat started drying
  - **Target**: Thermostats with drying (by label)
  - **Trigger when**: All
- **Action**: Turn on fan

{% details "YAML example for running fans when all thermostats dry" %}

{% example %}
automation: |
  alias: "Run fans when all thermostats drying"
  triggers:
    - trigger: climate.started_drying
      target:
        label_id: drying_thermostats
      options:
        behavior: last
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.basement_ventilation
      data:
        percentage: 70
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
