---
title: "Volatile organic compounds level changed"
trigger: air_quality.voc_changed
domain: air_quality
description: "Triggers when one or more volatile organic compound levels change."
related_triggers:
  - air_quality.voc_crossed_threshold
---

The **Volatile organic compounds level changed** trigger fires after the <abbr title="volatile organic compounds">VOC</abbr> reading on one or more air quality sensors changes by a meaningful amount. Volatile organic compounds are gases released by paints, cleaning products, adhesives, new furniture, cooking, and many building materials. That "new furniture smell" or the sharp scent of a freshly cleaned bathroom? Those are VOCs. Elevated levels affect indoor air quality and comfort, and prolonged exposure is a health concern.

Imagine the exhaust fan in your freshly painted room switching on automatically as fumes build up, clearing the air so you don't have to keep checking. Use this trigger to boost ventilation, turn on an air purifier, or log air quality changes whenever your VOC sensor reports a significant shift.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Volatile organic compounds level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the volatile organic compounds level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.voc_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.voc_changed
  target:
    entity_id: sensor.kitchen_voc
  options:
    threshold: 50
{% endexample %}

This fires whenever the kitchen VOC sensor reading changes by at least 50 micrograms per cubic meter.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the volatile organic compounds level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- VOC sensors are especially useful in kitchens, bathrooms, and newly renovated rooms where off-gassing is common.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when VOC levels cross a specific concentration in one direction, use [Volatile organic compounds level crossed threshold](/triggers/air_quality.voc_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: ventilate after painting

A freshly painted room smells exciting at first, but those fumes are VOCs you don't want to breathe for hours. This automation turns on the exhaust fan when VOC levels shift, helping clear the fumes faster so the room is ready to enjoy sooner.

- **Trigger**: Volatile organic compounds level changed
- **Target**: Workshop VOC sensor
- **Threshold type**: 100
- **Action**: Turn on fan

{% details "YAML example for VOC-driven ventilation" %}

{% example %}
automation: |
  alias: "Ventilate on VOC change"
  triggers:
    - trigger: air_quality.voc_changed
      target:
        entity_id: sensor.workshop_voc
      options:
        threshold: 100
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.workshop_exhaust
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
