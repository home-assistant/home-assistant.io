---
title: "Moisture level"
condition: moisture.is_value
domain: moisture
description: "Tests if a moisture content value is above a threshold, below a threshold, or in a range of values."
related_conditions:
  - moisture.is_detected
  - moisture.is_not_detected
---

The **Moisture level** condition passes when a moisture reading meets a threshold you define. You can check that the moisture content is above, below, within, or outside a specific range. Use it to run an automation only when a plant's soil is dry enough to need water, or only when material is wet enough to need drying.

## Prerequisites

- The target must be a sensor with the moisture device class.

{% include conditions/ui_header.md %}

To use **Moisture level** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick a moisture sensor (for example, a soil moisture probe). You can also select an area, a device, or a label.
5. From the conditions shown for that target, select **Moisture level**.
6. Under **Threshold type**, set the moisture level the condition checks against:
   1. Pick whether the reading must be **Above**, **Below**, **In range**, or **Outside range** of the threshold.
   2. Select **Number** or **Entity**:
      - **Number**: Enter a fixed percentage directly, for example `25` for 25%. For **In range** or **Outside range**, enter both a lower and upper bound.
      - **Entity**: Use a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
        - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Under **For at least**, set how long the reading must meet the threshold before the condition passes.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    The moisture level the entity has to meet for the condition to pass. **Above** and **Below** are exclusive: a reading equal to the threshold does not pass. **In range** is exclusive at both bounds. **Outside range** is inclusive: a reading equal to either bound passes. Choose **Number** to enter a fixed percentage (0–100), or **Entity** to use a sensor or number helper as a dynamic threshold.
Condition passes if:
  description: |
    When multiple entities are targeted, controls how results combine:

    - **Any**: The condition passes if at least one targeted entity meets the threshold (default).
    - **All**: The condition passes only when every targeted entity meets the threshold.
For at least:
  description: How long the reading must meet the threshold before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `moisture.is_value`. A basic example looks like this:

{% example %}
condition: |
  condition: moisture.is_value
  target:
    entity_id: sensor.fiddle_leaf_soil_moisture
  options:
    threshold:
      type: below
      value:
        number: 25
{% endexample %}

This passes when the fiddle leaf fig's soil moisture is below 25%.

To check that soil moisture is within a healthy range:

{% example %}
condition: |
  condition: moisture.is_value
  target:
    entity_id:
      - sensor.tomato_soil_moisture
      - sensor.basil_soil_moisture
  options:
    threshold:
      type: between
      value_min:
        number: 40
      value_max:
        number: 70
    behavior: all
{% endexample %}

This passes when both plant soil sensors read between 40% and 70%.

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
condition: |
  condition: moisture.is_value
  target:
    entity_id: sensor.fiddle_leaf_soil_moisture
  options:
    threshold:
      type: below
      value:
        entity: input_number.plant_dry_threshold
{% endexample %}

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    The moisture level the entity has to meet for the condition to pass:

    - `type: above` (exclusive): Sets a minimum. The reading must be strictly above the threshold to pass. Provide `value` with a `number` key (0–100) or an `entity` key.
    - `type: below` (exclusive): Sets a maximum. The reading must be strictly below the threshold to pass. Provide `value` with a `number` key (0–100) or an `entity` key.
    - `type: between` (exclusive): Defines a range. The reading must be strictly between both bounds to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.
    - `type: outside` (inclusive): Defines an outside-range. The reading must be at or beyond either bound to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.

    For the `number` key, use a percentage value (0–100). For the `entity` key, use an `input_number`, `number`, or `sensor` entity.
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
  description: How long the reading must meet the threshold before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- For wet/dry leak sensors, use [Moisture is detected](/conditions/moisture.is_detected/) or [Moisture is not detected](/conditions/moisture.is_not_detected/) instead.
- Entities that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- When you use a sensor as a dynamic threshold, its value is read at the moment the condition runs. The threshold is not continuously tracked; it is re-evaluated each time the automation runs.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only water plants when the soil is dry

When the daily watering schedule runs, only activate the pump if the soil moisture is below 30%, so you don't overwater after a rainy day.

- **Trigger**: Time: 08:00
- **Condition**: Moisture level (below 30%)
  - **Target**: Tomato soil moisture sensor
- **Action**: Turn on switch
  - **Target**: Plant watering pump

{% details "YAML example for a watering routine guarded by soil moisture" %}

{% example %}
automation: |
  alias: "Water tomatoes only when soil is dry"
  triggers:
    - trigger: time
      at: "08:00:00"
  conditions:
    - condition: moisture.is_value
      target:
        entity_id: sensor.tomato_soil_moisture
      options:
        threshold:
          type: below
          value:
            number: 30
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.plant_pump
    - delay: "00:00:10"
    - action: switch.turn_off
      target:
        entity_id: switch.plant_pump
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
