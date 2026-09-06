---
title: "PM4 level changed"
trigger: air_quality.pm4_changed
domain: air_quality
description: "Triggers when one or more PM4 levels change."
related_triggers:
  - air_quality.pm4_crossed_threshold
---

The **PM4 level changed** trigger fires after the PM4 (particulate matter 4 micrometers or smaller) reading on one or more air quality sensors changes by a meaningful amount. PM4 particles come from sources like pollen, mold spores, dust, and certain industrial processes. They sit between the finer PM2.5 and the coarser PM10 range, giving you an additional view of the particles floating in your air. If you deal with seasonal allergies or live near a dusty road, tracking PM4 helps you spot irritants before your nose does.

Imagine your home office air purifier starting as soon as pollen counts shift on a spring afternoon, so you stay focused instead of reaching for tissues. Use this trigger to start filtration, log changes, or notify household members whenever PM4 readings shift noticeably.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **PM4 level changed**.
6. Under **Threshold type**, set how much the level has to change before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: How much the PM4 level has to change before the trigger fires. Can be a fixed number, or reference a helper entity that provides the value.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.pm4_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.pm4_changed
  target:
    entity_id: sensor.office_pm4
  options:
    threshold: 10
{% endexample %}

This fires whenever the office PM4 sensor reading changes by at least 10 micrograms per cubic meter.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The minimum amount the PM4 level must change before the trigger fires. Accepts a number, or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
{% endoptions_yaml %}

{% include triggers/targets.md %}

## Good to know

- PM4 fills the gap between PM2.5 and PM10 measurements, which is useful if your sensor reports this size range separately.
- The trigger fires on any change that meets the threshold, whether the level goes up or down.
- To react only when PM4 crosses a specific concentration in one direction, use [PM4 level crossed threshold](/triggers/air_quality.pm4_crossed_threshold/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when office PM4 shifts

Allergy season and dusty days make it hard to focus when you work from home. This automation sends a notification when PM4 levels in your home office change noticeably, so you know exactly when to turn on the air purifier or crack a window.

- **Trigger**: PM4 level changed
  - **Target**: Office PM4 sensor
  - **Threshold type**: 10
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for PM4 office notification" %}

{% example %}
automation: |
  alias: "Notify on office PM4 change"
  triggers:
    - trigger: air_quality.pm4_changed
      target:
        entity_id: sensor.office_pm4
      options:
        threshold: 10
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "PM4 change detected"
        message: "PM4 levels in the office changed. Consider turning on the air purifier."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
