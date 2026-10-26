---
title: "Nitrous oxide level crossed threshold"
trigger: air_quality.n2o_crossed_threshold
domain: air_quality
description: "Triggers when one or more nitrous oxide levels cross a threshold."
related_triggers:
  - air_quality.n2o_changed
---

The **Nitrous oxide level crossed threshold** trigger fires when the nitrous oxide (N2O) reading on one or more air quality sensors crosses a specific level. Nitrous oxide is a potent greenhouse gas released by agricultural practices, industrial processes, and certain combustion sources. While less common in typical household monitoring, specialized sensors track N2O for environmental research, greenhouse management, and agricultural applications.

If you manage a greenhouse or monitor environmental conditions, this trigger keeps you informed without constant manual checks. Get a notification on your phone the moment N2O rises above a concerning level, or have your ventilation system respond automatically to keep conditions within a healthy range.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Nitrous oxide level crossed threshold"
   sensor="nitrous oxide sensor"
   areas="greenhouse or workshop"
   unit_phrase_ui="a fixed level in μg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level in μg/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.n2o_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.n2o_crossed_threshold
  target:
    entity_id: sensor.greenhouse_n2o
  options:
    threshold:
      type: above
      value:
        number: 630
{% endexample %}

This fires when the greenhouse N2O sensor reading rises above 630 μg/m³.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal value in μg/m³"
   example_value="630" %}

{% include triggers/targets.md entity_type="nitrous oxide sensor" example="sensor.living_room_nitrous_oxide" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- Ambient outdoor N2O levels sit around 330 ppb (about 600 μg/m³). If you are monitoring for environmental purposes, small threshold offsets above that baseline work well.
- Pair this trigger with [Nitrous oxide level changed](/triggers/air_quality.n2o_changed/) if you want to react to every change of the level instead.
- The threshold is in μg/m³. A sensor that reports N2O in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: stay on top of greenhouse air quality

Keeping N2O in check helps you maintain healthy growing conditions and track environmental trends. This automation sends a notification to your phone when the greenhouse reading rises above 630 μg/m³, so you know right away when ventilation needs attention.

- **Trigger**: Nitrous oxide level crossed threshold
  - **Target**: Greenhouse N2O sensor
  - **Threshold type**: Above 630 μg/m³
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for greenhouse N2O alert" %}

{% example %}
automation: |
  alias: "Greenhouse N2O threshold alert"
  triggers:
    - trigger: air_quality.n2o_crossed_threshold
      target:
        entity_id: sensor.greenhouse_n2o
      options:
        threshold:
          type: above
          value:
            number: 630
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "N2O threshold crossed"
        message: >
          Nitrous oxide in the greenhouse
          rose above 630 μg/m³. Check ventilation.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
