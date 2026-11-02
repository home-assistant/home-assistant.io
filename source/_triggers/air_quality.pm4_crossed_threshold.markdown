---
title: "PM4 level crossed threshold"
trigger: air_quality.pm4_crossed_threshold
domain: air_quality
description: "Triggers when one or more PM4 levels cross a threshold."
related_triggers:
  - air_quality.pm4_changed
---

The **PM4 level crossed threshold** trigger fires when the PM4 (particulate matter 4 micrometers or smaller) reading on one or more air quality sensors crosses a specific level. PM4 sits between the finest particles (PM2.5) and the coarser dust and pollen (PM10), capturing a range of irritants that affect breathing and comfort. Sources include household dust, pollen, mold spores, and cooking emissions.

Think of a nursery where clean air really matters. This trigger lets you boost the air filter to high speed the moment PM4 levels rise, or send a notification to your phone when spring pollen pushes particle counts past your comfort level. You stay one step ahead, keeping the air cleaner for young children and anyone with allergies.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="PM4 level crossed threshold"
   sensor="PM4 sensor"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed level in μg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level in μg/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm4_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm4_crossed_threshold
  target:
    entity_id: sensor.nursery_pm4
  options:
    threshold:
      type: above
      value:
        number: 30
{% endexample %}

This fires when the nursery PM4 sensor reading rises above 30 μg/m³.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal value in μg/m³"
   example_value="30" %}

{% include triggers/targets.md entity_type="PM4 sensor" example="sensor.living_room_pm4" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- PM4 sits between PM2.5 and PM10 in particle size. If your sensor reports multiple particulate sizes, combining thresholds for each gives you a more complete picture of air quality.
- Pair this trigger with [PM4 level changed](/triggers/air_quality.pm4_changed/) if you want to react to every change of the level instead.
- The threshold is in μg/m³. A sensor that reports PM4 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: protect the nursery by boosting the air filter

Young children are more sensitive to airborne particles. This automation switches the nursery air filter to high speed the moment PM4 rises above 30 μg/m³, keeping the room cleaner so your children breathe easier.

- **Trigger**: PM4 level crossed threshold
- **Target**: Nursery PM4 sensor
- **Threshold type**: Above 30 μg/m³
- **Trigger when**: Each
- **Action**: Turn on fan (air filter)

{% details "YAML example for PM4-based nursery air filter" %}

{% example %}
automation: |
  alias: "Nursery air filter on high PM4"
  triggers:
    - trigger: air_quality.pm4_crossed_threshold
      target:
        entity_id: sensor.nursery_pm4
      options:
        threshold:
          type: above
          value:
            number: 30
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.nursery_air_filter
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
