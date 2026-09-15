---
title: "Nitrogen dioxide value"
condition: air_quality.is_no2_value
domain: air_quality
description: "Tests the nitrogen dioxide level of one or more entities."
related_conditions:
  - air_quality.is_no_value
  - air_quality.is_n2o_value
  - air_quality.is_ozone_value
---

The **Nitrogen dioxide value** condition passes when a nitrogen dioxide (NO2) sensor's reading meets a specific level. NO2 is a reddish-brown gas that comes from traffic and combustion, and elevated levels irritate the airways. This condition helps your automation make informed decisions about outdoor air, for example holding off on opening the windows during rush hour or sending you a notification recommending indoor exercise when NO2 is too high.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Nitrogen dioxide value**.
6. Under **Threshold type**, set the NO2 level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The nitrogen dioxide level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_no2_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_no2_value
  target:
    entity_id: sensor.outdoor_no2
  options:
    threshold: 40
    behavior: any
{% endexample %}

This passes when the outdoor NO2 sensor reads at or above 40 µg/m³.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The nitrogen dioxide level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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
- For related pollutants, see [Nitrogen monoxide value](/conditions/air_quality.is_no_value/), [Nitrous oxide value](/conditions/air_quality.is_n2o_value/), and [Ozone value](/conditions/air_quality.is_ozone_value/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: suggest indoor exercise before your morning run

If you have a daily running routine, you want to know whether the outdoor air is safe before heading out. This automation triggers at 6:30 AM and checks whether outdoor NO2 is at or above 40 μg/m3. If it is, you get a friendly suggestion to exercise indoors instead. On clean-air mornings, you never hear a thing and head out as usual.

- **Trigger**: Time: 06:30
- **Condition**: Air Quality: Nitrogen dioxide value
  - **Target**: Outdoor NO2 sensor
  - **Threshold type**: 40
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an NO2 exercise suggestion before your run" %}

{% example %}
automation: |
  alias: "Suggest indoor exercise on high NO2"
  triggers:
    - trigger: time
      at: "06:30:00"
  conditions:
    - condition: air_quality.is_no2_value
      target:
        entity_id: sensor.outdoor_no2
      options:
        threshold: 40
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "High NO2 outside"
        message: >
          Outdoor NO2 is above 40. Consider
          exercising indoors today.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
