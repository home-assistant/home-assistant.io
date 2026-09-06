---
title: "Vibration is detected"
condition: vibration.is_detected
domain: vibration
description: "Tests if one or more vibration sensors are detecting vibration."
related_conditions:
  - vibration.is_not_detected
---

The **Vibration is detected** condition passes when one or more vibration sensors are detecting vibration. Use it in an automation to act only while something is shaking or running, such as holding off a quiet-hours routine while an appliance is still working, or sending an alert if a machine is running when it should not be.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Vibration is detected**.
5. Under **Targets** (see [Targets](#targets)), select one or more vibration entities, devices, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
7. Under **For at least**, you can set for how long one or more sensors must be detecting vibration before the condition passes. Leave it at zero for the condition to pass as soon as the sensors start detecting vibration.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple vibration sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor is detecting vibration, or **All** to pass only when every sensor is detecting vibration.
For at least:
  description: How long one or more sensors must be continuously detecting vibration before the condition passes. The default is `0` hours, `00` minutes and `00` seconds.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `vibration.is_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: vibration.is_detected
  target:
    entity_id: binary_sensor.dishwasher_vibration
  options:
    for: "00:05:00"
{% endexample %}

This passes when the entity `binary_sensor.dishwasher_vibration` has been continuously detecting vibration for 5 minutes.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple vibration sensors are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long one or more vibration sensors must be continuously detecting vibration before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- With the **For at least** option, the timer resets if the sensor stops detecting vibration during that period. This helps confirm a machine is really running before acting.
- A vibration sensor reports movement, not what caused it. In a busy spot, brief vibrations from nearby activity can make the condition pass, so choose the sensor placement and **For at least** value to match.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: remind you if the dishwasher is still running at bedtime

At bedtime, if the dishwasher's vibration sensor shows it is still running, this automation sends a reminder so you can decide whether to wait up or leave it.

- **Trigger**: Time (at 22:30:00)
- **Condition**: Vibration is detected
  - **Target**: Dishwasher vibration sensor
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for a dishwasher-still-running reminder" %}

{% example %}
automation: |
  alias: "Remind if the dishwasher is still running at bedtime"
  triggers:
    - trigger: time
      at: "22:30:00"
  conditions:
    - condition: vibration.is_detected
      target:
        entity_id: binary_sensor.dishwasher_vibration
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The dishwasher is still running.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
