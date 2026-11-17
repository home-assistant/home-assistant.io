---
title: "Volatile organic compounds ratio crossed threshold"
trigger: air_quality.voc_ratio_crossed_threshold
domain: air_quality
description: "Triggers when one or more volatile organic compounds ratios cross a threshold."
related_triggers:
  - air_quality.voc_ratio_changed
---

The **Volatile organic compounds ratio crossed threshold** trigger fires when the <abbr title="volatile organic compounds">VOC</abbr> ratio reading on one or more air quality sensors crosses a specific level. While the VOC level measures the mass of VOCs in the air, in μg/m³, the VOC ratio measures their share of the air, in parts per billion (ppb) or parts per million (ppm).

Picture your kitchen extractor fan turning on the instant cooking fumes push the VOC ratio past its normal baseline, clearing the air before odors spread through the house. Or getting an alert on your phone when cleaning products cause a spike so you know to open a window. This trigger reacts to relative shifts in air quality, which is ideal for catching sudden changes even when absolute readings vary from sensor to sensor.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Volatile organic compounds ratio crossed threshold"
   sensor="VOC ratio sensor"
   areas="kitchen or living room"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="ratio unit"
   unit_options="ppb or ppm" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="ratio unit"
   unit_options_code="`ppb` or `ppm`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.voc_ratio_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.voc_ratio_crossed_threshold
  target:
    entity_id: sensor.kitchen_voc_ratio
  options:
    threshold:
      type: above
      value:
        number: 150
        unit_of_measurement: "ppb"
{% endexample %}

This fires when the kitchen VOC ratio sensor reading rises above 150 ppb.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="ratio unit"
   unit_options_code="`ppb` or `ppm`"
   unit_default="ppb"
   unit_example_entity="input_number.voc_ratio_alert_level"
   unit_example_value="60"
   entity_unit_note="When using the `entity` key, Home Assistant converts the value from the entity's unit: `ppb`, `ppm`, or `%`. An entity without a unit is read as a plain ratio, so 150 ppb is `0.00000015`." %}

{% include triggers/targets.md entity_type="volatile organic compounds ratio sensor" example="sensor.living_room_voc_ratio" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the ratio rises above the threshold. With **Below**, it fires when the ratio drops below it.
- The VOC ratio is different from the absolute VOC level. Check your sensor's documentation to understand what scale or baseline it uses.
- Pair this trigger with [Volatile organic compounds ratio changed](/triggers/air_quality.voc_ratio_changed/) if you want to react to every change of the ratio instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: clear cooking fumes before they spread

Frying and searing create a burst of fumes that quickly fills the kitchen. This automation turns on the extractor fan the moment the VOC ratio rises above 150 ppb, pulling cooking odors out before they drift into the rest of the house.

- **Trigger**: Volatile organic compounds ratio crossed threshold
  - **Target**: Kitchen VOC ratio sensor
  - **Threshold type**: Above 150 ppb
  - **Trigger when**: Each
- **Action**: Turn on fan (kitchen extractor)

{% details "YAML example for VOC ratio kitchen extractor" %}

{% example %}
automation: |
  alias: "Kitchen extractor on VOC ratio spike"
  triggers:
    - trigger: air_quality.voc_ratio_crossed_threshold
      target:
        entity_id: sensor.kitchen_voc_ratio
      options:
        threshold:
          type: above
          value:
            number: 150
            unit_of_measurement: "ppb"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.kitchen_extractor
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
