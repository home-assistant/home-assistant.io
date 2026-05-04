---
title: "PM2.5 level crossed threshold"
trigger: air_quality.pm25_crossed_threshold
domain: air_quality
description: "Triggers after one or more PM2.5 levels cross a threshold."
related_triggers:
  - air_quality.pm25_changed
---

The **PM2.5 level crossed threshold** trigger fires when the PM2.5 (particulate matter 2.5 micrometers or smaller) reading on one or more air quality sensors crosses a specific level. PM2.5 is one of the most widely tracked air quality metrics because these fine particles travel deep into the lungs and affect your health. When PM2.5 rises above 25 μg/m³, air quality is already poor enough to bother sensitive groups, including children and anyone with asthma or allergies.

Have your air purifier start the second PM2.5 crosses the safe limit, or close your windows automatically when wildfire smoke pushes outdoor readings into unhealthy territory. You also get a notification on your phone so you always know what is happening, whether you are at home or away. This trigger helps your home react to air quality changes faster than you ever could on your own.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **PM2.5 level crossed threshold**.
6. Under **Threshold type**, set the PM2.5 level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The PM2.5 concentration the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
  required: true
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
  required: true
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm25_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm25_crossed_threshold
  target:
    entity_id: sensor.outdoor_pm25
  options:
    threshold: 35
    behavior: any
{% endexample %}

This fires whenever the outdoor PM2.5 sensor crosses 35 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The PM2.5 concentration the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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

- The trigger fires on any crossing, up or down. If you want to monitor only one direction, add a condition that checks whether the current PM2.5 level is above or below your threshold.
- The WHO guideline for 24-hour average PM2.5 exposure is 15. Many people use a threshold between 25 and 50 for automations depending on their sensitivity and local conditions.
- Pair this trigger with [PM2.5 level changed](/triggers/air_quality.pm25_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: close windows when outdoor pollution rises

Wildfire smoke, traffic exhaust, and smog all push PM2.5 to unhealthy levels. This automation closes your smart windows the moment outdoor PM2.5 crosses 35, sealing your home off from pollution before it drifts inside.

- **Trigger**: PM2.5 level crossed threshold
- **Target**: Outdoor PM2.5 sensor
- **Threshold type**: 35
- **Trigger when**: Each
- **Condition**: PM2.5 is above 35
- **Action**: Close cover (windows)

{% details "YAML example for closing windows on high PM2.5" %}

{% example %}
automation: |
  alias: "Close windows on high PM2.5"
  triggers:
    - trigger: air_quality.pm25_crossed_threshold
      target:
        entity_id: sensor.outdoor_pm25
      options:
        threshold: 35
        behavior: any
  conditions:
    - condition: numeric_state
      entity_id: sensor.outdoor_pm25
      above: 35
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_windows
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
