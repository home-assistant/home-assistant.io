---
title: "Sulphur dioxide level crossed threshold"
trigger: air_quality.so2_crossed_threshold
domain: air_quality
description: "Triggers when one or more sulphur dioxide levels cross a threshold."
related_triggers:
  - air_quality.so2_changed
---

The **Sulphur dioxide level crossed threshold** trigger fires when the sulphur dioxide (SO2) reading on one or more air quality sensors crosses a specific level. Sulphur dioxide is a sharp-smelling gas produced by burning fossil fuels that contain sulphur, volcanic activity, and some industrial processes. The WHO recommends keeping 24-hour SO2 exposure below 40 micrograms per cubic meter, because elevated levels irritate the respiratory system and worsen conditions like asthma.

If you live near industrial areas or in a region with volcanic activity, this trigger is especially valuable. Have your smart windows close automatically the moment outdoor SO2 crosses your safety limit, or get an alert on your phone so you know to stay indoors until the air clears. Your home reacts to changing conditions in real time, keeping irritating fumes outside where they belong.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Sulphur dioxide level crossed threshold"
   sensor="sulphur dioxide sensor"
   areas="garden or balcony"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb or μg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb` or `μg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.so2_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.so2_crossed_threshold
  target:
    entity_id: sensor.outdoor_so2
  options:
    threshold:
      type: above
      value:
        number: 40
        unit_of_measurement: "μg/m³"
{% endexample %}

This fires when the outdoor SO2 sensor reading rises above 40 μg/m³.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb` or `μg/m³`"
   unit_default="μg/m³"
   unit_example_entity="input_number.so2_alert_level"
   unit_example_value="20" %}

{% include triggers/targets.md entity_type="sulphur dioxide sensor" example="sensor.living_room_sulphur_dioxide" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- The WHO guideline for 24-hour SO2 exposure is 40 μg/m³. If you live near industrial areas or in regions with volcanic activity, a threshold around that value is a good starting point.
- Pair this trigger with [Sulphur dioxide level changed](/triggers/air_quality.so2_changed/) if you want to react to every change of the level instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: seal the house when industrial or volcanic SO2 spikes

If you live downwind of a factory or in a volcanic region, SO2 levels change fast. This automation closes your smart windows the moment outdoor SO2 rises above 40 μg/m³, keeping that sharp, irritating gas out of the house so your family breathes easy.

- **Trigger**: Sulphur dioxide level crossed threshold
  - **Target**: Outdoor SO2 sensor
  - **Threshold type**: Above 40 μg/m³
  - **Trigger when**: Each
- **Action**: Close cover (windows)

{% details "YAML example for closing windows on high SO2" %}

{% example %}
automation: |
  alias: "Close windows on high SO2"
  triggers:
    - trigger: air_quality.so2_crossed_threshold
      target:
        entity_id: sensor.outdoor_so2
      options:
        threshold:
          type: above
          value:
            number: 40
            unit_of_measurement: "μg/m³"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_windows
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
