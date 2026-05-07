---
title: "Temperature changed"
trigger: temperature.changed
domain: temperature
description: "Triggers after one or more temperature readings change."
related_triggers:
  - temperature.crossed_threshold
related_conditions:
  - temperature.is_value
---

The **Temperature changed** trigger fires after a temperature reading changes. Temperature shifts gradually as heating or cooling systems cycle, rises when the sun heats a room in the afternoon, or drops overnight. Use the threshold type to filter which changes matter to your automation.

Use **Temperature changed** to log temperature trends, trigger heating or cooling when the temperature in a room changes noticeably, or alert you when a sensor reading shifts in a way that might signal a problem.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Temperature changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your temperature sensor is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Temperature changed**.
6. Under **Threshold type**, configure what kind of change fires the trigger:
   - Select **Any change** to fire on any change, regardless of direction or new value.
   - Select **Above** or **Below** and enter a value to fire only when the new reading is above or below that value.
   - Select **In range** and enter a lower and upper bound to fire only when the new reading falls inside the range.
   - Select **Outside range** and enter a lower and upper bound to fire only when the new reading is outside the range.
   - For each option, you can enter a fixed temperature or pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Unit of measurement**, select the temperature unit (°C or °F) to use for the threshold comparison.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger:

    - **Any change**: fire on any change, regardless of direction or new value.
    - **Above** or **Below**: enter a value to fire only when the new reading is above or below that value.
    - **In range**: enter a lower and upper bound to fire only when the new reading falls between them.
    - **Outside range**: enter a lower and upper bound to fire only when the new reading is below the lower bound or above the upper bound.

    For each mode you can enter a fixed temperature or reference a sensor entity or [number helper](/integrations/input_number/) entity.
  required: true
Unit of measurement:
  description: The temperature unit (°C or °F) to use for threshold comparison. All temperature values (from sensors and thresholds) are converted to this unit.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Temperature changed** is referred to as `temperature.changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: temperature.changed
  target:
    entity_id: sensor.living_room_temperature
  options:
    threshold:
      type: above
      value:
        number: 20
    unit: "°C"
{% endexample %}

This fires whenever the living room temperature sensor reading moves to a value above 20°C. To fire on any change regardless of direction or value, use `type: any` and omit `value`.

To fire only when the new reading is within a comfort range:

{% example %}
trigger: |
  trigger: temperature.changed
  target:
    entity_id: sensor.living_room_temperature
  options:
    threshold:
      type: between
      value_min:
        number: 20
      value_max:
        number: 22
    unit: "°C"
{% endexample %}

To fire only when the new reading is outside a comfort range:

{% example %}
trigger: |
  trigger: temperature.changed
  target:
    entity_id: sensor.living_room_temperature
  options:
    threshold:
      type: outside
      value_min:
        number: 20
      value_max:
        number: 22
    unit: "°C"
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    A mapping that defines which kind of change fires the trigger. Set `type` to one of `any`, `above`, `below`, `between`, or `outside`. For `above` and `below`, provide `value` with a `number` key or an `entity` key. For `between` and `outside`, provide `value_min` and `value_max`, each with a `number` key or an `entity` key. For `any`, no additional keys are needed.
  required: true
  type: map
unit:
  description: >
    The temperature unit (°C or °F) to use for threshold comparison. Accepts `°C` or `°F`.
  required: true
  type: string
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- To react only when temperature first crosses a specific level, use [Temperature crossed threshold](/triggers/temperature.crossed_threshold/) instead.
- The trigger works with [climate](/integrations/climate/) entities, [water heater](/integrations/water_heater/) entities, [weather](/integrations/weather/) entities, and sensors with the temperature device class.
- All temperature values are automatically converted to the unit you specify. For example, if your sensor reports in Fahrenheit but you configure the trigger in Celsius, the conversion happens automatically.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on heating when it gets cold

When the living room temperature drops below 18°C, this automation turns on the heating to keep the room comfortable.

- **Trigger**: Temperature changed
- **Target**: Living room temperature sensor
- **Threshold type**: Below 18°C
- **Action**: Climate: Set HVAC mode

{% details "YAML example for turning on heating when cold" %}

{% example %}
automation: |
  alias: "Turn on heating when living room is cold"
  triggers:
    - trigger: temperature.changed
      target:
        entity_id: sensor.living_room_temperature
      options:
        threshold:
          type: below
          value:
            number: 18
        unit: "°C"
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.living_room
      data:
        hvac_mode: heat
{% endexample %}

{% enddetails %}

### Automation: alert when temperature leaves comfort range

This automation sends a notification when any room temperature drifts outside the comfort range of 20 to 22°C, helping you maintain consistent conditions throughout your home.

- **Trigger**: Temperature changed
- **Target**: All temperature sensors (label)
- **Threshold type**: Outside range (20-22°C)
- **Action**: Notify: Send notification

{% details "YAML example for comfort range alert" %}

{% example %}
automation: |
  alias: "Alert when temperature leaves comfort range"
  triggers:
    - trigger: temperature.changed
      target:
        label_id: temperature_sensors
      options:
        threshold:
          type: outside
          value_min:
            number: 20
          value_max:
            number: 22
        unit: "°C"
  actions:
    - action: notify.mobile_app
      data:
        message: >
          Temperature in {{ trigger.to_state.name }} is {{
          trigger.to_state.state }}°C
{% endexample %}

{% enddetails %}

### Automation: alert when temperature changes above comfort level

Send a notification whenever the bedroom temperature changes to a level above your personal comfort threshold. Use a number helper as the threshold so you can easily adjust your preferred temperature through the UI.

- **Trigger**: Temperature changed
- **Target**: Bedroom temperature sensor
- **Threshold type**: Above (entity: comfort temperature threshold)
- **Action**: Notify: Send notification

{% details "YAML example for using a number helper as threshold" %}

{% example %}
automation: |
  alias: "Alert when temperature changes above comfort level"
  triggers:
    - trigger: temperature.changed
      target:
        entity_id: sensor.bedroom_temperature
      options:
        threshold:
          type: above
          value:
            entity: input_number.comfort_temperature_threshold
        unit: "°C"
  actions:
    - action: notify.mobile_app
      data:
        message: "Bedroom temperature is now {{ trigger.to_state.state }}°C, above your comfort threshold."
{% endexample %}

{% enddetails %}
