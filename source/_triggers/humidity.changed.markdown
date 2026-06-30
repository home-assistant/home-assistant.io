---
title: "Relative humidity changed"
trigger: humidity.changed
domain: humidity
description: "Triggers when one or more relative humidity values change."
related_triggers:
  - humidity.crossed_threshold
---

The **Relative humidity changed** trigger fires after a humidity reading changes. Humidity creeps up slowly in a bathroom after a shower, climbs in a greenhouse overnight, or drops when the sun beats down on a dry afternoon. Use the threshold type to filter which changes matter to your automation.

The threshold type controls where the new reading must land for the trigger to fire. You can require the new value to be above a level, below a level, within a range, or outside a range. You can also select **Any change** to fire on any change at all.

Use **Relative humidity changed** to log humidity trends, trigger a fan when the air in a room becomes noticeably more humid, or alert you when a sensor reading shifts in a way that might signal a problem.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Relative humidity changed"
   sensor="humidity sensor"
   areas="bathroom or bedroom"
   unit_phrase_ui="a fixed percentage (0–100%)" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed percentage (0–100%)" %}

{% include triggers/yaml_header.md %}

In YAML, **Relative humidity changed** is referred to as `humidity.changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: humidity.changed
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: above
      value:
        number: 5
{% endexample %}

This fires whenever the bedroom humidity sensor reading moves to a value above 5%. To fire on any change regardless of direction or value, use `type: any` and omit `value`.

To fire only when the new reading is within a comfort range:

{% example %}
trigger: |
  trigger: humidity.changed
  target:
    entity_id:
      - sensor.bedroom_humidity
      - sensor.bathroom_humidity
  options:
    threshold:
      type: between
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

This fires whenever any of the humidity sensors changes to a value within the comfort range (40-60%).

To fire only when the new reading is outside a comfort range:

{% example %}
trigger: |
  trigger: humidity.changed
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: outside
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
trigger: |
  trigger: humidity.changed
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: above
      value:
        entity: input_number.humidity_alert_threshold
{% endexample %}

To monitor all humidity sensors in an area and trigger when any changes outside the comfort range:

{% example %}
trigger: |
  trigger: humidity.changed
  target:
    area_id: basement
  options:
    threshold:
      type: outside
      value_min:
        number: 40
      value_max:
        number: 60
{% endexample %}

This fires whenever any humidity sensor in the basement area changes to a value outside the 40-60% range.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal percentage 0–100" %}

{% include triggers/targets.md %}

## Good to know

- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- To react only when humidity first crosses a specific level, use [Relative humidity crossed threshold](/triggers/humidity.crossed_threshold/) instead.
- Pair this trigger with [Relative humidity](/conditions/humidity.is_value/) in follow-up conditions to verify the reading meets a threshold before continuing the automation.
- The trigger works with climate entities, humidifier entities, weather entities, and sensors with the humidity device class.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: run the bathroom fan after a shower

After a shower, humidity in a bathroom can spike quickly. This automation turns on the bathroom fan whenever either bathroom humidity sensor rises above 70%, keeping the room from getting damp.

- **Trigger**: Relative humidity changed
  - **Target**: Bathroom and shower humidity sensors
  - **Threshold type**: Above 70%
- **Action**: Turn on fan
  - **Target**: fan.bathroom

{% details "YAML example for a post-shower bathroom fan" %}

{% example %}
automation: |
  alias: "Run bathroom fan on humidity spike"
  triggers:
    - trigger: humidity.changed
      target:
        entity_id:
          - sensor.bathroom_humidity
          - sensor.shower_humidity
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

### Automation: log humidity changes in the greenhouse

Track how much the humidity in your greenhouse shifts throughout the day by sending a notification whenever the reading changes.

- **Trigger**: Relative humidity changed
  - **Target**: Greenhouse humidity sensor
  - **Threshold type**: Any change
- **Action**: Send a notification
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for greenhouse humidity logging" %}

{% example %}
automation: |
  alias: "Log greenhouse humidity changes"
  triggers:
    - trigger: humidity.changed
      target:
        entity_id: sensor.greenhouse_humidity
      options:
        threshold:
          type: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Greenhouse humidity changed significantly."
{% endexample %}

{% enddetails %}

### Automation: alert when humidity changes above comfort level

Send a notification whenever the bedroom humidity changes to a level above your personal comfort threshold. Use a number helper as the threshold so you can easily adjust your preferred level through the UI.

- **Trigger**: Relative humidity changed
  - **Target**: Bedroom humidity sensor
  - **Threshold type**: Above (entity: comfort humidity threshold)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for using a number helper as threshold" %}

{% example %}
automation: |
  alias: "Alert when humidity changes above comfort level"
  triggers:
    - trigger: humidity.changed
      target:
        entity_id: sensor.bedroom_humidity
      options:
        threshold:
          type: above
          value:
            entity: input_number.comfort_humidity_threshold
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >-
          Bedroom humidity is now {{ trigger.to_state.state }}%, above
          your comfort threshold.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
