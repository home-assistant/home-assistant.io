---
title: "Water heater target temperature"
condition: water_heater.is_target_temperature
domain: water_heater
description: "Tests the temperature setpoint of one or more water heaters."
related_conditions:
  - water_heater.is_on
  - water_heater.is_off
  - water_heater.is_operation_mode
---

The **Water heater target temperature** condition passes when a water heater {% term entity %}'s target temperature setting meets a threshold you define. The target temperature is the setpoint you want the water heater to maintain, not the current measured water temperature. Use it when you want an automation to run only if the setpoint is already above, below, inside, or outside a range.

When you target more than one water heater, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted water heater to meet the threshold, or demand that all of them do.

{% include conditions/ui_header.md %}

To use **Water heater target temperature** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your water heater is in, or select a device, a specific entity, a floor, or a label.
5. From the conditions shown for that target, select **Water heater target temperature**.
6. Under **Threshold type**, choose which setpoints should pass the condition:
   - Select **Above** or **Below** to compare the setpoint with one threshold.
   - Select **In range** or **Outside range** to compare the setpoint with a lower and upper threshold.
   - You can use a fixed number or select a temperature sensor, a temperature number entity, or a [number helper](/integrations/input_number/) as the threshold.
7. Under **Unit**, select the temperature unit to use for the comparison when you enter a number.
8. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
9. Under **For at least**, enter how long the setpoint must stay at the threshold before the condition passes.
10. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    The target temperature setpoint has to meet this threshold for the condition to pass. **Above** and **Below** are exclusive: a setpoint equal to the threshold does not pass. **In range** is exclusive at both bounds. **Outside range** is inclusive: a setpoint equal to either bound passes. Default is **Above**.

    You can use a fixed number or select a temperature sensor, a temperature number entity, or a [number helper](/integrations/input_number/) as the threshold.
Unit:
  description: The temperature unit to use for threshold comparison. Accepts `°C`, `°F`, or `K`. Required when using numerical thresholds (not required when using entity references).
Condition passes if:
  description: When multiple water heaters are targeted, controls how results combine. Pick **Any** to pass if at least one targeted water heater meets the threshold, or **All** to pass only when every targeted water heater does. Default is **Any**.
For at least:
  description: How long the setpoint must have continuously met the threshold before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Water heater target temperature** is referred to as `water_heater.is_target_temperature`. A basic example looks like this:

{% example %}
condition: |
  condition: water_heater.is_target_temperature
  target:
    entity_id: water_heater.utility_room
  options:
    threshold:
      type: above
      value:
        number: 55
        unit_of_measurement: "°C"
{% endexample %}

This passes when the target temperature of `water_heater.utility_room` is above 55°C.

To check whether the setpoint stays inside a preferred range:

{% example %}
condition: |
  condition: water_heater.is_target_temperature
  target:
    entity_id: water_heater.utility_room
  options:
    threshold:
      type: between
      value_min:
        entity: input_number.water_heater_min_target
      value_max:
        entity: input_number.water_heater_max_target
{% endexample %}

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    The target temperature setpoint has to meet this threshold for the condition to pass:

    - `type: above` (exclusive): Sets a minimum. The setpoint must be strictly above the threshold to pass.
    - `type: below` (exclusive): Sets a maximum. The setpoint must be strictly below the threshold to pass.
    - `type: between` (exclusive): Defines a range. The setpoint must be strictly between both bounds to pass.
    - `type: outside` (inclusive): Defines an outside-range. The setpoint must be at or beyond either bound to pass.

    For `type: above` and `type: below`, use `value` with either `number` and `unit_of_measurement`, or `entity`. For `type: between` and `type: outside`, use `value_min` and `value_max`, each with either `number` and `unit_of_measurement`, or `entity`.

    When using an `entity`, its current reading is used as the threshold at the moment the condition is evaluated.
  required: true
  type: map
behavior:
  description: >
    When multiple water heaters are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the setpoint must have continuously met the threshold before the condition passes. Accepts a duration string in `HH:MM:SS` format. For example, `00:10:00` waits 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition checks the target temperature setpoint, not the current measured water temperature.
- With **Any**, unavailable and unknown water heaters are skipped. With **All**, they make the condition fail.
- The threshold entities must provide temperature values. Supported threshold sources are temperature sensors, temperature number entities, and `input_number` helpers.
- To check the current measured temperature instead of the setpoint, use [Temperature value](/conditions/temperature.is_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: enable away mode only when the target temperature is already low

When you leave home, enable away mode only if the water heater target temperature is already below your normal daytime setting.

- **Trigger**: State: Person changes to not_home
- **Condition**: Water heater target temperature
  - **Target**: Utility room water heater
  - **Threshold type**: Below (50°C)
- **Action**: Set water heater away mode

{% details "YAML example for enabling away mode from a lower setpoint" %}

{% example %}
automation: |
  alias: "Enable away mode when the setpoint is already low"
  triggers:
    - trigger: state
      entity_id: person.alex
      to: "not_home"
  conditions:
    - condition: water_heater.is_target_temperature
      target:
        entity_id: water_heater.utility_room
      options:
        threshold:
          type: below
          value:
            number: 50
            unit_of_measurement: "°C"
  actions:
    - action: water_heater.set_away_mode
      target:
        entity_id: water_heater.utility_room
      data:
        away_mode: true
{% endexample %}

{% enddetails %}

### Automation: notify when the target temperature stays outside the preferred range

Every hour, check whether the target temperature has stayed outside the preferred range for 10 minutes. If it has, send a notification.

- **Trigger**: Time pattern: Every hour
- **Condition**: Water heater target temperature
  - **Target**: Utility room water heater
  - **Threshold type**: Outside range (50-55°C)
  - **For at least**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a target temperature reminder" %}

{% example %}
automation: |
  alias: "Check whether the target temperature stays outside range"
  triggers:
    - trigger: time_pattern
      hours: "/1"
  conditions:
    - condition: water_heater.is_target_temperature
      target:
        entity_id: water_heater.utility_room
      options:
        threshold:
          type: outside
          value_min:
            number: 50
            unit_of_measurement: "°C"
          value_max:
            number: 55
            unit_of_measurement: "°C"
        for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The water heater target temperature has stayed outside 50-55°C for 10 minutes."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
