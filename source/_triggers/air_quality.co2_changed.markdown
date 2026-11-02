---
title: "Carbon dioxide level changed"
trigger: air_quality.co2_changed
domain: air_quality
description: "Triggers when one or more carbon dioxide levels change."
related_triggers:
  - air_quality.co2_crossed_threshold
---

The **Carbon dioxide level changed** trigger fires after the carbon dioxide (CO2) reading on one or more air quality sensors changes. Carbon dioxide builds up naturally in occupied rooms from breathing, cooking, and heating. A bedroom with the door closed overnight or a packed meeting room after lunch are classic spots where CO2 creeps up without anyone noticing. Rising CO2 is one of the clearest signs that a space needs fresh air.

Imagine your bedroom ventilation fan spinning up automatically in the middle of the night because CO2 climbed while you slept, so you wake up feeling refreshed instead of groggy. Use this trigger to automate ventilation, log indoor air quality trends, or remind household members to open a window when CO2 rises. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Carbon dioxide level changed"
   sensor="carbon dioxide sensor"
   areas="bedroom or office"
   unit_phrase_ui="a fixed level in ppm" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level in ppm" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.co2_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.co2_changed
  target:
    entity_id: sensor.bedroom_co2
  options:
    threshold:
      type: above
      value:
        number: 1000
{% endexample %}

This fires whenever the bedroom CO2 sensor reading changes to a value above 1000 ppm. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal value in ppm" %}

{% include triggers/targets.md entity_type="carbon dioxide sensor" example="sensor.living_room_co2" %}

## Good to know

- Indoor CO2 levels typically range from about 400 ppm (well-ventilated) to over 1,000 ppm (stuffy room). A threshold around 800 to 1,000 ppm works well for most ventilation automations.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- The threshold is in ppm. A sensor that reports CO2 in another unit never matches. If you use an entity as the threshold, it must also report ppm.
- To react only when CO2 crosses a specific level in one direction, use [Carbon dioxide level crossed threshold](/triggers/air_quality.co2_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: ventilate when bedroom CO2 rises

Sleeping in a closed bedroom builds up CO2 overnight, leaving you groggy in the morning. This automation turns on the bedroom ventilation fan whenever the CO2 level changes to a value above 1000 ppm, keeping the air fresh so you wake up feeling rested.

- **Trigger**: Carbon dioxide level changed
- **Target**: Bedroom CO2 sensor
- **Threshold type**: Above 1000 ppm
- **Action**: Turn on fan

{% details "YAML example for CO2-based bedroom ventilation" %}

{% example %}
automation: |
  alias: "Ventilate bedroom on CO2 change"
  triggers:
    - trigger: air_quality.co2_changed
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
