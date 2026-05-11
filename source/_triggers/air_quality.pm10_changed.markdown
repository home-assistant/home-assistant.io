---
title: "PM10 level changed"
trigger: air_quality.pm10_changed
domain: air_quality
description: "Triggers after one or more PM10 levels change."
related_triggers:
  - air_quality.pm10_crossed_threshold
---

The **PM10 level changed** trigger fires after the PM10 (particulate matter 10 micrometers or smaller) reading on one or more air quality sensors changes by a meaningful amount. PM10 includes dust, pollen, mold spores, and other coarse particles that are stirred up by wind, traffic, construction, and household activities like vacuuming or sweeping. Spring pollen, a windy day, or a renovation project next door all send PM10 readings climbing.

Imagine your robot vacuum automatically heading out for a cleanup once the dust from a nearby construction site settles, without you having to remember. Use this trigger to start an air purifier, close windows, or send a reminder whenever PM10 readings shift noticeably.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **PM10 level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the PM10 level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm10_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm10_changed
  target:
    entity_id: sensor.hallway_pm10
  options:
    threshold: 20
{% endexample %}

This fires whenever the hallway PM10 sensor reading changes by at least 20 micrograms per cubic meter.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the PM10 level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- PM10 levels tend to spike during spring pollen season, construction work nearby, or windy days. A threshold of 10 to 25 μg/m³ works well for most home automations.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when PM10 crosses a specific concentration in one direction, use [PM10 level crossed threshold](/triggers/air_quality.pm10_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: run the robot vacuum after dust settles

A construction project nearby or a windy spring day sends dust everywhere. This automation dispatches the robot vacuum when PM10 levels in the hallway shift by a large amount, cleaning up the dust so you don't have to think about it.

- **Trigger**: PM10 level changed
- **Target**: Hallway PM10 sensor
- **Threshold type**: 25
- **Action**: Start vacuum

{% details "YAML example for PM10-triggered vacuuming" %}

{% example %}
automation: |
  alias: "Vacuum on PM10 change"
  triggers:
    - trigger: air_quality.pm10_changed
      target:
        entity_id: sensor.hallway_pm10
      options:
        threshold: 25
  actions:
    - action: vacuum.start
      target:
        entity_id: vacuum.robot
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
