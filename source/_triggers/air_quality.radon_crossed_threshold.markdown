---
title: "Radon level crossed threshold"
trigger: air_quality.radon_crossed_threshold
domain: air_quality
description: "Triggers when one or more radon levels cross a threshold."
related_triggers:
  - air_quality.radon_changed
---

The **Radon level crossed threshold** trigger fires when the radon reading on one or more air quality sensors crosses into a zone you define: above a level, below a level, into a range, or out of a range. Radon is a naturally occurring radioactive gas that rises from the soil and seeps into buildings through cracks and gaps in floors and walls. It is invisible and odorless, it collects in basements and ground-floor rooms, and long-term exposure to elevated levels increases the risk of lung cancer. Because radon fluctuates with ventilation, weather, and the seasons, a live sensor lets your home respond the moment a level becomes a concern instead of waiting for a periodic test.

Imagine your basement fan starting on its own the moment radon climbs above your limit, and a notification letting you know once it has dropped back to normal. Radon sensors report in becquerels per cubic meter (Bq/m³) or picocuries per liter (pCi/L). You can set the threshold in either unit, and Home Assistant converts between them automatically.

When you target more than one entity, the trigger's **Trigger when** option controls when it fires.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Radon level crossed threshold"
   sensor="radon sensor"
   areas="basement or bedroom"
   unit_phrase_ui="a fixed radon concentration"
   has_unit="true"
   unit_label="radon unit"
   unit_options="Bq/m³ or pCi/L" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed radon concentration"
   has_unit="true"
   unit_label="radon unit"
   unit_options_code="`Bq/m³` or `pCi/L`"
   unit_default="Bq/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.radon_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.radon_crossed_threshold
  target:
    entity_id: sensor.basement_radon
  options:
    threshold:
      type: above
      value:
        number: 100
        unit_of_measurement: "Bq/m³"
{% endexample %}

This fires at the moment the basement radon sensor crosses from 100 Bq/m³ or below to above 100 Bq/m³. It does not fire again until the reading drops back to 100 Bq/m³ or below and then crosses above it again.

To fire when the reading drops back below a level, with the threshold set in pCi/L:

{% example %}
trigger: |
  trigger: air_quality.radon_crossed_threshold
  target:
    entity_id: sensor.basement_radon
  options:
    threshold:
      type: below
      value:
        number: 2
        unit_of_measurement: "pCi/L"
{% endexample %}

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal radon concentration"
   has_unit="true"
   unit_label="radon unit"
   unit_options_code="`Bq/m³` or `pCi/L`"
   unit_default="Bq/m³"
   unit_example_entity="input_number.radon_upper_limit"
   unit_example_value="50" %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use a sensor with the radon device class as the target.
- If you use an entity as the threshold, it must report its unit of measurement as `Bq/m³` or `pCi/L`. A user-created number {% term helper %} without one of those units cannot be used as a threshold, and the trigger does not fire.
- Radon sensors report in `Bq/m³` or `pCi/L`. You can set the threshold in either unit, and Home Assistant converts the sensor reading and the threshold to the same unit before comparing them, so a sensor that reports in pCi/L works with a threshold set in Bq/m³ and the other way around. 1 pCi/L equals 37 Bq/m³.
- **Above** and **Below** fire on the crossing moment only. Once the reading is above the threshold, the trigger does not fire again until the reading dips back below it and then crosses above again.
- **In range** (`between`) fires when the reading moves from outside the bounds into the bounds. **Outside range** (`outside`) fires when the reading moves from inside the bounds past either bound.
- Radon levels fluctuate from hour to hour, so a single reading can briefly cross a threshold without a lasting change. Use **For at least** to fire only after the reading has stayed past the threshold for a while.
- The trigger only fires when a sensor transitions from a known, valid state. If a sensor comes back from being unavailable (`unavailable`) or having an unknown state (`unknown`), the trigger does not fire for that recovery.
- Guidance on indoor radon varies by country. Reference levels between 100 Bq/m³ and 300 Bq/m³ are commonly cited, and 4 pCi/L (about 150 Bq/m³) is a widely used action level. Long-term averages matter more than any single reading, so check the guidance that applies where you live before deciding on remediation.
- Pair this trigger with [Radon level changed](/triggers/air_quality.radon_changed/) if you also want to react to smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: start basement ventilation when radon crosses above 100 Bq/m³

Radon builds up in closed, low-lying rooms. This automation turns on the basement ventilation fan the moment the radon reading crosses above 100 Bq/m³, so fresh air starts moving before the level has a chance to climb further.

- **Trigger**: Radon level crossed threshold
  - **Target**: Basement radon sensor
  - **Threshold type**: Above (100 Bq/m³)
- **Action**: Turn on fan

{% details "YAML example for starting ventilation on high radon" %}

{% example %}
automation: |
  alias: "Ventilate basement on high radon"
  triggers:
    - trigger: air_quality.radon_crossed_threshold
      target:
        entity_id: sensor.basement_radon
      options:
        threshold:
          type: above
          value:
            number: 100
            unit_of_measurement: "Bq/m³"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.basement_ventilation
{% endexample %}

{% enddetails %}

### Automation: get an alert when any room stays above 4 pCi/L for an hour

Radon readings can spike briefly and settle again. This automation watches every radon sensor in the house and sends a notification only after a reading has stayed above 4 pCi/L for a full hour, so you hear about sustained elevated levels rather than a momentary blip. The threshold is set in pCi/L, and Home Assistant converts readings from sensors that report in Bq/m³ automatically.

- **Trigger**: Radon level crossed threshold
  - **Target**: All radon sensors (by label)
  - **Threshold type**: Above (4 pCi/L)
  - **For at least**: 01:00:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a sustained radon alert" %}

{% example %}
automation: |
  alias: "Alert on sustained radon above 4 pCi/L"
  triggers:
    - trigger: air_quality.radon_crossed_threshold
      target:
        label_id: radon_sensors
      options:
        threshold:
          type: above
          value:
            number: 4
            unit_of_measurement: "pCi/L"
        for: "01:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Radon level elevated"
        message: >
          {{ trigger.to_state.name }} has been above 4 pCi/L
          for the past hour. Consider improving ventilation
          and checking the long-term average.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
