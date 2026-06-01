---
title: "Moisture is not detected"
condition: moisture.is_not_detected
domain: moisture
description: "Tests if one or more moisture sensors are not detecting moisture."
related_conditions:
  - moisture.is_detected
  - moisture.is_value
---

The **Moisture is not detected** condition passes when one or more moisture binary sensors are dry. Use it to gate an automation on dry conditions, like only running the dishwasher when the surrounding leak sensor is dry, or only resetting an alert once the area has cleared.

For an explanation of how moisture differs from humidity, see [Moisture vs. humidity](/integrations/moisture/#moisture-vs-humidity) on the integration page.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Moisture is not detected**.
5. Under **Targets** (see [Targets](#targets)), select one or more leak sensors, devices, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
7. Under **For at least**, you can set how long the sensors must stay dry before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple moisture sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor is dry, or **All** to pass only when every sensor is dry.
For at least:
  description: How long the sensor or sensors must stay dry before the condition passes. The default is `0` hours, `00` minutes and `00` seconds.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `moisture.is_not_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: moisture.is_not_detected
  target:
    entity_id: binary_sensor.dishwasher_leak
{% endexample %}

This passes when the leak sensor next to the dishwasher is currently dry.

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple moisture sensors are targeted, controls how results combine:

    - `any` (**Any** in the UI, default): passes if at least one targeted sensor is dry.
    - `all` (**All** in the UI): passes only when every targeted sensor is dry.
  required: false
  type: string
  default: any
for:
  description: How long the sensor or sensors must stay dry before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works with binary sensors that have the **moisture** device class, such as water leak sensors.
- Sensors that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- To check for the opposite state, use [Moisture is detected](/conditions/moisture.is_detected/).
- For percentage-based moisture readings (such as soil moisture probes), use [Moisture level](/conditions/moisture.is_value/) instead.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only start the dishwasher when no leak is present

When the daily 22:00 dishwasher start time arrives, only start the dishwasher if the leak sensor next to it has been dry for at least 10 minutes.

- **Trigger**: Time: 22:00
- **Condition**: Moisture is not detected
  - **Target**: Dishwasher leak sensor
  - **Condition passes if**: Any
  - **For at least**: 00:10:00
- **Action**: Turn on switch
  - **Target**: Dishwasher smart plug

{% details "YAML example for a safe dishwasher start" %}

{% example %}
automation: |
  alias: "Start dishwasher only if dry"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: moisture.is_not_detected
      target:
        entity_id: binary_sensor.dishwasher_leak
      options:
        for: "00:10:00"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.dishwasher
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
