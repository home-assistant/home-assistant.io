---
title: "Carbon dioxide value"
condition: air_quality.is_co2_value
domain: air_quality
description: "Tests the carbon dioxide level of one or more entities."
related_conditions:
  - air_quality.is_voc_value
---

The **Carbon dioxide value** condition passes when a carbon dioxide (CO2) sensor's reading meets a specific level. A stuffy meeting room, a crowded living room on movie night, or a bedroom with the door closed overnight all push CO2 levels higher than you would expect. This condition lets your automation act only when CO2 is genuinely elevated, so the ventilation fan starts when it is truly needed and stays off when the air is fine.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Carbon dioxide value**.
6. Under **Threshold type**, set the CO2 level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The carbon dioxide level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_co2_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_co2_value
  target:
    entity_id: sensor.office_co2
  options:
    threshold: 1000
    behavior: any
{% endexample %}

This passes when the office CO2 sensor reads at or above 1000 ppm.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The carbon dioxide level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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
- Outdoor CO2 levels are typically around 420 ppm. Indoor levels above 1000 ppm often suggest the room needs better ventilation.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on ventilation at bedtime only if CO2 is elevated

After you spend an evening in the living room with the doors closed, CO2 levels are sometimes higher than you would expect by the time you head to bed. This automation triggers at your usual bedtime and checks the bedroom CO2 reading. If the level is at or above 1000 ppm, the ventilation fan turns on so you sleep with fresh air. On evenings when the room already has good airflow, the fan stays off.

- **Trigger**: Time: 22:30
- **Condition**: Air Quality: Carbon dioxide value
- **Target**: Bedroom CO2 sensor
- **Threshold type**: 1000
- **Condition passes if**: Any
- **Action**: Fan: Turn on

{% details "YAML example for bedtime ventilation on high CO2" %}

{% example %}
automation: |
  alias: "Bedtime ventilation if CO2 is high"
  triggers:
    - trigger: time
      at: "22:30:00"
  conditions:
    - condition: air_quality.is_co2_value
      target:
        entity_id: sensor.bedroom_co2
      options:
        threshold: 1000
        behavior: any
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_ventilation
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
