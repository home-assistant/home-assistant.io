---
title: "PM10 level crossed threshold"
trigger: air_quality.pm10_crossed_threshold
domain: air_quality
description: "Triggers after one or more PM10 levels cross a threshold."
related_triggers:
  - air_quality.pm10_changed
---

The **PM10 level crossed threshold** trigger fires when the PM10 (particulate matter 10 micrometers or smaller) reading on one or more air quality sensors crosses a specific level. PM10 includes coarser particles like dust, pollen, and mold spores that irritate the nose, throat, and airways. Levels tend to spike during construction work, dry windy days, and seasonal pollen peaks.

Get a heads-up on your phone the moment outdoor PM10 crosses 50, so you know to keep the windows shut on a high-pollen day. Or have your smart windows close automatically when a dust storm rolls in. This trigger is especially helpful during allergy season, letting your home shield you from airborne irritants before they become a problem.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **PM10 level crossed threshold**.
6. Under **Threshold type**, set the PM10 level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The PM10 concentration the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm10_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm10_crossed_threshold
  target:
    entity_id: sensor.patio_pm10
  options:
    threshold: 50
    behavior: any
{% endexample %}

This fires whenever the patio PM10 sensor crosses 50 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The PM10 concentration the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current PM10 level is above or below your threshold.
- The WHO guideline for 24-hour average PM10 exposure is 45. A threshold between 45 and 100 is a reasonable starting point depending on your local environment.
- Pair this trigger with [PM10 level changed](/triggers/air_quality.pm10_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get a pollen season heads-up on your phone

Allergy season is tough enough without guessing whether the air outside is safe. This automation sends a notification to your phone when outdoor PM10 crosses 50, so you know to keep the windows shut and stay comfortable indoors.

- **Trigger**: PM10 level crossed threshold
- **Target**: Patio PM10 sensor
- **Threshold type**: 50
- **Trigger when**: Each
- **Condition**: PM10 is above 50
- **Action**: Notify mobile app

{% details "YAML example for PM10 pollen season alert" %}

{% example %}
automation: |
  alias: "PM10 pollen season alert"
  triggers:
    - trigger: air_quality.pm10_crossed_threshold
      target:
        entity_id: sensor.patio_pm10
      options:
        threshold: 50
        behavior: any
  conditions:
    - condition: numeric_state
      entity_id: sensor.patio_pm10
      above: 50
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "High PM10 outside"
        message: >
          Outdoor PM10 crossed 50.
          Consider keeping windows closed.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
