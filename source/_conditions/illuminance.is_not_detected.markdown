---
title: "Light level is not detected"
condition: illuminance.is_not_detected
domain: illuminance
description: "Tests if one or more light sensors are not detecting light."
related_conditions:
  - illuminance.is_detected
  - illuminance.is_value
---

The **Light level is not detected** condition passes when one or more light binary sensors are currently dark. Use it to gate an automation on a dark area, like only running a wake-up routine if the bedroom is still dark, or only turning on hallway lights when an outdoor sensor reports no daylight.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Light level is not detected**.
5. Under **Targets** (see [Targets](#targets)), select one or more light sensors, devices, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
7. Under **For at least**, you can set how long the sensors must remain dark before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple light sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor is dark, or **All** to pass only when every sensor is dark.
For at least:
  description: How long the sensor or sensors must remain dark before the condition passes. The default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `illuminance.is_not_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: illuminance.is_not_detected
  target:
    entity_id: binary_sensor.outdoor_light_sensor
{% endexample %}

This passes when the outdoor light sensor is currently dark.

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple light sensors are targeted, controls how results combine:

    - `any` (default): passes if at least one targeted sensor is dark.
    - `all`: passes only when every targeted sensor is dark.
  required: false
  type: string
  default: any
for:
  description: How long the sensor or sensors must remain dark before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works with binary sensors that have the **light** device class. The sensor's threshold for what counts as "no light detected" is set on the device itself.
- Sensors that are `unavailable` or `unknown` are skipped for **Any** and fail for **All**.
- For numeric illuminance readings (in lux), use [Illuminance](/conditions/illuminance.is_value/) instead.
- To check for the opposite state, use [Light level is detected](/conditions/illuminance.is_detected/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only turn on hallway lights when motion is detected and it's dark

When motion is detected in the hallway, only turn on the hallway light if the outdoor light sensor has been dark for at least 5 minutes.

- **Trigger**: Motion detected (hallway sensor)
- **Condition**: Light level is not detected
  - **Target**: Outdoor light sensor
  - **For at least**: 00:05:00
- **Action**: Turn on light
  - **Target**: light.hallway

{% details "YAML example for motion-activated lights at night" %}

{% example %}
automation: |
  alias: "Turn on hallway light when dark and motion"
  triggers:
    - trigger: motion.detected
      target:
        entity_id: binary_sensor.hallway_motion
  conditions:
    - condition: illuminance.is_not_detected
      target:
        entity_id: binary_sensor.outdoor_light_sensor
      options:
        for: "00:05:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
