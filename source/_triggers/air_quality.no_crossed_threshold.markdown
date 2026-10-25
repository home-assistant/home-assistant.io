---
title: "Nitrogen monoxide level crossed threshold"
trigger: air_quality.no_crossed_threshold
domain: air_quality
description: "Triggers when one or more nitrogen monoxide levels cross a threshold."
related_triggers:
  - air_quality.no_changed
---

The **Nitrogen monoxide level crossed threshold** trigger fires when the nitrogen monoxide (NO) reading on one or more air quality sensors crosses a specific level. Nitrogen monoxide is produced by combustion engines, gas stoves, and industrial processes. It quickly converts to nitrogen dioxide (NO2) in the presence of oxygen, meaning a rising NO reading is often an early warning of broader air quality issues.

Think about your garage after starting a car on a cold morning. This trigger lets you turn on the exhaust fan the second NO crosses a safe limit, clearing combustion fumes before they drift into the rest of the house. You also get a notification on your phone so you know ventilation is running, giving you confidence that the air indoors stays healthy even when engines or gas appliances are in use.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Nitrogen monoxide level crossed threshold"
   sensor="nitrogen monoxide sensor"
   areas="garage or kitchen"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb or μg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb` or `μg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.no_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.no_crossed_threshold
  target:
    entity_id: sensor.garage_no
  options:
    threshold:
      type: above
      value:
        number: 50
        unit_of_measurement: "ppb"
{% endexample %}

This fires when the garage NO sensor reading rises above 50 ppb.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb` or `μg/m³`"
   unit_default="ppb"
   unit_example_entity="input_number.no_alert_level"
   unit_example_value="40" %}

{% include triggers/targets.md entity_type="nitrogen monoxide sensor" example="sensor.living_room_nitrogen_monoxide" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- Nitrogen monoxide quickly converts to nitrogen dioxide (NO2) in the presence of oxygen. Monitoring both pollutants together gives a more complete picture of combustion-related air quality.
- Pair this trigger with [Nitrogen monoxide level changed](/triggers/air_quality.no_changed/) if you want to react to every change of the level instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: clear the garage after starting a car

Cold starts produce a burst of combustion fumes that linger in an enclosed garage. This automation turns on the exhaust fan the moment NO rises above 50 ppb, pulling those fumes out before they seep into the house through a connecting door.

- **Trigger**: Nitrogen monoxide level crossed threshold
  - **Target**: Garage NO sensor
  - **Threshold type**: Above 50 ppb
  - **Trigger when**: Each
- **Action**: Turn on fan (garage exhaust)

{% details "YAML example for garage NO ventilation" %}

{% example %}
automation: |
  alias: "Garage exhaust on high NO"
  triggers:
    - trigger: air_quality.no_crossed_threshold
      target:
        entity_id: sensor.garage_no
      options:
        threshold:
          type: above
          value:
            number: 50
            unit_of_measurement: "ppb"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.garage_exhaust
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
