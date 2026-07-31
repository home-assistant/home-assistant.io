---
title: "Moisture is detected"
condition: moisture.is_detected
domain: moisture
description: "Tests if one or more moisture sensors are detecting moisture."
related_conditions:
  - moisture.is_not_detected
  - moisture.is_value
---

The **Moisture is detected** condition passes when one or more moisture binary sensors are detecting water. Use it with leak sensors to gate an automation on wet conditions, like only sending a notification if a leak is currently present or only running a routine while the basement floor is still wet.

## Prerequisites

- The target must be a binary sensor with the moisture device class.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Moisture is detected**.
5. Under **Targets** (see [Targets](#targets)), select one or more leak sensors, devices, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
7. Under **For at least**, you can set how long the sensors must keep detecting moisture before the condition passes. Leave it at zero for the condition to pass as soon as moisture is detected.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple moisture sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor is detecting moisture, or **All** to pass only when every sensor is detecting moisture.
For at least:
  description: How long the sensor or sensors must keep detecting moisture before the condition passes. The default is `0` hours, `00` minutes and `00` seconds. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `moisture.is_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: moisture.is_detected
  target:
    entity_id: binary_sensor.kitchen_sink_leak
{% endexample %}

This passes when the leak sensor under the kitchen sink is currently detecting water.

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple moisture sensors are targeted, controls how results combine:

    - `any` (default): passes if at least one targeted sensor is detecting moisture.
    - `all`: passes only when every targeted sensor is detecting moisture.
  required: false
  type: string
  default: any
for:
  description: How long the sensor or sensors must keep detecting moisture before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition is useful for water leak sensors.
- Sensors that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- For percentage-based moisture readings (such as soil moisture probes), use [Moisture level](/conditions/moisture.is_value/) instead.
- To check the opposite state, use [Moisture is not detected](/conditions/moisture.is_not_detected/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: escalate a leak alert if it persists

When a leak sensor keeps detecting water for 5 minutes, send a follow-up notification so a short drip does not trigger an alarm but a real leak does.

- **Trigger**: Time pattern: Every minute
- **Condition**: Moisture is detected
  - **Target**: Basement leak sensor
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a persistent leak alert" %}

{% example %}
automation: |
  alias: "Escalate persistent basement leak"
  triggers:
    - trigger: time_pattern
      minutes: "/1"
  conditions:
    - condition: moisture.is_detected
      target:
        entity_id: binary_sensor.basement_leak
      options:
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The basement leak sensor has been wet for over 5 minutes."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
