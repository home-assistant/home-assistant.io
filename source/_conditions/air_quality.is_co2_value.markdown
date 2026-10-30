---
title: "Carbon dioxide value"
condition: air_quality.is_co2_value
domain: air_quality
description: "Tests the carbon dioxide level of one or more entities."
related_conditions:
  - air_quality.is_voc_value
---

The **Carbon dioxide value** condition passes when a carbon dioxide (CO2) sensor's reading meets a specific level. A stuffy meeting room, a crowded living room on movie night, or a bedroom with the door closed overnight all push CO2 levels higher than you would expect. This condition lets your automation act only when CO2 is genuinely elevated, so the ventilation fan starts when it is truly needed and stays off when the air is fine.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Carbon dioxide value"
   sensor="carbon dioxide sensor"
   areas="bedroom or office"
   value_long="a fixed level directly, for example `1000` for 1000 ppm" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level in ppm" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_co2_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_co2_value
  target:
    entity_id: sensor.office_co2
  options:
    threshold:
      type: above
      value:
        number: 1000
    behavior: any
{% endexample %}

This passes when the office CO2 sensor reads above 1000 ppm.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   range_note="ppm"
   number_final="a value in ppm"
   threshold_required="true"
   entity_unit="`ppm`" %}

{% include conditions/targets.md entity_type="carbon dioxide sensor" example="sensor.living_room_co2" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- Outdoor CO2 levels are typically around 420 ppm. Indoor levels above 1000 ppm often suggest the room needs better ventilation.
- The threshold is in ppm. A sensor that reports CO2 in another unit never matches. If you use an entity as the threshold, it must also report ppm.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on ventilation at bedtime only if CO2 is elevated

After you spend an evening in the living room with the doors closed, CO2 levels are sometimes higher than you would expect by the time you head to bed. This automation triggers at your usual bedtime and checks the bedroom CO2 reading. If the level is above 1000 ppm, the ventilation fan turns on so you sleep with fresh air. On evenings when the room already has good airflow, the fan stays off.

- **Trigger**: Time: 22:30
- **Condition**: Carbon dioxide value
  - **Target**: Bedroom CO2 sensor
  - **Threshold type**: Above 1000 ppm
- **Action**: Turn on fan
  - **Target**: Bedroom ventilation

{% details "YAML example for bedtime ventilation on high CO2" %}

{% example %}
automation: |
  alias: "Bedtime ventilation if CO2 is high"
  triggers:
    - trigger: time
      at: "22:30:00"
  conditions:
    - condition: air_quality.is_co2_value
      target:
        entity_id: sensor.bedroom_co2
      options:
        threshold:
          type: above
          value:
            number: 1000
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_ventilation
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
