---
title: "PM4 value"
condition: air_quality.is_pm4_value
domain: air_quality
description: "Tests the PM4 level of one or more entities."
related_conditions:
  - air_quality.is_pm1_value
  - air_quality.is_pm25_value
  - air_quality.is_pm10_value
---

The **PM4 value** condition passes when a PM4 sensor's reading meets a specific level. PM4 covers particulate matter smaller than 4 micrometers in diameter, a size range that bridges fine and coarse particles. Some sensors report PM4 alongside PM2.5 and PM10, giving you a more complete picture of what is floating in the air. This condition lets your automation react when PM4 readings are elevated, for example sending a notification that your air filter is due for a check.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **PM4 value**.
6. Under **Threshold type**, set the PM4 level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The PM4 level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_pm4_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_pm4_value
  target:
    entity_id: sensor.living_room_pm4
  options:
    threshold: 50
    behavior: any
{% endexample %}

This passes when the living room PM4 sensor reads at or above 50 µg/m³.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The PM4 level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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
- For other particle sizes, see
- [PM1 value](/conditions/air_quality.is_pm1_value/)
- PM2.5 value](/conditions/air_quality.is_pm25_value/)
- [PM10 value](/conditions/air_quality.is_pm10_value/)

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a weekly filter reminder only if PM4 is elevated

If your indoor PM4 readings are consistently high, the air filters are likely overdue for a swap. This automation runs every Sunday morning and checks the living room PM4 reading. If the level is at or above 50 μg/m3, you get a reminder to check the filters. On weeks when the air is clean, no notification is sent.

- **Trigger**: Time: Every Sunday at 09:00
- **Condition**: Air Quality: PM4 value
  - **Target**: Living room PM4 sensor
  - **Threshold type**: 50
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a weekly PM4 filter reminder" %}

{% example %}
automation: |
  alias: "Weekly filter reminder if PM4 is high"
  triggers:
    - trigger: time
      at: "09:00:00"
  conditions:
    - condition: time
      weekday:
        - sun
    - condition: air_quality.is_pm4_value
      target:
        entity_id: sensor.living_room_pm4
      options:
        threshold: 50
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Time to check the air filters"
        message: >
          The living room PM4 reading is above 50.
          Your air filters might need replacing.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
