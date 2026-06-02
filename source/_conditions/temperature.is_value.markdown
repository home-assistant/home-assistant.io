---
title: "Temperature value"
condition: temperature.is_value
domain: temperature
description: "Tests if a temperature value is above a threshold, below a threshold, or in a range of values."
---

The **Temperature value** condition passes when a temperature reading meets a threshold you define. You can check that the temperature is above, below, or within a specific range. The condition works with temperature sensors, climate devices, water heaters, and weather entities. Use it to run an automation only when the bedroom is too warm, or only when the temperature is low enough to need heating.

When you target more than one entity, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted entity to meet the threshold, or demand that all of them do.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Temperature value"
   sensor="temperature sensor"
   areas="bedroom or living room"
   reading="temperature"
   value_long="a fixed temperature directly, for example `20` for 20°C"
   has_unit="true" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   reading="temperature"
   value_short="a fixed temperature value"
   has_unit="true" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `temperature.is_value`. A basic example looks like this:

{% example %}
condition: |
  condition: temperature.is_value
  target:
    entity_id: sensor.living_room_temperature
  options:
    threshold:
      type: above
      value:
        number: 20
        unit_of_measurement: "°C"
    behavior: any
{% endexample %}

This passes when the living room temperature sensor reads above 20°C.

To check that temperature stays below a certain level:

{% example %}
condition: |
  condition: temperature.is_value
  target:
    entity_id: sensor.living_room_temperature
  options:
    threshold:
      type: below
      value:
        number: 24
        unit_of_measurement: "°C"
    behavior: any
{% endexample %}

This passes when the living room temperature sensor reads below 24°C.

To check that temperature stays within a comfortable range:

{% example %}
condition: |
  condition: temperature.is_value
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
    behavior: any
{% endexample %}

This passes when the living room temperature sensor reads between 20 and 22°C.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   reading="temperature"
   has_unit="true"
   threshold_required="true" %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The condition works with temperature sensors, [climate](/integrations/climate/) entities (using the current temperature reading), [water heater](/integrations/water_heater/) entities (using the current temperature reading), and [weather](/integrations/weather/) entities.
- Climate, water heater, and weather entities that don't report a current temperature attribute are automatically excluded from evaluation. Only entities with a valid temperature value are considered.
- Entities that have an `unavailable` or `unknown` state are skipped for **Any** and fail for **All**.
- This condition checks the entity's current temperature reading, not its target setpoint. To check a climate device's target setpoint instead, use the climate target temperature condition.
- When you use a sensor as a dynamic threshold, its value is read at the moment the condition runs. The threshold is not continuously tracked; it is re-evaluated each time the automation fires.
- All temperature values are automatically converted to the unit you specify. For example, if your sensor reports in Fahrenheit but you configure the condition in Celsius, the conversion happens automatically.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: cool only when temperature is high

This automation runs a fan only when the bedroom temperature is above 24°C, helping you save energy by avoiding unnecessary cooling.

- **Trigger**: State: Fan is off
- **Condition**: Temperature (above 24°C)
  - **Target**: Bedroom temperature sensor
  - **Condition passes if**: Any
- **Action**: Fan: Turn on

{% details "YAML example for cooling when warm" %}

{% example %}
automation: |
  alias: "Run fan when bedroom is warm"
  triggers:
    - trigger: state
      entity_id: fan.bedroom_fan
      to: "off"
  conditions:
    - condition: temperature.is_value
      target:
        entity_id: sensor.bedroom_temperature
      options:
        threshold:
          type: above
          value:
            number: 24
            unit_of_measurement: "°C"
        behavior: any
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_fan
{% endexample %}

{% enddetails %}

### Automation: alert when temperature is outside comfort range

This automation sends a notification only when the living room temperature is outside the comfort range of 20 to 22°C, helping you maintain consistent conditions.

- **Trigger**: Time pattern (every hour)
- **Condition**: Temperature value (outside 20-22°C range)
  - **Target**: Living room temperature sensor
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for temperature out of range alert" %}

{% example %}
automation: |
  alias: "Alert when temperature is uncomfortable"
  triggers:
    - trigger: time_pattern
      hours: "/1"
  conditions:
    - condition: temperature.is_value
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
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Living room temperature is {{ states('sensor.living_room_temperature') }}°C.
          Comfortable range is 20-22°C.
{% endexample %}

{% enddetails %}

### Automation: turn off climate when temperature is comfortable

When the bedroom temperature is already within your comfort range, this automation turns off the climate system to save energy. Use number helpers to define your preferred temperature range so you can easily adjust it without editing the automation.

- **Trigger**: Time pattern (every 30 minutes)
- **Condition**: Temperature (in range, using number helpers)
  - **Target**: Bedroom temperature sensor
  - **Condition passes if**: Any
- **Action**: Set thermostat HVAC mode (state: off)

{% details "YAML example for turning off climate when comfortable" %}

{% example %}
automation: |
  alias: "Turn off climate when bedroom is comfortable"
  triggers:
    - trigger: time_pattern
      minutes: "/30"
  conditions:
    - condition: temperature.is_value
      target:
        entity_id: sensor.bedroom_temperature
      options:
        threshold:
          type: between
          value_min:
            entity: input_number.comfort_temperature_min
          value_max:
            entity: input_number.comfort_temperature_max
        behavior: any
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.bedroom
      data:
        hvac_mode: "off"
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}
{% include conditions/related.md %}
