---
title: "Volatile organic compounds value"
condition: air_quality.is_voc_value
domain: air_quality
description: "Tests the volatile organic compounds level of one or more entities."
related_conditions:
  - air_quality.is_voc_ratio_value
  - air_quality.is_co2_value
---

The **Volatile organic compounds value** condition passes when a <abbr title="volatile organic compounds">VOC</abbr> sensor's reading meets a specific level. VOCs are invisible gases released by paints, cleaning supplies, new furniture, and even scented candles. You often notice them as that "new car" or "fresh paint" smell, and at higher concentrations they affect comfort and health. This condition lets your automation respond proportionally, turning on the ventilation fan only when VOC readings are genuinely elevated and leaving it off during a normal day so you save energy.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Volatile organic compounds value"
   sensor="VOC sensor"
   areas="living room or bedroom"
   value_long="a fixed level directly, for example `300`"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="μg/m³ or mg/m³" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`μg/m³` or `mg/m³`" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_voc_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_voc_value
  target:
    entity_id: sensor.living_room_voc
  options:
    threshold:
      type: above
      value:
        number: 300
        unit_of_measurement: "μg/m³"
    behavior: any
{% endexample %}

This passes when the living room VOC sensor reads above 300 μg/m³.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   has_unit="true"
   unit_default="μg/m³"
   unit_example_entity="input_number.voc_alert_level"
   unit_example_value="500"
   threshold_required="true" %}

{% include conditions/targets.md entity_type="volatile organic compounds sensor" example="sensor.living_room_voc" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- Some sensors report VOCs as a ratio instead of an absolute concentration. For those sensors, use [Volatile organic compounds ratio value](/conditions/air_quality.is_voc_ratio_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: start the air purifier when you wake up only if VOC levels are high

Overnight, off-gassing from furniture, carpets, and cleaning products pushes VOC levels up in a closed room. This automation triggers at wake-up time and checks the living room VOC reading. If the level is above 300 μg/m³, the air purifier turns on to clear the air before you start your day. On mornings when the air is already fresh, the purifier stays off and you save energy.

- **Trigger**: Time: 07:00
- **Condition**: Volatile organic compounds value
  - **Target**: Living room VOC sensor
  - **Threshold type**: Above 300 μg/m³
- **Action**: Turn on fan
  - **Target**: Living room purifier

{% details "YAML example for starting the purifier on high VOCs at wake-up" %}

{% example %}
automation: |
  alias: "Morning purifier if VOCs are high"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: air_quality.is_voc_value
      target:
        entity_id: sensor.living_room_voc
      options:
        threshold:
          type: above
          value:
            number: 300
            unit_of_measurement: "μg/m³"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.living_room_purifier
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
