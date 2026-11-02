---
title: "Carbon monoxide value"
condition: air_quality.is_co_value
domain: air_quality
description: "Tests the carbon monoxide level of one or more entities."
related_conditions:
  - air_quality.is_co_detected
  - air_quality.is_co_cleared
---

The **Carbon monoxide value** condition passes when a carbon monoxide (CO) sensor's reading meets a specific level. Carbon monoxide is a colorless, odorless gas produced by incomplete combustion, and even moderate levels deserve attention. This condition gives you finer control than simpler detected or cleared checks, letting you start ventilation at a lower reading and sound the full alarm only when concentrations climb higher.

{% include conditions/ui_header.md %}

{% include conditions/threshold_value_steps.md
   title="Carbon monoxide value"
   sensor="carbon monoxide sensor"
   areas="hallway or garage"
   value_long="a fixed level directly, for example `35`"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb, ppm, mg/m³, or μg/m³" %}

### Options in the UI

{% include conditions/threshold_value_options_ui.md
   value_short="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, `mg/m³`, or `μg/m³`" %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_co_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_co_value
  target:
    entity_id: sensor.hallway_co
  options:
    threshold:
      type: above
      value:
        number: 35
        unit_of_measurement: "ppm"
    behavior: any
{% endexample %}

This passes when the hallway CO sensor reads above 35 ppm.

### Options in YAML

{% include conditions/threshold_value_options_yaml.md
   has_unit="true"
   unit_default="ppm"
   unit_example_entity="input_number.co_alert_level"
   unit_example_value="9"
   threshold_required="true" %}

{% include conditions/targets.md entity_type="carbon monoxide sensor" example="sensor.hallway_carbon_monoxide" %}

{% include conditions/behavior.md %}

## Good to know

{% include conditions/unavailable_targets.md entities="sensors" %}
- For simple binary detection without a specific threshold, use [Carbon monoxide detected](/conditions/air_quality.is_co_detected/) or [Carbon monoxide cleared](/conditions/air_quality.is_co_cleared/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: check CO levels when you arrive home

When you pull into the driveway, you want to know if the air inside is safe before settling in. This automation triggers when you enter the home zone and checks the hallway CO reading. If the level is above 20 ppm, you get a notification right away so you know to open the windows or stay outside until the air clears.

- **Trigger**: Zone entered
  - **Target**: Frenck
  - **Zone**: Home
- **Condition**: Carbon monoxide value
  - **Target**: Hallway CO sensor
  - **Threshold type**: Above 20 ppm
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a CO check on arrival home" %}

{% example %}
automation: |
  alias: "CO check on arrival home"
  triggers:
    - trigger: zone.entered
      target:
        entity_id: person.frenck
      options:
        zone: zone.home
  conditions:
    - condition: air_quality.is_co_value
      target:
        entity_id: sensor.hallway_co
      options:
        threshold:
          type: above
          value:
            number: 20
            unit_of_measurement: "ppm"
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "CO level elevated at home"
        message: >
          The hallway CO reading is above 20 ppm.
          Open the windows before settling in.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
