---
title: "Thermostat target humidity crossed threshold"
trigger: climate.target_humidity_crossed_threshold
domain: climate
description: "Triggers when the humidity setpoint of one or more thermostats crosses a threshold."
related_triggers:
  - climate.target_humidity_changed
  - climate.target_temperature_crossed_threshold
---

The **Thermostat target humidity crossed threshold** trigger fires after the target humidity (setpoint) of a thermostat {% term entity %} crosses a threshold value. Unlike [Thermostat target humidity changed](/triggers/climate.target_humidity_changed/), which fires whenever the target changes and lands at a particular value, this trigger fires only at the moment the setpoint crosses from one side of the threshold to the other.

Use this trigger when you want to react to the exact moment a humidity setpoint enters or exits a range, such as when a thermostat is adjusted to a more or less humid target.

{% include triggers/ui_header.md %}

To use **Thermostat target humidity crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat target humidity crossed threshold**.
6. Under **Threshold type**, configure what kind of crossing fires the trigger:
   - Select **Above** and enter a value (in %) to fire when the setpoint crosses above that value.
   - Select **Below** and enter a value (in %) to fire when the setpoint crosses below that value.
   - Select **In range** and enter a lower and upper bound to fire when the setpoint crosses into the range from outside.
   - Select **Outside range** and enter a lower and upper bound to fire when the setpoint crosses out of the range.
   - For each option, you can enter a fixed percentage or pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple thermostats are targeted.
8. Under **For at least**, set how long the thermostat must stay beyond the threshold before the trigger fires. Leave it at zero to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which threshold crossings fire the trigger:

    - **Above** (exclusive): fires when the setpoint crosses to strictly above the threshold. A setpoint equal to the threshold does not trigger a crossing.
    - **Below** (exclusive): fires when the setpoint crosses to strictly below the threshold. A setpoint equal to the threshold does not trigger a crossing.
    - **In range** (exclusive): fires when the setpoint crosses into the range. A setpoint equal to either bound is not considered inside the range.
    - **Outside range** (inclusive): fires when the setpoint crosses out of the range. A setpoint equal to either bound is considered outside the range.

    For each mode you can enter a fixed percentage or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
Trigger when:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted thermostat crosses the threshold.
    - **First**: fires only on the first threshold crossing.
    - **All**: fires only after every targeted thermostat crosses the threshold.
  required: false
  default: Each
For at least:
  description: How long the thermostat setpoint must stay beyond the threshold before the trigger fires. Useful to avoid false triggers from brief adjustments. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat target humidity crossed threshold** is referred to as `climate.target_humidity_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.target_humidity_crossed_threshold
  target:
    entity_id: climate.bedroom
  options:
    threshold:
      type: above
      value:
        number: 55
{% endexample %}

This fires when the target humidity of `climate.bedroom` crosses above 55%.

To fire when the setpoint crosses into a comfortable range:

{% example %}
trigger: |
  trigger: climate.target_humidity_crossed_threshold
  target:
    entity_id: climate.bedroom
  options:
    threshold:
      type: between
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines when the trigger should fire:

    - `type: above` (exclusive): Sets a minimum. Fires when the setpoint crosses to strictly above `value`. A setpoint equal to `value` does not trigger a crossing. Provide `value` with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Sets a maximum. Fires when the setpoint crosses to strictly below `value`. A setpoint equal to `value` does not trigger a crossing. Provide `value` with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Defines a range. Fires when the setpoint crosses into the range. A setpoint equal to either bound is not inside the range. Provide `value_min` and `value_max`, each with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: outside` (inclusive): Defines an outside-range. Fires when the setpoint crosses out of the range. A setpoint equal to either bound is outside the range. Provide `value_min` and `value_max`, each with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).

    For example:

    ```yaml
    threshold:
      type: outside
      value_min:
        entity: input_number.comfortable_humidity_min
      value_max:
        number: 60
    ```

    A `sensor` or `number` entity's current value is used as the threshold, which lets you compare two humidity setpoints dynamically.
  required: true
  type: map
behavior:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted thermostat crosses the threshold.
    - `first`: fires only on the first threshold crossing.
    - `all`: fires only after every targeted thermostat crosses the threshold.
  required: false
  type: string
  default: each
for:
  description: |
    How long the thermostat setpoint must stay beyond the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the setpoint has been beyond the threshold for 10 seconds, which helps ignore accidental or brief adjustments.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use a climate entity that exposes a target humidity attribute.
- This trigger monitors the target humidity setpoint (what you want the thermostat to maintain), not the current room humidity (the actual measured humidity). To react to changes in measured room humidity, use [Relative humidity crossed threshold](/triggers/humidity.crossed_threshold/) instead.
- The threshold type controls the direction of the crossing. **Above** and **Below** fire when crossing in one direction through a single value, while **In range** and **Outside range** fire when crossing the boundary of a range.
- The trigger fires only at the moment of crossing, not while the setpoint stays beyond the threshold.
- To react to any change that lands at a particular value, use [Thermostat target humidity changed](/triggers/climate.target_humidity_changed/) instead.
- Humidity values are expressed as percentages (0-100%).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: activate dehumidifiers when all setpoints cross below comfortable level

When all thermostats in the bedroom area have their target humidity cross below 40%, adjust all standalone dehumidifiers to help maintain a comfortable humidity level. Waiting for all thermostats ensures consistent humidity control across the area.

- **Trigger**: Thermostat target humidity crossed threshold
  - **Target**: Bedroom area
  - **Threshold type**: Below (40%)
  - **Trigger when**: All
- **Action**: Set humidifier target humidity

{% details "YAML example for dehumidifier activation" %}

{% example %}
automation: |
  alias: "Activate dehumidifiers when all humidity targets low"
  triggers:
    - trigger: climate.target_humidity_crossed_threshold
      target:
        area_id: bedroom
      options:
        threshold:
          type: below
          value:
            number: 40
        behavior: all
  actions:
    - action: humidifier.set_humidity
      target:
        entity_id: humidifier.bedroom_dehumidifier
      data:
        humidity: 40
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
