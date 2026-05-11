---
title: "PM4 level crossed threshold"
trigger: air_quality.pm4_crossed_threshold
domain: air_quality
description: "Triggers after one or more PM4 levels cross a threshold."
related_triggers:
  - air_quality.pm4_changed
---

The **PM4 level crossed threshold** trigger fires when the PM4 (particulate matter 4 micrometers or smaller) reading on one or more air quality sensors crosses a specific level. PM4 sits between the finest particles (PM2.5) and the coarser dust and pollen (PM10), capturing a range of irritants that affect breathing and comfort. Sources include household dust, pollen, mold spores, and cooking emissions.

Think of a nursery where clean air really matters. This trigger lets you boost the air filter to high speed the moment PM4 levels rise, or send a notification to your phone when spring pollen pushes particle counts past your comfort level. You stay one step ahead, keeping the air cleaner for young children and anyone with allergies.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **PM4 level crossed threshold**.
6. Under **Threshold type**, set the PM4 level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The PM4 concentration the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm4_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm4_crossed_threshold
  target:
    entity_id: sensor.nursery_pm4
  options:
    threshold: 30
    behavior: any
{% endexample %}

This fires whenever the nursery PM4 sensor crosses 30 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The PM4 concentration the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current PM4 level is above or below your threshold.
- PM4 sits between PM2.5 and PM10 in particle size. If your sensor reports multiple particulate sizes, combining thresholds for each gives you a more complete picture of air quality.
- Pair this trigger with [PM4 level changed](/triggers/air_quality.pm4_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: protect the nursery by boosting the air filter

Young children are more sensitive to airborne particles. This automation switches the nursery air filter to high speed the moment PM4 crosses 30, keeping the room cleaner so your children breathe easier.

- **Trigger**: PM4 level crossed threshold
- **Target**: Nursery PM4 sensor
- **Threshold type**: 30
- **Trigger when**: Each
- **Action**: Turn on fan (air filter)

{% details "YAML example for PM4-based nursery air filter" %}

{% example %}
automation: |
  alias: "Nursery air filter on high PM4"
  triggers:
    - trigger: air_quality.pm4_crossed_threshold
      target:
        entity_id: sensor.nursery_pm4
      options:
        threshold: 30
        behavior: any
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.nursery_air_filter
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
