---
title: "Temperature changed"
trigger: temperature.changed
domain: temperature
description: "Triggers when one or more temperature readings change."
related_triggers:
  - temperature.crossed_threshold
---

The **Temperature changed** trigger fires after a temperature reading changes. Temperature shifts gradually as heating or cooling systems cycle, rises when the sun heats a room in the afternoon, or drops overnight. Use the threshold type to filter which changes matter to your automation.

Use **Temperature changed** to log temperature trends, trigger heating or cooling when the temperature in a room changes noticeably, or alert you when a sensor reading shifts in a way that might signal a problem.

## Prerequisites

- Use a target that provides a current temperature. Climate, water heater, and weather entities must expose a current temperature attribute. Entities without a valid temperature value are excluded automatically.
- You can also use a sensor with the temperature device class.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Temperature changed"
   sensor="temperature sensor"
   areas="bedroom or living room"
   unit_phrase_ui="a fixed temperature"
   has_unit="true"
   unit_label="temperature unit"
   unit_options="°C or °F" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed temperature"
   has_unit="true"
   unit_label="temperature unit"
   unit_options_code="`°C` or `°F`"
   unit_default="°C" %}

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

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="temperature unit"
   unit_options_code="`°C` or `°F`"
   unit_default="°C"
   unit_example_entity="input_number.comfort_temperature_min"
   unit_example_value="24" %}

{% include triggers/targets.md %}

## Good to know

- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- To react only when temperature first crosses a specific level, use [Temperature crossed threshold](/triggers/temperature.crossed_threshold/) instead.
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
