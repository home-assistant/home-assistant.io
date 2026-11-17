---
title: "Nitrogen monoxide value"
condition: air_quality.is_no_value
domain: air_quality
description: "Tests the nitrogen monoxide level of one or more entities."
related_conditions:
  - air_quality.is_no2_value
  - air_quality.is_n2o_value
---

The **Nitrogen monoxide value** condition passes when a nitrogen monoxide (NO) sensor's reading meets a specific level. NO is a reactive gas that shows up mainly around vehicle exhaust and industrial activity. If you live near a busy road, rush-hour traffic raises NO levels noticeably. This condition lets your automation respond to that pattern, closing the garage ventilation when NO spikes during the morning commute and reopening it once readings settle down.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Nitrogen monoxide value"
   sensor="nitrogen monoxide sensor"
   areas="garage or garden"
   value_long="a fixed level directly, for example `100`"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb or μg/m³" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb` or `μg/m³`" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_no_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_no_value
  target:
    entity_id: sensor.outdoor_no
  options:
    threshold:
      type: above
      value:
        number: 100
        unit_of_measurement: "μg/m³"
    behavior: any
{% endexample %}

This passes when the outdoor NO sensor reads above 100 μg/m³.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   has_unit="true"
   unit_default="μg/m³"
   unit_example_entity="input_number.no_alert_level"
   unit_example_value="150"
   threshold_required="true" %}

{% include conditions/targets.md entity_type="nitrogen monoxide sensor" example="sensor.living_room_nitrogen_monoxide" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- Nitrogen monoxide is closely related to nitrogen dioxide (NO2). For NO2 readings, see [Nitrogen dioxide value](/conditions/air_quality.is_no2_value/). For nitrous oxide, see [Nitrous oxide value](/conditions/air_quality.is_n2o_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: keep the garage sealed during the morning commute

If you live near a busy road, rush-hour exhaust raises outdoor NO levels fast. This automation triggers at 7:30 AM and checks the outdoor NO reading. If the level is above 100 μg/m³, the garage ventilation closes so fumes stay outside. On mornings with light traffic, the ventilation stays open as usual.

- **Trigger**: Time
  - **At time**: `07:30:00` AM
- **Condition**: Nitrogen monoxide value
  - **Target**: Outdoor NO sensor
  - **Threshold type**: Above 100 μg/m³
- **Action**: Close cover
  - **Target**: Garage ventilation

{% details "YAML example for closing the garage during the morning commute" %}

{% example %}
automation: |
  alias: "Seal garage during morning commute"
  triggers:
    - trigger: time
      at: "07:30:00"
  conditions:
    - condition: air_quality.is_no_value
      target:
        entity_id: sensor.outdoor_no
      options:
        threshold:
          type: above
          value:
            number: 100
            unit_of_measurement: "μg/m³"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.garage_ventilation
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
