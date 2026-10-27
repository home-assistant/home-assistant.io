---
title: "Nitrous oxide level changed"
trigger: air_quality.n2o_changed
domain: air_quality
description: "Triggers when one or more nitrous oxide levels change."
related_triggers:
  - air_quality.n2o_crossed_threshold
---

The **Nitrous oxide level changed** trigger fires after the nitrous oxide (N2O) reading on one or more air quality sensors changes. Nitrous oxide is a potent greenhouse gas produced by agricultural activities, industrial processes, and combustion of fossil fuels. While it is less commonly monitored at home than other pollutants, specialized sensors track it in greenhouses, workshops near agricultural operations, and laboratory or medical settings.

Imagine your greenhouse ventilation fans spinning up automatically when N2O rises after a round of fertilizing, keeping the growing environment healthy without an extra trip outside. Use this trigger to log environmental data, activate ventilation, or send alerts when your N2O sensor reports a change. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Nitrous oxide level changed"
   sensor="nitrous oxide sensor"
   areas="greenhouse or workshop"
   unit_phrase_ui="a fixed level in μg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level in μg/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.n2o_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.n2o_changed
  target:
    entity_id: sensor.greenhouse_n2o
  options:
    threshold:
      type: above
      value:
        number: 900
{% endexample %}

This fires whenever the greenhouse N2O sensor reading changes to a value above 900 μg/m³. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal value in μg/m³" %}

{% include triggers/targets.md entity_type="nitrous oxide sensor" example="sensor.living_room_nitrous_oxide" %}

## Good to know

- Nitrous oxide is a potent greenhouse gas with roughly 300 times the warming potential of carbon dioxide. Monitoring it is valuable for environmental tracking.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when N2O crosses a specific concentration in one direction, use [Nitrous oxide level crossed threshold](/triggers/air_quality.n2o_crossed_threshold/) instead.
- The threshold is in μg/m³. A sensor that reports N2O in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: ventilate the greenhouse on N2O change

After fertilizing, N2O levels in a greenhouse tend to climb. This automation turns on the ventilation fans when N2O levels change to a value above 900 μg/m³, keeping the growing environment healthy for your plants without an extra trip outside to check.

- **Trigger**: Nitrous oxide level changed
  - **Target**: Greenhouse N2O sensor
  - **Threshold type**: Above 900 μg/m³
- **Action**: Turn on fan

{% details "YAML example for N2O greenhouse ventilation" %}

{% example %}
automation: |
  alias: "Ventilate greenhouse on N2O change"
  triggers:
    - trigger: air_quality.n2o_changed
      target:
        entity_id: sensor.greenhouse_n2o
      options:
        threshold:
          type: above
          value:
            number: 900
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.greenhouse_ventilation
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
