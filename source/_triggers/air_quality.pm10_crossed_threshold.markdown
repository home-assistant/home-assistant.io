---
title: "PM10 level crossed threshold"
trigger: air_quality.pm10_crossed_threshold
domain: air_quality
description: "Triggers when one or more PM10 levels cross a threshold."
related_triggers:
  - air_quality.pm10_changed
---

The **PM10 level crossed threshold** trigger fires when the PM10 (particulate matter 10 micrometers or smaller) reading on one or more air quality sensors crosses a specific level. PM10 includes coarser particles like dust, pollen, and mold spores that irritate the nose, throat, and airways. Levels tend to spike during construction work, dry windy days, and seasonal pollen peaks.

Get a heads-up on your phone the moment outdoor PM10 rises above 50 μg/m³, so you know to keep the windows shut on a high-pollen day. Or have your smart windows close automatically when a dust storm rolls in. This trigger is especially helpful during allergy season, letting your home shield you from airborne irritants before they become a problem.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="PM10 level crossed threshold"
   sensor="PM10 sensor"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed level in μg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level in μg/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm10_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm10_crossed_threshold
  target:
    entity_id: sensor.patio_pm10
  options:
    threshold:
      type: above
      value:
        number: 50
{% endexample %}

This fires when the patio PM10 sensor reading rises above 50 μg/m³.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal value in μg/m³"
   example_value="50" %}

{% include triggers/targets.md entity_type="PM10 sensor" example="sensor.living_room_pm10" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- The WHO guideline for 24-hour average PM10 exposure is 45 μg/m³. A threshold between 45 and 100 μg/m³ is a reasonable starting point depending on your local environment.
- Pair this trigger with [PM10 level changed](/triggers/air_quality.pm10_changed/) if you want to react to every change of the level instead.
- The threshold is in μg/m³. A sensor that reports PM10 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get a pollen season heads-up on your phone

Allergy season is tough enough without guessing whether the air outside is safe. This automation sends a notification to your phone when outdoor PM10 rises above 50 μg/m³, so you know to keep the windows shut and stay comfortable indoors.

- **Trigger**: PM10 level crossed threshold
  - **Target**: Patio PM10 sensor
  - **Threshold type**: Above 50 μg/m³
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for PM10 pollen season alert" %}

{% example %}
automation: |
  alias: "PM10 pollen season alert"
  triggers:
    - trigger: air_quality.pm10_crossed_threshold
      target:
        entity_id: sensor.patio_pm10
      options:
        threshold:
          type: above
          value:
            number: 50
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "High PM10 outside"
        message: >
          Outdoor PM10 rose above 50 μg/m³.
          Consider keeping windows closed.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
