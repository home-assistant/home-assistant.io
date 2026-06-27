---
title: "Relative humidity"
condition: humidity.is_value
domain: humidity
description: "Tests the relative humidity of one or more entities."
---

The **Relative humidity** condition passes when a humidity reading meets a threshold you define. You can check that humidity is above, below, or within a specific range. The condition works with humidity sensors, climate devices, humidifiers, and weather entities. Use it to run an automation only when the bedroom feels too damp, or only when the air is dry enough to need attention.

When you target more than one entity, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted entity to meet the threshold, or demand that all of them do.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Relative humidity"
   sensor="humidity sensor"
   areas="bedroom or bathroom"
   value_long="a fixed percentage directly, for example `65` for 65%" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed percentage (0–100)" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `humidity.is_value`. A basic example looks like this:

{% example %}
condition: |
  condition: humidity.is_value
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: above
      value:
        number: 60
    behavior: any
{% endexample %}

This passes when the bedroom humidity sensor reads above 60%.

To check that humidity stays below a certain level:

{% example %}
condition: |
  condition: humidity.is_value
  target:
    area_id: basement
  options:
    threshold:
      type: below
      value:
        number: 40
    behavior: all
{% endexample %}

This passes when all humidity sensors in the basement area read below 40%.

To check that humidity stays within a comfortable range:

{% example %}
condition: |
  condition: humidity.is_value
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
    behavior: any
{% endexample %}

This passes when at least one of the humidity sensors reads between 40% and 60%.

To check that humidity stays outside a range:

{% example %}
condition: |
  condition: humidity.is_value
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

This passes when the bedroom humidity sensor reads below 40% or above 60%.

To use a number helper as a dynamic threshold that you can adjust without editing the automation:

{% example %}
condition: |
  condition: humidity.is_value
  target:
    entity_id: sensor.bedroom_humidity
  options:
    threshold:
      type: above
      value:
        entity: input_number.humidity_alert_threshold
    behavior: any
{% endexample %}

This passes when the bedroom humidity sensor reads above the number helper´s value.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   range_note="0–100"
   number_final="a percentage value (0–100)" %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The condition works with humidity sensors, climate entities (using the current humidity reading), humidifier entities (using the current humidity reading), and weather entities.
- Entities that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- Humidity is expressed as a percentage. Indoor comfort is generally between 40% and 60%. Below 30% often feels dry and can irritate airways. Above 65% can encourage mold and dust mites.
- This condition checks the entity's _current_ humidity reading, not its target setpoint. To check a humidifier's target setpoint instead, use the [Humidifier target humidity](/conditions/humidifier.is_target_humidity/) condition.
- When you use a sensor as a dynamic threshold, its value is read at the moment the condition runs. The threshold is not continuously tracked; it is re-evaluated each time the automation fires.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: run a dehumidifier when the room gets too damp

When the bedroom humidity sensor reads above 65%, turn on the dehumidifier to bring levels back to a comfortable range. The condition prevents the dehumidifier from running when the air is already dry enough.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Relative humidity (above 65%)
  - **Target**: Bedroom humidity sensor
  - **Condition passes if**: Any
- **Action**: Turn on switch
  - **Target**: switch.bedroom_dehumidifier

{% details "YAML example for running a dehumidifier when humidity is high" %}

{% example %}
automation: |
  alias: "Run dehumidifier when bedroom is too damp"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: humidity.is_value
      target:
        entity_id:
          - sensor.bedroom_humidity
          - sensor.closet_humidity
      options:
        threshold:
          type: above
          value:
            number: 65
        behavior: any
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.bedroom_dehumidifier
{% endexample %}

{% enddetails %}

### Automation: send an alert when the air gets too dry

At midnight, check the living room humidity. If it has dropped below 30%, send a notification so you can switch on a humidifier before you go to sleep.

- **Trigger**: Time: 00:00
- **Condition**: Relative humidity (below 30%)
  - **Target**: Living room humidity sensor
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low humidity alert" %}

{% example %}
automation: |
  alias: "Alert when living room air is too dry"
  triggers:
    - trigger: time
      at: "00:00:00"
  conditions:
    - condition: humidity.is_value
      target:
        area_id: living_room
      options:
        threshold:
          type: below
          value:
            number: 30
        behavior: all
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The living room humidity is below 30%.
          Consider switching on the humidifier.
{% endexample %}

{% enddetails %}

### Automation: adjust humidifier based on comfort range

Check every 15 minutes whether the bedroom humidity is outside your personal comfort range. Use number helpers to set the range, so you can easily adjust it through the UI without editing the automation.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Relative humidity (outside range, using number helpers)
  - **Target**: Bedroom humidity sensor
  - **Condition passes if**: Any
- **Action**: Turn on switch
  - **Target**: switch.bedroom_humidifier

{% details "YAML example for using number helpers as threshold" %}

{% example %}
automation: |
  alias: "Turn on humidifier when outside comfort range"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: humidity.is_value
      target:
        entity_id: sensor.bedroom_humidity
      options:
        threshold:
          type: outside
          value_min:
            entity: input_number.comfort_humidity_min
          value_max:
            entity: input_number.comfort_humidity_max
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.bedroom_humidifier
{% endexample %}

{% enddetails %}

### Automation: run the ventilation fan when indoor humidity exceeds outdoor humidity

Every 15 minutes, check whether the living room is more humid than the outside air. If so, open the ventilation to let drier air in. The outdoor humidity sensor acts as a live threshold, so the condition always compares the two current readings.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Relative humidity (above, entity: outdoor humidity sensor)
  - **Target**: Living room humidity sensor
  - **Condition passes if**: Any
- **Action**: Turn on switch
  - **Target**: switch.ventilation_fan

{% details "YAML example for comparing indoor to outdoor humidity" %}

{% example %}
automation: |
  alias: "Ventilate when indoor humidity exceeds outdoor"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: humidity.is_value
      target:
        entity_id: sensor.living_room_humidity
      options:
        threshold:
          type: above
          value:
            entity: sensor.outdoor_humidity
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.ventilation_fan
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
