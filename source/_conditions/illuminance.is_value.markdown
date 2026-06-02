---
title: "Illuminance"
condition: illuminance.is_value
domain: illuminance
description: "Tests if an illuminance value is above a threshold, below a threshold, or in a range of values."
related_conditions:
  - illuminance.is_detected
  - illuminance.is_not_detected
---

The **Illuminance** condition passes when a light level reading meets a threshold you define. You can check that the illuminance is above, below, within, or outside a specific range. It works with sensors that have the **illuminance** device class. Use it to only dim a lamp when the room is already bright, only close the blinds when the patio is in direct sun, or only run an evening routine once a room has actually gotten dark.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Illuminance** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick an illuminance sensor. You can also select an area, a device, or a label.
5. From the conditions shown for that target, select **Illuminance**.
6. Under **Threshold type**, set the light level the condition checks against:
   1. Pick whether the reading must be **Above**, **Below**, **In range**, or **Outside range** of the threshold.
   2. Select **Number** or **Entity**:
      - **Number**: Enter a fixed value in lux, for example `500` for an office level. For **In range** or **Outside range**, enter both a lower and upper bound.
      - **Entity**: Use a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
        - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All**.
8. Under **For at least**, set how long the reading must meet the threshold before the condition passes.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    The light level the entity has to meet for the condition to pass. **Above** and **Below** are exclusive: a reading equal to the threshold does not pass. **In range** is exclusive at both bounds. **Outside range** is inclusive: a reading equal to either bound passes. Choose **Number** to enter a fixed value in lux, or **Entity** to use a sensor or number helper as a dynamic threshold.
Condition passes if:
  description: |
    When multiple entities are targeted, controls how results combine:

    - **Each**: The condition passes if at least one targeted entity meets the threshold (default).
    - **All**: The condition passes only when every targeted entity meets the threshold.
For at least:
  description: How long the reading must meet the threshold before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `illuminance.is_value`. A basic example looks like this:

{% example %}
condition: |
  condition: illuminance.is_value
  target:
    entity_id: sensor.office_illuminance
  options:
    threshold:
      type: below
      value:
        number: 200
{% endexample %}

This passes when the office illuminance is below 200 lx.

To check that ambient light is within a comfortable reading range:

{% example %}
condition: |
  condition: illuminance.is_value
  target:
    entity_id:
      - sensor.office_illuminance
      - sensor.study_illuminance
  options:
    threshold:
      type: between
      value_min:
        number: 300
      value_max:
        number: 750
    behavior: all
{% endexample %}

This passes when both illuminance sensors read between 300 lx and 750 lx.

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
condition: |
  condition: illuminance.is_value
  target:
    entity_id: sensor.living_room_illuminance
  options:
    threshold:
      type: below
      value:
        entity: input_number.comfort_brightness_threshold
{% endexample %}

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    The light level the entity has to meet for the condition to pass:

    - `type: above` (exclusive): Sets a minimum. The reading must be strictly above the threshold to pass. Provide `value` with a `number` key (lux value) or an `entity` key.
    - `type: below` (exclusive): Sets a maximum. The reading must be strictly below the threshold to pass. Provide `value` with a `number` key (lux value) or an `entity` key.
    - `type: between` (exclusive): Defines a range. The reading must be strictly between both bounds to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.
    - `type: outside` (inclusive): Defines an outside-range. The reading must be at or beyond either bound to pass. Provide `value_min` and `value_max`, each with a `number` key or an `entity` key.

    For the `number` key, use a value in lux. For the `entity` key, use an `input_number`, `number`, or `sensor` entity.
  required: true
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls how results combine:

    - `each` (default): passes if at least one targeted entity meets the threshold.
    - `all`: passes only when every targeted entity meets the threshold.
  required: false
  type: string
  default: each
for:
  description: How long the reading must meet the threshold before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Illuminance is measured in lux (lx). For reference: a brightly lit office is around 500 lx, indirect daylight is several thousand lx, and direct sunlight can exceed 100,000 lx.
- This condition works with sensors that have the **illuminance** device class. For binary light/dark sensors, use [Light is detected](/conditions/illuminance.is_detected/) or [Light is not detected](/conditions/illuminance.is_not_detected/) instead.
- Entities that are `unavailable` or `unknown` are skipped for **Each** and fail for **All**.
- When you use a sensor as a dynamic threshold, its value is read at the moment the condition runs. The threshold is not continuously tracked; it is re-evaluated each time the automation runs.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only turn on the desk lamp when the office is dark

When the work-from-home schedule starts at 09:00, only turn on the desk lamp if the office is currently below 200 lx, so the lamp doesn't turn on when daylight already lights the room.

- **Trigger**: Time: 09:00
- **Condition**: Illuminance (below 200 lx)
  - **Target**: Office illuminance sensor
- **Action**: Turn on light
  - **Target**: light.desk_lamp

{% details "YAML example for a desk lamp guarded by ambient light" %}

{% example %}
automation: |
  alias: "Desk lamp on at 09:00 only if office is dark"
  triggers:
    - trigger: time
      at: "09:00:00"
  conditions:
    - condition: illuminance.is_value
      target:
        entity_id: sensor.office_illuminance
      options:
        threshold:
          type: below
          value:
            number: 200
  actions:
    - action: light.turn_on
      target:
        entity_id: light.desk_lamp
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
