---
title: "Motion is detected"
condition: motion.is_detected
domain: motion
description: "Tests if one or more motion sensors are detecting motion."
related_conditions:
  - motion.is_not_detected
---

The **Motion is detected** condition passes when one or more motion sensors are detecting motion. Use it in an automation for turning devices on or off, running security checks or sending alerts if motion is detected.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Motion is detected**.
5. Under **Targets** (see [Targets](#targets)), select one or more motion entities, motion devices, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Each** or **All**.
7. Under **For at least**, you can set for how long one or more sensors must be detecting motion before the condition passes. Leave it at zero for the condition to pass as soon as the sensors start detecting motion.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple motion sensors are targeted, controls how results combine. Pick **Each** to pass if at least one targeted sensor is detecting motion, or **All** to pass only when every sensor is detecting motion.
For at least:
  description: How long one or more sensors must be continuously detecting motion before the condition passes. The default is `0` hours, `00` minutes and `00` seconds.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `motion.is_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: motion.is_detected
  target:
    entity_id: motion.entrance_motion_sensor
  options:
    for: "00:05:00"
{% endexample %}

This passes when the entity `motion.entrance_motion_sensor` has been continuously detecting motion for 5 minutes.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple motion sensors are targeted, controls how results combine. Accepts `all` or `each`.
  required: false
  type: string
  default: each
for:
  description: >
    How long one or more motion sensors must be continuously detecting motion before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- When using the **For at least** option in your automation, consider that the automation will not run if there is a stop in motion detection during that time period.
- In large rooms, for example, motion sensors might not detect people that are quietly sitting there. If you want to make sure presence is detected, use multiple motion sensors in one area or combine sensors with presence detection.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: set the office fan to medium when you are at the desk

When it gets warm, if there is someone working at the office desk, this automation sets the office fan to medium preset mode.

- **Trigger**: Temperature crossed threshold (25 ºC)
  - **Target**: Office (by area)
- **Condition**: Motion is detected
  - **Target**: Office motion sensor
- **Action**: Set fan preset mode (medium)
  - **Target**: Office fan

{% details "YAML example for setting office fan to medium when warm and if desk is occupied" %}

{% example %}
automation: |
  alias: "Set the office fan to medium on warm days if motion is detected"
  triggers:
    - trigger: temperature.crossed_threshold
      target:
        area_id: office
      threshold:
        type: above
        value:
          active_choice: number
          number: 25
          unit_of_measurement: °C
  conditions:
    - condition: motion.is_detected
      target:
        entity_id: binary_sensor.movement_office
  actions:
    - action: fan.set_preset_mode
      target:
        entity_id: fan.office_fan
      data:
        preset_mode: medium
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
