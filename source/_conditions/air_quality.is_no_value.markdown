---
title: "Nitrogen monoxide value"
condition: air_quality.is_no_value
domain: air_quality
description: "Tests the nitrogen monoxide level of one or more entities."
related_conditions:
  - air_quality.is_no2_value
  - air_quality.is_n2o_value
---

The **Nitrogen monoxide value** condition passes when a nitrogen monoxide (NO) sensor's reading meets a specific level. NO is a reactive gas that shows up mainly around vehicle exhaust and industrial activity. If you live near a busy road, rush-hour traffic raises NO levels noticeably. This condition lets your automation respond to that pattern, closing the garage ventilation when NO spikes during the morning commute and reopening it once readings settle down.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Nitrogen monoxide value**.
6. Under **Threshold type**, set the NO level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The nitrogen monoxide level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Each** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_no_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_no_value
  target:
    entity_id: sensor.outdoor_no
  options:
    threshold: 100
    behavior: each
{% endexample %}

This passes when the outdoor NO sensor reads at or above 100 µg/m³.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The nitrogen monoxide level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
  required: true
  type: any
behavior:
  description: >
    When multiple sensors are targeted, controls how results combine. Accepts `all` or `each`.
  required: true
  type: string
  default: each
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Sensors that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Each** and fail for **All**.
- Nitrogen monoxide is closely related to nitrogen dioxide (NO2). For NO2 readings, see [Nitrogen dioxide value](/conditions/air_quality.is_no2_value/). For nitrous oxide, see [Nitrous oxide value](/conditions/air_quality.is_n2o_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: keep the garage sealed during the morning commute

If you live near a busy road, rush-hour exhaust raises outdoor NO levels fast. This automation triggers at 7:30 AM and checks the outdoor NO reading. If the level is at or above 100 μg/m3, the garage ventilation closes so fumes stay outside. On mornings with light traffic, the ventilation stays open as usual.

- **Trigger**: Time: 07:30
- **Condition**: Air Quality: Nitrogen monoxide value
- **Target**: Outdoor NO sensor
- **Threshold type**: 100
- **Condition passes if**: Any
- **Action**: Cover: Close cover

{% details "YAML example for closing the garage during the morning commute" %}

{% example %}
automation: |
  alias: "Seal garage during morning commute"
  triggers:
    - trigger: time
      at: "07:30:00"
  conditions:
    - condition: air_quality.is_no_value
      target:
        entity_id: sensor.outdoor_no
      options:
        threshold: 100
        behavior: each
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.garage_ventilation
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
