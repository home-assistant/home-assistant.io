---
title: "Nitrogen monoxide level changed"
trigger: air_quality.no_changed
domain: air_quality
description: "Triggers when one or more nitrogen monoxide levels change."
related_triggers:
  - air_quality.no_crossed_threshold
---

The **Nitrogen monoxide level changed** trigger fires after the nitrogen monoxide (NO) reading on one or more air quality sensors changes by a meaningful amount. Nitrogen monoxide is a reactive gas produced mainly by vehicle engines and combustion processes. It quickly converts to nitrogen dioxide in the atmosphere and plays a key role in smog formation. If you live near a busy road or intersection, rush-hour traffic sends NO levels climbing, and that pollution easily seeps indoors through open windows.

Imagine your home automatically logging pollution patterns near the driveway so you know which hours to keep the windows shut. Use this trigger to track pollution data, activate ventilation, or send alerts whenever your NO sensor reports a significant shift.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Nitrogen monoxide level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the nitrogen monoxide level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.no_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.no_changed
  target:
    entity_id: sensor.driveway_no
  options:
    threshold: 10
{% endexample %}

This fires whenever the driveway NO sensor reading changes by at least 10 ppb.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the nitrogen monoxide level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Nitrogen monoxide levels spike near busy roads and during rush hour. Monitoring helps you time ventilation to avoid peak traffic pollution.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when NO crosses a specific concentration in one direction, use [Nitrogen monoxide level crossed threshold](/triggers/air_quality.no_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: log roadside pollution changes

Rush-hour traffic sends NO levels spiking near the road, and knowing the pattern helps you decide when to open or close the windows. This automation records a log entry whenever nitrogen monoxide levels near the driveway shift, helping you spot pollution trends over time.

- **Trigger**: Nitrogen monoxide level changed
- **Target**: Driveway NO sensor
- **Threshold type**: 10
- **Action**: Log entry via logbook

{% details "YAML example for NO pollution logging" %}

{% example %}
automation: |
  alias: "Log NO level changes"
  triggers:
    - trigger: air_quality.no_changed
      target:
        entity_id: sensor.driveway_no
      options:
        threshold: 10
  actions:
    - action: logbook.log
      data:
        name: "Air quality"
        message: "Nitrogen monoxide level near the driveway changed."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
