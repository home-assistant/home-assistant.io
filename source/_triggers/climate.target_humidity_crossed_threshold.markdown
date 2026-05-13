---
title: "Thermostat target humidity crossed threshold"
trigger: climate.target_humidity_crossed_threshold
domain: climate
description: "Triggers after the humidity setpoint of one or more thermostats crosses a threshold."
related_triggers:
  - climate.target_humidity_changed
  - climate.target_temperature_crossed_threshold
---

The **Thermostat target humidity crossed threshold** trigger fires after the target humidity (setpoint) of a thermostat {% term entity %} crosses a threshold value. Unlike [Thermostat target humidity changed](/triggers/climate.target_humidity_changed/), which fires whenever the target changes and lands at a particular value, this trigger fires only at the moment the setpoint crosses from one side of the threshold to the other.

Use this trigger when you want to react to the exact moment a humidity setpoint enters or exits a range, such as when a thermostat is adjusted to a more or less humid target.

{% include integrations/labs_entity_triggers_note.md %}

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

    - **Above**: fires when the setpoint crosses from below to above the threshold.
    - **Below**: fires when the setpoint crosses from above to below the threshold.
    - **In range**: fires when the setpoint crosses from outside to inside the range.
    - **Outside range**: fires when the setpoint crosses from inside to outside the range.

    For each mode you can enter a fixed percentage or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
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
    A map that defines when the trigger should fire based on when the target humidity crosses a threshold. The threshold contains two keys: `type` and `value` (or `value_min` and `value_max` for range-based types).

    The `type` key determines the kind of threshold:

    - `above` fires when the setpoint crosses from below to above a specific value.
    - `below` fires when the setpoint crosses from above to below a specific value.
    - `between` fires when the setpoint crosses from outside to inside a range (from below `value_min` or above `value_max` to between them).
    - `outside` fires when the setpoint crosses from inside to outside a range (from between `value_min` and `value_max` to below or above them).

    The `value` key is a map specifying the threshold humidity. You can use either:

    - A `number` key with a numerical value (percentage 0-100), or
    - An `entity` key with the entity ID of a humidity sensor or a [number helper](/integrations/input_number/) whose value represents the threshold percentage.

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

    - `any` (**Each** in the UI, default): fire every time any targeted thermostat crosses the threshold.
    - `first` (**First** in the UI): fire only on the first threshold crossing.
    - `last` (**All** in the UI): fire only after every targeted thermostat crosses the threshold.
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
- To react to any change that lands at a particular value, use [Thermostat target humidity changed](/triggers/climate.target_humidity_changed/) instead.
- The trigger only works with [climate](/integrations/climate/) entities that expose a target humidity attribute. Not all thermostats support humidity control.
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
        behavior: last
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
