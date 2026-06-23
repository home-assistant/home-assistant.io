---
title: "Light is detected"
condition: illuminance.is_detected
domain: illuminance
description: "Tests if light is currently detected."
related_conditions:
  - illuminance.is_not_detected
  - illuminance.is_value
---

The **Light is detected** condition passes when one or more light binary sensors are currently detecting light. Use it to gate an automation on a lit area, like only running a routine while a closet light is still on, or only sending a reminder if a room is currently bright.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Light is detected**.
5. Under **Targets** (see [Targets](#targets)), select one or more light sensors, devices, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
7. Under **For at least**, you can set how long the sensors must keep detecting light before the condition passes. Leave it at zero for the condition to pass as soon as light is detected.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple light sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor is detecting light, or **All** to pass only when every sensor is detecting light.
For at least:
  description: How long the sensor or sensors must keep detecting light before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `illuminance.is_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: illuminance.is_detected
  target:
    entity_id: binary_sensor.closet_light_sensor
{% endexample %}

This passes when the closet light sensor is currently detecting light.

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple light sensors are targeted, controls how results combine:

    - `any` (default): passes if at least one targeted sensor is detecting light.
    - `all`: passes only when every targeted sensor is detecting light.
  required: false
  type: string
  default: any
for:
  description: How long the sensor or sensors must keep detecting light before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works with binary sensors that have the **light** device class. The sensor's threshold for what counts as "light detected" is set on the device itself.
- Sensors that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- For numeric illuminance readings (in lux), use [Illuminance](/conditions/illuminance.is_value/) instead.
- To check the opposite state, use [Light is not detected](/conditions/illuminance.is_not_detected/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only send a closet reminder if the light is on

When the daily 23:00 evening check runs, send a notification only if the closet light sensor has been detecting light for at least 10 minutes, so a brief visit doesn't trigger an alert.

- **Trigger**: Time: 23:00
- **Condition**: Light is detected
  - **Target**: Closet light sensor
  - **For at least**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a closet light reminder" %}

{% example %}
automation: |
  alias: "Remind to turn off closet light"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: illuminance.is_detected
      target:
        entity_id: binary_sensor.closet_light_sensor
      options:
        for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The closet light has been on for over 10 minutes."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
