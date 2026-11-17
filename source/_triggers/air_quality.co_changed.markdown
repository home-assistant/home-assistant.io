---
title: "Carbon monoxide level changed"
trigger: air_quality.co_changed
domain: air_quality
description: "Triggers when one or more carbon monoxide levels change."
related_triggers:
  - air_quality.co_crossed_threshold
---

The **Carbon monoxide level changed** trigger fires after the carbon monoxide (CO) reading on one or more air quality sensors changes. Carbon monoxide is a colorless, odorless gas produced by incomplete combustion of fuels like gas, oil, wood, and charcoal. A faulty furnace, a blocked chimney, or a car left running in an attached garage all release CO without any visible warning. Even small increases in CO levels indoors deserve your attention, because prolonged exposure is dangerous.

Imagine getting an instant phone alert the moment your garage CO sensor picks up a shift, giving you time to ventilate before the situation becomes serious. Use this trigger to kick off a ventilation routine, send a safety notification, or log concentration changes. Use the threshold type to filter which changes matter to your automation.

{% include triggers/ui_header.md %}

{% include triggers/threshold_changed_steps.md
   title="Carbon monoxide level changed"
   sensor="carbon monoxide sensor"
   areas="garage or living room"
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options="ppb, ppm, mg/m³, or μg/m³" %}

### Options in the UI

{% include triggers/threshold_changed_options_ui.md
   unit_phrase_ui="a fixed level"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, `mg/m³`, or `μg/m³`" %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.co_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.co_changed
  target:
    entity_id: sensor.living_room_co
  options:
    threshold:
      type: above
      value:
        number: 9
        unit_of_measurement: "ppm"
{% endexample %}

This fires whenever the living room CO sensor reading changes to a value above 9 ppm. To fire on any change, use `type: any` and leave out `value`.

### Options in YAML

{% include triggers/threshold_changed_options_yaml.md
   unit_phrase_yaml="literal number"
   has_unit="true"
   unit_label="concentration unit"
   unit_options_code="`ppb`, `ppm`, `mg/m³`, or `μg/m³`"
   unit_default="ppm"
   unit_example_entity="input_number.co_alert_level"
   unit_example_value="9" %}

{% include triggers/targets.md entity_type="carbon monoxide sensor" example="sensor.hallway_carbon_monoxide" %}

## Good to know

- Carbon monoxide is produced by gas stoves, fireplaces, furnaces, and running vehicles in attached garages. A sudden rise in CO is a safety concern.
- The threshold type controls which changes fire the trigger. Use **Above** or **Below** to fire only when the new level is above or below a value, **In range** to fire only when it's inside a range, and **Outside range** to fire only when it's outside a range. Use **Any change** to fire on every change.
- To react only when CO crosses a specific level in one direction, use [Carbon monoxide level crossed threshold](/triggers/air_quality.co_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: alert when CO rises in the garage

Maybe someone left the car idling or the workshop heater is acting up. This automation sends a notification to your phone whenever the carbon monoxide level in the garage changes to a value above 10 ppm, so you know to open the garage door or investigate the source right away.

- **Trigger**: Carbon monoxide level changed
  - **Target**: Garage CO sensor
  - **Threshold type**: Above 10 ppm
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a garage CO alert" %}

{% example %}
automation: |
  alias: "Alert on garage CO change"
  triggers:
    - trigger: air_quality.co_changed
      target:
        entity_id: sensor.garage_co
      options:
        threshold:
          type: above
          value:
            number: 10
            unit_of_measurement: "ppm"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Carbon monoxide change"
        message: "CO level in the garage is above 10 ppm. Check ventilation."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
