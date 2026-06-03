---
title: "Nitrogen monoxide level crossed threshold"
trigger: air_quality.no_crossed_threshold
domain: air_quality
description: "Triggers after one or more nitrogen monoxide levels cross a threshold."
related_triggers:
  - air_quality.no_changed
---

The **Nitrogen monoxide level crossed threshold** trigger fires when the nitrogen monoxide (NO) reading on one or more air quality sensors crosses a specific level. Nitrogen monoxide is produced by combustion engines, gas stoves, and industrial processes. It quickly converts to nitrogen dioxide (NO2) in the presence of oxygen, meaning a rising NO reading is often an early warning of broader air quality issues.

Think about your garage after starting a car on a cold morning. This trigger lets you turn on the exhaust fan the second NO crosses a safe limit, clearing combustion fumes before they drift into the rest of the house. You also get a notification on your phone so you know ventilation is running, giving you confidence that the air indoors stays healthy even when engines or gas appliances are in use.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Nitrogen monoxide level crossed threshold**.
6. Under **Threshold type**, set the nitrogen monoxide level the reading must cross for the trigger to fire.
7. Under **Trigger when**, pick **Each** to fire every time a targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The nitrogen monoxide concentration the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.no_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.no_crossed_threshold
  target:
    entity_id: sensor.garage_no
  options:
    threshold: 50
    behavior: each
{% endexample %}

This fires whenever the garage NO sensor crosses 50 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The nitrogen monoxide concentration the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
behavior:
  description: >
    When multiple sensors are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: true
  type: string
  default: each
for:
  description: >
    How long the reading must remain past the threshold before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current NO level is above or below your threshold.
- Nitrogen monoxide quickly converts to nitrogen dioxide (NO2) in the presence of oxygen. Monitoring both pollutants together gives a more complete picture of combustion-related air quality.
- Pair this trigger with [Nitrogen monoxide level changed](/triggers/air_quality.no_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: clear the garage after starting a car

Cold starts produce a burst of combustion fumes that linger in an enclosed garage. This automation turns on the exhaust fan the moment NO crosses 50, pulling those fumes out before they seep into the house through a connecting door.

- **Trigger**: Nitrogen monoxide level crossed threshold
- **Target**: Garage NO sensor
- **Threshold type**: 50
- **Trigger when**: Each
- **Action**: Turn on fan (garage exhaust)

{% details "YAML example for garage NO ventilation" %}

{% example %}
automation: |
  alias: "Garage exhaust on high NO"
  triggers:
    - trigger: air_quality.no_crossed_threshold
      target:
        entity_id: sensor.garage_no
      options:
        threshold: 50
        behavior: each
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.garage_exhaust
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
