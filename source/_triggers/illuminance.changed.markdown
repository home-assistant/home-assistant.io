---
title: "Illuminance changed"
trigger: illuminance.changed
domain: illuminance
description: "Triggers when one or more illuminance values change."
related_triggers:
  - illuminance.crossed_threshold
  - illuminance.detected
  - illuminance.cleared
---

The **Illuminance changed** trigger fires after a light level reading changes. The morning sun shining into a bedroom, a desk lamp switching on, or clouds shading a patio all show up as illuminance changes. Use the threshold type to filter which changes matter to your automation.

The threshold type controls where the new reading must land for the trigger to fire. You can require the new value to be above a level, below a level, within a range, or outside a range. The entity that changes must be an illuminance sensor. You can use a number entity with the illuminance device class as the threshold value.

Use **Illuminance changed** to log light trends, react when a room becomes noticeably brighter or darker, or coordinate shades and lighting based on ambient conditions.

## Prerequisites

- Use a sensor with the illuminance device class.

{% include triggers/ui_header.md %}

To use **Illuminance changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your light sensor is in (like your living room or backyard). You can also select a device, a specific entity, or a label. When you target multiple entities (via area, label, or multiple entity selections), the trigger fires whenever any of them changes.
5. From the triggers shown for that target, select **Illuminance changed**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any change, regardless of direction or new value.
   - Select **Above** or **Below** and enter a value to fire only when the new reading is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new reading falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new reading is outside the range.
- For each option, you can enter a fixed value in lux, pick a sensor entity, pick a number entity, or pick a [number helper](/integrations/input_number/) entity as the threshold.
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

For each mode you can enter a fixed value in lux or reference a sensor entity, number entity, or [number helper](/integrations/input_number/) entity.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Illuminance changed** is referred to as `illuminance.changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: illuminance.changed
  target:
    entity_id: sensor.living_room_illuminance
  options:
    threshold:
      type: above
      value:
        number: 500
{% endexample %}

This fires whenever the living room illuminance sensor reading moves to a value above 500 lx. To fire on any change regardless of direction or value, use `type: any` and omit `value`.

To fire only when the new reading is within a comfortable reading range:

{% example %}
trigger: |
  trigger: illuminance.changed
  target:
    entity_id:
      - sensor.living_room_illuminance
      - sensor.office_illuminance
  options:
    threshold:
      type: between
      value_min:
        number: 300
      value_max:
        number: 750
{% endexample %}

This fires whenever any of the illuminance sensors changes to a value within the reading range (300 lx to 750 lx).

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: illuminance.changed
  target:
    entity_id: sensor.living_room_illuminance
  options:
    threshold:
      type: above
      value:
        entity: input_number.brightness_alert_threshold
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines which kind of change fires the trigger:

    - `type: any`: Fires on any illuminance change (no additional keys needed).
- `type: above` (exclusive): Sets a minimum. Fires when the reading is strictly above `value`. A reading equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal value in lux) or an `entity` key (for an input number entity, number entity, or sensor entity).
- `type: below` (exclusive): Sets a maximum. Fires when the reading is strictly below `value`. A reading equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal value in lux) or an `entity` key (for an input number entity, number entity, or sensor entity).
- `type: between` (exclusive): Defines a range. Fires when the reading is strictly between `value_min` and `value_max`. Readings equal to either bound do not fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a literal value in lux) or an `entity` key (for an input number entity, number entity, or sensor entity).
- `type: outside` (inclusive): Defines an outside-range. Fires when the reading is at or below `value_min`, or at or above `value_max`. Readings equal to either bound fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a literal value in lux) or an `entity` key (for an input number entity, number entity, or sensor entity).
  required: true
  type: map
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Illuminance is measured in lux (lx). For reference: a brightly lit office is around 500 lx, indirect daylight is several thousand lx, and direct sunlight can exceed 100,000 lx.
- Number entity support applies to threshold values, not to the target being checked. The number entity must use the illuminance device class.
- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- To react only when an illuminance reading first crosses a specific level, use [Illuminance crossed threshold](/triggers/illuminance.crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: close the blinds when the patio gets too bright

When the patio illuminance sensor reports a sudden increase in brightness, close the patio blinds to keep direct sunlight off the furniture.

- **Trigger**: Illuminance changed
  - **Target**: Patio illuminance sensor
  - **Threshold type**: Above 30000 lx
- **Action**: Close cover
  - **Target**: cover.patio_blinds

{% details "YAML example for closing patio blinds on bright sunlight" %}

{% example %}
automation: |
  alias: "Close patio blinds in bright sunlight"
  triggers:
    - trigger: illuminance.changed
      target:
        entity_id: sensor.patio_illuminance
      options:
        threshold:
          type: above
          value:
            number: 30000
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.patio_blinds
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
