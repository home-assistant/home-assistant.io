---
title: "Alarm is armed away"
condition: alarm_control_panel.is_armed_away
domain: alarm_control_panel
description: "Tests if one or more alarms are armed in away mode."
related_conditions:
  - alarm_control_panel.is_armed
  - alarm_control_panel.is_disarmed
---

The **Alarm is armed away** condition passes when one or more alarm control panel {% term entities %} are armed in away mode. Use it to stop automations that make no sense in an empty house, like skipping thermostat schedules, holding back welcome-home lighting, or pausing the robot vacuum. On the flip side, use it to _enable_ away-only automations, like dropping the heating to a setback temperature to save energy while nobody is home.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Alarm is armed away**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must have been in this state before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple alarm panels are targeted, controls how results combine. Pick **Any** to pass if at least one targeted alarm is armed away, or **All** to pass only when every targeted alarm is armed away.
For at least:
  description: How long the alarm must have been armed in away mode before the condition passes. Set to zero to pass immediately.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `alarm_control_panel.is_armed_away`. A basic example looks like this:

{% example %}
condition: |
  condition: alarm_control_panel.is_armed_away
  target:
    entity_id: alarm_control_panel.hallway
{% endexample %}

This passes when the hallway alarm panel is currently armed in away mode.

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
    Duration the alarm must have been armed in away mode before the condition passes. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Alarm panels that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as armed away. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted alarm is unavailable.
- If you want to check whether the alarm is armed in any mode (not just away), use [Alarm is armed](/conditions/alarm_control_panel.is_armed/).
- To check the opposite state, use [Alarm is disarmed](/conditions/alarm_control_panel.is_disarmed/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: lower the thermostat when a water leak is detected and nobody is home

When a water leak sensor detects a leak, turn the thermostat down to prevent further damage, but only if the alarm is armed in away mode. If someone is home, they should handle it themselves.

- **Trigger**: State: Water leak sensor detects a leak
- **Condition**: Alarm is armed away
- **Target**: Hallway alarm panel
- **Condition passes if**: Any
- **Action**: Climate: Set temperature

{% details "YAML example for lowering the thermostat on a leak when away" %}

{% example %}
automation: |
  alias: "Lower thermostat on leak when away"
  triggers:
    - trigger: state
      entity_id: binary_sensor.basement_water_leak
      to: "on"
  conditions:
    - condition: alarm_control_panel.is_armed_away
      target:
        entity_id: alarm_control_panel.hallway
      options:
        behavior: any
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.thermostat
      data:
        temperature: 15
{% endexample %}

{% enddetails %}

### Automation: skip the thermostat schedule while nobody is home

Your thermostat normally follows a comfort schedule throughout the day. When the alarm is armed away, there is no reason to heat or cool an empty house. This automation checks the away state before applying the scheduled temperature, saving energy until someone comes home.

- **Trigger**: Time: 07:00 (morning schedule)
- **Condition**: Alarm is _not_ armed away
- **Action**: Set the thermostat to 21 degrees

{% details "YAML example for skipping the thermostat schedule when away" %}

{% example %}
automation: |
  alias: "Skip heating schedule when away"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: not
      conditions:
        - condition: alarm_control_panel.is_armed_away
          target:
            entity_id: alarm_control_panel.home_alarm
          options:
            behavior: any
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.living_room
      data:
        temperature: 21
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
