---
title: "Nitrogen dioxide value"
condition: air_quality.is_no2_value
domain: air_quality
description: "Tests the nitrogen dioxide level of one or more entities."
related_conditions:
  - air_quality.is_no_value
  - air_quality.is_n2o_value
  - air_quality.is_ozone_value
---

The **Nitrogen dioxide value** condition passes when a nitrogen dioxide (NO2) sensor's reading meets a specific level. NO2 is a reddish-brown gas that comes from traffic and combustion, and elevated levels irritate the airways. This condition helps your automation make informed decisions about outdoor air, for example holding off on opening the windows during rush hour or sending you a notification recommending indoor exercise when NO2 is too high.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Nitrogen dioxide value"
   sensor="nitrogen dioxide sensor"
   areas="garden or kitchen"
   value_long="a fixed level directly, for example `40`"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb, ppm, or μg/m³" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, or `μg/m³`" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_no2_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_no2_value
  target:
    entity_id: sensor.outdoor_no2
  options:
    threshold:
      type: above
      value:
        number: 40
        unit_of_measurement: "μg/m³"
    behavior: any
{% endexample %}

This passes when the outdoor NO2 sensor reads above 40 μg/m³.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   has_unit="true"
   unit_default="μg/m³"
   unit_example_entity="input_number.no2_alert_level"
   unit_example_value="25"
   threshold_required="true" %}

{% include conditions/targets.md entity_type="nitrogen dioxide sensor" example="sensor.living_room_nitrogen_dioxide" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- For related pollutants, see [Nitrogen monoxide value](/conditions/air_quality.is_no_value/), [Nitrous oxide value](/conditions/air_quality.is_n2o_value/), and [Ozone value](/conditions/air_quality.is_ozone_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: suggest indoor exercise before your morning run

If you have a daily running routine, you want to know whether the outdoor air is safe before heading out. This automation triggers at 6:30 AM and checks whether outdoor NO2 is above 40 μg/m³. If it is, you get a friendly suggestion to exercise indoors instead. On clean-air mornings, you never hear a thing and head out as usual.

- **Trigger**: Time: 06:30
- **Condition**: Nitrogen dioxide value
  - **Target**: Outdoor NO2 sensor
  - **Threshold type**: Above 40 μg/m³
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an NO2 exercise suggestion before your run" %}

{% example %}
automation: |
  alias: "Suggest indoor exercise on high NO2"
  triggers:
    - trigger: time
      at: "06:30:00"
  conditions:
    - condition: air_quality.is_no2_value
      target:
        entity_id: sensor.outdoor_no2
      options:
        threshold:
          type: above
          value:
            number: 40
            unit_of_measurement: "μg/m³"
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "High NO2 outside"
        message: >
          Outdoor NO2 is above 40 μg/m³. Consider
          exercising indoors today.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
