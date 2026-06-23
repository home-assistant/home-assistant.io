---
title: "Carbon monoxide level changed"
trigger: air_quality.co_changed
domain: air_quality
description: "Triggers after one or more carbon monoxide levels change."
related_triggers:
  - air_quality.co_crossed_threshold
---

The **Carbon monoxide level changed** trigger fires after the carbon monoxide (CO) reading on one or more air quality sensors changes by a meaningful amount. Carbon monoxide is a colorless, odorless gas produced by incomplete combustion of fuels like gas, oil, wood, and charcoal. A faulty furnace, a blocked chimney, or a car left running in an attached garage all release CO without any visible warning. Even small increases in CO levels indoors deserve your attention, because prolonged exposure is dangerous.

Imagine getting an instant phone alert the moment your garage CO sensor picks up a shift, giving you time to ventilate before the situation becomes serious. Use this trigger to kick off a ventilation routine, send a safety notification, or log concentration changes whenever your CO sensor reports a significant shift.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Carbon monoxide level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the carbon monoxide level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.co_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.co_changed
  target:
    entity_id: sensor.living_room_co
  options:
    threshold: 5
{% endexample %}

This fires whenever the living room CO sensor reading changes by at least 5 ppm.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the carbon monoxide level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Carbon monoxide is produced by gas stoves, fireplaces, furnaces, and running vehicles in attached garages. A sudden rise in CO is a safety concern.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when CO crosses a specific level in one direction, use [Carbon monoxide level crossed threshold](/triggers/air_quality.co_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: alert when CO rises in the garage

Maybe someone left the car idling or the workshop heater is acting up. This automation sends a notification to your phone whenever the carbon monoxide level in the garage shifts noticeably, so you know to open the garage door or investigate the source right away.

- **Trigger**: Carbon monoxide level changed
  - **Target**: Garage CO sensor
  - **Threshold type**: 10
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
        threshold: 10
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Carbon monoxide change"
        message: "CO level in the garage changed significantly. Check ventilation."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
