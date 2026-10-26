---
title: "Nitrogen dioxide level crossed threshold"
trigger: air_quality.no2_crossed_threshold
domain: air_quality
description: "Triggers when one or more nitrogen dioxide levels cross a threshold."
related_triggers:
  - air_quality.no2_changed
---

The **Nitrogen dioxide level crossed threshold** trigger fires when the nitrogen dioxide (NO2) reading on one or more air quality sensors crosses a specific level. Nitrogen dioxide is a reddish-brown gas with a sharp odor, produced primarily by vehicle traffic and gas appliances. Elevated NO2 irritates the airways and worsens respiratory conditions like asthma, so the WHO recommends keeping short-term exposure below 25 micrograms per cubic meter.

If you live near a busy road, this trigger is a game-changer. Have your ventilation system close its fresh-air intake automatically when street-side NO2 rises past your limit, keeping traffic pollution out of the house. Or get an alert on your phone during rush hour so you know to keep the kids inside until levels drop. Your home watches the air for you and reacts the instant conditions change.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Nitrogen dioxide level crossed threshold"
   sensor="nitrogen dioxide sensor"
   areas="kitchen or street-facing room"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb, ppm, or μg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, or `μg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.no2_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.no2_crossed_threshold
  target:
    entity_id: sensor.street_side_no2
  options:
    threshold:
      type: above
      value:
        number: 40
        unit_of_measurement: "μg/m³"
{% endexample %}

This fires when the street-side NO2 sensor reading rises above 40 μg/m³.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, or `μg/m³`"
   unit_default="μg/m³"
   unit_example_entity="input_number.no2_alert_level"
   unit_example_value="25" %}

{% include triggers/targets.md entity_type="nitrogen dioxide sensor" example="sensor.living_room_nitrogen_dioxide" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- The WHO guideline for short-term NO2 exposure is 25 μg/m³. If you live near a busy road, a threshold in that range helps protect indoor air quality.
- Pair this trigger with [Nitrogen dioxide level changed](/triggers/air_quality.no2_changed/) if you want to react to every change of the level instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: block traffic pollution during rush hour

Living near a busy road means NO2 spikes every rush hour. This automation closes the fresh-air intake on your ventilation system the moment your street-side sensor rises above 40 μg/m³, keeping traffic fumes out of the house while you go about your evening.

- **Trigger**: Nitrogen dioxide level crossed threshold
  - **Target**: Street-side NO2 sensor
  - **Threshold type**: Above 40 μg/m³
  - **Trigger when**: Each
- **Action**: Close cover (fresh-air intake)

{% details "YAML example for closing intake on high NO2" %}

{% example %}
automation: |
  alias: "Close intake on high NO2"
  triggers:
    - trigger: air_quality.no2_crossed_threshold
      target:
        entity_id: sensor.street_side_no2
      options:
        threshold:
          type: above
          value:
            number: 40
            unit_of_measurement: "μg/m³"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.fresh_air_intake
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
