---
title: "Temperature crossed threshold"
trigger: temperature.crossed_threshold
domain: temperature
description: "Triggers after one or more temperature readings cross a threshold."
related_triggers:
  - temperature.changed
---

The **Temperature crossed threshold** trigger fires when a temperature reading crosses into a zone you define. A bedroom sensor crossing below 18°C on a cold night, a living room sensor climbing above 24°C in summer, a reading entering a target comfort range, or a reading escaping that range are all supported.

Use **Temperature crossed threshold** to automate heating or cooling when the temperature becomes uncomfortable, alert you when conditions in a room drift out of range, or coordinate devices that respond to specific temperature levels.

When you target more than one entity, the trigger's **Trigger when** option controls when it fires.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Temperature crossed threshold"
   sensor="temperature sensor"
   areas="bedroom or living room"
   unit_phrase_ui="a fixed temperature"
   has_unit="true"
   unit_label="temperature unit"
   unit_options="°C or °F" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed temperature"
   has_unit="true"
   unit_label="temperature unit"
   unit_options_code="`°C` or `°F`"
   unit_default="°C" %}

{% include triggers/yaml_header.md %}

In YAML, **Temperature crossed threshold** is referred to as `temperature.crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: temperature.crossed_threshold
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

This fires whenever the living room temperature sensor enters the comfort range (20 to 22°C).

To fire when the reading leaves a comfort range (escapes above 22°C or below 20°C):

{% example %}
trigger: |
  trigger: temperature.crossed_threshold
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

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="temperature unit"
   unit_options_code="`°C` or `°F`"
   unit_default="°C"
   unit_example_entity="input_number.max_comfort_temperature"
   unit_example_value="18" %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- **Above** and **Below** fire on the crossing moment only. Once the reading is above the threshold, the trigger does not fire again until the reading dips back below it and then crosses above again.
- **In range** (`between`) fires when the reading moves from outside the bounds into the bounds. **Outside range** (`outside`) fires when the reading moves from inside the bounds past either bound.
- A comfortable indoor temperature range is typically 20 to 22°C (68 to 72°F). Use **Outside range** with those bounds to fire the moment conditions drift out of that comfort zone.
- Pair this trigger with [Temperature changed](/triggers/temperature.changed/) if you also want to react to smaller fluctuations between crossings.
- The trigger works with [climate](/integrations/climate/) entities, [water heater](/integrations/water_heater/) entities, [weather](/integrations/weather/) entities, and sensors with the temperature device class.
- Climate, water heater, and weather entities that don't report a current temperature attribute are automatically excluded from the trigger. Only entities with a valid temperature value can fire the trigger.
- All temperature values are automatically converted to the unit you specify. For example, if your sensor reports in Fahrenheit but you configure the trigger in Celsius, the conversion happens automatically.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off climate when temperature enters comfort range

This automation turns off the living room climate system the moment the temperature crosses into the comfort range (20 to 22°C), saving energy once comfortable conditions are achieved.

- **Trigger**: Temperature crossed threshold
  - **Target**: Living room temperature sensor
  - **Threshold type**: In range (20-22°C)
- **Action**: Set thermostat HVAC mode (state: off)

{% details "YAML example for turning off climate when comfortable" %}

{% example %}
automation: |
  alias: "Turn off climate when living room is comfortable"
  triggers:
    - trigger: temperature.crossed_threshold
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
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.living_room
      data:
        hvac_mode: "off"
{% endexample %}

{% enddetails %}

### Automation: alert when bedroom temperature enters comfort range

After opening windows to cool down a stuffy bedroom, this automation alerts you the moment the temperature enters your preferred comfort range so you can close the windows.

- **Trigger**: Temperature crossed threshold
  - **Target**: Bedroom temperature sensor
  - **Threshold type**: In range (20-22°C)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for comfort range entry alert" %}

{% example %}
automation: |
  alias: "Alert when bedroom temperature is comfortable"
  triggers:
    - trigger: temperature.crossed_threshold
      target:
        entity_id: sensor.bedroom_temperature
      options:
        threshold:
          type: between
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
        title: "Temperature Alert"
        message: >-
          Bedroom temperature reached {{ trigger.to_state.state }}°C.
          You can now close the windows.
{% endexample %}

{% enddetails %}

### Automation: prevent false triggers with a delay

To avoid false triggers from brief temperature fluctuations when opening a door or window, add a **For at least** delay. This automation only fires after the temperature has been below 18°C for 5 minutes.

- **Trigger**: Temperature crossed threshold
  - **Target**: Living room temperature sensor
  - **Threshold type**: Below (18°C)
  - **For at least**: 5 minutes
- **Action**: Set thermostat HVAC mode (state: heat)

{% details "YAML example with delay to prevent false triggers" %}

{% example %}
automation: |
  alias: "Turn on heating when consistently cold"
  triggers:
    - trigger: temperature.crossed_threshold
      target:
        entity_id: sensor.living_room_temperature
      options:
        threshold:
          type: below
          value:
            number: 18
            unit_of_measurement: "°C"
        for: "00:05:00"
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.living_room
      data:
        hvac_mode: heat
{% endexample %}

{% enddetails %}

### Automation: trigger heating based on adjustable comfort temperature

Trigger the heating when temperature crosses below your personal comfort threshold. Use a number helper as the threshold so you can easily adjust it through the UI without editing the automation.

- **Trigger**: Temperature crossed threshold
  - **Target**: Living room temperature sensor
  - **Threshold type**: Below (entity: comfort temperature threshold)
- **Action**: Set thermostat HVAC mode (state: heat)

{% details "YAML example for using a number helper as threshold" %}

{% example %}
automation: |
  alias: "Turn on heating when crossing below comfort threshold"
  triggers:
    - trigger: temperature.crossed_threshold
      target:
        entity_id: sensor.living_room_temperature
      options:
        threshold:
          type: below
          value:
            entity: input_number.comfort_temperature_threshold
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.living_room
      data:
        hvac_mode: heat
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}
{% include triggers/related.md %}
