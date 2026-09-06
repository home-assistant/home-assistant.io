---
title: "PM10 value"
condition: air_quality.is_pm10_value
domain: air_quality
description: "Tests the PM10 level of one or more entities."
related_conditions:
  - air_quality.is_pm1_value
  - air_quality.is_pm25_value
  - air_quality.is_pm4_value
---

The **PM10 value** condition passes when a PM10 sensor's reading meets a specific level. PM10 covers coarse particulate matter smaller than 10 micrometers in diameter, which includes dust, pollen, and mold spores. If someone in your household has allergies, this condition is especially useful for closing the windows automatically during high-pollen hours and keeping them open when the reading is low, so you enjoy fresh air without the sneezing.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **PM10 value**.
6. Under **Threshold type**, set the PM10 level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The PM10 level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_pm10_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_pm10_value
  target:
    entity_id: sensor.outdoor_pm10
  options:
    threshold: 50
    behavior: any
{% endexample %}

This passes when the outdoor PM10 sensor reads at or above 50 µg/m³.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The PM10 level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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
- PM10 includes larger particles like dust and pollen. For finer readings, see:
  - [PM1 value](/conditions/air_quality.is_pm1_value/)
  - [PM2.5 value](/conditions/air_quality.is_pm25_value/)
  - [PM4 value](/conditions/air_quality.is_pm4_value/)

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: check outdoor air before opening windows in the morning

On spring mornings, pollen and dust push PM10 readings up before you even notice. This automation triggers when you open the bedroom window cover and checks the outdoor PM10 reading first. If the level is at or above 50 μg/m3, the cover closes right back and you get a notification explaining why. On clean-air mornings, nothing happens and you enjoy the fresh breeze.

- **Trigger**: State: Bedroom window cover opened
- **Condition**: Air Quality: PM10 value
  - **Target**: Outdoor PM10 sensor
  - **Threshold type**: 50
  - **Condition passes if**: Any
- **Action**: Close cover
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for closing windows back on high PM10" %}

{% example %}
automation: |
  alias: "Close windows if outdoor PM10 is high"
  triggers:
    - trigger: state
      entity_id: cover.bedroom_window
      to: open
  conditions:
    - condition: air_quality.is_pm10_value
      target:
        entity_id: sensor.outdoor_pm10
      options:
        threshold: 50
        behavior: any
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.bedroom_window
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "PM10 is high outside"
        message: >
          Outdoor PM10 is above 50. The window
          has been closed to keep allergens out.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
