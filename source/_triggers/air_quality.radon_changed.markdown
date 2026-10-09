---
title: "Radon level changed"
trigger: air_quality.radon_changed
domain: air_quality
description: "Triggers when one or more radon levels change."
related_triggers:
  - air_quality.radon_crossed_threshold
---

The **Radon level changed** trigger fires after the radon reading on one or more air quality sensors changes. Radon is a naturally occurring radioactive gas that rises from the soil and seeps into buildings through cracks and gaps in floors and walls, so it tends to collect in basements, crawl spaces, and ground-floor rooms. You cannot see or smell it, and long-term exposure to elevated levels increases the risk of lung cancer. Indoor radon levels also drift up and down over the day with ventilation, weather, and soil conditions, so a live sensor tells you far more than a one-time test.

Use the threshold type to decide which changes matter. Fire on any change to track trends, or only when the new reading lands above or below a level you choose. Imagine your basement ventilation fan switching on by itself as soon as a reading comes in above your limit, or a notification with the latest value while levels stay elevated. Radon sensors report in becquerels per cubic meter (Bq/m³) or picocuries per liter (pCi/L). You can set the threshold in either unit, and Home Assistant converts between them automatically.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Radon level changed"
   sensor="radon sensor"
   areas="basement or bedroom"
   unit_phrase_ui="a fixed radon concentration"
   has_unit="true"
   unit_label="radon unit"
   unit_options="Bq/m³ or pCi/L" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed radon concentration"
   has_unit="true"
   unit_label="radon unit"
   unit_options_code="`Bq/m³` or `pCi/L`"
   unit_default="Bq/m³" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.radon_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.radon_changed
  target:
    entity_id: sensor.basement_radon
  options:
    threshold:
      type: above
      value:
        number: 100
        unit_of_measurement: "Bq/m³"
{% endexample %}

This fires whenever the basement radon sensor reading changes to a value above 100 Bq/m³. If the sensor reports in pCi/L, Home Assistant converts the reading before comparing it.

To fire on every change, regardless of direction or the new value, use `type: any` and omit `value`:

{% example %}
trigger: |
  trigger: air_quality.radon_changed
  target:
    entity_id: sensor.basement_radon
  options:
    threshold:
      type: any
{% endexample %}

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal radon concentration"
   has_unit="true"
   strict_unit="true"
   unit_label="radon unit"
   unit_options_code="`Bq/m³` or `pCi/L`"
   unit_default="Bq/m³"
   unit_example_entity="input_number.radon_reference_level"
   unit_example_value="300" %}

{% include triggers/targets.md %}

## Good to know

- Use a sensor with the radon device class as the target.
- If you use an entity as the threshold, it must report its unit of measurement as `Bq/m³` or `pCi/L`. A user-created number {% term helper %} without one of those units cannot be used as a threshold, and the trigger does not fire.
- Radon sensors report in `Bq/m³` or `pCi/L`. You can set the threshold in either unit, and Home Assistant converts the sensor reading and the threshold to the same unit before comparing them, so a sensor that reports in pCi/L works with a threshold set in Bq/m³ and the other way around. 1 pCi/L equals 37 Bq/m³.
- The threshold type controls both the direction and the landing zone of the change. Use **Above** or **Below** to filter by direction, **In range** to fire only when the new value is inside a range, and **Outside range** to fire only when it escapes a range.
- Use **Any change** to fire on every change regardless of direction or where the new value lands.
- The trigger only fires when a sensor transitions from a known, valid state. If a sensor comes back from being unavailable (`unavailable`) or having an unknown state (`unknown`), the trigger does not fire for that recovery.
- Guidance on indoor radon varies by country. Reference levels between 100 Bq/m³ and 300 Bq/m³ are commonly cited, and 4 pCi/L (about 150 Bq/m³) is a widely used action level. Radon fluctuates from hour to hour and season to season, so look at long-term averages before deciding on remediation, and check the guidance that applies where you live.
- To react only when radon first crosses a specific level, use [Radon level crossed threshold](/triggers/air_quality.radon_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: keep the basement ventilated while radon stays high

Radon collects in the lowest, least ventilated parts of a home. This automation turns on the basement ventilation fan every time a new reading above 100 Bq/m³ comes in, so the fan stays on for as long as the level is elevated, even if someone switched it off by hand.

- **Trigger**: Radon level changed
  - **Target**: Basement radon sensor
  - **Threshold type**: Above (100 Bq/m³)
- **Action**: Turn on fan

{% details "YAML example for radon-driven basement ventilation" %}

{% example %}
automation: |
  alias: "Ventilate basement while radon is high"
  triggers:
    - trigger: air_quality.radon_changed
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

### Automation: get the latest reading while any room is above 4 pCi/L

If you have radon sensors in several rooms, this automation keeps you posted with the current reading from whichever sensor reports a value above 4 pCi/L. The threshold is set in pCi/L, and Home Assistant converts readings from sensors that report in Bq/m³ automatically.

- **Trigger**: Radon level changed
  - **Target**: All radon sensors (by label)
  - **Threshold type**: Above (4 pCi/L)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an elevated radon reading notification" %}

{% example %}
automation: |
  alias: "Notify on elevated radon reading"
  triggers:
    - trigger: air_quality.radon_changed
      target:
        label_id: radon_sensors
      options:
        threshold:
          type: above
          value:
            number: 4
            unit_of_measurement: "pCi/L"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Elevated radon level"
        message: >
          {{ trigger.to_state.name }} reports
          {{ trigger.to_state.state }}
          {{ trigger.to_state.attributes.unit_of_measurement }}.
          Consider airing out the room.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
