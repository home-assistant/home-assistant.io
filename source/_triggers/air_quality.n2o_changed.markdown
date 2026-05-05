---
title: "Nitrous oxide level changed"
trigger: air_quality.n2o_changed
domain: air_quality
description: "Triggers after one or more nitrous oxide levels change."
related_triggers:
  - air_quality.n2o_crossed_threshold
---

The **Nitrous oxide level changed** trigger fires after the nitrous oxide (N2O) reading on one or more air quality sensors changes by a meaningful amount. Nitrous oxide is a potent greenhouse gas produced by agricultural activities, industrial processes, and combustion of fossil fuels. While it is less commonly monitored at home than other pollutants, specialized sensors track it in greenhouses, workshops near agricultural operations, and laboratory or medical settings.

Imagine your greenhouse ventilation fans spinning up automatically when N2O shifts after a round of fertilizing, keeping the growing environment healthy without an extra trip outside. Use this trigger to log environmental data, activate ventilation, or send alerts whenever your N2O sensor reports a significant shift.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Nitrous oxide level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the nitrous oxide level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.n2o_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.n2o_changed
  target:
    entity_id: sensor.greenhouse_n2o
  options:
    threshold: 5
{% endexample %}

This fires whenever the greenhouse N2O sensor reading changes by at least 5 ppb.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the nitrous oxide level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Nitrous oxide is a potent greenhouse gas with roughly 300 times the warming potential of carbon dioxide. Monitoring it is valuable for environmental tracking.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when N2O crosses a specific concentration in one direction, use [Nitrous oxide level crossed threshold](/triggers/air_quality.n2o_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: ventilate the greenhouse on N2O change

After fertilizing, N2O levels in a greenhouse tend to climb. This automation turns on the ventilation fans when N2O levels shift, keeping the growing environment healthy for your plants without an extra trip outside to check.

- **Trigger**: Nitrous oxide level changed
- **Target**: Greenhouse N2O sensor
- **Threshold type**: 5
- **Action**: Turn on fan

{% details "YAML example for N2O greenhouse ventilation" %}

{% example %}
automation: |
  alias: "Ventilate greenhouse on N2O change"
  triggers:
    - trigger: air_quality.n2o_changed
      target:
        entity_id: sensor.greenhouse_n2o
      options:
        threshold: 5
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.greenhouse_ventilation
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
