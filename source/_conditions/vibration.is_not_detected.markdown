---
title: "Vibration is not detected"
condition: vibration.is_not_detected
domain: vibration
description: "Tests if one or more vibration sensors are not detecting vibration."
related_conditions:
  - vibration.is_detected
---

The **Vibration is not detected** condition passes when one or more vibration sensors are not detecting vibration. Use it in an automation to act only while something is still, such as running a routine once an appliance has finished, or confirming a machine is idle before turning off its power.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Vibration is not detected**.
5. Under **Targets** (see [Targets](#targets)), select one or more vibration entities, devices, an area, a floor, or a label.
6. If you selected more than one target, under **Condition passes if**, pick **Any** or **All**.
7. Under **For at least**, you can set for how long one or more sensors must stay without detecting vibration before the condition passes. Leave it at zero for the condition to pass as soon as the sensors stop detecting vibration.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple vibration sensors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted sensor is not detecting vibration, or **All** to pass only when every sensor is not detecting vibration.
For at least:
  description: How long one or more sensors must stay without detecting vibration before the condition passes. The default is `0` hours, `00` minutes and `00` seconds.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `vibration.is_not_detected`. A basic example looks like this:

{% example %}
condition: |
  condition: vibration.is_not_detected
  target:
    entity_id: binary_sensor.washing_machine_vibration
  options:
    for: "00:15:00"
{% endexample %}

This passes when the sensor `binary_sensor.washing_machine_vibration` has not detected vibration for 15 minutes.

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
    How long one or more vibration sensors must stay without detecting vibration before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- With the **For at least** option, the timer resets if any targeted sensor detects vibration during that period. This helps confirm a machine has truly finished rather than briefly paused.
- A vibration sensor only reports movement. If a machine sits completely still during part of its cycle, the condition can pass before the cycle is actually done. Choose the **For at least** value with that in mind.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn off the washing machine's plug once it is done

At a set time in the evening, if the washing machine's vibration sensor has been still for 15 minutes, this automation turns off its smart plug to save standby power.

- **Trigger**: Time (at 23:00:00)
- **Condition**: Vibration is not detected
  - **Target**: Washing machine vibration sensor
  - **For at least**: 00:15:00
- **Action**: Turn off switch
  - **Target**: Washing machine plug

{% details "YAML example for turning off the washing machine plug when idle" %}

{% example %}
automation: |
  alias: "Turn off the washing machine plug when idle"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: vibration.is_not_detected
      target:
        entity_id: binary_sensor.washing_machine_vibration
      options:
        for: "00:15:00"
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.washing_machine_plug
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
