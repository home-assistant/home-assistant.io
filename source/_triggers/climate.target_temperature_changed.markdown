---
title: "Thermostat target temperature changed"
trigger: climate.target_temperature_changed
domain: climate
description: "Triggers when the temperature setpoint of one or more thermostats changes."
related_triggers:
  - climate.target_temperature_crossed_threshold
  - climate.target_humidity_changed
---

The **Thermostat target temperature changed** trigger fires after the target temperature (setpoint) of a thermostat {% term entity %} changes. The target temperature is what you want the thermostat to maintain, not the current room temperature. Use this trigger when you want to react to adjustments in the desired temperature, whether they're made through the UI, an {% term automation %}, a voice command, or directly on the device.

Use the threshold type to filter which changes matter to your automation. You can fire on any change, or only when the new setpoint is above, below, inside, or outside a specific range.

{% include triggers/ui_header.md %}

To use **Thermostat target temperature changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat target temperature changed**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any change, regardless of direction or new value.
   - Select **Above** or **Below** and enter a value to fire only when the new setpoint is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new setpoint falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new setpoint is outside the range.
   - For each option, you can enter a fixed temperature or pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Unit**, select the temperature unit (°C or °F) to use for the threshold comparison.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger:

    - **Any change**: fires on any change, regardless of direction or new value.
    - **Above** or **Below** (exclusive): fires only when the new setpoint is strictly above or below the threshold. A setpoint equal to the threshold does not fire the trigger.
    - **In range** (exclusive): fires only when the new setpoint is strictly between the two bounds. A setpoint equal to either bound does not fire the trigger.
    - **Outside range** (inclusive): fires when the new setpoint is at or below the lower bound, or at or above the upper bound. A setpoint equal to either bound fires the trigger.

    For each mode you can enter a fixed temperature or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
Unit:
  description: The temperature unit to use for threshold comparison. Accepts `°C` or `°F`. Required when using numerical thresholds (not required when using entity references). Default is `°C`.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat target temperature changed** is referred to as `climate.target_temperature_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.target_temperature_changed
  target:
    entity_id: climate.living_room
  options:
    threshold:
      type: above
      value:
        number: 22
        unit_of_measurement: "°C"
{% endexample %}

This fires whenever the target temperature of `climate.living_room` changes to a value above 22°C. To fire on any change regardless of direction or value, use `type: any` and omit `value`.

To fire only when the new setpoint is within an efficiency range:

{% example %}
trigger: |
  trigger: climate.target_temperature_changed
  target:
    entity_id: climate.living_room
  options:
    threshold:
      type: between
      value_min:
        number: 18
        unit_of_measurement: "°C"
      value_max:
        number: 22
        unit_of_measurement: "°C"
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines which kind of change fires the trigger:

    - `type: any`: Fires on any target temperature change (no additional keys needed).
    - `type: above` (exclusive): Sets a minimum. Fires when the setpoint is strictly above `value`. A setpoint equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Sets a maximum. Fires when the setpoint is strictly below `value`. A setpoint equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Defines a range. Fires when the setpoint is strictly between `value_min` and `value_max`. Setpoints equal to either bound do not fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: outside` (inclusive): Defines an outside-range. Fires when the setpoint is at or below `value_min`, or at or above `value_max`. Setpoints equal to either bound fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).

    When using the `number` key, you must also include `unit_of_measurement` to specify the temperature unit (`°C` or `°F`). When using the `entity` key, the unit is taken from the entity itself, or assumed to be the system temperature unit if the entity has no unit.

    For example:

    ```yaml
    threshold:
      type: outside
      value_min:
        entity: input_number.comfortable_temperature_min
      value_max:
        number: 24
        unit_of_measurement: °C
    ```

    A `sensor` or `number` entity's current value is used as the threshold, which lets you compare two temperature setpoints dynamically.
  required: true
  type: map
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Use a climate entity that exposes a target temperature attribute.
- This trigger monitors the target temperature setpoint (what you want the thermostat to maintain), not the current room temperature (the actual measured temperature). To react to changes in measured room temperature, use [Temperature changed](/triggers/temperature.changed/) instead.
- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- To react only when the target temperature first crosses a specific level, use [Thermostat target temperature crossed threshold](/triggers/climate.target_temperature_crossed_threshold/) instead.
- All temperature values are automatically converted to the unit you specify. For example, if your thermostat reports in Fahrenheit but you configure the trigger in Celsius, the conversion happens automatically.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: log aggressive temperature setpoint changes on multiple thermostats

Track when the first thermostat in the living room area sets an unusually high or low target temperature, which might indicate a comfort issue or a configuration error. Firing on the first change prevents multiple log entries.

- **Trigger**: Thermostat target temperature changed
  - **Target**: Living room area
  - **Threshold type**: Outside range (18-24°C)
  - **Trigger when**: First
- **Action**: Log activity

{% details "YAML example for logging aggressive setpoint changes" %}

{% example %}
automation: |
  alias: "Log unusual thermostat settings"
  triggers:
    - trigger: climate.target_temperature_changed
      target:
        area_id: living_room
      options:
        threshold:
          type: outside
          value_min:
            number: 18
            unit_of_measurement: "°C"
          value_max:
            number: 24
            unit_of_measurement: "°C"
        behavior: first
  actions:
    - action: logbook.log
      data:
        name: "Unusual thermostat setting"
        message: >
          A thermostat in the living room was set to {{ trigger.to_state.attributes.temperature }}°C.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
