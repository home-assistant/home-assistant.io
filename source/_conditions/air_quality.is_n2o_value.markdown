---
title: "Nitrous oxide value"
condition: air_quality.is_n2o_value
domain: air_quality
description: "Tests the nitrous oxide level of one or more entities."
related_conditions:
  - air_quality.is_no_value
  - air_quality.is_no2_value
---

The **Nitrous oxide value** condition passes when a nitrous oxide (N2O) sensor's reading meets a specific level. N2O is a greenhouse gas that shows up in agricultural settings, greenhouses, and some industrial spaces. If you monitor a greenhouse or workshop, this condition lets your automation turn on ventilation only when N2O levels genuinely need attention, keeping fans off during normal readings so you save energy and reduce noise.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Nitrous oxide value"
   sensor="nitrous oxide sensor"
   areas="greenhouse or workshop"
   value_long="a fixed level directly, for example `900` for 900 μg/m³" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level in μg/m³" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_n2o_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_n2o_value
  target:
    entity_id: sensor.greenhouse_n2o
  options:
    threshold:
      type: above
      value:
        number: 900
    behavior: any
{% endexample %}

This passes when the greenhouse N2O sensor reads above 900 μg/m³.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   range_note="μg/m³"
   number_final="a value in μg/m³"
   threshold_required="true"
   entity_unit="`μg/m³`" %}

{% include conditions/targets.md entity_type="nitrous oxide sensor" example="sensor.living_room_nitrous_oxide" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- For related nitrogen-based pollutants, see [Nitrogen monoxide value](/conditions/air_quality.is_no_value/) and [Nitrogen dioxide value](/conditions/air_quality.is_no2_value/).
- The threshold is in μg/m³. A sensor that reports N2O in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: ventilate the greenhouse each morning only if N2O is elevated

Fertilizer off-gassing raises N2O levels overnight in an enclosed greenhouse, especially on warm nights. This automation runs each morning at sunrise and checks the current reading. If N2O is above 900 μg/m³, the ventilation fan turns on so the air is fresh before you start working. On mornings when levels stayed low, the fan stays off, keeping the greenhouse warm and saving energy.

- **Trigger**: Sunrise
- **Condition**: Nitrous oxide value
  - **Target**: Greenhouse N2O sensor
  - **Threshold type**: Above 900 μg/m³
- **Action**: Turn on fan
  - **Target**: Greenhouse ventilation

{% details "YAML example for morning greenhouse ventilation on high N2O" %}

{% example %}
automation: |
  alias: "Morning greenhouse ventilation if N2O is high"
  triggers:
    - trigger: sun.sunrise
  conditions:
    - condition: air_quality.is_n2o_value
      target:
        entity_id: sensor.greenhouse_n2o
      options:
        threshold:
          type: above
          value:
            number: 900
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.greenhouse_ventilation
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
