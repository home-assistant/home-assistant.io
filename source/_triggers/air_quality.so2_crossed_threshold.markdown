---
title: "Sulphur dioxide level crossed threshold"
trigger: air_quality.so2_crossed_threshold
domain: air_quality
description: "Triggers after one or more sulphur dioxide levels cross a threshold."
related_triggers:
  - air_quality.so2_changed
---

The **Sulphur dioxide level crossed threshold** trigger fires when the sulphur dioxide (SO2) reading on one or more air quality sensors crosses a specific level. Sulphur dioxide is a sharp-smelling gas produced by burning fossil fuels that contain sulphur, volcanic activity, and some industrial processes. The WHO recommends keeping 24-hour SO2 exposure below 40 micrograms per cubic meter, because elevated levels irritate the respiratory system and worsen conditions like asthma.

If you live near industrial areas or in a region with volcanic activity, this trigger is especially valuable. Have your smart windows close automatically the moment outdoor SO2 crosses your safety limit, or get an alert on your phone so you know to stay indoors until the air clears. Your home reacts to changing conditions in real time, keeping irritating fumes outside where they belong.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Sulphur dioxide level crossed threshold**.
6. Under **Threshold type**, set the sulphur dioxide level the reading must cross for the trigger to fire.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how multiple targets interact.
8. Under **For at least**, set how long the level must stay past the threshold before the trigger fires. Leave at the default to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The sulphur dioxide concentration the reading has to cross for the trigger to fire. Can be a fixed number, or reference a helper entity that provides the value.
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor crosses the threshold, **First** to fire only on the first crossing, or **All** to fire only after all targeted sensors have crossed the threshold.
For at least:
  description: How long the reading must remain past the threshold before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.so2_crossed_threshold`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.so2_crossed_threshold
  target:
    entity_id: sensor.outdoor_so2
  options:
    threshold: 40
    behavior: each
{% endexample %}

This fires whenever the outdoor SO2 sensor crosses 40 in either direction.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The sulphur dioxide concentration the reading has to cross for the trigger to fire. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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

- The trigger fires on any crossing, up or down. If you only want one direction, add a condition that checks whether the current SO2 level is above or below your threshold.
- The WHO guideline for 24-hour SO2 exposure is 40. If you live near industrial areas or in regions with volcanic activity, a threshold around that value is a good starting point.
- Pair this trigger with [Sulphur dioxide level changed](/triggers/air_quality.so2_changed/) if you also want to track smaller fluctuations between crossings.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: seal the house when industrial or volcanic SO2 spikes

If you live downwind of a factory or in a volcanic region, SO2 levels change fast. This automation closes your smart windows the moment outdoor SO2 crosses 40, keeping that sharp, irritating gas out of the house so your family breathes easy.

- **Trigger**: Sulphur dioxide level crossed threshold
- **Target**: Outdoor SO2 sensor
- **Threshold type**: 40
- **Trigger when**: Each
- **Condition**: SO2 is above 40
- **Action**: Close cover (windows)

{% details "YAML example for closing windows on high SO2" %}

{% example %}
automation: |
  alias: "Close windows on high SO2"
  triggers:
    - trigger: air_quality.so2_crossed_threshold
      target:
        entity_id: sensor.outdoor_so2
      options:
        threshold: 40
        behavior: each
  conditions:
    - condition: numeric_state
      entity_id: sensor.outdoor_so2
      above: 40
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_windows
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
