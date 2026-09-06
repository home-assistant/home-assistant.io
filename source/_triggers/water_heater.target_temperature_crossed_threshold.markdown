---
title: "Water heater target temperature crossed threshold"
trigger: water_heater.target_temperature_crossed_threshold
domain: water_heater
description: "Triggers when the temperature setpoint of one or more water heaters crosses a threshold."
related_triggers:
  - water_heater.target_temperature_changed
  - water_heater.operation_mode_changed
---

The **Water heater target temperature crossed threshold** trigger fires when a water heater {% term entity %}'s target temperature crosses a threshold. Unlike [Water heater target temperature changed](/triggers/water_heater.target_temperature_changed/), which reacts to any matching landing value, this trigger reacts only at the moment the setpoint crosses into, out of, above, or below a threshold.

Use it when you want to react to the crossing itself, like turning on a recirculation pump once the target temperature is raised past a certain point.

{% include triggers/ui_header.md %}

To use **Water heater target temperature crossed threshold** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your water heater is in, or select a device, a specific entity, a floor, or a label.
5. From the triggers shown for that target, select **Water heater target temperature crossed threshold**.
6. Under **Threshold type**, choose how the setpoint must cross the threshold.
7. If needed, select a fixed number or a supported temperature entity for the threshold.
8. Under **Unit**, select the temperature unit to use for the comparison when you enter a number.
9. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
10. Under **For at least**, enter how long the water heater must stay beyond the threshold before the trigger fires.
11. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which threshold crossings fire the trigger:

    - **Above** (exclusive): Fires when the setpoint crosses to strictly above the threshold. A setpoint equal to the threshold does not trigger a crossing.
    - **Below** (exclusive): Fires when the setpoint crosses to strictly below the threshold. A setpoint equal to the threshold does not trigger a crossing.
    - **In range** (exclusive): Fires when the setpoint crosses into the range. A setpoint equal to either bound is not considered inside the range.
    - **Outside range** (inclusive): Fires when the setpoint crosses out of the range. A setpoint equal to either bound is considered outside the range.

    You can use a fixed number or select a temperature sensor, a temperature number entity, or a [number helper](/integrations/input_number/) as the threshold.
Unit:
  description: The temperature unit to use for threshold comparison. Accepts `°C` or `°F`. Required when using numerical thresholds (not required when using entity references). Default is `°C`.
Trigger when:
  description: |
    When multiple water heaters are targeted, controls when the trigger fires:

    - **Each** (default): Fire every time any targeted water heater crosses the threshold.
    - **First**: Fire only on the first threshold crossing.
    - **All**: Fire only after all targeted water heaters cross the threshold.
For at least:
  description: How long the setpoint must stay beyond the threshold before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Water heater target temperature crossed threshold** is referred to as `water_heater.target_temperature_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: water_heater.target_temperature_crossed_threshold
  target:
    entity_id: water_heater.utility_room
  options:
    threshold:
      type: above
      value:
        number: 55
        unit_of_measurement: "°C"
{% endexample %}

This fires when the target temperature of `water_heater.utility_room` crosses above 55°C.

To wait for a sustained change across multiple water heaters:

{% example %}
trigger: |
  trigger: water_heater.target_temperature_crossed_threshold
  target:
    label_id: upstairs_water_heaters
  options:
    threshold:
      type: below
      value:
        number: 48
        unit_of_measurement: "°C"
    behavior: last
    for: "00:10:00"
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines when the trigger should fire:

    - `type: above`: Fires when the setpoint crosses to strictly above `value`.
    - `type: below`: Fires when the setpoint crosses to strictly below `value`.
    - `type: between`: Fires when the setpoint crosses into the range between `value_min` and `value_max`.
    - `type: outside`: Fires when the setpoint crosses out of the range and reaches `value_min` or below, or `value_max` or above.

    For `type: above` and `type: below`, use `value` with either `number` and `unit_of_measurement`, or `entity`. For `type: between` and `type: outside`, use `value_min` and `value_max`, each with either `number` and `unit_of_measurement`, or `entity`.
  required: true
  type: map
behavior:
  description: |
    When multiple water heaters are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI): Fires every time any targeted water heater crosses the threshold.
    - `first` (**First** in the UI): Fires only on the first threshold crossing.
    - `last` (**All** in the UI): Fires only after all targeted water heaters cross the threshold.
  required: false
  type: string
  default: any
for:
  description: >
    How long the setpoint must stay beyond the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:10:00` waits 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The target water heater entity must expose a target temperature attribute.
- This trigger watches the target temperature setpoint, not the current measured water temperature.
- It fires only when the setpoint crosses the threshold boundary. It does not keep firing while the setpoint stays beyond the threshold.
- To react to any setpoint change that lands above, below, inside, or outside a range, use [Water heater target temperature changed](/triggers/water_heater.target_temperature_changed/).
- When you use an entity as the threshold, Home Assistant uses that entity's current value when the crossing happens.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: start recirculation when the setpoint crosses above 55°C

When the target temperature is raised above 55°C, start the recirculation pump so hot water is available more quickly.

- **Trigger**: Water heater target temperature crossed threshold
  - **Target**: Utility room water heater
  - **Threshold type**: Above (55°C)
- **Action**: Turn on switch

{% details "YAML example for starting recirculation" %}

{% example %}
automation: |
  alias: "Start recirculation after a higher setpoint"
  triggers:
    - trigger: water_heater.target_temperature_crossed_threshold
      target:
        entity_id: water_heater.utility_room
      options:
        threshold:
          type: above
          value:
            number: 55
            unit_of_measurement: "°C"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.hot_water_recirculation
{% endexample %}

{% enddetails %}

### Automation: notify when all targeted water heaters stay below the minimum setpoint

When every targeted water heater has a target temperature below your minimum comfort setting for 10 minutes, send a notification.

- **Trigger**: Water heater target temperature crossed threshold
  - **Target**: Upstairs water heaters
  - **Threshold type**: Below (48°C)
  - **Trigger when**: All
  - **For at least**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low setpoint warning" %}

{% example %}
automation: |
  alias: "Warn when all water heaters are set too low"
  triggers:
    - trigger: water_heater.target_temperature_crossed_threshold
      target:
        label_id: upstairs_water_heaters
      options:
        threshold:
          type: below
          value:
            number: 48
            unit_of_measurement: "°C"
        behavior: last
        for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "All targeted water heaters have stayed below 48°C for 10 minutes."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
