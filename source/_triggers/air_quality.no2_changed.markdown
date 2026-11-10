---
title: "Nitrogen dioxide level changed"
trigger: air_quality.no2_changed
domain: air_quality
description: "Triggers when one or more nitrogen dioxide levels change."
related_triggers:
  - air_quality.no2_crossed_threshold
---

The **Nitrogen dioxide level changed** trigger fires after the nitrogen dioxide (NO2) reading on one or more air quality sensors changes. Nitrogen dioxide is a reddish-brown gas with a sharp odor, produced mainly by traffic, power plants, and gas stoves. It irritates the airways and contributes to smog and acid rain. Indoors, your gas stove is often the biggest source. Every time you fire up a burner, NO2 levels in the kitchen rise.

Imagine your range hood turning on automatically when you start cooking, clearing combustion byproducts before they spread through the house. Use this trigger to start ventilation, close windows facing a busy road, or send a health alert. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Nitrogen dioxide level changed"
   sensor="nitrogen dioxide sensor"
   areas="kitchen or street-facing room"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb, ppm, or μg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, or `μg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.no2_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.no2_changed
  target:
    entity_id: sensor.street_side_no2
  options:
    threshold:
      type: above
      value:
        number: 10
        unit_of_measurement: "ppb"
{% endexample %}

This fires whenever the street-side NO2 sensor reading changes to a value above 10 ppb. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, or `μg/m³`"
   unit_default="ppb"
   unit_example_entity="input_number.no2_alert_level"
   unit_example_value="50" %}

{% include triggers/targets.md entity_type="nitrogen dioxide sensor" example="sensor.living_room_nitrogen_dioxide" %}

## Good to know

- Indoor gas stoves and heaters are common sources of NO2 inside the home. A kitchen NO2 sensor combined with this trigger helps you automate range hood ventilation.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when NO2 crosses a specific concentration in one direction, use [Nitrogen dioxide level crossed threshold](/triggers/air_quality.no2_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the range hood when cooking produces NO2

Every time you fire up the gas stove, NO2 levels in the kitchen rise. This automation turns on the range hood as soon as the kitchen NO2 level changes to a value above 15 ppb, clearing combustion byproducts before they spread through the house.

- **Trigger**: Nitrogen dioxide level changed
  - **Target**: Kitchen NO2 sensor
  - **Threshold type**: Above 15 ppb
- **Action**: Turn on switch

{% details "YAML example for NO2-driven range hood" %}

{% example %}
automation: |
  alias: "Range hood on NO2 change"
  triggers:
    - trigger: air_quality.no2_changed
      target:
        entity_id: sensor.kitchen_no2
      options:
        threshold:
          type: above
          value:
            number: 15
            unit_of_measurement: "ppb"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.range_hood
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
