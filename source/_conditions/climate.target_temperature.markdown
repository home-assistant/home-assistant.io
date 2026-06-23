---
title: "Thermostat target temperature"
condition: climate.target_temperature
domain: climate
description: "Tests the target temperature of one or more thermostats."
related_conditions:
  - climate.is_on
  - climate.is_cooling
  - climate.is_heating
  - climate.is_drying
  - climate.is_hvac_mode
  - climate.target_humidity
---

The **Thermostat target temperature** condition passes when a thermostat {% term entity %}'s target temperature setting meets a threshold you define. The target temperature is the setpoint you configure on the device, not the actual current temperature reading. For example, you can use this condition in an automation to turn on a dehumidifier only if the thermostat is set to an unusually high or low temperature.

When you target more than one thermostat, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted thermostat to meet the threshold, or demand that all of them do.

{% include conditions/ui_header.md %}

To use **Thermostat target temperature** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Thermostat target temperature**.
6. Under **Threshold type**, set the temperature level the condition checks against:
   1. Pick whether the setpoint must be **Above**, **Below**, **In range**, or **Outside range** of the threshold.
   2. Select **Number** or **Entity**:
      - **Number**: Enter a fixed temperature directly, for example `20` for 20°C. For **In range** or **Outside range**, enter both a lower and upper bound.
      - **Entity**: Use a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold. You can compare the setpoint against another temperature value or use a number helper that you can adjust without editing the automation.
7. Under **Unit**, select the temperature unit (°C or °F) to use for the threshold comparison.
8. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
9. Under **For at least**, set how long the thermostat must have been at the threshold before the condition passes. Leave it at zero to pass immediately.
10. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    The temperature level the thermostat setpoint has to meet for the condition to pass. **Above** and **Below** are exclusive: a setpoint equal to the threshold does not pass. **In range** is exclusive at both bounds. **Outside range** is inclusive: a setpoint equal to either bound passes. Choose **Number** to enter a fixed temperature value, or **Entity** to use a sensor or number helper as a dynamic threshold.
Unit:
  description: The temperature unit to use for threshold comparison. Accepts `°C` or `°F`. Required when using numerical thresholds (not required when using entity references).
  default: °C
Condition passes if:
  description: When multiple thermostats are targeted, controls how results combine. Pick **Any** to pass if at least one targeted thermostat meets the threshold, or **All** to pass only when every targeted thermostat does. Default is **Any**.
For at least:
  description: How long the thermostat must have continuously met the threshold before the condition passes. Default is zero (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Thermostat target temperature** is referred to as `climate.target_temperature`. A basic example looks like this:

{% example %}
automation: |
  alias: "Close window covers when heating setpoint is high"
  triggers:
    - trigger: state
      entity_id: climate.living_room
      attribute: temperature
  conditions:
    - condition: climate.target_temperature
      target:
        entity_id: climate.living_room
      options:
        threshold:
          type: above
          value:
            number: 22
            unit_of_measurement: "°C"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

This passes when the living room thermostat's target temperature is set above 22°C.

To check that the setpoint stays below a certain level:

{% example %}
automation: |
  alias: "Open windows when cooling setpoint is very low"
  triggers:
    - trigger: state
      entity_id: climate.bedroom
      attribute: temperature
  conditions:
    - condition: climate.target_temperature
      target:
        entity_id: climate.bedroom
      options:
        threshold:
          type: below
          value:
            number: 18
            unit_of_measurement: "°C"
  actions:
    - action: cover.open_cover
      target:
        area_id: bedroom
{% endexample %}

This passes when the bedroom thermostat's target temperature is set below 18°C.

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    The temperature level the thermostat setpoint has to meet for the condition to pass:

    - `type: above` (exclusive): Sets a minimum. The setpoint must be strictly above the threshold to pass.
    - `type: below` (exclusive): Sets a maximum. The setpoint must be strictly below the threshold to pass.
    - `type: between` (exclusive): Defines a range. The setpoint must be strictly between both bounds to pass.
    - `type: outside` (inclusive): Defines an outside-range. The setpoint must be at or beyond either bound to pass.

    For `type: above` and `type: below`, use `value` with either `number` and `unit_of_measurement`, or `entity`. For `type: between` and `type: outside`, use `value_min` and `value_max`, each with either `number` and `unit_of_measurement`, or `entity`. For example:

    ```yaml
    threshold:
      type: between
      value_min:
        number: 20
        unit_of_measurement: °C
      value_max:
        number: 24
        unit_of_measurement: °C
    ```

    When using an `entity`, its current reading is used as the threshold at the moment the condition is evaluated.
  required: true
  type: map
behavior:
  description: >
    Controls how results combine when multiple thermostats are targeted. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the thermostat must have continuously met the threshold before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks the thermostat's _target temperature_ setpoint, not the actual measured temperature in the room. To react to the measured temperature, use the [Temperature value](/conditions/temperature.is_value/) condition instead.
- Thermostats that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- Not all thermostats support target temperature control in all modes. Only thermostats that expose a target temperature attribute will be evaluated by this condition.
- For thermostats in heat-cool mode that support dual setpoints (separate heating and cooling targets), this condition checks the single target temperature attribute. If the thermostat doesn't expose a single target temperature in that mode, it will be skipped.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: close window covers when heating setpoint is high

When the living room thermostat's target temperature is set to 22°C or above, close the window covers to help retain heat. This automation triggers when the thermostat's temperature setpoint changes.

- **Trigger**: State change of the living room thermostat's `temperature` attribute
- **Condition**: Target temperature is 22°C or higher
- **Action**: Close the living room blinds

{% example %}
automation: |
  alias: "Close blinds for efficient heating"
  triggers:
    - trigger: state
      entity_id: climate.living_room
      attribute: temperature
  conditions:
    - condition: climate.target_temperature
      target:
        entity_id: climate.living_room
      options:
        threshold:
          type: above
          value:
            number: 22
            unit_of_measurement: "°C"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

### Automation: adjust fan speed based on temperature setpoint

When the bedroom thermostat's target temperature is set within the comfort range of 20-22°C, set the ceiling fan to low speed. This provides gentle air circulation without creating drafts.

- **Trigger**: State change of the bedroom thermostat's `temperature` attribute
- **Condition**: Target temperature is between 20°C and 22°C
- **Action**: Set ceiling fan to low speed

{% example %}
automation: |
  alias: "Fan speed for comfort range"
  triggers:
    - trigger: state
      entity_id: climate.bedroom
      attribute: temperature
  conditions:
    - condition: climate.target_temperature
      target:
        entity_id: climate.bedroom
      options:
        threshold:
          type: between
          value_min:
            number: 20
            unit_of_measurement: "°C"
          value_max:
            number: 22
            unit_of_measurement: "°C"
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.bedroom_ceiling
      data:
        percentage: 20
{% endexample %}
