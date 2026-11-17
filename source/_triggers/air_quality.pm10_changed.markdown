---
title: "PM10 level changed"
trigger: air_quality.pm10_changed
domain: air_quality
description: "Triggers when one or more PM10 levels change."
related_triggers:
  - air_quality.pm10_crossed_threshold
---

The **PM10 level changed** trigger fires after the PM10 (particulate matter 10 micrometers or smaller) reading on one or more air quality sensors changes. PM10 includes dust, pollen, mold spores, and other coarse particles that are stirred up by wind, traffic, construction, and household activities like vacuuming or sweeping. Spring pollen, a windy day, or a renovation project next door all send PM10 readings climbing.

Imagine your robot vacuum automatically heading out for a cleanup when dust from a nearby construction site drifts in, without you having to remember. Use this trigger to start an air purifier, close windows, or send a reminder when PM10 readings change. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="PM10 level changed"
   sensor="PM10 sensor"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed level in μg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level in μg/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm10_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm10_changed
  target:
    entity_id: sensor.hallway_pm10
  options:
    threshold:
      type: above
      value:
        number: 20
{% endexample %}

This fires whenever the hallway PM10 sensor reading changes to a value above 20 μg/m³. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal value in μg/m³" %}

{% include triggers/targets.md entity_type="PM10 sensor" example="sensor.living_room_pm10" %}

## Good to know

- PM10 levels tend to spike during spring pollen season, construction work nearby, or windy days. A threshold of 10 to 25 μg/m³ works well for most home automations.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when PM10 crosses a specific concentration in one direction, use [PM10 level crossed threshold](/triggers/air_quality.pm10_crossed_threshold/) instead.
- The threshold is in μg/m³. A sensor that reports PM10 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: run the robot vacuum when dust levels rise

A construction project nearby or a windy spring day sends dust everywhere. This automation dispatches the robot vacuum when PM10 levels in the hallway change to a value above 25 μg/m³, cleaning up the dust so you don't have to think about it.

- **Trigger**: PM10 level changed
- **Target**: Hallway PM10 sensor
- **Threshold type**: Above 25 μg/m³
- **Action**: Start vacuum cleaner

{% details "YAML example for PM10-triggered vacuuming" %}

{% example %}
automation: |
  alias: "Vacuum on PM10 change"
  triggers:
    - trigger: air_quality.pm10_changed
      target:
        entity_id: sensor.hallway_pm10
      options:
        threshold:
          type: above
          value:
            number: 25
  actions:
    - action: vacuum.start
      target:
        entity_id: vacuum.robot
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
