---
title: "Sulphur dioxide value"
condition: air_quality.is_so2_value
domain: air_quality
description: "Tests the sulphur dioxide level of one or more entities."
related_conditions:
  - air_quality.is_no2_value
  - air_quality.is_ozone_value
---

The **Sulphur dioxide value** condition passes when a sulphur dioxide (SO2) sensor's reading meets a specific level. SO2 is a sharp-smelling gas released by burning fossil fuels and volcanic activity. Elevated levels irritate the respiratory system and make outdoor air uncomfortable. This condition lets your automation respond to real readings, closing the windows and notifying you to stay indoors when SO2 is too high, and letting fresh air back in once the reading drops.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Sulphur dioxide value**.
6. Under **Threshold type**, set the SO2 level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The sulphur dioxide level the sensor has to meet or exceed for the condition to pass.
  required: true
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_so2_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_so2_value
  target:
    entity_id: sensor.outdoor_so2
  options:
    threshold: 40
    behavior: any
{% endexample %}

This passes when the outdoor SO2 sensor reads at or above 40 µg/m³.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The sulphur dioxide level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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
- For related pollutant conditions, see [Nitrogen dioxide value](/conditions/air_quality.is_no2_value/) and [Ozone value](/conditions/air_quality.is_ozone_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: warn you before heading outside in the morning

If you live near an industrial area, SO2 readings sometimes spike overnight. This automation triggers at 7:00 AM and checks the outdoor SO2 level. If the reading is at or above 40 μg/m3, you get a notification recommending you stay indoors. On mornings with clean air, you can leave without interruption.

- **Trigger**: Time: 07:00
- **Condition**: Air Quality: Sulphur dioxide value
- **Target**: Outdoor SO2 sensor
- **Threshold type**: 40
- **Condition passes if**: Any
- **Action**: Notify: Send notification

{% details "YAML example for a morning SO2 warning" %}

{% example %}
automation: |
  alias: "Morning SO2 warning"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: air_quality.is_so2_value
      target:
        entity_id: sensor.outdoor_so2
      options:
        threshold: 40
        behavior: any
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "SO2 is high outside"
        message: >
          Outdoor SO2 is above 40. Consider
          staying indoors this morning.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
