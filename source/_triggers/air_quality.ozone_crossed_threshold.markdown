---
title: "Ozone level crossed threshold"
trigger: air_quality.ozone_crossed_threshold
domain: air_quality
description: "Triggers when one or more ozone levels cross a threshold."
related_triggers:
  - air_quality.ozone_changed
---

The **Ozone level crossed threshold** trigger fires when the ozone (O3) reading on one or more air quality sensors crosses a specific level. Ground-level ozone forms when sunlight reacts with pollutants from vehicles and industry, and it tends to peak on hot, sunny afternoons. High ozone levels irritate the lungs and are especially risky during outdoor exercise.

Imagine getting a notification before your afternoon run telling you ozone is too high to exercise outside today. Or having your ventilation system close its fresh-air intake automatically when ozone spikes, so your indoor air stays clean without you thinking about it. This trigger watches the sky for you and lets your home take action the instant conditions become unhealthy.

{% include triggers/ui_header.md %}

{% include triggers/threshold_crossed_steps.md
   title="Ozone level crossed threshold"
   sensor="ozone sensor"
   areas="backyard or living room"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb, ppm, or μg/m³" %}

### Options in the UI

{% include triggers/threshold_crossed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, or `μg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.ozone_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.ozone_crossed_threshold
  target:
    entity_id: sensor.backyard_ozone
  options:
    threshold:
      type: above
      value:
        number: 100
        unit_of_measurement: "μg/m³"
{% endexample %}

This fires when the backyard ozone sensor reading rises above 100 μg/m³.

### Options in YAML

{% include triggers/threshold_crossed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, or `μg/m³`"
   unit_default="μg/m³"
   unit_example_entity="input_number.ozone_alert_level"
   unit_example_value="120" %}

{% include triggers/targets.md entity_type="ozone sensor" example="sensor.living_room_ozone" %}

{% include triggers/behavior.md %}

## Good to know

- The threshold type sets the direction. With **Above**, the trigger fires when the level rises above the threshold. With **Below**, it fires when the level drops below it.
- Ground-level ozone peaks on hot, sunny afternoons. Automations that close fresh-air intakes or notify household members before outdoor activities are common use cases.
- Pair this trigger with [Ozone level changed](/triggers/air_quality.ozone_changed/) if you want to react to every change of the level instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: remind yourself to exercise indoors on high-ozone days

On hot afternoons, ground-level ozone spikes without any visible sign. This automation sends a notification when your backyard ozone sensor rises above 100 μg/m³, giving you a friendly heads-up to take your workout inside.

- **Trigger**: Ozone level crossed threshold
  - **Target**: Backyard ozone sensor
  - **Threshold type**: Above 100 μg/m³
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for ozone exercise advisory" %}

{% example %}
automation: |
  alias: "Ozone exercise advisory"
  triggers:
    - trigger: air_quality.ozone_crossed_threshold
      target:
        entity_id: sensor.backyard_ozone
      options:
        threshold:
          type: above
          value:
            number: 100
            unit_of_measurement: "μg/m³"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "High ozone outside"
        message: >
          Ozone rose above 100 μg/m³. Consider
          exercising indoors today.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
