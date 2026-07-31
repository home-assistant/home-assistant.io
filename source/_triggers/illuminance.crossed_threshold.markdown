---
title: "Illuminance crossed threshold"
trigger: illuminance.crossed_threshold
domain: illuminance
description: "Triggers when one or more illuminance values cross a threshold."
related_triggers:
  - illuminance.changed
  - illuminance.detected
  - illuminance.cleared
---

The **Illuminance crossed threshold** trigger fires when a light level reading crosses into a zone you define. A patio sensor crossing above 30,000 lx when the sun comes out, a desk sensor dipping below 200 lx as it gets dark in the office, or a reading escaping that range are all supported.

Use **Illuminance crossed threshold** to automate shades when the sun gets too bright, turn on lights when a room becomes too dark, or coordinate devices that respond to specific light levels. The entity that crosses the threshold must be an illuminance sensor. You can use a number entity with the illuminance device class as the threshold value.

When you target more than one entity, the trigger's **Trigger when** option controls when it fires.

## Prerequisites

- Use a sensor with the illuminance device class.

{% include triggers/ui_header.md %}

To use **Illuminance crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your light sensor is in (like your office or patio). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Illuminance crossed threshold**.
6. Under **Threshold type**, configure the zone the reading must enter for the trigger to fire:
   - Select **Above** or **Below** and enter a value to fire when the reading crosses that level.
   - Select **In range** and enter a lower and upper bound to fire when the reading enters the range from outside.
   - Select **Outside range** and enter a lower and upper bound to fire when the reading leaves the range (crosses past either bound).
For each option, you can enter a fixed value in lux, pick a sensor entity, pick a number entity, or pick a [number helper](/integrations/input_number/) entity as the threshold. If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple entities are targeted.
8. Under **For at least**, set how long the reading must stay past the threshold before the trigger fires. Leave it at zero to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which threshold crossings fire the trigger:

    - **Above** (exclusive): fires when the reading crosses to strictly above the threshold. A reading equal to the threshold does not trigger a crossing.
    - **Below** (exclusive): fires when the reading crosses to strictly below the threshold. A reading equal to the threshold does not trigger a crossing.
    - **In range** (exclusive): fires when the reading crosses into the range. A reading equal to either bound is not considered inside the range.
    - **Outside range** (inclusive): fires when the reading crosses out of the range. A reading equal to either bound is considered outside the range.

For each mode you can enter a fixed value in lux or reference a sensor entity, number entity, or [number helper](/integrations/input_number/) entity.
Trigger when:
  description: |
    When multiple entities are targeted, controls when the trigger fires:

    - **Each**: fires every time any targeted entity crosses the threshold.
    - **First**: fires only on the first crossing.
    - **All**: fires only after every targeted entity crosses the threshold.

    This corresponds to the `behavior` field in YAML. Default is **Each**.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Useful to avoid triggering on brief light fluctuations. For example, set it to `0:05:00` to fire only after the reading has stayed past the threshold for 5 minutes. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Illuminance crossed threshold** is referred to as `illuminance.crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: illuminance.crossed_threshold
  target:
    entity_id: sensor.office_illuminance
  options:
    threshold:
      type: below
      value:
        number: 200
{% endexample %}

This fires whenever the office illuminance sensor drops below 200 lx.

To fire when the reading leaves a comfortable reading range (escapes above 750 lx or below 300 lx):

{% example %}
trigger: |
  trigger: illuminance.crossed_threshold
  target:
    entity_id:
      - sensor.office_illuminance
      - sensor.study_illuminance
  options:
    threshold:
      type: outside
      value_min:
        number: 300
      value_max:
        number: 750
{% endexample %}

This fires whenever any of the illuminance sensors crosses outside the reading range.

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: illuminance.crossed_threshold
  target:
    label_id: outdoor_light_sensors
  options:
    threshold:
      type: above
      value:
        entity: input_number.brightness_alert_threshold
    behavior: first
{% endexample %}

This fires when the first outdoor illuminance sensor crosses above the threshold set in the number helper.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines the threshold crossing that fires the trigger:

- `type: above` (exclusive): Sets a minimum. Fires when the reading crosses to strictly above `value`. A reading equal to `value` does not trigger a crossing. Provide `value` with a `number` key (for a literal value in lux) or an `entity` key (for an input number entity, number entity, or sensor entity).
- `type: below` (exclusive): Sets a maximum. Fires when the reading crosses to strictly below `value`. A reading equal to `value` does not trigger a crossing. Provide `value` with a `number` key (for a literal value in lux) or an `entity` key (for an input number entity, number entity, or sensor entity).
- `type: between` (exclusive): Defines a range. Fires when the reading crosses into the range. A reading equal to either bound is not inside the range. Provide `value_min` and `value_max`, each with a `number` key (for a literal value in lux) or an `entity` key (for an input number entity, number entity, or sensor entity).
- `type: outside` (inclusive): Defines an outside-range. Fires when the reading crosses out of the range. A reading equal to either bound is outside the range. Provide `value_min` and `value_max`, each with a `number` key (for a literal value in lux) or an `entity` key (for an input number entity, number entity, or sensor entity).

    For example:

    ```yaml
    threshold:
      type: above
      value:
        number: 30000
    ```
  required: true
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted entity crosses the threshold.
    - `first`: fires only on the first threshold crossing.
    - `all`: fires only after every targeted entity crosses the threshold.
  required: false
  type: string
  default: each
for:
  description: |
    How long the reading must remain past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` fires only after the reading has stayed past the threshold for 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Illuminance is measured in lux (lx). For reference: a brightly lit office is around 500 lx, indirect daylight is several thousand lx, and direct sunlight can exceed 100,000 lx.
- Number entity support applies to threshold values, not to the target being checked. The number entity must use the illuminance device class.
- **Above** and **Below** fire on the crossing moment only. Once the reading is above the threshold, the trigger does not fire again until the reading dips back below it and then crosses above again.
- **In range** (`between`) fires when the reading moves from outside the bounds into the bounds. **Outside range** (`outside`) fires when the reading moves from inside the bounds past either bound.
- Pair this trigger with [Illuminance changed](/triggers/illuminance.changed/) if you also want to react to smaller fluctuations between crossings.
- Use **For at least** to ignore brief light fluctuations, such as clouds passing or a person briefly shading an outdoor sensor.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the desk lamp when the office gets dark

When the office illuminance crosses below 200 lx and stays there for at least one minute, turn on the desk lamp.

- **Trigger**: Illuminance crossed threshold
  - **Target**: Office illuminance sensor
  - **Threshold type**: Below 200 lx
  - **For at least**: 00:01:00
- **Action**: Turn on light
  - **Target**: light.desk_lamp

{% details "YAML example for turning on a desk lamp when it gets dark" %}

{% example %}
automation: |
  alias: "Desk lamp on when office gets dark"
  triggers:
    - trigger: illuminance.crossed_threshold
      target:
        entity_id: sensor.office_illuminance
      options:
        threshold:
          type: below
          value:
            number: 200
        for: "00:01:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.desk_lamp
{% endexample %}

{% enddetails %}

### Automation: close the patio blinds in bright sun

Protect patio furniture by closing the blinds when the patio illuminance crosses above 30,000 lx for at least 5 minutes.

- **Trigger**: Illuminance crossed threshold
  - **Target**: Patio illuminance sensors
  - **Threshold type**: Above 30000 lx
  - **For at least**: 00:05:00
- **Action**: Close cover
  - **Target**: cover.patio_blinds

{% details "YAML example for closing patio blinds in bright sun" %}

{% example %}
automation: |
  alias: "Close patio blinds in bright sun"
  triggers:
    - trigger: illuminance.crossed_threshold
      target:
        area_id: patio
      options:
        threshold:
          type: above
          value:
            number: 30000
        for: "00:05:00"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.patio_blinds
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
