---
title: "Water heater target temperature changed"
trigger: water_heater.target_temperature_changed
domain: water_heater
description: "Triggers when the temperature setpoint of one or more water heaters changes."
related_triggers:
  - water_heater.target_temperature_crossed_threshold
  - water_heater.operation_mode_changed
---

The **Water heater target temperature changed** trigger fires when the target temperature setting of a water heater {% term entity %} changes. The target temperature is the setpoint you want the water heater to maintain, not the current measured water temperature. Use this trigger when you want to react to any meaningful setpoint change, like sending an alert when someone raises the target temperature higher than usual.

Use the threshold type to decide which changes matter. You can fire on any change, only when the new setpoint is above or below a value, or only when it lands inside or outside a range.

{% include triggers/ui_header.md %}

To use **Water heater target temperature changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your water heater is in, or select a device, a specific entity, a floor, or a label.
5. From the triggers shown for that target, select **Water heater target temperature changed**.
6. Under **Threshold type**, choose which kind of setpoint change should fire the trigger:
   - Select **Any change** to fire on any setpoint change.
   - Select **Above** or **Below** to fire only when the new setpoint lands above or below a value.
   - Select **In range** or **Outside range** to fire only when the new setpoint lands inside or outside a range.
   - You can use a fixed number or select a temperature sensor, a temperature number entity, or a [number helper](/integrations/input_number/) as the threshold.
   - If you need a helper, create the {% term helper %} separately before using it here.
7. Under **Unit**, select the temperature unit to use for the comparison when you enter a number.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which setpoint changes fire the trigger:

    - **Any change**: Fires on any setpoint change.
    - **Above** or **Below** (exclusive): Fires only when the new setpoint is strictly above or below the threshold. A setpoint equal to the threshold does not fire the trigger.
    - **In range** (exclusive): Fires only when the new setpoint is strictly between the two bounds. A setpoint equal to either bound does not fire the trigger.
    - **Outside range** (inclusive): Fires when the new setpoint is at or below the lower bound, or at or above the upper bound. A setpoint equal to either bound fires the trigger.

    You can use a fixed number or select a temperature sensor, a temperature number entity, or a [number helper](/integrations/input_number/) as the threshold.
Unit:
  description: The temperature unit to use for threshold comparison. Accepts `°C` or `°F`. Required when using numerical thresholds (not required when using entity references). Default is `°C`.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Water heater target temperature changed** is referred to as `water_heater.target_temperature_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: water_heater.target_temperature_changed
  target:
    entity_id: water_heater.utility_room
  options:
    threshold:
      type: above
      value:
        number: 55
        unit_of_measurement: "°C"
{% endexample %}

This fires when the target temperature of `water_heater.utility_room` changes to a value above 55°C.

To fire when the setpoint lands outside a preferred range:

{% example %}
trigger: |
  trigger: water_heater.target_temperature_changed
  target:
    entity_id: water_heater.utility_room
  options:
    threshold:
      type: outside
      value_min:
        entity: input_number.water_heater_min_target
      value_max:
        entity: input_number.water_heater_max_target
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: |
    A mapping that defines which setpoint changes fire the trigger:

    - `type: any`: Fires on any target temperature change.
    - `type: above` (exclusive): Fires when the new setpoint lands strictly above `value`. A setpoint equal to `value` does not fire the trigger.
    - `type: below` (exclusive): Fires when the new setpoint lands strictly below `value`. A setpoint equal to `value` does not fire the trigger.
    - `type: between` (exclusive): Fires when the new setpoint lands strictly between `value_min` and `value_max`. A setpoint equal to either bound does not fire the trigger.
    - `type: outside` (inclusive): Fires when the new setpoint is at or below `value_min`, or at or above `value_max`. A setpoint equal to either bound fires the trigger.

    For `type: above` and `type: below`, use `value` with either `number` and `unit_of_measurement`, or `entity`. For `type: between` and `type: outside`, use `value_min` and `value_max`, each with either `number` and `unit_of_measurement`, or `entity`.

    The `entity` value can reference an input number, sensor, or number entity. When you use a helper, create the {% term helper %} separately before using it here.
  required: true
  type: map
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The target water heater entity must expose a target temperature attribute.
- This trigger watches the target temperature setpoint, not the current measured water temperature.
- To react only when the setpoint crosses a threshold boundary, use [Water heater target temperature crossed threshold](/triggers/water_heater.target_temperature_crossed_threshold/).
- Threshold entities must provide temperature values. Supported threshold sources are temperature sensors, temperature number entities, and input number helpers.
- When you use an entity as the threshold, Home Assistant uses that entity's current value when the setpoint changes.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when the target temperature is raised above a safe routine

When someone raises the water heater target temperature above your usual daily setting, send a notification so you can double-check the change.

- **Trigger**: Water heater target temperature changed
  - **Target**: Utility room water heater
  - **Threshold type**: Above (55°C)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a high setpoint notification" %}

{% example %}
automation: |
  alias: "Notify when the water heater target temperature is raised"
  triggers:
    - trigger: water_heater.target_temperature_changed
      target:
        entity_id: water_heater.utility_room
      options:
        threshold:
          type: above
          value:
            number: 55
            unit_of_measurement: "°C"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The water heater target temperature is now above 55°C."
{% endexample %}

{% enddetails %}

### Automation: switch to Eco mode when the setpoint returns to the normal range

When the target temperature is changed back into your normal range, switch the water heater back to an energy-saving mode.

- **Trigger**: Water heater target temperature changed
  - **Target**: Utility room water heater
  - **Threshold type**: In range (50-52°C)
- **Action**: Set water heater operation mode

{% details "YAML example for returning to Eco mode" %}

{% example %}
automation: |
  alias: "Return water heater to Eco mode"
  triggers:
    - trigger: water_heater.target_temperature_changed
      target:
        entity_id: water_heater.utility_room
      options:
        threshold:
          type: between
          value_min:
            number: 50
            unit_of_measurement: "°C"
          value_max:
            number: 52
            unit_of_measurement: "°C"
  actions:
    - action: water_heater.set_operation_mode
      target:
        entity_id: water_heater.utility_room
      data:
        operation_mode: eco
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
