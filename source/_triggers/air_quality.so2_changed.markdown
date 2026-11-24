---
title: "Sulphur dioxide level changed"
trigger: air_quality.so2_changed
domain: air_quality
description: "Triggers when one or more sulphur dioxide levels change."
related_triggers:
  - air_quality.so2_crossed_threshold
---

The **Sulphur dioxide level changed** trigger fires after the sulphur dioxide (SO2) reading on one or more air quality sensors changes. Sulphur dioxide is a sharp-smelling gas released by burning fossil fuels (especially coal and oil), volcanic activity, and certain industrial processes. It irritates the respiratory system and contributes to acid rain. If you live near an industrial area, a power plant, or in a volcanically active region, SO2 levels are worth watching closely.

Imagine your outdoor vents sealing automatically when an industrial plume drifts your way, keeping that acrid air out of your home. Use this trigger to activate air filtration, close outdoor vents, or send notifications. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Sulphur dioxide level changed"
   sensor="sulphur dioxide sensor"
   areas="rooftop or garden"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb or μg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb` or `μg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.so2_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.so2_changed
  target:
    entity_id: sensor.rooftop_so2
  options:
    threshold:
      type: above
      value:
        number: 15
        unit_of_measurement: "ppb"
{% endexample %}

This fires whenever the rooftop SO2 sensor reading changes to a value above 15 ppb. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb` or `μg/m³`"
   unit_default="ppb"
   unit_example_entity="input_number.so2_alert_level"
   unit_example_value="20" %}

{% include triggers/targets.md entity_type="sulphur dioxide sensor" example="sensor.living_room_sulphur_dioxide" %}

## Good to know

- Sulphur dioxide levels are most relevant near industrial areas, power plants, or regions with volcanic activity. Even moderate exposure irritates the throat and lungs.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when SO2 crosses a specific concentration in one direction, use [Sulphur dioxide level crossed threshold](/triggers/air_quality.so2_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: seal the house when SO2 rises

If you live near an industrial site or in a volcanically active area, SO2 plumes drift in without warning. This automation closes the motorized vents when your outdoor SO2 level changes to a value above 15 ppb, keeping that acrid air out of your home.

- **Trigger**: Sulphur dioxide level changed
  - **Target**: Rooftop SO2 sensor
  - **Threshold type**: Above 15 ppb
- **Action**: Close cover

{% details "YAML example for SO2-driven vent closure" %}

{% example %}
automation: |
  alias: "Close vents on SO2 change"
  triggers:
    - trigger: air_quality.so2_changed
      target:
        entity_id: sensor.rooftop_so2
      options:
        threshold:
          type: above
          value:
            number: 15
            unit_of_measurement: "ppb"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.fresh_air_vents
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
