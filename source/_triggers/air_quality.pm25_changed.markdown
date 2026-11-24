---
title: "PM2.5 level changed"
trigger: air_quality.pm25_changed
domain: air_quality
description: "Triggers when one or more PM2.5 levels change."
related_triggers:
  - air_quality.pm25_crossed_threshold
---

The **PM2.5 level changed** trigger fires after the PM2.5 (particulate matter 2.5 micrometers or smaller) reading on one or more air quality sensors changes. PM2.5 is the most widely tracked particle size for indoor and outdoor air quality. Sources include cooking, candles, wildfires, traffic exhaust, and dust. These fine particles are small enough to reach deep into the lungs, making them especially relevant during wildfire season, allergy season, or anytime you want to keep tabs on what your family is breathing.

Imagine your windows closing automatically the moment outdoor particle levels jump during a nearby wildfire, keeping smoke outside where it belongs. Use this trigger to turn on an air purifier, close windows, or send an alert when your PM2.5 sensor reports a change. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="PM2.5 level changed"
   sensor="PM2.5 sensor"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed level in μg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level in μg/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm25_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm25_changed
  target:
    entity_id: sensor.living_room_pm25
  options:
    threshold:
      type: above
      value:
        number: 10
{% endexample %}

This fires whenever the living room PM2.5 sensor reading changes to a value above 10 μg/m³. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal value in μg/m³" %}

{% include triggers/targets.md entity_type="PM2.5 sensor" example="sensor.living_room_pm25" %}

## Good to know

- PM2.5 is the particle size most commonly referenced in air quality indexes worldwide. A threshold of 5 to 15 μg/m³ suits most home automations.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when PM2.5 crosses a specific concentration in one direction, use [PM2.5 level crossed threshold](/triggers/air_quality.pm25_crossed_threshold/) instead.
- The threshold is in μg/m³. A sensor that reports PM2.5 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: close windows during wildfire season

When wildfire smoke rolls in, the last thing you want is to leave the windows open. This automation closes your motorized windows as soon as PM2.5 levels change to a value above 15 μg/m³, keeping smoke and fine particles outside where they belong.

- **Trigger**: PM2.5 level changed
- **Target**: Outdoor PM2.5 sensor
- **Threshold type**: Above 15 μg/m³
- **Action**: Close cover

{% details "YAML example for closing windows on PM2.5 change" %}

{% example %}
automation: |
  alias: "Close windows on PM2.5 change"
  triggers:
    - trigger: air_quality.pm25_changed
      target:
        entity_id: sensor.outdoor_pm25
      options:
        threshold:
          type: above
          value:
            number: 15
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_windows
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
