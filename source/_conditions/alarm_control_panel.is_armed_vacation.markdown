---
title: "Alarm is armed vacation"
condition: alarm_control_panel.is_armed_vacation
domain: alarm_control_panel
description: "Tests if one or more alarms are armed in vacation mode."
related_conditions:
  - alarm_control_panel.is_armed
  - alarm_control_panel.is_disarmed
---

The **Alarm is armed vacation** condition passes when one or more alarm control panel {% term entities %} are armed in vacation mode. Use it to skip daily routines that make no sense while you are away, like stopping the morning wake-up automation from turning on lights and heating in an empty house. You could also use it the other way around: only run vacation-specific automations (like randomly toggling lights to simulate occupancy) while the alarm is in vacation mode.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Alarm is armed vacation**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must have been in this state before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple alarm panels are targeted, controls how results combine. Pick **Any** to pass if at least one targeted alarm is armed vacation, or **All** to pass only when every targeted alarm is armed vacation.
For at least:
  description: How long the alarm must have been armed in vacation mode before the condition passes. Set to zero to pass immediately.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `alarm_control_panel.is_armed_vacation`. A basic example looks like this:

{% example %}
condition: |
  condition: alarm_control_panel.is_armed_vacation
  target:
    entity_id: alarm_control_panel.hallway
{% endexample %}

This passes when the hallway alarm panel is currently armed in vacation mode.

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
    Duration the alarm must have been armed in vacation mode before the condition passes. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Alarm panels that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as armed vacation. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted alarm is unavailable.
- If you want to check whether the alarm is armed in any mode (not just vacation), use [Alarm is armed](/conditions/alarm_control_panel.is_armed/).
- To check the opposite state, use [Alarm is disarmed](/conditions/alarm_control_panel.is_disarmed/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: toggle a lamp in the evening  while on vacation

Every evening, toggle the living room lamp on or off to make the house look lived-in, but only while the alarm is armed in vacation mode. When you're home, the lamp follows your normal routine instead.

Don't forget to pair it with an automation to turn the lamp off, or you'll come back from vacation to a high energy bill!

- **Trigger**: Time: 20:30
- **Condition**: Alarm is armed vacation
- **Target**: Hallway alarm panel
- **Condition passes if**: Any
- **Action**: Toggle light

{% details "YAML example for an evening lamp toggle on vacation" %}

{% example %}
automation: |
  alias: "Simulate occupancy when on vacation"
  triggers:
    - trigger: time
      at: "20:30:00"
  conditions:
    - condition: alarm_control_panel.is_armed_vacation
      target:
        entity_id: alarm_control_panel.hallway
      options:
        behavior: any
  actions:
    - action: light.toggle
      target:
        entity_id: light.living_room_lamp
{% endexample %}

{% enddetails %}

### Automation: skip the morning routine while on vacation

Your morning routine turns on the lights, starts the coffee maker, and bumps the heating. None of that makes sense in an empty house. Add a "not armed vacation" check so the routine only runs when you are actually home.

- **Trigger**: Time: 06:30 on weekdays
- **Condition**: Alarm is _not_ armed vacation
- **Action**: Run the morning routine script

{% details "YAML example for skipping the morning routine on vacation" %}

{% example %}
automation: |
  alias: "Skip morning routine on vacation"
  triggers:
    - trigger: time
      at: "06:30:00"
  conditions:
    - condition: not
      conditions:
        - condition: alarm_control_panel.is_armed_vacation
          target:
            entity_id: alarm_control_panel.home_alarm
          options:
            behavior: any
  actions:
    - action: script.morning_routine
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
