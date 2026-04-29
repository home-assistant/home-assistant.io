---
title: "Volatile organic compounds ratio value"
condition: air_quality.is_voc_ratio_value
domain: air_quality
description: "Tests the volatile organic compounds ratio of one or more entities."
related_conditions:
  - air_quality.is_voc_value
  - air_quality.is_co2_value
---

The **Volatile organic compounds ratio value** condition passes when a <abbr title="volatile organic compounds">VOC</abbr> ratio sensor's reading meets a specific level. Some sensors express VOC levels as a ratio or index rather than an absolute concentration, which makes it easier to compare readings across different environments. This condition lets your automation act on that relative reading, for example sending a reminder to open a window in the bedroom when the VOC ratio climbs after a room has been closed up all day.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Volatile organic compounds ratio value**.
6. Under **Threshold type**, set the VOC ratio the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The VOC ratio the sensor has to meet or exceed for the condition to pass.
  required: true
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_voc_ratio_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_voc_ratio_value
  target:
    entity_id: sensor.bedroom_voc_ratio
  options:
    threshold: 150
    behavior: any
{% endexample %}

This passes when the bedroom VOC ratio sensor reads at or above 150.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The VOC ratio the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
behavior:
  description: >
    When multiple sensors are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Sensors that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- If your sensor reports VOC as an absolute concentration instead of a ratio, use [Volatile organic compounds value](/conditions/air_quality.is_voc_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: remind you to open a window when your morning alarm goes off

After a full night with the door closed, the bedroom VOC ratio creeps up from off-gassing furniture and bedding. This automation triggers when your morning alarm goes off and checks the current VOC ratio. If the reading is at or above 150, you get a reminder to crack a window. On nights when you already slept with the window open, the ratio stays low and no notification is sent.

- **Trigger**: Time: 07:00
- **Condition**: Air Quality: Volatile organic compounds ratio value
- **Target**: Bedroom VOC ratio sensor
- **Threshold type**: 150
- **Condition passes if**: Any
- **Action**: Notify: Send notification

{% details "YAML example for a morning VOC ratio reminder" %}

{% example %}
automation: |
  alias: "Morning VOC ratio reminder"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: air_quality.is_voc_ratio_value
      target:
        entity_id: sensor.bedroom_voc_ratio
      options:
        threshold: 150
        behavior: any
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "Time to air out the bedroom"
        message: >
          The bedroom VOC ratio is above 150.
          Opening a window for a few minutes helps.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
