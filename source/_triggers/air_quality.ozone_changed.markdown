---
title: "Ozone level changed"
trigger: air_quality.ozone_changed
domain: air_quality
description: "Triggers when one or more ozone levels change."
related_triggers:
  - air_quality.ozone_crossed_threshold
---

The **Ozone level changed** trigger fires after the ozone (O3) reading on one or more air quality sensors changes. Ground-level ozone forms when sunlight reacts with pollutants from vehicles and industry. It is the primary ingredient in smog and tends to peak on hot, sunny afternoons. If you enjoy opening the windows on a warm day, ozone monitoring helps you decide whether the outdoor air is actually better than what's already inside.

Imagine your HVAC switching to recirculation mode on a scorching summer afternoon because ozone levels shifted, keeping your family comfortable without pulling smoggy air indoors. Use this trigger to close windows, pause outdoor ventilation, or send a health reminder when ozone readings change. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Ozone level changed"
   sensor="ozone sensor"
   areas="backyard or living room"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb, ppm, or μg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, or `μg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.ozone_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.ozone_changed
  target:
    entity_id: sensor.backyard_ozone
  options:
    threshold:
      type: above
      value:
        number: 50
        unit_of_measurement: "ppb"
{% endexample %}

This fires whenever the backyard ozone sensor reading changes to a value above 50 ppb. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, or `μg/m³`"
   unit_default="ppb"
   unit_example_entity="input_number.ozone_alert_level"
   unit_example_value="70" %}

{% include triggers/targets.md entity_type="ozone sensor" example="sensor.living_room_ozone" %}

## Good to know

- Ozone levels are highest on warm, sunny days with little wind. Monitoring helps you decide when to keep windows closed and rely on indoor filtration.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when ozone crosses a specific concentration in one direction, use [Ozone level crossed threshold](/triggers/air_quality.ozone_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: pause fresh-air intake on ozone change

On a scorching summer afternoon, ground-level ozone peaks just when you want fresh air the most. This automation switches the HVAC system to recirculation mode when the outdoor ozone reading changes to a value above 50 ppb, so you stop pulling smoggy air indoors.

- **Trigger**: Ozone level changed
  - **Target**: Outdoor ozone sensor
  - **Threshold type**: Above 50 ppb
- **Action**: Set thermostat preset mode

{% details "YAML example for ozone-driven HVAC recirculation" %}

{% example %}
automation: |
  alias: "Recirculate on ozone change"
  triggers:
    - trigger: air_quality.ozone_changed
      target:
        entity_id: sensor.backyard_ozone
      options:
        threshold:
          type: above
          value:
            number: 50
            unit_of_measurement: "ppb"
  actions:
    - action: climate.set_preset_mode
      target:
        entity_id: climate.hvac
      data:
        preset_mode: "recirculate"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
