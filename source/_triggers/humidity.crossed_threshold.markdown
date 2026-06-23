---
title: "Relative humidity crossed threshold"
trigger: humidity.crossed_threshold
domain: humidity
description: "Triggers after one or more relative humidity readings cross a threshold."
related_triggers:
  - humidity.changed
---

The **Relative humidity crossed threshold** trigger fires when a humidity reading crosses into a zone you define. A bathroom sensor crossing above 70% after a shower, a basement sensor dipping below 30% in a dry winter, a reading entering a target comfort range, or a reading escaping that range are all supported.

Use **Relative humidity crossed threshold** to automate ventilation when the air becomes too humid, alert you when conditions in a sensitive room drift out of range, or coordinate devices that respond to specific humidity levels.

When you target more than one entity, the trigger's **Trigger when** option controls when it fires.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Relative humidity crossed threshold"
   sensor="humidity sensor"
   areas="bathroom or basement"
   unit_phrase_ui="a fixed percentage (0–100%)" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed percentage (0–100%)" %}

{% include triggers/yaml_header.md %}

In YAML, **Relative humidity crossed threshold** is referred to as `humidity.crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: humidity.crossed_threshold
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: between
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

This fires whenever the bedroom humidity sensor enters the comfort range (40% to 60%).

To fire when the reading leaves a comfort range (escapes above 60% or below 40%):

{% example %}
trigger: |
  trigger: humidity.crossed_threshold
  target:
    entity_id:
      - sensor.bedroom_humidity
      - sensor.bathroom_humidity
  options:
    threshold:
      type: outside
      value_min:
        number: 40
      value_max:
        number: 60
    behavior: each
{% endexample %}

This fires whenever any of the humidity sensors crosses outside the comfort range.

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: humidity.crossed_threshold
  target:
    label_id: humidity_sensors
  options:
    threshold:
      type: above
      value:
        entity: input_number.humidity_alert_threshold
    behavior: first
{% endexample %}

This fires when the first humidity sensor with the `humidity_sensors` label crosses above the threshold set in the number helper.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal percentage 0–100"
   example_value="70" %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- **Above** and **Below** fire on the crossing moment only. Once the reading is above the threshold, the trigger does not fire again until the reading dips back below it and then crosses above again.
- **In range** (`between`) fires when the reading moves from outside the bounds into the bounds. **Outside range** (`outside`) fires when the reading moves from inside the bounds past either bound.
- A comfortable indoor humidity range is typically 40% to 60%. Use **Outside range** with those bounds to fire the moment conditions drift out of that comfort zone.
- Pair this trigger with [Relative humidity changed](/triggers/humidity.changed/) if you also want to react to smaller fluctuations between crossings.
- Pair this trigger with [Relative humidity](/conditions/humidity.is_value/) in follow-up conditions to double-check the final state.
- The trigger works with climate entities, humidifier entities, weather entities, and sensors with the humidity device class.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the bathroom fan when it gets too humid

After a shower, bathroom humidity can climb fast. This automation turns on the bathroom fan the moment humidity crosses 70%.

- **Trigger**: Relative humidity crossed threshold
  - **Target**: Bathroom humidity sensor
  - **Threshold type**: Above 70%
  - **Trigger when**: Each
- **Action**: Turn on fan
  - **Target**: fan.bathroom

{% details "YAML example for bathroom humidity ventilation" %}

{% example %}
automation: |
  alias: "Ventilate bathroom on high humidity"
  triggers:
    - trigger: humidity.crossed_threshold
      target:
        entity_id: sensor.bathroom_humidity
      options:
        threshold:
          type: above
          value:
            number: 70
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bathroom
{% endexample %}

{% enddetails %}

### Automation: alert when basement humidity goes out of range

Keep your basement at a healthy humidity level by sending a notification whenever the sensor crosses a level that may indicate a moisture problem.

- **Trigger**: Relative humidity crossed threshold
  - **Target**: Basement humidity sensors
  - **Threshold type**: Above 60%
  - **Trigger when**: Each
  - **For at least**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a basement humidity alert" %}

{% example %}
automation: |
  alias: "Alert on basement humidity"
  triggers:
    - trigger: humidity.crossed_threshold
      target:
        area_id: basement
      options:
        threshold:
          type: above
          value:
            number: 60
        behavior: each
        for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Basement humidity crossed 60%."
{% endexample %}

{% enddetails %}

### Automation: trigger humidifier based on adjustable comfort level

Trigger the humidifier when humidity crosses below your personal comfort threshold. Use a number helper as the threshold so you can easily adjust it through the UI without editing the automation.

- **Trigger**: Relative humidity crossed threshold
  - **Target**: Bedroom humidity sensor
  - **Threshold type**: Below (entity: comfort humidity threshold)
- **Action**: Turn on switch
  - **Target**: switch.bedroom_humidifier

{% details "YAML example for using a number helper as threshold" %}

{% example %}
automation: |
  alias: "Turn on humidifier when crossing below comfort threshold"
  triggers:
    - trigger: humidity.crossed_threshold
      target:
        entity_id: sensor.bedroom_humidity
      options:
        threshold:
          type: below
          value:
            entity: input_number.comfort_humidity_threshold
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.bedroom_humidifier
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
