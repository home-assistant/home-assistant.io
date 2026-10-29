---
title: "Volatile organic compounds level changed"
trigger: air_quality.voc_changed
domain: air_quality
description: "Triggers when one or more volatile organic compound levels change."
related_triggers:
  - air_quality.voc_crossed_threshold
---

The **Volatile organic compounds level changed** trigger fires after the <abbr title="volatile organic compounds">VOC</abbr> reading on one or more air quality sensors changes. Volatile organic compounds are gases released by paints, cleaning products, adhesives, new furniture, cooking, and many building materials. That "new furniture smell" or the sharp scent of a freshly cleaned bathroom? Those are VOCs. Elevated levels affect indoor air quality and comfort, and prolonged exposure is a health concern.

Imagine the exhaust fan in your freshly painted room switching on automatically as fumes build up, clearing the air so you don't have to keep checking. Use this trigger to boost ventilation, turn on an air purifier, or log air quality changes. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Volatile organic compounds level changed"
   sensor="VOC sensor"
   areas="kitchen or workshop"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="μg/m³ or mg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`μg/m³` or `mg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.voc_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.voc_changed
  target:
    entity_id: sensor.kitchen_voc
  options:
    threshold:
      type: above
      value:
        number: 50
        unit_of_measurement: "μg/m³"
{% endexample %}

This fires whenever the kitchen VOC sensor reading changes to a value above 50 μg/m³. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`μg/m³` or `mg/m³`"
   unit_default="μg/m³"
   unit_example_entity="input_number.voc_alert_level"
   unit_example_value="500" %}

{% include triggers/targets.md entity_type="volatile organic compounds sensor" example="sensor.living_room_voc" %}

## Good to know

- VOC sensors are especially useful in kitchens, bathrooms, and newly renovated rooms where off-gassing is common.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when VOC levels cross a specific concentration in one direction, use [Volatile organic compounds level crossed threshold](/triggers/air_quality.voc_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: ventilate after painting

A freshly painted room smells exciting at first, but those fumes are VOCs you don't want to breathe for hours. This automation turns on the exhaust fan when the VOC level changes to a value above 100 μg/m³, helping clear the fumes faster so the room is ready to enjoy sooner.

- **Trigger**: Volatile organic compounds level changed
  - **Target**: Workshop VOC sensor
  - **Threshold type**: Above 100 μg/m³
- **Action**: Turn on fan

{% details "YAML example for VOC-driven ventilation" %}

{% example %}
automation: |
  alias: "Ventilate on VOC change"
  triggers:
    - trigger: air_quality.voc_changed
      target:
        entity_id: sensor.workshop_voc
      options:
        threshold:
          type: above
          value:
            number: 100
            unit_of_measurement: "μg/m³"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.workshop_exhaust
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
