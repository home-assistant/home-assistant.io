---
title: "Power value"
condition: power.is_value
domain: power
description: "Tests the power value of one or more entities."
---

The **Power value** condition passes when a power reading meets the threshold you define. You can check whether the current reading is above, below, inside, or outside a range.

Use **Power value** when you want an automation to continue only if the current load is suitable, such as waiting until an appliance is idle or avoiding another high-load action while household power use is already high.

{% include conditions/ui_header.md %}

To use **Power value** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your power sensor is in. You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Power value**.
6. Under **Threshold type**, set the power value the condition checks against:
   1. Pick whether the reading must be **Above**, **Below**, **In range**, or **Outside range** of the threshold.
   2. Select **Number** or **Entity**:
      - **Number**: Enter a fixed power value. For **In range** or **Outside range**, enter both a lower and upper bound.
      - **Entity**: Use a sensor entity or a user-created [number helper](/integrations/input_number/) as the threshold.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted sensors should behave. The default is **Any**.
8. Under **For at least**, set how long the reading must meet the threshold before the condition passes. Leave it at zero to pass immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    The power value the entity has to meet for the condition to pass.

    - **Above** and **Below** are exclusive. A reading equal to the threshold does not pass.
    - **In range** is exclusive at both bounds.
    - **Outside range** is inclusive. A reading equal to either bound passes.

    Choose **Number** to enter a fixed power value, or **Entity** to use a sensor or a user-created [number helper](/integrations/input_number/) as a dynamic threshold.
Condition passes if:
  description: |
    When multiple entities are targeted, controls how results combine:

    - **Any**: The condition passes if at least one targeted entity meets the threshold (default).
    - **All**: The condition passes only when every targeted entity meets the threshold.
For at least:
  description: How long the reading must meet the threshold before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `power.is_value`. A basic example looks like this:

{% example %}
condition: |
  condition: power.is_value
  target:
    entity_id: sensor.main_power
  options:
    threshold:
      type: below
      value:
        number: 2500
        unit_of_measurement: "W"
{% endexample %}

This passes when the main power reading is below 2500 W.

To check that multiple sensors are all inside a normal operating range:

{% example %}
condition: |
  condition: power.is_value
  target:
    entity_id:
      - sensor.circuit_1_power
      - sensor.circuit_2_power
  options:
    threshold:
      type: between
      value_min:
        number: 100
        unit_of_measurement: "W"
      value_max:
        number: 1500
        unit_of_measurement: "W"
    behavior: all
{% endexample %}

This passes when both circuit power readings are between 100 W and 1500 W.

To use a user-created {% term helper %} as a dynamic threshold that you can adjust without editing the automation:

{% example %}
condition: |
  condition: power.is_value
  target:
    entity_id: sensor.ev_charger_power
  options:
    threshold:
      type: below
      value:
        entity: input_number.max_charger_power
{% endexample %}

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    The power value the entity has to meet for the condition to pass:

    - `type: above` (exclusive): Sets a minimum. The reading must be strictly above the threshold to pass. Provide `value` with either a `number` and `unit_of_measurement` (for a literal power value) or an `entity` key.
    - `type: below` (exclusive): Sets a maximum. The reading must be strictly below the threshold to pass. Provide `value` with either a `number` and `unit_of_measurement` (for a literal power value) or an `entity` key.
    - `type: between` (exclusive): Defines a range. The reading must be strictly between both bounds to pass. Provide `value_min` and `value_max`, each with either a `number` and `unit_of_measurement` or an `entity` key.
    - `type: outside` (inclusive): Defines an outside-range. The reading must be at or beyond either bound to pass. Provide `value_min` and `value_max`, each with either a `number` and `unit_of_measurement` or an `entity` key.

    When you use a literal number, add `unit_of_measurement` with one of the supported power units.

    Supported units are `mW`, `W`, `kW`, `MW`, `GW`, `TW`, and `BTU/h`.
  required: true
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls how results combine:

    - `any` (default): passes if at least one targeted entity meets the threshold.
    - `all`: passes only when every targeted entity meets the threshold.
  required: false
  type: string
  default: any
for:
  description: How long the reading must meet the threshold before the condition passes. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` requires the reading to stay in range for 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Use **Power value** to check the current load at the moment the condition runs. If you want to react when a reading changes or crosses a threshold, use [Power changed](/triggers/power.changed/) or [Power crossed threshold](/triggers/power.crossed_threshold/).
- Supported thresholds can use fixed values, a sensor with the power device class, a number entity with the power device class, or a user-created {% term helper %} from the [Input number integration](/integrations/input_number/).
- Supported power units are `mW`, `W`, `kW`, `MW`, `GW`, `TW`, and `BTU/h`.
- Entities that are `unavailable` or `unknown` are skipped when the condition is evaluated. With **Any**, at least one remaining valid entity must match. With **All**, every remaining valid entity must match.
- When you use a sensor or helper as a dynamic threshold, its current value is read when the condition runs.
- This condition works with sensors that have the power device class.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only notify when the washing machine is really finished

At 22:00, send a notification only if the washing machine power is below 3 W for at least 5 minutes.

- **Trigger**: Time: 22:00
- **Condition**: Power value (below 3 W)
  - **Target**: Washing machine power sensor
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for checking that the washing machine is idle" %}

{% example %}
automation: |
  alias: "Notify only when the washing machine is really finished"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: power.is_value
      target:
        entity_id: sensor.washing_machine_power
      options:
        threshold:
          type: below
          value:
            number: 3
            unit_of_measurement: "W"
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The washing machine is idle and the cycle appears to be finished."
{% endexample %}

{% enddetails %}

### Automation: only turn on the water heater boost when power use is low enough

At 02:00, turn on the water heater boost switch only if the current household power use is below 2500 W.

- **Trigger**: Time: 02:00
- **Condition**: Power value (below 2500 W)
  - **Target**: Main power sensor
- **Action**: Turn on switch
  - **Target**: switch.water_heater_boost

{% details "YAML example for checking power before turning on a water heater boost" %}

{% example %}
automation: |
  alias: "Turn on water heater boost when power use is low enough"
  triggers:
    - trigger: time
      at: "02:00:00"
  conditions:
    - condition: power.is_value
      target:
        entity_id: sensor.main_power
      options:
        threshold:
          type: below
          value:
            number: 2500
            unit_of_measurement: "W"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.water_heater_boost
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
