---
title: "Ozone value"
condition: air_quality.is_ozone_value
domain: air_quality
description: "Tests the ozone level of one or more entities."
related_conditions:
  - air_quality.is_no2_value
  - air_quality.is_voc_value
---

The **Ozone value** condition passes when an ozone (O3) sensor's reading meets a specific level. Ground-level ozone is a key component of smog and tends to spike on hot, sunny afternoons. This condition helps your automation make smarter ventilation decisions, keeping the windows shut during a smog alert but allowing fresh air in after the ozone reading decreases to a comfortable level.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Ozone value"
   sensor="ozone sensor"
   areas="garden or living room"
   value_long="a fixed level directly, for example `100`"
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

In YAML, refer to this condition as `air_quality.is_ozone_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_ozone_value
  target:
    entity_id: sensor.outdoor_ozone
  options:
    threshold:
      type: above
      value:
        number: 100
        unit_of_measurement: "μg/m³"
    behavior: any
{% endexample %}

This passes when the outdoor ozone sensor reads above 100 μg/m³.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   has_unit="true"
   unit_default="μg/m³"
   unit_example_entity="input_number.ozone_alert_level"
   unit_example_value="120"
   threshold_required="true" %}

{% include conditions/targets.md entity_type="ozone sensor" example="sensor.living_room_ozone" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- Ozone levels tend to peak on hot, sunny afternoons. Pair this condition with time-based triggers to limit outdoor ventilation during those hours.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only open windows in the afternoon if ozone is low enough

On hot summer days, ozone builds up through the afternoon and peaks around 3 PM. This automation triggers at that time and checks whether outdoor ozone is above 100 μg/m³. If the reading is still high, the windows stay shut, and you get a notification explaining why. On breezy days with lower ozone, the automation does nothing, and you enjoy fresh air as usual.

- **Trigger**: Time: 15:00
- **Condition**: Ozone value
  - **Target**: Outdoor ozone sensor
  - **Threshold type**: Above 100 μg/m³
  - **Condition passes if**: Any
- **Action**: Close cover
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for keeping windows shut on high ozone afternoons" %}

{% example %}
automation: |
  alias: "Keep windows shut on high ozone afternoons"
  triggers:
    - trigger: time
      at: "15:00:00"
  conditions:
    - condition: air_quality.is_ozone_value
      target:
        entity_id: sensor.outdoor_ozone
      options:
        threshold:
          type: above
          value:
            number: 100
            unit_of_measurement: "μg/m³"
        behavior: any
  actions:
    - action: cover.close_cover
      target:
        area_id: living_room
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Ozone is high outside"
        message: >
          Outdoor ozone is above 100 μg/m³. Windows
          are staying closed this afternoon.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
