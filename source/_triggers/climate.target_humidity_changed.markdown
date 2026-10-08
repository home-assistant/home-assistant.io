---
title: "Thermostat target humidity changed"
trigger: climate.target_humidity_changed
domain: climate
description: "Triggers when the humidity setpoint of one or more thermostats changes."
related_triggers:
  - climate.target_humidity_crossed_threshold
  - climate.target_temperature_changed
---

The **Thermostat target humidity changed** trigger fires after the target humidity (setpoint) of a thermostat {% term entity %} changes. The target humidity is what you want the thermostat to maintain, not the current room humidity. Some thermostats support humidity control and allow you to set a target humidity level in addition to temperature. Use this trigger when you want to react to adjustments in the desired humidity, whether they're made through the UI, an {% term automation %}, a voice command, or directly on the device.

Use the threshold type to filter which changes matter to your automation. You can fire on any change, or only when the new setpoint is above, below, inside, or outside a specific range.

{% include triggers/ui_header.md %}

To use **Thermostat target humidity changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat target humidity changed**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any change, regardless of direction or new value.
   - Select **Above** or **Below** and enter a value (in %) to fire only when the new setpoint is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new setpoint falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new setpoint is outside the range.
   - For each option, you can enter a fixed percentage or pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger:

    - **Any change**: fires on any change, regardless of direction or new value.
    - **Above** or **Below** (exclusive): fires only when the new setpoint is strictly above or below the threshold (in %). A setpoint equal to the threshold does not fire the trigger.
    - **In range** (exclusive): fires only when the new setpoint is strictly between the two bounds. A setpoint equal to either bound does not fire the trigger.
    - **Outside range** (inclusive): fires when the new setpoint is at or below the lower bound, or at or above the upper bound. A setpoint equal to either bound fires the trigger.

    For each mode you can enter a fixed percentage or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat target humidity changed** is referred to as `climate.target_humidity_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.target_humidity_changed
  target:
    entity_id: climate.bedroom
  options:
    threshold:
      type: above
      value:
        number: 50
{% endexample %}

This fires whenever the target humidity of `climate.bedroom` changes to a value above 50%. To fire on any change regardless of direction or value, use `type: any` and omit `value`.

To fire only when the new setpoint is within a comfortable range:

{% example %}
trigger: |
  trigger: climate.target_humidity_changed
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
    A mapping that defines which kind of change fires the trigger:

    - `type: any`: Fires on any target humidity change (no additional keys needed).
    - `type: above` (exclusive): Sets a minimum. Fires when the setpoint is strictly above `value`. A setpoint equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Sets a maximum. Fires when the setpoint is strictly below `value`. A setpoint equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Defines a range. Fires when the setpoint is strictly between `value_min` and `value_max`. Setpoints equal to either bound do not fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: outside` (inclusive): Defines an outside-range. Fires when the setpoint is at or below `value_min`, or at or above `value_max`. Setpoints equal to either bound fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a literal percentage 0–100) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).

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
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Use a climate entity that exposes a target humidity attribute.
- This trigger monitors the target humidity setpoint (what you want the thermostat to maintain), not the current room humidity (the actual measured humidity). To react to changes in measured room humidity, use [Relative humidity changed](/triggers/humidity.changed/) instead.
- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- To react only when the target humidity first crosses a specific level, use [Thermostat target humidity crossed threshold](/triggers/climate.target_humidity_crossed_threshold/) instead.
- Humidity values are expressed as percentages (0-100%).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: adjust humidifiers when first thermostat humidity setpoint changes

When the first thermostat in the bedroom area changes its target humidity to a value above 50%, turn on all standalone humidifiers to supplement the climate systems. Firing on the first change prevents multiple humidifier activations.

- **Trigger**: Thermostat target humidity changed
  - **Target**: Bedroom area
  - **Threshold type**: Above (50%)
  - **Trigger when**: First
- **Action**: Turn on humidifier

{% details "YAML example for supplemental humidifier control" %}

{% example %}
automation: |
  alias: "Turn on humidifiers for high humidity targets"
  triggers:
    - trigger: climate.target_humidity_changed
      target:
        area_id: bedroom
      options:
        threshold:
          type: above
          value:
            number: 50
        behavior: first
  actions:
    - action: humidifier.turn_on
      target:
        entity_id: humidifier.bedroom
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
