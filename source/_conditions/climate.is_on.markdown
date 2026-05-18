---
title: "Thermostat is on"
condition: climate.is_on
domain: climate
description: "Tests if one or more thermostats are on."
related_conditions:
  - climate.is_off
  - climate.is_hvac_mode
  - climate.is_heating
---

The **Thermostat is on** condition passes when a thermostat {% term entity %} is currently on (in any active mode such as heating, cooling, or fan only). Use it to gate an automation so it only runs when a specific thermostat (or every targeted thermostat) is already active.

When you target more than one thermostat, the condition's **behavior** option controls how the check combines results. You can require any targeted thermostat to be on, or demand that all of them are.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Climate: Thermostat is on**.
5. Under **Targets**, select the thermostat entity, an area, a floor, or a label.
6. Under **Condition passes if**, pick **Any** or **All** to control how the check behaves when multiple thermostats are targeted.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple thermostats are targeted, controls how results combine. Pick **Any** to pass if at least one targeted thermostat is on, or **All** to pass only when every targeted thermostat is on.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `climate.is_on`. A basic example looks like this:

{% example %}
condition: |
  condition: climate.is_on
  target:
    entity_id: climate.living_room
{% endexample %}

This passes when the living room thermostat is currently on in any active mode.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple thermostats are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

## Good to know

- This condition passes when the thermostat is in any active HVAC mode: heat, cool, heat/cool, auto, dry, or fan only. It does not pass when the thermostat is off.
- Thermostats that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as on. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted thermostat is unavailable.
- To gate an automation on a thermostat being off instead, use [Thermostat is off](/conditions/climate.is_off/).
- To check for a specific HVAC mode, use [Thermostat is in HVAC mode](/conditions/climate.is_hvac_mode/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: boost heating when temperature drops

When the outdoor temperature drops below 18°C, increase the target temperature to help warm up faster, but only if the heating is already running. Prevents the automation from adjusting the thermostat if someone deliberately left it off.

- **Trigger**: Numeric state: Temperature below 18°C
- **Condition**: Thermostat is on
  - **Target**: Living room thermostat
- **Action**: Climate: Set thermostat target temperature

{% details "YAML example for boosting heat when cold" %}

{% example %}
automation: |
  alias: "Boost heating when outdoor temperature drops"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.outdoor_temperature
      below: 18
  conditions:
    - condition: climate.is_on
      target:
        entity_id: climate.living_room
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.living_room
      data:
        temperature: 22
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
