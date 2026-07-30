---
title: "Power changed"
trigger: power.changed
domain: power
description: "Triggers when one or more power values change."
related_triggers:
  - power.crossed_threshold
---

The **Power changed** trigger fires when a power reading changes and the new value matches the threshold you set. You can react to any change, only when the new reading is above or below a limit, or only when it lands inside or outside a range.

Use **Power changed** when you want to react to the latest power reading right away, such as noticing when an appliance starts drawing noticeable power or when a circuit moves outside its normal operating range.

## Prerequisites

- Use a sensor with the power device class.

{% include triggers/ui_header.md %}

To use **Power changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your power sensor is in. You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Power changed**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any power change.
   - Select **Above** or **Below** and enter a value to fire only when the new reading is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new reading falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new reading falls outside the range.
   - For each option, you can enter a fixed power value, pick a sensor or number entity, or pick a user-created [number helper](/integrations/input_number/) as the threshold.
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

    For each mode you can enter a fixed power value or reference a sensor entity, a number entity, or a user-created [number helper](/integrations/input_number/).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Power changed** is referred to as `power.changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: power.changed
  target:
    entity_id: sensor.washing_machine_power
  options:
    threshold:
      type: above
      value:
        number: 10
        unit_of_measurement: "W"
{% endexample %}

This fires whenever the washing machine power reading changes to a value above 10 W. To fire on any change regardless of direction or value, use `type: any` and omit `value`.

To fire only when the new reading lands inside a normal operating range:

{% example %}
trigger: |
  trigger: power.changed
  target:
    entity_id: sensor.server_rack_power
  options:
    threshold:
      type: between
      value_min:
        number: 150
        unit_of_measurement: "W"
      value_max:
        number: 350
        unit_of_measurement: "W"
{% endexample %}

This fires whenever the server rack power reading changes to a value between 150 W and 350 W.

To use a user-created {% term helper %} as a dynamic threshold that you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: power.changed
  target:
    entity_id: sensor.oven_power
  options:
    threshold:
      type: above
      value:
        entity: input_number.high_power_alert_threshold
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines which kind of change fires the trigger:

    - `type: any`: Fires on any power change (no additional keys needed).
    - `type: above` (exclusive): Sets a minimum. Fires when the new reading is strictly above `value`. A reading equal to `value` does not fire the trigger. Provide `value` with either a `number` and `unit_of_measurement` (for a literal power value) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Sets a maximum. Fires when the new reading is strictly below `value`. A reading equal to `value` does not fire the trigger. Provide `value` with either a `number` and `unit_of_measurement` (for a literal power value) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Defines a range. Fires when the new reading is strictly between `value_min` and `value_max`. Readings equal to either bound do not fire the trigger. Provide `value_min` and `value_max`, each with either a `number` and `unit_of_measurement` (for a literal power value) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: outside` (inclusive): Defines an outside-range. Fires when the new reading is at or below `value_min`, or at or above `value_max`. Readings equal to either bound fire the trigger. Provide `value_min` and `value_max`, each with either a `number` and `unit_of_measurement` (for a literal power value) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).

    When you use a literal number, add `unit_of_measurement` with one of the supported power units.

    Supported units are `mW`, `W`, `kW`, `MW`, `GW`, `TW`, and `BTU/h`.
  required: true
  type: map
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Use **Power changed** when you want to react to the latest reading after it changes. If you need to react only when a reading crosses into or out of a threshold zone, use [Power crossed threshold](/triggers/power.crossed_threshold/) instead.
- Thresholds can use fixed values, a sensor with the power device class, a number entity with the power device class, or a user-created {% term helper %} from the [Input number integration](/integrations/input_number/).
- Supported power units are `mW`, `W`, `kW`, `MW`, `GW`, `TW`, and `BTU/h`.
- If a targeted entity is `unknown` or `unavailable`, it cannot fire the trigger until it reports a valid power value again.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on a status light when the dryer starts drawing power

When the dryer power changes to a value above 20 W, turn on a status light so you can see that a cycle is running.

- **Trigger**: Power changed
  - **Target**: Dryer power sensor
  - **Threshold type**: Above 20 W
- **Action**: Turn on light
  - **Target**: light.utility_room_status

{% details "YAML example for a dryer running status light" %}

{% example %}
automation: |
  alias: "Turn on dryer status light when a cycle starts"
  triggers:
    - trigger: power.changed
      target:
        entity_id: sensor.dryer_power
      options:
        threshold:
          type: above
          value:
            number: 20
            unit_of_measurement: "W"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.utility_room_status
{% endexample %}

{% enddetails %}

### Automation: send a notification when a server rack leaves its normal power range

When the server rack power changes to a value outside 150 W to 350 W, send a notification so you can check whether something unexpected is happening.

- **Trigger**: Power changed
  - **Target**: Server rack power sensor
  - **Threshold type**: Outside range (150-350 W)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a server rack power alert" %}

{% example %}
automation: |
  alias: "Alert when server rack power leaves its normal range"
  triggers:
    - trigger: power.changed
      target:
        entity_id: sensor.server_rack_power
      options:
        threshold:
          type: outside
          value_min:
            number: 150
            unit_of_measurement: "W"
          value_max:
            number: 350
            unit_of_measurement: "W"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Server rack power moved outside its normal range."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
