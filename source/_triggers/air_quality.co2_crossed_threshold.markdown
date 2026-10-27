---
title: "Carbon dioxide level crossed threshold"
trigger: air_quality.co2_crossed_threshold
domain: air_quality
description: "Triggers when one or more carbon dioxide levels cross a threshold."
related_triggers:
  - air_quality.co2_changed
---

The **Carbon dioxide level crossed threshold** trigger fires when a carbon dioxide (CO2) reading on one or more air quality sensors crosses a specific level. CO2 builds up naturally in occupied rooms from breathing, cooking, and heating. Once levels climb above 1,000 ppm, a room feels stuffy, concentration drops, and it is time to let in fresh air.

Picture your bedroom ventilation fan switching on automatically the moment CO2 rises above 1,000 ppm while you sleep, keeping the air fresh without you lifting a finger. Or getting a gentle reminder on your phone to crack a window when the living room gets stuffy during a gathering. This trigger lets your home respond to stale air the instant it becomes a problem.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Carbon dioxide level crossed threshold"
   sensor="carbon dioxide sensor"
   areas="bedroom or office"
   unit_phrase_ui="a fixed level in ppm" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level in ppm" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.co2_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.co2_crossed_threshold
  target:
    entity_id: sensor.bedroom_co2
  options:
    threshold:
      type: above
      value:
        number: 1000
{% endexample %}

This fires when the bedroom CO2 sensor reading rises above 1,000 ppm.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal value in ppm"
   example_value="1000" %}

{% include triggers/targets.md entity_type="carbon dioxide sensor" example="sensor.living_room_co2" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- Indoor CO2 typically ranges from about 400 ppm (well-ventilated) to over 1,000 ppm (stuffy room). A threshold around 800 to 1,000 ppm works well for most ventilation automations.
- Pair this trigger with [Carbon dioxide level changed](/triggers/air_quality.co2_changed/) if you want to react to every change of the level instead.
- The threshold is in ppm. A sensor that reports CO2 in another unit never matches. If you use an entity as the threshold, it must also report ppm.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: keep the bedroom fresh while you sleep

Stuffy air makes for restless nights. This automation turns on the bedroom ventilation fan when CO2 rises above 1,000 ppm, so you wake up feeling refreshed instead of groggy.

- **Trigger**: Carbon dioxide level crossed threshold
- **Target**: Bedroom CO2 sensor
- **Threshold type**: Above 1000 ppm
- **Trigger when**: Each
- **Action**: Turn on fan

{% details "YAML example for CO2-based bedroom ventilation" %}

{% example %}
automation: |
  alias: "Ventilate bedroom on high CO2"
  triggers:
    - trigger: air_quality.co2_crossed_threshold
      target:
        entity_id: sensor.bedroom_co2
      options:
        threshold:
          type: above
          value:
            number: 1000
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_ventilation
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
