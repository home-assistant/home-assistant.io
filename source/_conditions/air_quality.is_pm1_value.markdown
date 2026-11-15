---
title: "PM1 value"
condition: air_quality.is_pm1_value
domain: air_quality
description: "Tests the PM1 level of one or more entities."
related_conditions:
  - air_quality.is_pm25_value
  - air_quality.is_pm4_value
  - air_quality.is_pm10_value
---

The **PM1 value** condition passes when a PM1 sensor's reading meets a specific level. PM1 refers to ultra-fine particulate matter smaller than 1 micrometer in diameter, particles so tiny they travel deep into the lungs. Cooking on a gas stove or burning a candle sends PM1 readings up quickly. This condition lets you start an air purifier only when ultra-fine particles are genuinely elevated, saving energy on quiet days and protecting your family when it matters.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="PM1 value"
   sensor="PM1 sensor"
   areas="living room or bedroom"
   value_long="a fixed level directly, for example `25` for 25 μg/m³" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level in μg/m³" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_pm1_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_pm1_value
  target:
    entity_id: sensor.bedroom_pm1
  options:
    threshold:
      type: above
      value:
        number: 25
    behavior: any
{% endexample %}

This passes when the bedroom PM1 sensor reads above 25 μg/m³.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   range_note="μg/m³"
   number_final="a value in μg/m³"
   threshold_required="true"
   entity_unit="`μg/m³`" %}

{% include conditions/targets.md entity_type="PM1 sensor" example="sensor.living_room_pm1" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- For coarser particulate readings, see
  - [PM2.5 value](/conditions/air_quality.is_pm25_value/)
  - [PM4 value](/conditions/air_quality.is_pm4_value/)
  - [PM10 value](/conditions/air_quality.is_pm10_value/)
- The threshold is in μg/m³. A sensor that reports PM1 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: start the bedroom purifier at bedtime only if PM1 is elevated

Ultra-fine particles from cooking, candles, or the heating system linger in a closed bedroom. This automation triggers at bedtime and checks the current PM1 reading. If the level is above 25 μg/m³, the air purifier turns on so you breathe clean air while you sleep. On evenings when the air is already fresh, the purifier stays off and the bedroom stays quiet.

- **Trigger**: Time: 22:00
- **Condition**: PM1 value
  - **Target**: Bedroom PM1 sensor
  - **Threshold type**: Above 25 μg/m³
- **Action**: Turn on fan
  - **Target**: Bedroom purifier

{% details "YAML example for starting the purifier at bedtime on high PM1" %}

{% example %}
automation: |
  alias: "Bedroom purifier at bedtime if PM1 is high"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: air_quality.is_pm1_value
      target:
        entity_id: sensor.bedroom_pm1
      options:
        threshold:
          type: above
          value:
            number: 25
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_purifier
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
