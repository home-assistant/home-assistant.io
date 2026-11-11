---
title: "PM2.5 value"
condition: air_quality.is_pm25_value
domain: air_quality
description: "Tests the PM2.5 level of one or more entities."
related_conditions:
  - air_quality.is_pm1_value
  - air_quality.is_pm4_value
  - air_quality.is_pm10_value
---

The **PM2.5 value** condition passes when a PM2.5 sensor's reading meets a specific level. PM2.5 is the most widely used indicator of air quality, and for good reason: these fine particles (smaller than 2.5 micrometers) come from traffic, wildfires, and everyday cooking, and they affect respiratory health at surprisingly low concentrations. This condition gives your automation precision, closing the windows only when outdoor PM2.5 is above a safe limit or holding off on opening them until the reading drops back down.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="PM2.5 value"
   sensor="PM2.5 sensor"
   areas="living room or bedroom"
   value_long="a fixed level directly, for example `35` for 35 μg/m³" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level in μg/m³" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_pm25_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_pm25_value
  target:
    entity_id: sensor.living_room_pm25
  options:
    threshold:
      type: above
      value:
        number: 35
    behavior: any
{% endexample %}

This passes when the living room PM2.5 sensor reads above 35 μg/m³.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   range_note="μg/m³"
   number_final="a value in μg/m³"
   threshold_required="true"
   entity_unit="`μg/m³`" %}

{% include conditions/targets.md entity_type="PM2.5 sensor" example="sensor.living_room_pm25" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- The World Health Organization recommends keeping 24-hour average PM2.5 exposure below 15 μg/m³.
- For other particle sizes, see
  - [PM1 value](/conditions/air_quality.is_pm1_value/)
  - [PM4 value](/conditions/air_quality.is_pm4_value/)
  - [PM10 value](/conditions/air_quality.is_pm10_value/)
- The threshold is in μg/m³. A sensor that reports PM2.5 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: check outdoor PM2.5 before opening the windows each morning

During wildfire season, outdoor PM2.5 readings spike overnight while you sleep. This automation triggers when you open the living room window cover and checks the outdoor PM2.5 reading first. If the level is above 35 μg/m³, the cover closes right back and you get a notification letting you know the air outside is not safe for ventilation. On clear mornings, nothing happens and you enjoy the fresh air.

- **Trigger**: State changed: Living room window cover opened
- **Condition**: PM2.5 value
  - **Target**: Outdoor PM2.5 sensor
  - **Threshold type**: Above 35 μg/m³
  - **Condition passes if**: Any
- **Action**: Close cover
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for closing windows back on high outdoor PM2.5" %}

{% example %}
automation: |
  alias: "Close windows if outdoor PM2.5 is high"
  triggers:
    - trigger: state
      entity_id: cover.living_room_window
      to: open
  conditions:
    - condition: air_quality.is_pm25_value
      target:
        entity_id: sensor.outdoor_pm25
      options:
        threshold:
          type: above
          value:
            number: 35
        behavior: any
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_window
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "PM2.5 is high outside"
        message: >
          Outdoor PM2.5 is above 35 μg/m³. The window
          has been closed to keep the air clean.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
