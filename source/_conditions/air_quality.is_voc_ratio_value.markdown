---
title: "Volatile organic compounds ratio value"
condition: air_quality.is_voc_ratio_value
domain: air_quality
description: "Tests the volatile organic compounds ratio of one or more entities."
related_conditions:
  - air_quality.is_voc_value
  - air_quality.is_co2_value
---

The **Volatile organic compounds ratio value** condition passes when a <abbr title="volatile organic compounds">VOC</abbr> ratio sensor's reading meets a specific level. Some sensors report VOCs as a ratio: their share of the air, in parts per billion (ppb) or parts per million (ppm), instead of their mass in μg/m³. This condition lets your automation act on that reading, for example sending a reminder to open a window in the bedroom when the VOC ratio climbs after a room has been closed up all day.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Volatile organic compounds ratio value"
   sensor="VOC ratio sensor"
   areas="bedroom or living room"
   value_long="a fixed level directly, for example `150`"
   has_unit="true"
   unit_label="ratio unit"
   unit_options="ppb or ppm" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level"
   has_unit="true"
   unit_label="ratio unit"
   unit_options_code="`ppb` or `ppm`" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_voc_ratio_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_voc_ratio_value
  target:
    entity_id: sensor.bedroom_voc_ratio
  options:
    threshold:
      type: above
      value:
        number: 150
        unit_of_measurement: "ppb"
    behavior: any
{% endexample %}

This passes when the bedroom VOC ratio sensor reads above 150 ppb.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   has_unit="true"
   unit_default="ppb"
   unit_example_entity="input_number.voc_ratio_alert_level"
   unit_example_value="200"
   threshold_required="true"
   entity_unit_note="Home Assistant converts the value from the entity's unit: `ppb`, `ppm`, or `%`. An entity without a unit is read as a plain ratio, so 150 ppb is `0.00000015`." %}

{% include conditions/targets.md entity_type="volatile organic compounds ratio sensor" example="sensor.living_room_voc_ratio" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- If your sensor reports VOC as an absolute concentration instead of a ratio, use [Volatile organic compounds value](/conditions/air_quality.is_voc_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: remind you to open a window when your morning alarm goes off

After a full night with the door closed, the bedroom VOC ratio creeps up from off-gassing furniture and bedding. This automation triggers when your morning alarm goes off and checks the current VOC ratio. If the reading is above 150 ppb, you get a reminder to crack a window. On nights when you already slept with the window open, the ratio stays low and no notification is sent.

- **Trigger**: Time: 07:00
- **Condition**: Volatile organic compounds ratio value
  - **Target**: Bedroom VOC ratio sensor
  - **Threshold type**: Above 150 ppb
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a morning VOC ratio reminder" %}

{% example %}
automation: |
  alias: "Morning VOC ratio reminder"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: air_quality.is_voc_ratio_value
      target:
        entity_id: sensor.bedroom_voc_ratio
      options:
        threshold:
          type: above
          value:
            number: 150
            unit_of_measurement: "ppb"
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Time to air out the bedroom"
        message: >
          The bedroom VOC ratio is above 150 ppb.
          Opening a window for a few minutes helps.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
