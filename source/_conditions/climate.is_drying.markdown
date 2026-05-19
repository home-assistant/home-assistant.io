---
title: "Thermostat is drying"
condition: climate.is_drying
domain: climate
description: "Tests if one or more thermostats are drying."
related_conditions:
  - climate.is_on
  - climate.is_cooling
  - climate.is_heating
  - climate.is_hvac_mode
---

The **Thermostat is drying** condition passes when a thermostat {% term entity %} is actively in dry mode, removing excess humidity from the air. This is common in air conditioning systems with dehumidification capabilities. A thermostat set to dry mode does not run continuously. It cycles to maintain comfortable humidity levels. Use **Thermostat is drying** to confirm the system is in an active drying cycle, rather than just set to dry mode and idle.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Thermostat is drying** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your living room or bedroom). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Thermostat is drying**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple thermostats are targeted.
7. Under **For at least**, set how long the thermostat must have been actively drying before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple thermostats are targeted, controls how results combine. Pick **Any** to pass if at least one targeted thermostat is actively drying, or **All** to pass only when every targeted thermostat is actively drying. Default is **Any**.
For at least:
  description: How long the thermostat must have been continuously drying before the condition passes. Default is zero (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Thermostat is drying** is referred to as `climate.is_drying`. A basic example looks like this:

{% example %}
condition: |
  condition: climate.is_drying
  target:
    entity_id: climate.living_room
{% endexample %}

This passes when the living room thermostat is actively running in dry mode to remove excess humidity.

### Options in YAML

{% options_yaml %}
behavior:
  description: >
    When multiple thermostats are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the thermostat must have been continuously drying before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A thermostat can be set to dry mode but not actively drying if it has already reached comfortable humidity levels and is idling. Use [Thermostat is in HVAC mode](/conditions/climate.is_hvac_mode/) if you only care about the mode setting.
- Thermostats that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as actively drying. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted thermostat is unavailable.
- This condition checks the current action of the thermostat, not its mode. To check if a thermostat is simply on (any active mode) or off, use [Thermostat is on](/conditions/climate.is_on/) or [Thermostat is off](/conditions/climate.is_off/).
- Dry mode is typically found in air conditioning systems with dehumidification features. Not all climate systems support this mode.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: boost air circulation when dehumidifying

When the living room thermostat is actively drying the air, increase the ceiling fan speed to improve air circulation and help distribute the dehumidified air throughout the room. This optimizes moisture removal only during active drying cycles.

- **Trigger**: State: Living room thermostat started drying
- **Condition**: Thermostat is drying
  - **Target**: Living room thermostat
- **Action**: Set fan speed to 60%

{% details "YAML example for boosting fan during drying" %}

{% example %}
automation: |
  alias: "Boost fan when drying"
  triggers:
    - trigger: state
      entity_id: climate.living_room
      attribute: hvac_action
      to: "drying"
  conditions:
    - condition: climate.is_drying
      target:
        entity_id: climate.living_room
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.living_room_ceiling
      data:
        percentage: 60
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
