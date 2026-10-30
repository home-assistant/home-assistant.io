---
title: "PM10 value"
condition: air_quality.is_pm10_value
domain: air_quality
description: "Tests the PM10 level of one or more entities."
related_conditions:
  - air_quality.is_pm1_value
  - air_quality.is_pm25_value
  - air_quality.is_pm4_value
---

The **PM10 value** condition passes when a PM10 sensor's reading meets a specific level. PM10 covers coarse particulate matter smaller than 10 micrometers in diameter, which includes dust, pollen, and mold spores. If someone in your household has allergies, this condition is especially useful for closing the windows automatically during high-pollen hours and keeping them open when the reading is low, so you enjoy fresh air without the sneezing.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="PM10 value"
   sensor="PM10 sensor"
   areas="living room or bedroom"
   value_long="a fixed level directly, for example `50` for 50 μg/m³" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level in μg/m³" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_pm10_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_pm10_value
  target:
    entity_id: sensor.outdoor_pm10
  options:
    threshold:
      type: above
      value:
        number: 50
    behavior: any
{% endexample %}

This passes when the outdoor PM10 sensor reads above 50 μg/m³.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   range_note="μg/m³"
   number_final="a value in μg/m³"
   threshold_required="true"
   entity_unit="`μg/m³`" %}

{% include conditions/targets.md entity_type="PM10 sensor" example="sensor.living_room_pm10" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- PM10 includes larger particles like dust and pollen. For finer readings, see:
  - [PM1 value](/conditions/air_quality.is_pm1_value/)
  - [PM2.5 value](/conditions/air_quality.is_pm25_value/)
  - [PM4 value](/conditions/air_quality.is_pm4_value/)
- The threshold is in μg/m³. A sensor that reports PM10 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: check outdoor air before opening windows in the morning

On spring mornings, pollen and dust push PM10 readings up before you even notice. This automation triggers when you open the bedroom window cover and checks the outdoor PM10 reading first. If the level is above 50 μg/m³, the cover closes right back and you get a notification explaining why. On clean-air mornings, nothing happens and you enjoy the fresh breeze.

- **Trigger**: State changed: Bedroom window cover opened
- **Condition**: PM10 value
  - **Target**: Outdoor PM10 sensor
  - **Threshold type**: Above 50 μg/m³
  - **Condition passes if**: Any
- **Action**: Close cover
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for closing windows back on high PM10" %}

{% example %}
automation: |
  alias: "Close windows if outdoor PM10 is high"
  triggers:
    - trigger: state
      entity_id: cover.bedroom_window
      to: open
  conditions:
    - condition: air_quality.is_pm10_value
      target:
        entity_id: sensor.outdoor_pm10
      options:
        threshold:
          type: above
          value:
            number: 50
        behavior: any
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.bedroom_window
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "PM10 is high outside"
        message: >
          Outdoor PM10 is above 50 μg/m³. The window
          has been closed to keep allergens out.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
