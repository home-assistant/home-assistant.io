---
title: "Thermostat is off"
condition: climate.is_off
domain: climate
description: "Tests if one or more thermostats are off."
related_conditions:
  - climate.is_on
  - climate.is_hvac_mode
---

The **Thermostat is off** condition passes when a thermostat {% term entity %} is currently off. Use it to gate an automation so it only runs when a specific thermostat (or every targeted thermostat) is already inactive.

When you target more than one thermostat, the condition's **behavior** option controls how the check combines results. You can require any targeted thermostat to be off, or demand that all of them are.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Climate: Thermostat is off**.
5. Under **Targets**, select the thermostat entity, an area, a floor, or a label.
6. Under **Condition passes if**, pick **Any** or **All**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple thermostats are targeted, controls how results combine. Pick **Any** to pass if at least one targeted thermostat is off, or **All** to pass only when every targeted thermostat is off.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `climate.is_off`. A basic example looks like this:

{% example %}
condition: |
  condition: climate.is_off
  target:
    entity_id: climate.bedroom
{% endexample %}

This passes when the bedroom thermostat is currently off.

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

{% include conditions/behavior.md %}

## Good to know

- Thermostats that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as off. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted thermostat is unavailable.
- To gate an automation on a thermostat being on instead, use [Thermostat is on](/conditions/climate.is_on/).
- Pair with the [Thermostat turned off](/triggers/climate.turned_off/) trigger to react only when a transition to off happens.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on heating when cold and thermostats are off

When the outdoor temperature drops below 10°C during winter, automatically turn on any thermostats that are off and set them to heat mode. This prevents the home from getting too cold if heating was accidentally turned off.

- **Trigger**: Numeric state: Temperature below 10°C
- **Condition**: State: Season is winter
- **Condition**: Thermostat is off
  - **Target**: All thermostats
  - **Condition passes if**: Any
- **Action**: Turn on thermostats and set to heat mode

{% example %}
automation: |
  alias: "Auto-enable heating in cold weather"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.outdoor_temperature
      below: 10
  conditions:
    - condition: state
      entity_id: sensor.season
      state: "winter"
    - condition: climate.is_off
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
          - climate.office
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id:
          - climate.living_room
          - climate.bedroom
          - climate.office
      data:
        hvac_mode: heat
{% endexample %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
