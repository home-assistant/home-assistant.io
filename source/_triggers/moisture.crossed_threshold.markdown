---
title: "Moisture content crossed threshold"
trigger: moisture.crossed_threshold
domain: moisture
description: "Triggers when one or more moisture content values cross a threshold."
related_triggers:
  - moisture.changed
  - moisture.detected
  - moisture.cleared
---

The **Moisture content crossed threshold** trigger fires when a moisture reading crosses into a zone you define. A soil sensor dipping below a "water me" level, a sensor entering a healthy range after watering, or a reading escaping that range are all supported.

Use **Moisture content crossed threshold** to automate watering, alert you when a plant or material drifts out of its target range, or coordinate devices that respond to specific moisture levels.

{% include triggers/ui_header.md %}

To use **Moisture content crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the moisture sensor (for example, a soil moisture probe). You can also select an area, a device, or a label.
5. From the triggers shown for that target, select **Moisture content crossed threshold**.
6. Under **Threshold type**, configure the zone the reading must cross for the trigger to fire:
   - Select **Above** or **Below** and enter a value to fire when the reading crosses that level.
   - Select **In range** and enter a lower and upper bound to fire when the reading enters the range from outside.
   - Select **Outside range** and enter a lower and upper bound to fire when the reading leaves the range (crosses past either bound).
   - For each option, you can enter a fixed percentage (0–100%), pick a sensor entity, or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
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

    For each mode you can enter a fixed percentage (0–100%) or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
Trigger when:
  description: |
    When multiple entities are targeted, controls when the trigger fires:

    - **Each**: fires every time any targeted entity crosses the threshold.
    - **First**: fires only on the first crossing.
    - **All**: fires only after every targeted entity crosses the threshold.

    This corresponds to the `behavior` field in YAML. Default is **Each**.
  required: false
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Useful to avoid triggering on brief fluctuations. For example, set it to `00:05:00` to fire only after the reading has stayed past the threshold for 5 minutes. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Moisture content crossed threshold** is referred to as `moisture.crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: moisture.crossed_threshold
  target:
    entity_id: sensor.tomato_soil_moisture
  options:
    threshold:
      type: below
      value:
        number: 30
{% endexample %}

This fires when the tomato soil moisture sensor crosses below 30%.

To fire when the reading enters a healthy range:

{% example %}
trigger: |
  trigger: moisture.crossed_threshold
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
    behavior: each
{% endexample %}

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: moisture.crossed_threshold
  target:
    label_id: plant_sensors
  options:
    threshold:
      type: below
      value:
        entity: input_number.plant_dry_threshold
    behavior: first
{% endexample %}

This fires when the first plant sensor with the `plant_sensors` label crosses below the threshold set in the number helper.

### Options in YAML

{% options_yaml %}
threshold:
  description: |
    A mapping that defines the threshold crossing that fires the trigger:

    - `type: above` (exclusive): Sets a minimum. Fires when the reading crosses to strictly above `value`. A reading equal to `value` does not trigger a crossing. Provide `value` with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Sets a maximum. Fires when the reading crosses to strictly below `value`. A reading equal to `value` does not trigger a crossing. Provide `value` with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Defines a range. Fires when the reading crosses into the range. A reading equal to either bound is not inside the range. Provide `value_min` and `value_max`, each with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: outside` (inclusive): Defines an outside-range. Fires when the reading crosses out of the range. A reading equal to either bound is outside the range. Provide `value_min` and `value_max`, each with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
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

- This trigger works with sensors that have the **moisture** device class, such as soil moisture probes. For wet/dry leak sensors, use [Moisture detected](/triggers/moisture.detected/) or [Moisture cleared](/triggers/moisture.cleared/) instead.
- A crossing only fires once per direction. The reading must leave the zone and come back before it can fire again.
- To react on every change instead of only on crossings, use [Moisture content changed](/triggers/moisture.changed/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: remind you to water a plant when soil moisture drops

When a plant's soil moisture crosses below 30% and stays there for 30 minutes, send a reminder notification.

- **Trigger**: Moisture content crossed threshold
  - **Target**: Tomato soil moisture sensor
  - **Threshold type**: Below 30%
  - **For at least**: 00:30:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a watering reminder" %}

{% example %}
automation: |
  alias: "Remind to water the tomatoes"
  triggers:
    - trigger: moisture.crossed_threshold
      target:
        entity_id: sensor.tomato_soil_moisture
      options:
        threshold:
          type: below
          value:
            number: 30
        for: "00:30:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The tomatoes need watering."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
