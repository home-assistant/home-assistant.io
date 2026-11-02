---
title: "Nitrogen monoxide level changed"
trigger: air_quality.no_changed
domain: air_quality
description: "Triggers when one or more nitrogen monoxide levels change."
related_triggers:
  - air_quality.no_crossed_threshold
---

The **Nitrogen monoxide level changed** trigger fires after the nitrogen monoxide (NO) reading on one or more air quality sensors changes. Nitrogen monoxide is a reactive gas produced mainly by vehicle engines and combustion processes. It quickly converts to nitrogen dioxide in the atmosphere and plays a key role in smog formation. If you live near a busy road or intersection, rush-hour traffic sends NO levels climbing, and that pollution easily seeps indoors through open windows.

Imagine your home automatically logging pollution patterns near the driveway so you know which hours to keep the windows shut. Use this trigger to track pollution data, activate ventilation, or send alerts. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Nitrogen monoxide level changed"
   sensor="nitrogen monoxide sensor"
   areas="driveway or garage"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb or μg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb` or `μg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.no_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.no_changed
  target:
    entity_id: sensor.driveway_no
  options:
    threshold:
      type: above
      value:
        number: 10
        unit_of_measurement: "ppb"
{% endexample %}

This fires whenever the driveway NO sensor reading changes to a value above 10 ppb. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb` or `μg/m³`"
   unit_default="ppb"
   unit_example_entity="input_number.no_alert_level"
   unit_example_value="40" %}

{% include triggers/targets.md entity_type="nitrogen monoxide sensor" example="sensor.living_room_nitrogen_monoxide" %}

## Good to know

- Nitrogen monoxide levels spike near busy roads and during rush hour. Monitoring helps you time ventilation to avoid peak traffic pollution.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when NO crosses a specific concentration in one direction, use [Nitrogen monoxide level crossed threshold](/triggers/air_quality.no_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: log roadside pollution changes

Rush-hour traffic sends NO levels spiking near the road, and knowing the pattern helps you decide when to open or close the windows. This automation records a log entry whenever the nitrogen monoxide level near the driveway changes to a value above 10 ppb, helping you spot pollution trends over time.

- **Trigger**: Nitrogen monoxide level changed
  - **Target**: Driveway NO sensor
  - **Threshold type**: Above 10 ppb
- **Action**: Activity: Log activity

{% details "YAML example for NO pollution logging" %}

{% example %}
automation: |
  alias: "Log NO level changes"
  triggers:
    - trigger: air_quality.no_changed
      target:
        entity_id: sensor.driveway_no
      options:
        threshold:
          type: above
          value:
            number: 10
            unit_of_measurement: "ppb"
  actions:
    - action: logbook.log
      data:
        name: "Air quality"
        message: "Nitrogen monoxide level near the driveway is above 10 ppb."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
