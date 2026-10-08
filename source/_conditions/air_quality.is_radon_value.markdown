---
title: "Radon value"
condition: air_quality.is_radon_value
domain: air_quality
description: "Tests the radon level of one or more entities."
related_conditions:
  - air_quality.is_co2_value
  - air_quality.is_voc_value
---

The **Radon value** condition passes when a radon sensor's reading meets the threshold you define. Radon is a naturally occurring radioactive gas that seeps into buildings from the ground. It is colorless and odorless, so a sensor is the only way to know it is there. Levels tend to be highest in rooms that touch the ground, such as basements and ground-floor bedrooms, and they rise and fall with the weather, the season, and how well a room is ventilated.

Radon is measured in becquerels per cubic meter (Bq/m³) or picocuries per liter (pCi/L). Health authorities around the world publish reference levels, often between 100 and 300 Bq/m³ (about 2.7 to 8 pCi/L), above which they recommend taking action. Check the guidance that applies where you live. This condition lets your automation act on real readings, like running a ventilation fan only if radon is still elevated when the automation runs, or reminding you to air out a room before you spend the night in it. You can set the threshold in either unit, and Home Assistant converts between them automatically.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Radon value"
   sensor="radon sensor"
   areas="basement or bedroom"
   value_long="a fixed radon concentration directly, for example `100` for 100 Bq/m³"
   has_unit="true"
   unit_label="radon unit"
   unit_options="Bq/m³ or pCi/L" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed radon concentration"
   has_unit="true"
   unit_label="radon unit"
   unit_options_code="`Bq/m³` or `pCi/L`"
   unit_default="Bq/m³" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_radon_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_radon_value
  target:
    entity_id: sensor.basement_radon
  options:
    threshold:
      type: above
      value:
        number: 100
        unit_of_measurement: "Bq/m³"
{% endexample %}

This passes when the basement radon reading is above 100 Bq/m³.

You can set the threshold in pCi/L even if your sensors report in Bq/m³. Home Assistant converts the values before comparing them. To check that every bedroom sensor is below a limit:

{% example %}
condition: |
  condition: air_quality.is_radon_value
  target:
    entity_id:
      - sensor.main_bedroom_radon
      - sensor.guest_bedroom_radon
  options:
    threshold:
      type: below
      value:
        number: 4
        unit_of_measurement: "pCi/L"
    behavior: all
{% endexample %}

This passes when both bedroom readings are below 4 pCi/L (148 Bq/m³).

To use a user-created {% term helper %} as a dynamic threshold that you can adjust without editing the automation:

{% example %}
condition: |
  condition: air_quality.is_radon_value
  target:
    entity_id: sensor.basement_radon
  options:
    threshold:
      type: above
      value:
        entity: input_number.radon_action_level
{% endexample %}

Set the helper's unit of measurement to `Bq/m³` or `pCi/L`, because an entity without one of those units never matches.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   has_unit="true"
   unit_default="Bq/m³"
   unit_example_entity="input_number.radon_lower_limit"
   unit_example_value="300"
   threshold_required="true" %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works with sensors that have the radon device class.
- Supported radon units are `Bq/m³` and `pCi/L`. The threshold and the sensor can use different units. Home Assistant converts both to Bq/m³ before comparing them, so 4 pCi/L and 148 Bq/m³ are treated as the same level.
- Supported thresholds can use fixed values, a sensor with the radon device class, a number entity with the radon device class, or a user-created {% term helper %} from the [Input number integration](/integrations/input_number/). When you use an entity, its current value is read each time the condition runs.
- Entities that are `unavailable` or `unknown` are skipped when the condition is evaluated. With **Any**, at least one remaining valid sensor must match. With **All**, every remaining valid sensor must match.
- Radon is an indoor air quality concern, so it often pairs well with [Carbon dioxide value](/conditions/air_quality.is_co2_value/) and [Volatile organic compounds value](/conditions/air_quality.is_voc_value/) when deciding whether a room needs ventilation.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: run the basement fan overnight only if radon is high

Radon often builds up in a closed basement during the day. This automation runs at 22:00 and checks the basement radon reading. If the level is above 100 Bq/m³, the ventilation fan turns on so the air is cleared before morning. On days when the reading has stayed low, nothing happens, and the fan stays quiet.

- **Trigger**: Time: 22:00
- **Condition**: Radon value (above 100 Bq/m³)
  - **Target**: Basement radon sensor
- **Action**: Turn on fan
  - **Target**: Basement ventilation fan

{% details "YAML example for overnight basement ventilation on high radon" %}

{% example %}
automation: |
  alias: "Ventilate basement overnight when radon is high"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: air_quality.is_radon_value
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

### Automation: remind you to air out the bedroom when you get home

If a bedroom sensor shows elevated radon, you want to know before you sleep there, not after. This automation triggers when you enter the home zone and checks the bedroom radon reading. If the level is above 4 pCi/L, you get a notification suggesting you open the windows for a while. The threshold is set in pCi/L, and Home Assistant converts it automatically if the sensor reports in Bq/m³.

- **Trigger**: Zone entered
  - **Target**: Frenck
  - **Zone**: Home
- **Condition**: Radon value (above 4 pCi/L)
  - **Target**: Bedroom radon sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a radon reminder on arrival home" %}

{% example %}
automation: |
  alias: "Radon reminder on arrival home"
  triggers:
    - trigger: zone.entered
      target:
        entity_id: person.frenck
      options:
        zone: zone.home
  conditions:
    - condition: air_quality.is_radon_value
      target:
        entity_id: sensor.bedroom_radon
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
        title: "Radon is elevated in the bedroom"
        message: >
          The bedroom radon reading is above 4 pCi/L.
          Open the windows for a while before bedtime.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
