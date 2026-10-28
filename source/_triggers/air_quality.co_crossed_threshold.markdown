---
title: "Carbon monoxide level crossed threshold"
trigger: air_quality.co_crossed_threshold
domain: air_quality
description: "Triggers when one or more carbon monoxide levels cross a threshold."
related_triggers:
  - air_quality.co_changed
---

The **Carbon monoxide level crossed threshold** trigger fires when a carbon monoxide (CO) reading on one or more air quality sensors crosses a specific level. Carbon monoxide is a colorless, odorless gas produced by incomplete combustion of fuels, and it is life-threatening at elevated concentrations. Most residential CO alarms activate around 35 to 70 ppm, but you deserve to know the moment levels start climbing, not just when an alarm goes off.

Imagine getting an urgent alert on your phone the second CO reaches a dangerous level in the garage, even in the middle of the night. Or having your exhaust fan kick on automatically when a sensor detects rising CO while you are away. This trigger gives you that early warning, so your home protects your family before a situation becomes critical.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Carbon monoxide level crossed threshold"
   sensor="carbon monoxide sensor"
   areas="garage or hallway"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb, ppm, mg/m³, or μg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, `mg/m³`, or `μg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.co_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.co_crossed_threshold
  target:
    entity_id: sensor.living_room_co
  options:
    threshold:
      type: above
      value:
        number: 35
        unit_of_measurement: "ppm"
{% endexample %}

This fires when the living room CO sensor reading rises above 35 ppm.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, `mg/m³`, or `μg/m³`"
   unit_default="ppm"
   unit_example_entity="input_number.co_alert_level"
   unit_example_value="9" %}

{% include triggers/targets.md entity_type="carbon monoxide sensor" example="sensor.hallway_carbon_monoxide" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- Most residential CO alarms activate around 35 to 70 ppm depending on exposure time. A threshold in that range is a good starting point for safety automations.
- Pair this trigger with [Carbon monoxide level changed](/triggers/air_quality.co_changed/) if you want to react to every change of the level instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a safety alert when garage CO gets dangerous

Nobody wants to discover a CO problem too late. This automation sends an urgent notification straight to your phone the moment the garage sensor rises above 35 ppm, giving you time to open the door and check for running engines or faulty appliances.

- **Trigger**: Carbon monoxide level crossed threshold
  - **Target**: Garage CO sensor
  - **Threshold type**: Above 35 ppm
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a garage CO threshold alert" %}

{% example %}
automation: |
  alias: "Garage CO threshold alert"
  triggers:
    - trigger: air_quality.co_crossed_threshold
      target:
        entity_id: sensor.garage_co
      options:
        threshold:
          type: above
          value:
            number: 35
            unit_of_measurement: "ppm"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Carbon monoxide warning"
        message: >
          CO in the garage rose above 35 ppm.
          Open the garage door and check
          for running engines or appliances.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
