---
title: "Nitrogen dioxide level changed"
trigger: air_quality.no2_changed
domain: air_quality
description: "Triggers after one or more nitrogen dioxide levels change."
related_triggers:
  - air_quality.no2_crossed_threshold
---

The **Nitrogen dioxide level changed** trigger fires after the nitrogen dioxide (NO2) reading on one or more air quality sensors changes by a meaningful amount. Nitrogen dioxide is a reddish-brown gas with a sharp odor, produced mainly by traffic, power plants, and gas stoves. It irritates the airways and contributes to smog and acid rain. Indoors, your gas stove is often the biggest source. Every time you fire up a burner, NO2 levels in the kitchen rise.

Imagine your range hood turning on automatically when you start cooking, clearing combustion byproducts before they spread through the house. Use this trigger to start ventilation, close windows facing a busy road, or send a health alert whenever your NO2 sensor reports a significant shift.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Nitrogen dioxide level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the nitrogen dioxide level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.no2_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.no2_changed
  target:
    entity_id: sensor.street_side_no2
  options:
    threshold: 10
{% endexample %}

This fires whenever the street-side NO2 sensor reading changes by at least 10 ppb.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the nitrogen dioxide level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Indoor gas stoves and heaters are common sources of NO2 inside the home. A kitchen NO2 sensor combined with this trigger helps you automate range hood ventilation.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when NO2 crosses a specific concentration in one direction, use [Nitrogen dioxide level crossed threshold](/triggers/air_quality.no2_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the range hood when cooking produces NO2

Every time you fire up the gas stove, NO2 levels in the kitchen rise. This automation turns on the range hood as soon as the kitchen NO2 sensor detects a shift, clearing combustion byproducts before they spread through the house.

- **Trigger**: Nitrogen dioxide level changed
- **Target**: Kitchen NO2 sensor
- **Threshold type**: 15
- **Action**: Turn on switch

{% details "YAML example for NO2-driven range hood" %}

{% example %}
automation: |
  alias: "Range hood on NO2 change"
  triggers:
    - trigger: air_quality.no2_changed
      target:
        entity_id: sensor.kitchen_no2
      options:
        threshold: 15
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.range_hood
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
