---
title: "Nitrous oxide value"
condition: air_quality.is_n2o_value
domain: air_quality
description: "Tests the nitrous oxide level of one or more entities."
related_conditions:
  - air_quality.is_no_value
  - air_quality.is_no2_value
---

The **Nitrous oxide value** condition passes when a nitrous oxide (N2O) sensor's reading meets a specific level. N2O is a greenhouse gas that shows up in agricultural settings, greenhouses, and some industrial spaces. If you monitor a greenhouse or workshop, this condition lets your automation turn on ventilation only when N2O levels genuinely need attention, keeping fans off during normal readings so you save energy and reduce noise.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Nitrous oxide value**.
6. Under **Threshold type**, set the N2O level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The nitrous oxide level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_n2o_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_n2o_value
  target:
    entity_id: sensor.greenhouse_n2o
  options:
    threshold: 500
    behavior: any
{% endexample %}

This passes when the greenhouse N2O sensor reads at or above 500 ppb.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The nitrous oxide level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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
- For related nitrogen-based pollutants, see [Nitrogen monoxide value](/conditions/air_quality.is_no_value/) and [Nitrogen dioxide value](/conditions/air_quality.is_no2_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: ventilate the greenhouse each morning only if N2O is elevated

Fertilizer off-gassing raises N2O levels overnight in an enclosed greenhouse, especially on warm nights. This automation runs each morning at sunrise and checks the current reading. If N2O is at or above 500 ppb, the ventilation fan turns on so the air is fresh before you start working. On mornings when levels stayed low, the fan stays off, keeping the greenhouse warm and saving energy.

- **Trigger**: Sunrise
- **Condition**: Air Quality: Nitrous oxide value
- **Target**: Greenhouse N2O sensor
- **Threshold type**: 500
- **Condition passes if**: Any
- **Action**: Fan: Turn on

{% details "YAML example for morning greenhouse ventilation on high N2O" %}

{% example %}
automation: |
  alias: "Morning greenhouse ventilation if N2O is high"
  triggers:
    - trigger: sun.sunrise
  conditions:
    - condition: air_quality.is_n2o_value
      target:
        entity_id: sensor.greenhouse_n2o
      options:
        threshold: 500
        behavior: any
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.greenhouse_ventilation
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
