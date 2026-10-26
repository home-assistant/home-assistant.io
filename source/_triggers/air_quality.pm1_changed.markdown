---
title: "PM1 level changed"
trigger: air_quality.pm1_changed
domain: air_quality
description: "Triggers when one or more PM1 levels change."
related_triggers:
  - air_quality.pm1_crossed_threshold
---

The **PM1 level changed** trigger fires after the PM1 (particulate matter 1 micrometer or smaller) reading on one or more air quality sensors changes. PM1 particles are ultrafine and originate from combustion, vehicle exhaust, and industrial emissions. Because of their tiny size, they penetrate deep into the lungs and bloodstream. Cooking on a gas stove, nearby traffic, or a wildfire miles away all push PM1 levels up inside your home.

Imagine your nursery air purifier ramping up the moment particle levels shift, keeping the air as clean as possible for little ones without you doing anything. Use this trigger to start an air purifier, adjust HVAC filtration, or log particle count changes. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="PM1 level changed"
   sensor="PM1 sensor"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed level in μg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level in μg/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm1_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm1_changed
  target:
    entity_id: sensor.living_room_pm1
  options:
    threshold:
      type: above
      value:
        number: 5
{% endexample %}

This fires whenever the living room PM1 sensor reading changes to a value above 5 μg/m³. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal value in μg/m³" %}

{% include triggers/targets.md entity_type="PM1 sensor" example="sensor.living_room_pm1" %}

## Good to know

- PM1 particles are the smallest commonly measured particulate matter. They are especially relevant for respiratory health.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when PM1 crosses a specific concentration in one direction, use [PM1 level crossed threshold](/triggers/air_quality.pm1_crossed_threshold/) instead.
- The threshold is in μg/m³. A sensor that reports PM1 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: boost the air purifier when PM1 shifts

Ultrafine particles from cooking or traffic drift into every room, and tiny lungs are the most vulnerable. This automation increases your air purifier speed whenever PM1 levels in the nursery change to a value above 5 μg/m³, keeping the air as clean as possible for little ones.

- **Trigger**: PM1 level changed
  - **Target**: Nursery PM1 sensor
  - **Threshold type**: Above 5 μg/m³
- **Action**: Set fan speed
  - **Target**: Nursery air purifier
  - **Percentage**: `80`%

{% details "YAML example for PM1-driven air purifier boost" %}

{% example %}
automation: |
  alias: "Boost purifier on PM1 change"
  triggers:
    - trigger: air_quality.pm1_changed
      target:
        entity_id: sensor.nursery_pm1
      options:
        threshold:
          type: above
          value:
            number: 5
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.nursery_air_purifier
      data:
        percentage: 80
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
