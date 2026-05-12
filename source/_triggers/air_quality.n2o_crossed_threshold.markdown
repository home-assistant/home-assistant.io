---
title: "Nitrous oxide level crossed threshold"
trigger: air_quality.n2o_crossed_threshold
domain: air_quality
description: "Triggers after one or more nitrous oxide levels cross a threshold."
related_triggers:
  - air_quality.n2o_changed
---

The **Nitrous oxide level crossed threshold** trigger fires when the nitrous oxide (N2O) reading on one or more air quality sensors crosses a specific level. Nitrous oxide is a potent greenhouse gas released by agricultural practices, industrial processes, and certain combustion sources. While less common in typical household monitoring, specialized sensors track N2O for environmental research, greenhouse management, and agricultural applications.

If you manage a greenhouse or monitor environmental conditions, this trigger keeps you informed without constant manual checks. Get a notification on your phone the moment N2O crosses a concerning level, or have your ventilation system respond automatically to keep conditions within a healthy range.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Nitrous oxide level crossed threshold**.
6. Under **Threshold type**, set the nitrous oxide level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The nitrous oxide concentration the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.n2o_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.n2o_crossed_threshold
  target:
    entity_id: sensor.greenhouse_n2o
  options:
    threshold: 350
    behavior: any
{% endexample %}

This fires whenever the greenhouse N2O sensor crosses 350 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The nitrous oxide concentration the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current N2O level is above or below your threshold.
- Ambient outdoor N2O levels sit around 330 ppb. If you are monitoring for environmental purposes, small threshold offsets above that baseline work well.
- Pair this trigger with [Nitrous oxide level changed](/triggers/air_quality.n2o_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: stay on top of greenhouse air quality

Keeping N2O in check helps you maintain healthy growing conditions and track environmental trends. This automation sends a notification to your phone when the greenhouse reading crosses 350, so you know right away when ventilation needs attention.

- **Trigger**: Nitrous oxide level crossed threshold
- **Target**: Greenhouse N2O sensor
- **Threshold type**: 350
- **Trigger when**: Each
- **Action**: Notify mobile app

{% details "YAML example for greenhouse N2O alert" %}

{% example %}
automation: |
  alias: "Greenhouse N2O threshold alert"
  triggers:
    - trigger: air_quality.n2o_crossed_threshold
      target:
        entity_id: sensor.greenhouse_n2o
      options:
        threshold: 350
        behavior: any
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "N2O threshold crossed"
        message: >
          Nitrous oxide in the greenhouse
          crossed 350. Check ventilation.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
