---
title: "Volatile organic compounds ratio crossed threshold"
trigger: air_quality.voc_ratio_crossed_threshold
domain: air_quality
description: "Triggers after one or more volatile organic compounds ratios cross a threshold."
related_triggers:
  - air_quality.voc_ratio_changed
---

The **Volatile organic compounds ratio crossed threshold** trigger fires when the <abbr title="volatile organic compounds">VOC</abbr> ratio reading on one or more air quality sensors crosses a specific level. While the VOC level measures an absolute concentration, the VOC ratio expresses the reading as a proportion of a reference baseline, making it easier to spot relative changes. Some sensors report this as a percentage or index value.

Picture your kitchen extractor fan turning on the instant cooking fumes push the VOC ratio past its normal baseline, clearing the air before odors spread through the house. Or getting an alert on your phone when cleaning products cause a spike so you know to open a window. This trigger reacts to relative shifts in air quality, which is ideal for catching sudden changes even when absolute readings vary from sensor to sensor.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Volatile organic compounds ratio crossed threshold**.
6. Under **Threshold type**, set the VOC ratio the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the reading must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The VOC ratio the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
  required: true
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
  required: true
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.voc_ratio_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.voc_ratio_crossed_threshold
  target:
    entity_id: sensor.kitchen_voc_ratio
  options:
    threshold: 50
    behavior: any
{% endexample %}

This fires whenever the kitchen VOC ratio sensor crosses 50 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The VOC ratio the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current VOC ratio is above or below your threshold.
- The VOC ratio is different from the absolute VOC level. Check your sensor's documentation to understand what scale or baseline it uses.
- Pair this trigger with [Volatile organic compounds ratio changed](/triggers/air_quality.voc_ratio_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: clear cooking fumes before they spread

Frying and searing create a burst of fumes that quickly fills the kitchen. This automation turns on the extractor fan the moment the VOC ratio crosses 50, pulling cooking odors out before they drift into the rest of the house.

- **Trigger**: Volatile organic compounds ratio crossed threshold
- **Target**: Kitchen VOC ratio sensor
- **Threshold type**: 50
- **Trigger when**: Each
- **Action**: Turn on fan (kitchen extractor)

{% details "YAML example for VOC ratio kitchen extractor" %}

{% example %}
automation: |
  alias: "Kitchen extractor on VOC ratio spike"
  triggers:
    - trigger: air_quality.voc_ratio_crossed_threshold
      target:
        entity_id: sensor.kitchen_voc_ratio
      options:
        threshold: 50
        behavior: any
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.kitchen_extractor
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
