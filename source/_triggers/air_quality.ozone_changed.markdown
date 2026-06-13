---
title: "Ozone level changed"
trigger: air_quality.ozone_changed
domain: air_quality
description: "Triggers after one or more ozone levels change."
related_triggers:
  - air_quality.ozone_crossed_threshold
---

The **Ozone level changed** trigger fires after the ozone (O3) reading on one or more air quality sensors changes by a meaningful amount. Ground-level ozone forms when sunlight reacts with pollutants from vehicles and industry. It is the primary ingredient in smog and tends to peak on hot, sunny afternoons. If you enjoy opening the windows on a warm day, ozone monitoring helps you decide whether the outdoor air is actually better than what's already inside.

Imagine your HVAC switching to recirculation mode on a scorching summer afternoon because ozone levels shifted, keeping your family comfortable without pulling smoggy air indoors. Use this trigger to close windows, pause outdoor ventilation, or send a health reminder whenever ozone readings shift noticeably.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Ozone level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the ozone level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.ozone_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.ozone_changed
  target:
    entity_id: sensor.backyard_ozone
  options:
    threshold: 10
{% endexample %}

This fires whenever the backyard ozone sensor reading changes by at least 10 ppb.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the ozone level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- Ozone levels are highest on warm, sunny days with little wind. Monitoring helps you decide when to keep windows closed and rely on indoor filtration.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when ozone crosses a specific concentration in one direction, use [Ozone level crossed threshold](/triggers/air_quality.ozone_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: pause fresh-air intake on ozone change

On a scorching summer afternoon, ground-level ozone peaks just when you want fresh air the most. This automation switches the HVAC system to recirculation mode when the outdoor ozone reading shifts significantly, so you stop pulling smoggy air indoors.

- **Trigger**: Ozone level changed
- **Target**: Outdoor ozone sensor
- **Threshold type**: 10
- **Action**: Select HVAC preset

{% details "YAML example for ozone-driven HVAC recirculation" %}

{% example %}
automation: |
  alias: "Recirculate on ozone change"
  triggers:
    - trigger: air_quality.ozone_changed
      target:
        entity_id: sensor.backyard_ozone
      options:
        threshold: 10
  actions:
    - action: climate.set_preset_mode
      target:
        entity_id: climate.hvac
      data:
        preset_mode: "recirculate"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
