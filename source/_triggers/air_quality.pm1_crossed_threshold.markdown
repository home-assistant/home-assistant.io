---
title: "PM1 level crossed threshold"
trigger: air_quality.pm1_crossed_threshold
domain: air_quality
description: "Triggers after one or more PM1 levels cross a threshold."
related_triggers:
  - air_quality.pm1_changed
---

The **PM1 level crossed threshold** trigger fires when the PM1 (particulate matter 1 micrometer or smaller) reading on one or more air quality sensors crosses a specific level. PM1 particles are ultrafine, small enough to pass deep into the lungs and even enter the bloodstream. Everyday activities like burning candles, cooking, and using a fireplace produce these tiny particles.

With this trigger, your air purifier switches on the second PM1 crosses your chosen limit, clearing the air before you even notice a difference. You also get the option to send a notification to your phone when candle smoke or cooking pushes ultrafine particles past a safe level, giving you peace of mind that the air your family breathes is being watched around the clock.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **PM1 level crossed threshold**.
6. Under **Threshold type**, set the PM1 level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The PM1 concentration the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
  required: true
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
  required: true
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm1_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm1_crossed_threshold
  target:
    entity_id: sensor.living_room_pm1
  options:
    threshold: 25
    behavior: any
{% endexample %}

This fires whenever the living room PM1 sensor crosses 25 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The PM1 concentration the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
behavior:
  description: >
    When multiple sensors are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
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

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current PM1 level is above or below your threshold.
- PM1 is one of the finest fractions of particulate matter. If your sensor also reports PM2.5 or PM10, you get a fuller picture of air quality by combining triggers for each size.
- Pair this trigger with [PM1 level changed](/triggers/air_quality.pm1_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: start the air purifier when ultrafine particles rise

Candles, cooking, and fireplaces all release ultrafine particles that are invisible but still matter. This automation starts the living room air purifier the moment PM1 crosses 25, clearing the air before you notice a thing.

- **Trigger**: PM1 level crossed threshold
- **Target**: Living room PM1 sensor
- **Threshold type**: 25
- **Trigger when**: Each
- **Action**: Turn on switch (air purifier)

{% details "YAML example for PM1-based air purifier" %}

{% example %}
automation: |
  alias: "Air purifier on high PM1"
  triggers:
    - trigger: air_quality.pm1_crossed_threshold
      target:
        entity_id: sensor.living_room_pm1
      options:
        threshold: 25
        behavior: any
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.living_room_air_purifier
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
