---
title: "Sulphur dioxide value"
condition: air_quality.is_so2_value
domain: air_quality
description: "Tests the sulphur dioxide level of one or more entities."
related_conditions:
  - air_quality.is_no2_value
  - air_quality.is_ozone_value
---

The **Sulphur dioxide value** condition passes when a sulphur dioxide (SO2) sensor's reading meets a specific level. SO2 is a sharp-smelling gas released by burning fossil fuels and volcanic activity. Elevated levels irritate the respiratory system and make outdoor air uncomfortable. This condition lets your automation respond to real readings, closing the windows and notifying you to stay indoors when SO2 is too high, and letting fresh air back in once the reading drops.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Sulphur dioxide value"
   sensor="sulphur dioxide sensor"
   areas="garden or balcony"
   value_long="a fixed level directly, for example `40`"
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

In YAML, refer to this condition as `air_quality.is_so2_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_so2_value
  target:
    entity_id: sensor.outdoor_so2
  options:
    threshold:
      type: above
      value:
        number: 40
        unit_of_measurement: "μg/m³"
    behavior: any
{% endexample %}

This passes when the outdoor SO2 sensor reads above 40 μg/m³.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   has_unit="true"
   unit_default="μg/m³"
   unit_example_entity="input_number.so2_alert_level"
   unit_example_value="20"
   threshold_required="true" %}

{% include conditions/targets.md entity_type="sulphur dioxide sensor" example="sensor.living_room_sulphur_dioxide" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- For related pollutant conditions, see [Nitrogen dioxide value](/conditions/air_quality.is_no2_value/) and [Ozone value](/conditions/air_quality.is_ozone_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: warn you before heading outside in the morning

If you live near an industrial area, SO2 readings sometimes spike overnight. This automation triggers at 7:00 AM and checks the outdoor SO2 level. If the reading is above 40 μg/m³, you get a notification recommending you stay indoors. On mornings with clean air, you can leave without interruption.

- **Trigger**: Time: 07:00
- **Condition**: Sulphur dioxide value
  - **Target**: Outdoor SO2 sensor
  - **Threshold type**: Above 40 μg/m³
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a morning SO2 warning" %}

{% example %}
automation: |
  alias: "Morning SO2 warning"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: air_quality.is_so2_value
      target:
        entity_id: sensor.outdoor_so2
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
        title: "SO2 is high outside"
        message: >
          Outdoor SO2 is above 40 μg/m³. Consider
          staying indoors this morning.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
