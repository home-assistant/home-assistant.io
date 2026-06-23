---
title: "Sulphur dioxide level changed"
trigger: air_quality.so2_changed
domain: air_quality
description: "Triggers after one or more sulphur dioxide levels change."
related_triggers:
  - air_quality.so2_crossed_threshold
---

The **Sulphur dioxide level changed** trigger fires after the sulphur dioxide (SO2) reading on one or more air quality sensors changes by a meaningful amount. Sulphur dioxide is a sharp-smelling gas released by burning fossil fuels (especially coal and oil), volcanic activity, and certain industrial processes. It irritates the respiratory system and contributes to acid rain. If you live near an industrial area, a power plant, or in a volcanically active region, SO2 levels are worth watching closely.

Imagine your outdoor vents sealing automatically when an industrial plume drifts your way, keeping that acrid air out of your home. Use this trigger to activate air filtration, close outdoor vents, or send notifications whenever your SO2 sensor reports a significant shift.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Sulphur dioxide level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the sulphur dioxide level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.so2_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.so2_changed
  target:
    entity_id: sensor.rooftop_so2
  options:
    threshold: 5
{% endexample %}

This fires whenever the rooftop SO2 sensor reading changes by at least 5 ppb.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the sulphur dioxide level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Sulphur dioxide levels are most relevant near industrial areas, power plants, or regions with volcanic activity. Even moderate exposure irritates the throat and lungs.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when SO2 crosses a specific concentration in one direction, use [Sulphur dioxide level crossed threshold](/triggers/air_quality.so2_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: seal the house when SO2 shifts

If you live near an industrial site or in a volcanically active area, SO2 plumes drift in without warning. This automation closes the motorized vents when your outdoor SO2 sensor detects a significant change, keeping that acrid air out of your home.

- **Trigger**: Sulphur dioxide level changed
- **Target**: Rooftop SO2 sensor
- **Threshold type**: 5
- **Action**: Close cover

{% details "YAML example for SO2-driven vent closure" %}

{% example %}
automation: |
  alias: "Close vents on SO2 change"
  triggers:
    - trigger: air_quality.so2_changed
      target:
        entity_id: sensor.rooftop_so2
      options:
        threshold: 5
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.fresh_air_vents
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
