---
title: "PM1 level crossed threshold"
trigger: air_quality.pm1_crossed_threshold
domain: air_quality
description: "Triggers when one or more PM1 levels cross a threshold."
related_triggers:
  - air_quality.pm1_changed
---

The **PM1 level crossed threshold** trigger fires when the PM1 (particulate matter 1 micrometer or smaller) reading on one or more air quality sensors crosses a specific level. PM1 particles are ultrafine, small enough to pass deep into the lungs and even enter the bloodstream. Everyday activities like burning candles, cooking, and using a fireplace produce these tiny particles.

With this trigger, your air purifier switches on the second PM1 rises above your chosen limit, clearing the air before you even notice a difference. You also get the option to send a notification to your phone when candle smoke or cooking pushes ultrafine particles past a safe level, giving you peace of mind that the air your family breathes is being watched around the clock.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="PM1 level crossed threshold"
   sensor="PM1 sensor"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed level in μg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level in μg/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm1_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm1_crossed_threshold
  target:
    entity_id: sensor.living_room_pm1
  options:
    threshold:
      type: above
      value:
        number: 25
{% endexample %}

This fires when the living room PM1 sensor reading rises above 25 μg/m³.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal value in μg/m³"
   example_value="25" %}

{% include triggers/targets.md entity_type="PM1 sensor" example="sensor.living_room_pm1" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- PM1 is one of the finest fractions of particulate matter. If your sensor also reports PM2.5 or PM10, you get a fuller picture of air quality by combining triggers for each size.
- Pair this trigger with [PM1 level changed](/triggers/air_quality.pm1_changed/) if you want to react to every change of the level instead.
- The threshold is in μg/m³. A sensor that reports PM1 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: start the air purifier when ultrafine particles rise

Candles, cooking, and fireplaces all release ultrafine particles that are invisible but still matter. This automation starts the living room air purifier the moment PM1 rises above 25 μg/m³, clearing the air before you notice a thing.

- **Trigger**: PM1 level crossed threshold
- **Target**: Living room PM1 sensor
- **Threshold type**: Above 25 μg/m³
- **Trigger when**: Each
- **Action**: Turn on switch (air purifier)

{% details "YAML example for PM1-based air purifier" %}

{% example %}
automation: |
  alias: "Air purifier on high PM1"
  triggers:
    - trigger: air_quality.pm1_crossed_threshold
      target:
        entity_id: sensor.living_room_pm1
      options:
        threshold:
          type: above
          value:
            number: 25
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.living_room_air_purifier
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
