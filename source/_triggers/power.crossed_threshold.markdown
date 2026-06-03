---
title: "Power crossed threshold"
trigger: power.crossed_threshold
domain: power
description: "Triggers after one or more power values cross a threshold."
related_triggers:
  - power.changed
---

The **Power crossed threshold** trigger fires when a power reading crosses into or out of a threshold zone that you define. You can detect when a reading moves above a level, drops below a level, enters a range, or leaves a range.

Use **Power crossed threshold** when the crossing moment matters, such as when an appliance starts drawing noticeable power, when a washing machine finishes, or when a circuit load moves into a range that needs attention.

When you target more than one entity, the trigger's **Trigger when** option controls when it fires.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Power crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your power sensor is in. You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Power crossed threshold**.
6. Under **Threshold type**, configure the zone the reading must cross for the trigger to fire:
   - Select **Above** or **Below** and enter a value to fire when the reading crosses that level.
   - Select **In range** and enter a lower and upper bound to fire when the reading enters the range from outside.
   - Select **Outside range** and enter a lower and upper bound to fire when the reading leaves the range.
   - For each option, you can enter a fixed power value, pick a sensor or number entity, or pick a user-created [number helper](/integrations/input_number/) as the threshold.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), choose how multiple targeted sensors should behave. The default is **Each**.
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

    For each mode you can enter a fixed power value or reference a sensor entity, a number entity, or a user-created [number helper](/integrations/input_number/).
Trigger when:
  description: |
    When multiple entities are targeted, controls when the trigger fires:

    - **Each**: fires every time any targeted entity crosses the threshold.
    - **First**: fires only on the first crossing.
    - **All**: fires only after every targeted entity crosses the threshold.

    This corresponds to the `behavior` field in YAML. Default is **Each**.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. For example, set it to `0:05:00` to wait 5 minutes before running the automation. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Power crossed threshold** is referred to as `power.crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: power.crossed_threshold
  target:
    entity_id: sensor.washing_machine_power
  options:
      threshold:
        type: below
        value:
          number: 3
          unit_of_measurement: "W"
{% endexample %}

This fires whenever the washing machine power reading crosses below 3 W.

To fire when a reading leaves a normal operating range:

{% example %}
trigger: |
  trigger: power.crossed_threshold
  target:
    entity_id: sensor.main_power
  options:
    threshold:
      type: outside
      value_min:
        number: 500
        unit_of_measurement: "W"
      value_max:
        number: 3500
        unit_of_measurement: "W"
{% endexample %}

This fires whenever the main power reading crosses outside the 500 W to 3500 W range.

To use a user-created {% term helper %} as a dynamic threshold that you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: power.crossed_threshold
  target:
    entity_id: sensor.ev_charger_power
  options:
    threshold:
      type: above
      value:
        entity: input_number.high_power_alert_threshold
    behavior: first
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines the threshold crossing that fires the trigger:

    - `type: above` (exclusive): Sets a minimum. Fires when the reading crosses to strictly above `value`. A reading equal to `value` does not trigger a crossing. Provide `value` with either a `number` and `unit_of_measurement` (for a literal power value) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Sets a maximum. Fires when the reading crosses to strictly below `value`. A reading equal to `value` does not trigger a crossing. Provide `value` with either a `number` and `unit_of_measurement` (for a literal power value) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Defines a range. Fires when the reading crosses into the range. A reading equal to either bound is not inside the range. Provide `value_min` and `value_max`, each with either a `number` and `unit_of_measurement` (for a literal power value) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: outside` (inclusive): Defines an outside-range. Fires when the reading crosses out of the range. A reading equal to either bound is outside the range. Provide `value_min` and `value_max`, each with either a `number` and `unit_of_measurement` (for a literal power value) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).

    When you use a literal number, add `unit_of_measurement` with one of the supported power units.

    Supported units are `mW`, `W`, `kW`, `MW`, `GW`, `TW`, and `BTU/h`.
  required: true
  type: map
behavior:
  description: |
    When multiple entities are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted entity crosses the threshold.
    - `first`: fires only on the first threshold crossing.
    - `all`: fires only after every targeted entity crosses the threshold.
  required: false
  type: string
  default: each
for:
  description: |
    How long the reading must remain past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` waits 5 minutes before the trigger runs.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use **Power crossed threshold** when you care about the moment a reading crosses a level or range boundary. If you want to react to every matching reading change instead, use [Power changed](/triggers/power.changed/).
- Supported thresholds can use fixed values, a sensor with the power device class, a number entity with the power device class, or a user-created {% term helper %} from the [Input number integration](/integrations/input_number/).
- Supported power units are `mW`, `W`, `kW`, `MW`, `GW`, `TW`, and `BTU/h`.
- If a targeted entity is `unknown` or `unavailable`, it cannot contribute to the trigger until it reports a valid power value again.
- This trigger works with sensors that have the power device class.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when the washing machine finishes

When the washing machine power crosses below 3 W and stays there for 5 minutes, send a notification so you know the cycle is done.

- **Trigger**: Power crossed threshold
  - **Target**: Washing machine power sensor
  - **Threshold type**: Below 3 W
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a washing machine finished notification" %}

{% example %}
automation: |
  alias: "Notify when the washing machine finishes"
  triggers:
    - trigger: power.crossed_threshold
      target:
        entity_id: sensor.washing_machine_power
      options:
        threshold:
          type: below
          value:
            number: 3
            unit_of_measurement: "W"
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The washing machine cycle is finished."
{% endexample %}

{% enddetails %}

### Automation: turn on a warning light when a heater starts drawing high power

When a space heater power reading crosses above 1500 W, turn on a warning light so the load is easy to notice.

- **Trigger**: Power crossed threshold
  - **Target**: Space heater power sensor
  - **Threshold type**: Above 1500 W
- **Action**: Turn on light
  - **Target**: light.high_load_warning

{% details "YAML example for a high-load heater warning" %}

{% example %}
automation: |
  alias: "Turn on warning light when heater power gets high"
  triggers:
    - trigger: power.crossed_threshold
      target:
        entity_id: sensor.space_heater_power
      options:
        threshold:
          type: above
          value:
            number: 1500
            unit_of_measurement: "W"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.high_load_warning
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
