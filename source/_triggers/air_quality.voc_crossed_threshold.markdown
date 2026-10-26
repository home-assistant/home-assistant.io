---
title: "Volatile organic compounds level crossed threshold"
trigger: air_quality.voc_crossed_threshold
domain: air_quality
description: "Triggers when one or more volatile organic compounds levels cross a threshold."
related_triggers:
  - air_quality.voc_changed
---

The **Volatile organic compounds level crossed threshold** trigger fires when the <abbr title="volatile organic compounds">VOC</abbr> reading on one or more air quality sensors crosses a specific level. VOCs are invisible gases released by paints, cleaning products, new furniture, adhesives, and many everyday household items. When VOC levels climb above comfortable limits, you might notice headaches, eye irritation, or a general feeling that something is "off" about the air.

With this trigger, your ventilation starts automatically the moment VOC readings cross your chosen limit, whether that spike comes from mopping the floor or painting a room. You also get a notification on your phone right away, so you know exactly when to step outside for fresh air. Your home takes care of indoor air quality in the background, so you do not have to keep checking a sensor yourself.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Volatile organic compounds level crossed threshold"
   sensor="VOC sensor"
   areas="office or bedroom"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="μg/m³ or mg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`μg/m³` or `mg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.voc_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.voc_crossed_threshold
  target:
    entity_id: sensor.office_voc
  options:
    threshold:
      type: above
      value:
        number: 300
        unit_of_measurement: "μg/m³"
{% endexample %}

This fires when the office VOC sensor reading rises above 300 μg/m³.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`μg/m³` or `mg/m³`"
   unit_default="μg/m³"
   unit_example_entity="input_number.voc_alert_level"
   unit_example_value="500" %}

{% include triggers/targets.md entity_type="volatile organic compounds sensor" example="sensor.living_room_voc" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- VOC readings often spike after cleaning, painting, or cooking. A threshold that matches your normal baseline helps avoid false alarms during everyday activities.
- Pair this trigger with [Volatile organic compounds level changed](/triggers/air_quality.voc_changed/) if you want to react to every change of the level instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: keep your home office comfortable during long work sessions

Hours of focused work in a closed room lets VOCs build up from furniture, carpet, and electronics. This automation opens the office ventilation when the VOC reading rises above 300 μg/m³, keeping the air fresh so you stay focused and headache-free.

- **Trigger**: Volatile organic compounds level crossed threshold
  - **Target**: Office VOC sensor
  - **Threshold type**: Above 300 μg/m³
  - **Trigger when**: Each
- **Action**: Turn on fan (office ventilation)

{% details "YAML example for VOC-based office ventilation" %}

{% example %}
automation: |
  alias: "Office ventilation on high VOC"
  triggers:
    - trigger: air_quality.voc_crossed_threshold
      target:
        entity_id: sensor.office_voc
      options:
        threshold:
          type: above
          value:
            number: 300
            unit_of_measurement: "μg/m³"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.office_ventilation
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
