---
title: "Thermostat target temperature crossed threshold"
trigger: climate.target_temperature_crossed_threshold
domain: climate
description: "Triggers after the temperature setpoint of one or more thermostats crosses a threshold."
related_triggers:
  - climate.target_temperature_changed
  - climate.target_humidity_crossed_threshold
---

The **Thermostat target temperature crossed threshold** trigger fires after the target temperature (setpoint) of a thermostat {% term entity %} crosses a threshold value. Unlike [Thermostat target temperature changed](/triggers/climate.target_temperature_changed/), which fires whenever the target changes and lands at a particular value, this trigger fires only at the moment the setpoint crosses from one side of the threshold to the other.

Use this trigger when you want to react to the exact moment a setpoint enters or exits a range, such as when a thermostat is adjusted to a more or less aggressive temperature.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Thermostat target temperature crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat target temperature crossed threshold**.
6. Under **Threshold type**, configure what kind of crossing fires the trigger:
   - Select **Above** and enter a value to fire when the setpoint crosses above that value.
   - Select **Below** and enter a value to fire when the setpoint crosses below that value.
   - Select **In range** and enter a lower and upper bound to fire when the setpoint crosses into the range from outside.
   - Select **Outside range** and enter a lower and upper bound to fire when the setpoint crosses out of the range.
   - For each option, you can enter a fixed temperature or pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Unit**, select the temperature unit (°C or °F) to use for the threshold comparison.
8. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple thermostats are targeted.
9. Under **For at least**, set how long the thermostat must stay beyond the threshold before the trigger fires. Leave it at zero to fire immediately.
10. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which threshold crossings fire the trigger:

    - **Above**: fires when the setpoint crosses from below to above the threshold.
    - **Below**: fires when the setpoint crosses from above to below the threshold.
    - **In range**: fires when the setpoint crosses from outside to inside the range.
    - **Outside range**: fires when the setpoint crosses from inside to outside the range.

    For each mode you can enter a fixed temperature or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
Unit:
  description: The temperature unit to use for threshold comparison. Accepts `°C` or `°F`. Required when using numerical thresholds (not required when using entity references). Default is `°C`.
Trigger when:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - **Each** (`any` in YAML, default): fire every time any targeted thermostat crosses the threshold.
    - **First** (`first` in YAML): fire only on the first threshold crossing.
    - **All** (`last` in YAML): fire only after every targeted thermostat crosses the threshold.
For at least:
  description: How long the thermostat setpoint must stay beyond the threshold before the trigger fires. Useful to avoid false triggers from brief adjustments. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat target temperature crossed threshold** is referred to as `climate.target_temperature_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.target_temperature_crossed_threshold
  target:
    entity_id: climate.living_room
  options:
    threshold:
      type: above
      value:
        number: 24
        unit_of_measurement: "°C"
{% endexample %}

This fires when the target temperature of `climate.living_room` crosses above 24°C.

To fire when the setpoint crosses into an efficiency range:

{% example %}
trigger: |
  trigger: climate.target_temperature_crossed_threshold
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
    A map that defines when the trigger should fire based on when the target temperature crosses a threshold. The threshold contains two keys: `type` and `value` (or `value_min` and `value_max` for range-based types).

    The `type` key determines the kind of threshold:

    - `above` fires when the setpoint crosses from below to above a specific value.
    - `below` fires when the setpoint crosses from above to below a specific value.
    - `between` fires when the setpoint crosses from outside to inside a range (from below `value_min` or above `value_max` to between them).
    - `outside` fires when the setpoint crosses from inside to outside a range (from between `value_min` and `value_max` to below or above them).

    The `value` key is a map specifying the threshold temperature. You can use either:

    - A `number` key with a numerical value and a `unit_of_measurement` key (`°C` or `°F`), or
    - An `entity` key with the entity ID of a temperature sensor or a [number helper](/integrations/input_number/) whose value represents the threshold.

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
behavior:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted thermostat crosses the threshold.
    - `first` (**First** in the UI): fires only on the first threshold crossing.
    - `last` (**All** in the UI): fires only after every targeted thermostat crosses the threshold.
  required: false
  type: string
  default: any
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

- The threshold type controls the direction of the crossing. **Above** and **Below** fire when crossing in one direction through a single value, while **In range** and **Outside range** fire when crossing the boundary of a range.
- The trigger fires only at the moment of crossing, not while the setpoint stays beyond the threshold.
- To react to any change that lands at a particular value, use [Thermostat target temperature changed](/triggers/climate.target_temperature_changed/) instead.
- The trigger works with [climate](/integrations/climate/) entities that expose a target temperature attribute.
- All temperature values are automatically converted to the unit you specify.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: activate economy mode when all setpoints are lowered

When all thermostats in the living room area have their setpoints cross below 20°C, activate an economy mode preset to save energy. Waiting for all thermostats ensures the entire area is set for energy savings.

- **Trigger**: Thermostat target temperature crossed threshold
  - **Target**: Living room area
  - **Threshold type**: Below (20°C)
  - **Trigger when**: All
- **Action**: Set thermostat preset mode

{% details "YAML example for activating economy mode" %}

{% example %}
automation: |
  alias: "Activate economy mode when all setpoints lowered"
  triggers:
    - trigger: climate.target_temperature_crossed_threshold
      target:
        area_id: living_room
      options:
        threshold:
          type: below
          value:
            number: 20
            unit_of_measurement: "°C"
        behavior: last
  actions:
    - action: climate.set_preset_mode
      target:
        area_id: living_room
      data:
        preset_mode: "eco"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
