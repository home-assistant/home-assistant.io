---
title: "Alarm is armed night"
condition: alarm_control_panel.is_armed_night
domain: alarm_control_panel
description: "Tests if one or more alarms are armed in night mode."
related_conditions:
  - alarm_control_panel.is_armed
  - alarm_control_panel.is_disarmed
---

The **Alarm is armed night** condition passes when one or more alarm control panel {% term entities %} are armed in night mode. Use it to adjust how your home behaves while everyone is asleep. Hallway lights dim to a gentle glow instead of full brightness, the doorbell stops chiming through the speakers, and automations that would disturb sleep simply don't run.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Alarm is armed night**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must have been in this state before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple alarm panels are targeted, controls how results combine. Pick **Any** to pass if at least one targeted alarm is armed night, or **All** to pass only when every targeted alarm is armed night.
For at least:
  description: How long the alarm must have been armed in night mode before the condition passes. Set to zero to pass immediately.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `alarm_control_panel.is_armed_night`. A basic example looks like this:

{% example %}
condition: |
  condition: alarm_control_panel.is_armed_night
  target:
    entity_id: alarm_control_panel.hallway
{% endexample %}

This passes when the hallway alarm panel is currently armed in night mode.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple alarm panels are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    Duration the alarm must have been armed in night mode before the condition passes. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Alarm panels that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as armed night. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted alarm is unavailable.
- If you want to check whether the alarm is armed in any mode (not just night), use [Alarm is armed](/conditions/alarm_control_panel.is_armed/).
- To check the opposite state, use [Alarm is disarmed](/conditions/alarm_control_panel.is_disarmed/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: dim the hallway nightlight when motion is detected at night

When the hallway motion sensor detects movement, turn on the hallway light at 10% brightness, but only while the alarm is armed in night mode. During the day, you want full brightness instead.

- **Trigger**: State
  - **Entity**: Hallway motion sensor
  - **To**: On
- **Condition**: Alarm is armed night
  - **Target**: Hallway alarm panel
- **Action**: Turn on light (at 10% brightness)

{% details "YAML example for a dim hallway nightlight when armed night" %}

{% example %}
automation: |
  alias: "Dim hallway light on motion at night"
  triggers:
    - trigger: state
      entity_id: binary_sensor.hallway_motion
      to: "on"
  conditions:
    - condition: alarm_control_panel.is_armed_night
      target:
        entity_id: alarm_control_panel.hallway
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
      data:
        brightness_pct: 10
{% endexample %}

{% enddetails %}

### Automation: silence the doorbell while the house is asleep

The doorbell normally announces visitors through every speaker, but nobody wants that at 2 AM. Add a night-mode check so the speakers stay silent overnight and you get a quiet phone notification instead.

- **Trigger**: State: Doorbell pressed
- **Condition**: Alarm is armed night
- **Action**: Send a notification message (skip the speaker announcement)
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for silencing the doorbell at night" %}

{% example %}
automation: |
  alias: "Quiet doorbell at night"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  conditions:
    - condition: alarm_control_panel.is_armed_night
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Doorbell"
        message: "Someone is at the door."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
