---
title: "Volatile organic compounds ratio changed"
trigger: air_quality.voc_ratio_changed
domain: air_quality
description: "Triggers when one or more volatile organic compound ratios change."
related_triggers:
  - air_quality.voc_ratio_crossed_threshold
---

The **Volatile organic compounds ratio changed** trigger fires after the <abbr title="volatile organic compounds">VOC</abbr> ratio reading on one or more air quality sensors changes. Some sensors report VOCs as a ratio: their share of the air, in parts per billion (ppb) or parts per million (ppm), instead of their mass in μg/m³. A rising ratio means the air quality is getting worse. It is particularly handy for tracking off-gassing from new furniture, fresh paint, or cleaning products over time.

Imagine getting a notification the moment your living room air quality starts dipping after you've finished cleaning, so you know to crack a window. Use this trigger to automate ventilation, send alerts, or log trends. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Volatile organic compounds ratio changed"
   sensor="VOC ratio sensor"
   areas="living room or bedroom"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="ratio unit"
   unit_options="ppb or ppm" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="ratio unit"
   unit_options_code="`ppb` or `ppm`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.voc_ratio_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.voc_ratio_changed
  target:
    entity_id: sensor.living_room_voc_ratio
  options:
    threshold:
      type: above
      value:
        number: 150
        unit_of_measurement: "ppb"
{% endexample %}

This fires whenever the living room VOC ratio changes to a value above 150 ppb. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="ratio unit"
   unit_options_code="`ppb` or `ppm`"
   unit_default="ppb"
   unit_example_entity="input_number.voc_ratio_alert_level"
   unit_example_value="60"
   entity_unit_note="When using the `entity` key, Home Assistant converts the value from the entity's unit: `ppb`, `ppm`, or `%`. An entity without a unit is read as a plain ratio, so 150 ppb is `0.00000015`." %}

{% include triggers/targets.md entity_type="volatile organic compounds ratio sensor" example="sensor.living_room_voc_ratio" %}

## Good to know

- The VOC ratio provides a relative reading. A rising ratio means air quality is degrading compared to the sensor's baseline.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new ratio is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when the VOC ratio crosses a specific value in one direction, use [Volatile organic compounds ratio crossed threshold](/triggers/air_quality.voc_ratio_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: alert when living room air quality shifts

Maybe someone just sprayed cleaning solution, or the new couch is off-gassing. This automation sends a notification when the VOC ratio in the living room changes to a value above 150 ppb, so you know to investigate the cause and open a window.

- **Trigger**: Volatile organic compounds ratio changed
  - **Target**: Living room VOC ratio sensor
  - **Threshold type**: Above 150 ppb
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for VOC ratio alert" %}

{% example %}
automation: |
  alias: "Alert on VOC ratio change"
  triggers:
    - trigger: air_quality.voc_ratio_changed
      target:
        entity_id: sensor.living_room_voc_ratio
      options:
        threshold:
          type: above
          value:
            number: 150
            unit_of_measurement: "ppb"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "VOC ratio changed"
        message: "The VOC ratio in the living room is above 150 ppb. Check ventilation."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
