---
title: "PM2.5 value"
condition: air_quality.is_pm25_value
domain: air_quality
description: "Tests the PM2.5 level of one or more entities."
related_conditions:
  - air_quality.is_pm1_value
  - air_quality.is_pm4_value
  - air_quality.is_pm10_value
---

The **PM2.5 value** condition passes when a PM2.5 sensor's reading meets a specific level. PM2.5 is the most widely used indicator of air quality, and for good reason: these fine particles (smaller than 2.5 micrometers) come from traffic, wildfires, and everyday cooking, and they affect respiratory health at surprisingly low concentrations. This condition gives your automation precision, closing the windows only when outdoor PM2.5 is above a safe limit or holding off on opening them until the reading drops back down.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your air quality sensor is in (like your living room or bedroom). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **PM2.5 value**.
6. Under **Threshold type**, set the PM2.5 level the condition checks against.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: The PM2.5 level the sensor has to meet or exceed for the condition to pass.
Condition passes if:
  description: When multiple sensors are targeted, controls how results combine. Pick **Any** to pass if at least one sensor meets the threshold, or **All** to pass only when every targeted sensor does.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `air_quality.is_pm25_value`. A basic example looks like this:

{% example %}
condition: |
  condition: air_quality.is_pm25_value
  target:
    entity_id: sensor.living_room_pm25
  options:
    threshold: 35
    behavior: any
{% endexample %}

This passes when the living room PM2.5 sensor reads at or above 35 µg/m³.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
threshold:
  description: >
    The PM2.5 level the sensor has to meet or exceed for the condition to pass. Accepts a number or a reference to an `input_number`, `number`, or `sensor` entity.
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
- The World Health Organization recommends keeping 24-hour average PM2.5 exposure below 15 μg/m3.
- For other particle sizes, see
  - [PM1 value](/conditions/air_quality.is_pm1_value/)
  - [PM4 value](/conditions/air_quality.is_pm4_value/)
  - [PM10 value](/conditions/air_quality.is_pm10_value/)

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: check outdoor PM2.5 before opening the windows each morning

During wildfire season, outdoor PM2.5 readings spike overnight while you sleep. This automation triggers when you open the living room window cover and checks the outdoor PM2.5 reading first. If the level is at or above 35 μg/m3, the cover closes right back and you get a notification letting you know the air outside is not safe for ventilation. On clear mornings, nothing happens and you enjoy the fresh air.

- **Trigger**: State: Living room window cover opened
- **Condition**: Air Quality: PM2.5 value
  - **Target**: Outdoor PM2.5 sensor
  - **Threshold type**: 35
  - **Condition passes if**: Any
- **Action**: Close cover
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for closing windows back on high outdoor PM2.5" %}

{% example %}
automation: |
  alias: "Close windows if outdoor PM2.5 is high"
  triggers:
    - trigger: state
      entity_id: cover.living_room_window
      to: open
  conditions:
    - condition: air_quality.is_pm25_value
      target:
        entity_id: sensor.outdoor_pm25
      options:
        threshold: 35
        behavior: any
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_window
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "PM2.5 is high outside"
        message: >
          Outdoor PM2.5 is above 35. The window
          has been closed to keep the air clean.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
