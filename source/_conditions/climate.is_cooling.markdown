---
title: "Thermostat is cooling"
condition: climate.is_cooling
domain: climate
description: "Tests if one or more thermostats are cooling."
related_conditions:
  - climate.is_on
  - climate.is_heating
  - climate.is_drying
  - climate.is_hvac_mode
---

The **Thermostat is cooling** condition passes when a thermostat {% term entity %} is actively cooling. A thermostat set to cool mode does not necessarily run continuously. It cycles on and off to maintain the target temperature. Use **Thermostat is cooling** to confirm the system is in an active cooling cycle, rather than just set to cool mode and idle.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Thermostat is cooling** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your living room or bedroom). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Thermostat is cooling**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple thermostats are targeted.
7. Under **For at least**, set how long the thermostat must have been actively cooling before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple thermostats are targeted, controls how results combine. Pick **Any** to pass if at least one targeted thermostat is actively cooling, or **All** to pass only when every targeted thermostat is actively cooling. Default is **Any**.
For at least:
  description: How long the thermostat must have been continuously cooling before the condition passes. Default is zero (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Thermostat is cooling** is referred to as `climate.is_cooling`. A basic example looks like this:

{% example %}
condition: |
  condition: climate.is_cooling
  target:
    entity_id: climate.living_room
{% endexample %}

This passes when the living room thermostat is actively running the air conditioner to cool the space.

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
    How long the thermostat must have been continuously cooling before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A thermostat can be set to cool mode but not actively cooling if it has already reached its target temperature and is idling. Use [Thermostat is in HVAC mode](/conditions/climate.is_hvac_mode/) if you only care about the mode setting.
- Thermostats that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as actively cooling. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted thermostat is unavailable.
- This condition checks the current action of the thermostat, not its mode. To check if a thermostat is simply on (any active mode) or off, use [Thermostat is on](/conditions/climate.is_on/) or [Thermostat is off](/conditions/climate.is_off/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: close blinds when air conditioning is running

When the living room thermostat is actively cooling and the sun is high in the sky, close the blinds to reduce heat gain. This helps the air conditioner work more efficiently without having to guess whether it's actually running.

- **Trigger**: State: Living room thermostat started cooling
- **Condition**: Sun elevation above 30
- **Condition**: Thermostat is cooling
  - **Target**: Living room thermostat
- **Action**: Cover: Close cover

{% details "YAML example for closing blinds during cooling" %}

{% example %}
automation: |
  alias: "Close blinds when cooling"
  triggers:
    - trigger: state
      entity_id: climate.living_room
      attribute: hvac_action
      to: "cooling"
  conditions:
    - condition: sun
      after: sunrise
      after_offset: "01:00:00"
      before: sunset
      before_offset: "-01:00:00"
    - condition: climate.is_cooling
      target:
        entity_id: climate.living_room
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
