---
title: "Volatile organic compounds ratio changed"
trigger: air_quality.voc_ratio_changed
domain: air_quality
description: "Triggers after one or more volatile organic compound ratios change."
related_triggers:
  - air_quality.voc_ratio_crossed_threshold
---

The **Volatile organic compounds ratio changed** trigger fires after the <abbr title="volatile organic compounds">VOC</abbr> ratio reading on one or more air quality sensors changes by a meaningful amount. Some sensors express VOC concentration as a ratio (typically a percentage) rather than an absolute concentration. This ratio indicates how the current VOC level compares to a baseline, giving you a quick sense of whether air quality is improving or getting worse. It is particularly handy for tracking off-gassing from new furniture, fresh paint, or cleaning products over time.

Imagine getting a notification the moment your living room air quality starts dipping after you've finished cleaning, so you know to crack a window. Use this trigger to automate ventilation, send alerts, or log trends whenever your VOC ratio reading shifts noticeably.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Volatile organic compounds ratio changed**.
6. Under **Threshold type**, set how much the ratio has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the volatile organic compounds ratio has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.voc_ratio_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.voc_ratio_changed
  target:
    entity_id: sensor.living_room_voc_ratio
  options:
    threshold: 5
{% endexample %}

This fires whenever the living room VOC ratio changes by at least 5 percent.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the volatile organic compounds ratio must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- The VOC ratio provides a relative reading. A rising ratio means air quality is degrading compared to the sensor's baseline.
- The trigger fires on any change that meets the threshold, whether the ratio goes up or down.
- To react only when the VOC ratio crosses a specific value in one direction, use [Volatile organic compounds ratio crossed threshold](/triggers/air_quality.voc_ratio_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: alert when living room air quality shifts

Maybe someone just sprayed cleaning solution, or the new couch is off-gassing. This automation sends a notification when the VOC ratio in the living room changes significantly so you know to investigate the cause and open a window.

- **Trigger**: Volatile organic compounds ratio changed
  - **Target**: Living room VOC ratio sensor
  - **Threshold type**: 5
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for VOC ratio alert" %}

{% example %}
automation: |
  alias: "Alert on VOC ratio change"
  triggers:
    - trigger: air_quality.voc_ratio_changed
      target:
        entity_id: sensor.living_room_voc_ratio
      options:
        threshold: 5
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "VOC ratio changed"
        message: "The VOC ratio in the living room shifted. Check ventilation."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
