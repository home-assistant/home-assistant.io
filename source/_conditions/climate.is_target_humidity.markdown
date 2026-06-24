---
title: "Thermostat target humidity"
condition: climate.is_target_humidity
domain: climate
description: "Tests the target humidity of one or more thermostats."
related_conditions:
  - climate.is_on
  - climate.is_cooling
  - climate.is_heating
  - climate.is_drying
  - climate.is_hvac_mode
  - climate.is_target_temperature
---

The **Thermostat target humidity** condition passes when a thermostat {% term entity %}'s target humidity setting meets a threshold you define. The target humidity is the setpoint you configure on the device, not the actual current humidity reading. For example, you can use this condition in an automation to turn on a dehumidifier only if the thermostat's humidity setpoint is above 60%.

{% include conditions/ui_header.md %}

To use **Thermostat target humidity** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Thermostat target humidity**.
6. Under **Threshold type**, set the comparison direction (**Above**, **Below**, **In range**, or **Outside range**) and the threshold value.
   - Choose **Number** to enter a fixed humidity percentage between 0 and 100, or **Entity** to use a humidity sensor or input number as the threshold.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple thermostats are targeted.
8. Under **For at least**, set how long the thermostat must have been at the threshold before the condition passes. Leave it at zero to pass immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls how the target humidity is compared and where the threshold value comes from. **Above** and **Below** are exclusive: a setpoint equal to the threshold does not pass. **In range** is exclusive at both bounds. **Outside range** is inclusive: a setpoint equal to either bound passes. Choose **Number** to enter a fixed percentage between 0 and 100, or **Entity** to use a humidity sensor or input number as the threshold value.
Condition passes if:
  description: When multiple thermostats are targeted, controls how results combine. Pick **Any** to pass if at least one targeted thermostat meets the threshold, or **All** to pass only when every targeted thermostat does. Default is **Any**.
For at least:
  description: How long the thermostat must have continuously met the threshold before the condition passes. Default is zero (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Thermostat target humidity** is referred to as `climate.is_target_humidity`. A basic example looks like this:

{% example %}
automation: |
  alias: "Turn on dehumidifier when thermostat humidity setpoint is high"
  triggers:
    - trigger: state
      entity_id: climate.bedroom
      attribute: humidity
  conditions:
    - condition: climate.is_target_humidity
      target:
        entity_id: climate.bedroom
      options:
        threshold:
          type: above
          value:
            number: 55
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.dehumidifier
{% endexample %}

This passes when the bedroom thermostat's target humidity is set above 55%.

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    The threshold to check the target humidity against. Use `type` to set the comparison direction:

    - `type: above` (exclusive): Sets a minimum. The setpoint must be strictly above the threshold to pass. Provide `value` with a `number` key (0–100) or an `entity` key.
    - `type: below` (exclusive): Sets a maximum. The setpoint must be strictly below the threshold to pass. Provide `value` with a `number` key (0–100) or an `entity` key.
    - `type: between` (exclusive): Defines a range. The setpoint must be strictly between both bounds to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.
    - `type: outside` (inclusive): Defines an outside-range. The setpoint must be at or beyond either bound to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.

    For the `number` key, use a percentage value (0–100). For the `entity` key, use an `input_number`, `number`, or `sensor` entity.
  required: false
  type: map
behavior:
  description: >
    When multiple thermostats are targeted, controls how results combine. Accepts `all` or `any`.
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

- This condition checks the thermostat's _target humidity_ setpoint, not the actual measured humidity in the room. To react to the measured humidity, use the [Relative humidity](/conditions/humidity.is_value/) condition instead.
- Thermostats that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- Target humidity is expressed as a percentage. The valid range depends on the device, but is typically between 30% and 70%.
- Not all thermostats support target humidity control. Only thermostats that expose a target humidity attribute will be evaluated by this condition.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on the dehumidifier when humidity setpoint is high

When the bedroom thermostat's target humidity is set to 60% or above, turn on a standalone dehumidifier to help reach the target. This automation triggers when the thermostat's humidity setpoint changes.

- **Trigger**: State change of the bedroom thermostat's `humidity` attribute
- **Condition**: Target humidity is 60% or higher
- **Action**: Turn on the dehumidifier

{% example %}
automation: |
  alias: "Dehumidifier assist"
  triggers:
    - trigger: state
      entity_id: climate.bedroom
      attribute: humidity
  conditions:
    - condition: climate.is_target_humidity
      target:
        entity_id: climate.bedroom
      options:
        threshold:
          type: above
          value:
            number: 60
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.dehumidifier
{% endexample %}
