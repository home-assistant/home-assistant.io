---
title: "PM4 level changed"
trigger: air_quality.pm4_changed
domain: air_quality
description: "Triggers when one or more PM4 levels change."
related_triggers:
  - air_quality.pm4_crossed_threshold
---

The **PM4 level changed** trigger fires after the PM4 (particulate matter 4 micrometers or smaller) reading on one or more air quality sensors changes. PM4 particles come from sources like pollen, mold spores, dust, and certain industrial processes. They sit between the finer PM2.5 and the coarser PM10 range, giving you an additional view of the particles floating in your air. If you deal with seasonal allergies or live near a dusty road, tracking PM4 helps you spot irritants before your nose does.

Imagine your home office air purifier starting as soon as pollen counts rise on a spring afternoon, so you stay focused instead of reaching for tissues. Use this trigger to start filtration, log changes, or notify household members when PM4 readings change. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="PM4 level changed"
   sensor="PM4 sensor"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed level in μg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level in μg/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm4_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm4_changed
  target:
    entity_id: sensor.office_pm4
  options:
    threshold:
      type: above
      value:
        number: 10
{% endexample %}

This fires whenever the office PM4 sensor reading changes to a value above 10 μg/m³. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal value in μg/m³" %}

{% include triggers/targets.md entity_type="PM4 sensor" example="sensor.living_room_pm4" %}

## Good to know

- PM4 fills the gap between PM2.5 and PM10 measurements, which is useful if your sensor reports this size range separately.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when PM4 crosses a specific concentration in one direction, use [PM4 level crossed threshold](/triggers/air_quality.pm4_crossed_threshold/) instead.
- The threshold is in μg/m³. A sensor that reports PM4 in another unit never matches. If you use an entity as the threshold, it must also report μg/m³.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when office PM4 shifts

Allergy season and dusty days make it hard to focus when you work from home. This automation sends a notification when PM4 levels in your home office change to a value above 10 μg/m³, so you know exactly when to turn on the air purifier or crack a window.

- **Trigger**: PM4 level changed
  - **Target**: Office PM4 sensor
  - **Threshold type**: Above 10 μg/m³
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for PM4 office notification" %}

{% example %}
automation: |
  alias: "Notify on office PM4 change"
  triggers:
    - trigger: air_quality.pm4_changed
      target:
        entity_id: sensor.office_pm4
      options:
        threshold:
          type: above
          value:
            number: 10
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "PM4 change detected"
        message: "PM4 levels in the office are above 10 μg/m³. Consider turning on the air purifier."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
