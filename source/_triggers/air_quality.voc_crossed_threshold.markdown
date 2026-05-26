---
title: "Volatile organic compounds level crossed threshold"
trigger: air_quality.voc_crossed_threshold
domain: air_quality
description: "Triggers after one or more volatile organic compounds levels cross a threshold."
related_triggers:
  - air_quality.voc_changed
---

The **Volatile organic compounds level crossed threshold** trigger fires when the <abbr title="volatile organic compounds">VOC</abbr> reading on one or more air quality sensors crosses a specific level. VOCs are invisible gases released by paints, cleaning products, new furniture, adhesives, and many everyday household items. When VOC levels climb above comfortable limits, you might notice headaches, eye irritation, or a general feeling that something is "off" about the air.

With this trigger, your ventilation starts automatically the moment VOC readings cross your chosen limit, whether that spike comes from mopping the floor or painting a room. You also get a notification on your phone right away, so you know exactly when to step outside for fresh air. Your home takes care of indoor air quality in the background, so you do not have to keep checking a sensor yourself.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Volatile organic compounds level crossed threshold**.
6. Under **Threshold type**, set the VOC level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The VOC concentration the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.voc_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.voc_crossed_threshold
  target:
    entity_id: sensor.office_voc
  options:
    threshold: 300
    behavior: any
{% endexample %}

This fires whenever the office VOC sensor crosses 300 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The VOC concentration the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current VOC level is above or below your threshold.
- VOC readings often spike after cleaning, painting, or cooking. A threshold that matches your normal baseline helps avoid false alarms during everyday activities.
- Pair this trigger with [Volatile organic compounds level changed](/triggers/air_quality.voc_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: keep your home office comfortable during long work sessions

Hours of focused work in a closed room lets VOCs build up from furniture, carpet, and electronics. This automation opens the office ventilation when the VOC reading crosses 300, keeping the air fresh so you stay focused and headache-free.

- **Trigger**: Volatile organic compounds level crossed threshold
- **Target**: Office VOC sensor
- **Threshold type**: 300
- **Trigger when**: Each
- **Action**: Turn on fan (office ventilation)

{% details "YAML example for VOC-based office ventilation" %}

{% example %}
automation: |
  alias: "Office ventilation on high VOC"
  triggers:
    - trigger: air_quality.voc_crossed_threshold
      target:
        entity_id: sensor.office_voc
      options:
        threshold: 300
        behavior: any
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.office_ventilation
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
