---
title: "Temperature changed"
trigger: temperature.changed
domain: temperature
description: "Triggers after one or more temperature readings change."
related_triggers:
  - temperature.crossed_threshold
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
   - For each option, you can enter a fixed temperature, pick a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Unit**, select the temperature unit (°C or °F) to use for the threshold comparison.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    Controls which changes fire the trigger:

    - **Any change**: fires on any change, regardless of direction or new value.
    - **Above** or **Below** (exclusive): fires only when the new reading is strictly above or below the threshold. A reading equal to the threshold does not fire the trigger.
    - **In range** (exclusive): fires only when the new reading is strictly between the two bounds. A reading equal to either bound does not fire the trigger.
    - **Outside range** (inclusive): fires when the new reading is at or below the lower bound, or at or above the upper bound. A reading equal to either bound fires the trigger.

    For each mode you can enter a fixed temperature or reference a sensor entity or a [number helper](/integrations/input_number/) entity.
Unit:
  description: The temperature unit to use for threshold comparison. Accepts `°C` or `°F`. Required when using numerical thresholds (not required when using entity references). Default is `°C`.
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
        unit_of_measurement: "°C"
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
        unit_of_measurement: "°C"
      value_max:
        number: 22
        unit_of_measurement: "°C"
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

    - `type: any`: Fires on any temperature change (no additional keys needed).
    - `type: above` (exclusive): Sets a minimum. Fires when the reading is strictly above `value`. A reading equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: below` (exclusive): Sets a maximum. Fires when the reading is strictly below `value`. A reading equal to `value` does not fire the trigger. Provide `value` with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: between` (exclusive): Defines a range. Fires when the reading is strictly between `value_min` and `value_max`. Readings equal to either bound do not fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).
    - `type: outside` (inclusive): Defines an outside-range. Fires when the reading is at or below `value_min`, or at or above `value_max`. Readings equal to either bound fire the trigger. Provide `value_min` and `value_max`, each with a `number` key (for a literal number) or an `entity` key (for an `input_number`, `number`, or `sensor` entity).

    When using the `number` key, you must also include `unit_of_measurement` to specify the temperature unit (`°C` or `°F`). When using the `entity` key, the unit is taken from the entity itself, or assumed to be the system temperature unit if the entity has no unit.

    For example:

    ```yaml
    threshold:
      type: outside
      value_min:
        entity: input_number.comfort_temperature_min
      value_max:
        number: 24
        unit_of_measurement: °C
    ```

    A `sensor` or `number` entity's current value is used as the threshold, which lets you compare two temperature readings dynamically.
  required: true
  type: map
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- To react only when temperature first crosses a specific level, use [Temperature crossed threshold](/triggers/temperature.crossed_threshold/) instead.
- The trigger works with [climate](/integrations/climate/) entities, [water heater](/integrations/water_heater/) entities, [weather](/integrations/weather/) entities, and sensors with the temperature device class.
- Climate, water heater, and weather entities that don't report a current temperature attribute are automatically excluded from the trigger. Only entities with a valid temperature value can fire the trigger.
- All temperature values are automatically converted to the unit you specify. For example, if your sensor reports in Fahrenheit but you configure the trigger in Celsius, the conversion happens automatically.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on heating or cooling when temperature leaves comfort range

When the living room temperature changes to a value outside the comfort range (20 to 22°C), this automation turns on heating or cooling to restore comfortable conditions.

- **Trigger**: Temperature changed
  - **Target**: Living room temperature sensor
  - **Threshold type**: Outside range (20-22°C)
- **Action**: Set thermostat HVAC mode (state: cool)

{% details "YAML example for climate control when outside comfort range" %}

{% example %}
automation: |
  alias: "Adjust climate when living room is uncomfortable"
  triggers:
    - trigger: temperature.changed
      target:
        entity_id: sensor.living_room_temperature
      options:
        threshold:
          type: outside
          value_min:
            number: 20
            unit_of_measurement: "°C"
          value_max:
            number: 22
            unit_of_measurement: "°C"
  actions:
    - if:
        - condition: template
          value_template: "{{ trigger.to_state.state | float < 20 }}"
      then:
        - action: climate.set_hvac_mode
          target:
            entity_id: climate.living_room
          data:
            hvac_mode: heat
      else:
        - action: climate.set_hvac_mode
          target:
            entity_id: climate.living_room
          data:
            hvac_mode: cool
{% endexample %}

{% enddetails %}

### Automation: alert when temperature leaves comfort range

This automation sends a notification when any room temperature drifts outside the comfort range of 20 to 22°C, helping you maintain consistent conditions throughout your home.

- **Trigger**: Temperature changed
  - **Target**: All temperature sensors (label)
  - **Threshold type**: Outside range (20-22°C)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

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
            unit_of_measurement: "°C"
          value_max:
            number: 22
            unit_of_measurement: "°C"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Temperature in {{ trigger.to_state.name }} is {{ trigger.to_state.state }}°C.
          Comfortable range is 20-22°C.
{% endexample %}

{% enddetails %}

### Automation: alert when temperature enters comfort range

Send a notification whenever the bedroom temperature changes to a level within your personal comfort range. Use number helpers for the range bounds so you can easily adjust your preferred temperatures through the UI.

- **Trigger**: Temperature changed
  - **Target**: Bedroom temperature sensor
  - **Threshold type**: In range (entity: comfort temperature min and max)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for using number helpers as threshold" %}

{% example %}
automation: |
  alias: "Alert when temperature enters comfort range"
  triggers:
    - trigger: temperature.changed
      target:
        entity_id: sensor.bedroom_temperature
      options:
        threshold:
          type: between
          value_min:
            entity: input_number.comfort_temperature_min
          value_max:
            entity: input_number.comfort_temperature_max
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Bedroom temperature is now {{ trigger.to_state.state }}°C, within your comfort range."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}
{% include triggers/related.md %}
