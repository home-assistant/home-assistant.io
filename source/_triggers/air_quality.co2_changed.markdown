---
title: "Carbon dioxide level changed"
trigger: air_quality.co2_changed
domain: air_quality
description: "Triggers after one or more carbon dioxide levels change."
related_triggers:
  - air_quality.co2_crossed_threshold
---

The **Carbon dioxide level changed** trigger fires after the carbon dioxide (CO2) reading on one or more air quality sensors changes by a meaningful amount. Carbon dioxide builds up naturally in occupied rooms from breathing, cooking, and heating. A bedroom with the door closed overnight or a packed meeting room after lunch are classic spots where CO2 creeps up without anyone noticing. Rising CO2 is one of the clearest signs that a space needs fresh air.

Imagine your bedroom ventilation fan spinning up automatically in the middle of the night because CO2 climbed while you slept, so you wake up feeling refreshed instead of groggy. Use this trigger to automate ventilation, log indoor air quality trends, or remind household members to open a window when CO2 shifts noticeably.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your CO2 sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Carbon dioxide level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the carbon dioxide level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.co2_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.co2_changed
  target:
    entity_id: sensor.bedroom_co2
  options:
    threshold: 50
{% endexample %}

This fires whenever the bedroom CO2 sensor reading changes by at least 50 ppm.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the carbon dioxide level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Indoor CO2 levels typically range from about 400 ppm (well-ventilated) to over 1,000 ppm (stuffy room). A threshold of 50 to 100 ppm works well for most ventilation automations.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when CO2 crosses a specific level in one direction, use [Carbon dioxide level crossed threshold](/triggers/air_quality.co2_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: ventilate when bedroom CO2 rises

Sleeping in a closed bedroom builds up CO2 overnight, leaving you groggy in the morning. This automation turns on the bedroom ventilation fan whenever the CO2 level shifts significantly, keeping the air fresh so you wake up feeling rested.

- **Trigger**: Carbon dioxide level changed
- **Target**: Bedroom CO2 sensor
- **Threshold type**: 100
- **Action**: Turn on fan

{% details "YAML example for CO2-based bedroom ventilation" %}

{% example %}
automation: |
  alias: "Ventilate bedroom on CO2 change"
  triggers:
    - trigger: air_quality.co2_changed
      target:
        entity_id: sensor.bedroom_co2
      options:
        threshold: 100
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_ventilation
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
