---
title: "PM2.5 level crossed threshold"
trigger: air_quality.pm25_crossed_threshold
domain: air_quality
description: "Triggers when one or more PM2.5 levels cross a threshold."
related_triggers:
  - air_quality.pm25_changed
---

The **PM2.5 level crossed threshold** trigger fires when the PM2.5 (particulate matter 2.5 micrometers or smaller) reading on one or more air quality sensors crosses a specific level. PM2.5 is one of the most widely tracked air quality metrics because these fine particles travel deep into the lungs and affect your health. When PM2.5 rises above 25 μg/m³, air quality is already poor enough to bother sensitive groups, including children and anyone with asthma or allergies.

Have your air purifier start the second PM2.5 rises above the safe limit, or close your windows automatically when wildfire smoke pushes outdoor readings into unhealthy territory. You also get a notification on your phone so you always know what is happening, whether you are at home or away. This trigger helps your home react to air quality changes faster than you ever could on your own.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="PM2.5 level crossed threshold"
   sensor="PM2.5 sensor"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed level in μg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level in μg/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm25_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm25_crossed_threshold
  target:
    entity_id: sensor.outdoor_pm25
  options:
    threshold:
      type: above
      value:
        number: 35
{% endexample %}

This fires when the outdoor PM2.5 sensor reading rises above 35 μg/m³.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal value in μg/m³"
   example_value="35" %}

{% include triggers/targets.md entity_type="PM2.5 sensor" example="sensor.living_room_pm25" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- The WHO guideline for 24-hour average PM2.5 exposure is 15 μg/m³. Many people use a threshold between 25 and 50 μg/m³ for automations depending on their sensitivity and local conditions.
- Pair this trigger with [PM2.5 level changed](/triggers/air_quality.pm25_changed/) if you want to react to every change of the level instead.
- The threshold is in μg/m³. A sensor that reports PM2.5 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: close windows when outdoor pollution rises

Wildfire smoke, traffic exhaust, and smog all push PM2.5 to unhealthy levels. This automation closes your smart windows the moment outdoor PM2.5 rises above 35 μg/m³, sealing your home off from pollution before it drifts inside.

- **Trigger**: PM2.5 level crossed threshold
- **Target**: Outdoor PM2.5 sensor
- **Threshold type**: Above 35 μg/m³
- **Trigger when**: Each
- **Action**: Close cover (windows)

{% details "YAML example for closing windows on high PM2.5" %}

{% example %}
automation: |
  alias: "Close windows on high PM2.5"
  triggers:
    - trigger: air_quality.pm25_crossed_threshold
      target:
        entity_id: sensor.outdoor_pm25
      options:
        threshold:
          type: above
          value:
            number: 35
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_windows
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
