---
title: "PM4 value"
condition: air_quality.is_pm4_value
domain: air_quality
description: "Tests the PM4 level of one or more entities."
related_conditions:
  - air_quality.is_pm1_value
  - air_quality.is_pm25_value
  - air_quality.is_pm10_value
---

The **PM4 value** condition passes when a PM4 sensor's reading meets a specific level. PM4 covers particulate matter smaller than 4 micrometers in diameter, a size range that bridges fine and coarse particles. Some sensors report PM4 alongside PM2.5 and PM10, giving you a more complete picture of what is floating in the air. This condition lets your automation react when PM4 readings are elevated, for example sending a notification that your air filter is due for a check.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="PM4 value"
   sensor="PM4 sensor"
   areas="living room or bedroom"
   value_long="a fixed level directly, for example `50` for 50 μg/m³" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level in μg/m³" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_pm4_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_pm4_value
  target:
    entity_id: sensor.living_room_pm4
  options:
    threshold:
      type: above
      value:
        number: 50
    behavior: any
{% endexample %}

This passes when the living room PM4 sensor reads above 50 μg/m³.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   range_note="μg/m³"
   number_final="a value in μg/m³"
   threshold_required="true"
   entity_unit="`μg/m³`" %}

{% include conditions/targets.md entity_type="PM4 sensor" example="sensor.living_room_pm4" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- For other particle sizes, see
  - [PM1 value](/conditions/air_quality.is_pm1_value/)
  - [PM2.5 value](/conditions/air_quality.is_pm25_value/)
  - [PM10 value](/conditions/air_quality.is_pm10_value/)
- The threshold is in μg/m³. A sensor that reports PM4 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a weekly filter reminder only if PM4 is elevated

If your indoor PM4 readings are consistently high, the air filters are likely overdue for a swap. This automation runs every Sunday morning and checks the living room PM4 reading. If the level is above 50 μg/m³, you get a reminder to check the filters. On weeks when the air is clean, no notification is sent.

- **Trigger**: Time: Every Sunday at 09:00
- **Condition**: PM4 value
  - **Target**: Living room PM4 sensor
  - **Threshold type**: Above 50 μg/m³
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a weekly PM4 filter reminder" %}

{% example %}
automation: |
  alias: "Weekly filter reminder if PM4 is high"
  triggers:
    - trigger: time
      at: "09:00:00"
  conditions:
    - condition: time
      weekday:
        - sun
    - condition: air_quality.is_pm4_value
      target:
        entity_id: sensor.living_room_pm4
      options:
        threshold:
          type: above
          value:
            number: 50
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Time to check the air filters"
        message: >
          The living room PM4 reading is above 50 μg/m³.
          Your air filters might need replacing.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
