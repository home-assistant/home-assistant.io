---
title: "Motion is not detected"
condition: motion.is_not_detected
domain: motion
description: "Tests if one or more motion sensors are not detecting motion."
related_conditions:
  - motion.is_detected
---

The **Motion is not detected** condition passes when one or more motion sensors are not detecting motion. Use it in an automation for turning devices on or off, running security checks or sending alerts if motion is not detected. You can set up an automation to run only if motion is not being detected in a particular area of the house, for example.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Motion is not detected**.
5. Under **Targets**, select one or more motion entities, devices, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
7. Under **For at least**, you can set for how long one or more motion sensors must be without detecting motion before the condition passes. Leave it at zero for the condition to pass as soon as the sensors stop detecting motion.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple motion sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor is not detecting motion, or **All** to pass only when every sensor is not detecting motion.
For at least:
  description: How long one or more sensors must remain without detecting motion before the condition passes. The default is `0` hours, `00` minutes and `00` seconds.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `motion.is_not_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: motion.is_not_detected
  target:
    entity_id: motion.sensor_backyard
  options:
    for: "01:10:05"
{% endexample %}

This passes when the sensor `motion.sensor_backyard` has not detected any motion for 1 hour, 10 minutes and 5 seconds.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple motion sensors are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long one or more motion sensors must remain without detecting motion before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- When using the **For at least** option in your automation, if the sensors detect motion during that time period the condition will not pass and actions will not run. This is useful to make sure no one is at home or in an area before turning devices off, for example.
- In large rooms, motion sensors might not detect people that are quietly sitting in a place. If you want to make sure presence is detected, use multiple motion sensors in one area or combine sensors with presence detection.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: close bedroom cover if no one is in the main floor

At the time of day when the sun is directly hitting the bedroom window, if no motion has been detected for 15 minutes in the main floor, close the bedroom cover to assure a refreshing night.

- **Trigger**: Time (at 17.30)
- **Condition**: Motion is not detected
  - **Target**: Sensors main floor
  - **For at least**: 00:15:00
- **Action**: Close cover
  - **Target**: Bedroom

{% details "YAML example for closing bedroom cover for a fresh night" %}

{% example %}
automation: |
  alias: "Close the bedroom cover in the evening if no movement is detected"
  triggers:
    - trigger: time
      at: "17:30:00"
  conditions:
    - condition: motion.is_not_detected
      target:
        label_id: sensors_main_floor
      options:
        for: "00:15:00"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.bedroom_window
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
