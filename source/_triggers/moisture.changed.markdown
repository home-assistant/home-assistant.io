---
title: "Moisture content changed"
trigger: moisture.changed
domain: moisture
description: "Triggers when one or more moisture content values change."
related_triggers:
  - moisture.crossed_threshold
  - moisture.detected
  - moisture.cleared
---

The **Moisture content changed** trigger fires after a moisture reading changes. Soil moisture in a plant pot drops slowly as the soil dries out, climbs after watering, or hovers in a target zone when conditions are stable. Use the threshold type to filter which changes matter to your automation.

Use **Moisture content changed** to log soil moisture trends, trigger plant watering when the soil becomes too dry, or alert you when a reading shifts in a way that might signal a problem.

{% include triggers/ui_header.md %}

To use **Moisture content changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the moisture sensor (for example, a soil moisture probe). You can also select an area, a device, or a label.
5. From the triggers shown for that target, select **Moisture content changed**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any change, regardless of direction or new value.
   - Select **Above** or **Below** and enter a value to fire only when the new reading is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new reading falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new reading is outside the range.
   - For each option, you can enter a fixed percentage (0–100%), pick a sensor entity, or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger:

    - **Any change**: fires on any change, regardless of direction or new value.
    - **Above** or **Below** (exclusive): fires only when the new reading is strictly above or below the threshold. A reading equal to the threshold does not fire the trigger.
    - **In range** (exclusive): fires only when the new reading is strictly between the two bounds. A reading equal to either bound does not fire the trigger.
    - **Outside range** (inclusive): fires when the new reading is at or below the lower bound, or at or above the upper bound. A reading equal to either bound fires the trigger.

    For each mode you can enter a fixed percentage (0–100%) or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Moisture content changed** is referred to as `moisture.changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: moisture.changed
  target:
    entity_id: sensor.fiddle_leaf_soil_moisture
  options:
    threshold:
      type: below
      value:
        number: 25
{% endexample %}

This fires whenever the soil moisture sensor for the fiddle leaf fig moves to a value below 25%.

To fire only when the reading stays within a target range:

{% example %}
trigger: |
  trigger: moisture.changed
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
{% endexample %}

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: moisture.changed
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
    A mapping that defines which kind of change fires the trigger:

    - `type: any`: Fires on any moisture change (no additional keys needed).
    - `type: above` (exclusive): Sets a minimum. Fires when the reading is strictly above `value`. A reading equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Sets a maximum. Fires when the reading is strictly below `value`. A reading equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Defines a range. Fires when the reading is strictly between `value_min` and `value_max`. Readings equal to either bound do not fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: outside` (inclusive): Defines an outside-range. Fires when the reading is at or below `value_min`, or at or above `value_max`. Readings equal to either bound fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
  required: true
  type: map
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Use a sensor with the moisture device class, such as a soil moisture probe.
- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- For wet/dry leak sensors, use [Moisture detected](/triggers/moisture.detected/) or [Moisture cleared](/triggers/moisture.cleared/) instead.
- To react only when moisture first crosses a specific level, use [Moisture content crossed threshold](/triggers/moisture.crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: water a plant when its soil dries out

When the soil moisture for a houseplant drops below 25%, briefly turn on a smart plug connected to a small pump to water it.

- **Trigger**: Moisture content changed
  - **Target**: Soil moisture sensor
  - **Threshold type**: Below 25%
- **Action**: Turn on switch (the watering pump)

{% details "YAML example for an automatic plant watering" %}

{% example %}
automation: |
  alias: "Water the fiddle leaf when soil is dry"
  triggers:
    - trigger: moisture.changed
      target:
        entity_id: sensor.fiddle_leaf_soil_moisture
      options:
        threshold:
          type: below
          value:
            number: 25
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

{% include triggers/stuck.md %}

{% include triggers/related.md %}
