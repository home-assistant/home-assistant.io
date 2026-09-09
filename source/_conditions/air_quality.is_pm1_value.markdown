---
title: "PM1 value"
condition: air_quality.is_pm1_value
domain: air_quality
description: "Tests the PM1 level of one or more entities."
related_conditions:
  - air_quality.is_pm25_value
  - air_quality.is_pm4_value
  - air_quality.is_pm10_value
---

The **PM1 value** condition passes when a PM1 sensor's reading meets a specific level. PM1 refers to ultra-fine particulate matter smaller than 1 micrometer in diameter, particles so tiny they travel deep into the lungs. Cooking on a gas stove or burning a candle sends PM1 readings up quickly. This condition lets you start an air purifier only when ultra-fine particles are genuinely elevated, saving energy on quiet days and protecting your family when it matters.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **PM1 value**.
6. Under **Threshold type**, set the PM1 level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The PM1 level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_pm1_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_pm1_value
  target:
    entity_id: sensor.bedroom_pm1
  options:
    threshold: 25
    behavior: any
{% endexample %}

This passes when the bedroom PM1 sensor reads at or above 25 µg/m³.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The PM1 level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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
- For coarser particulate readings, see
  - [PM2.5 value](/conditions/air_quality.is_pm25_value/)
  - [PM4 value](/conditions/air_quality.is_pm4_value/)
  - [PM10 value](/conditions/air_quality.is_pm10_value/)

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: start the bedroom purifier at bedtime only if PM1 is elevated

Ultra-fine particles from cooking, candles, or the heating system linger in a closed bedroom. This automation triggers at bedtime and checks the current PM1 reading. If the level is at or above 25 μg/m3, the air purifier turns on so you breathe clean air while you sleep. On evenings when the air is already fresh, the purifier stays off and the bedroom stays quiet.

- **Trigger**: Time: 22:00
- **Condition**: Air Quality: PM1 value
  - **Target**: Bedroom PM1 sensor
  - **Threshold type**: 25
- **Action**: Turn on fan
  - **Target**: Bedroom purifier

{% details "YAML example for starting the purifier at bedtime on high PM1" %}

{% example %}
automation: |
  alias: "Bedroom purifier at bedtime if PM1 is high"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: air_quality.is_pm1_value
      target:
        entity_id: sensor.bedroom_pm1
      options:
        threshold: 25
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_purifier
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
