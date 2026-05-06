---
title: "Alarm armed night"
trigger: alarm_control_panel.armed_night
domain: alarm_control_panel
description: "Triggers after one or more alarms become armed in night mode."
related_triggers:
  - alarm_control_panel.armed
  - alarm_control_panel.disarmed
---

The **Alarm armed night** trigger fires after an alarm control panel {% term entity %} switches to the armed night state. Night mode is designed for sleeping hours, keeping perimeter sensors and select interior zones active while allowing movement in bedrooms and bathrooms. Use this trigger to kick off a bedtime routine: turn off downstairs lights, lower the thermostat, and send a goodnight confirmation so you drift off knowing the house is secure.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Alarm armed night**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must stay armed night before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple alarm panels are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted panel arms night, **First** to fire only when the first panel in a group arms night, or **All** to fire only after every targeted panel is armed night.
  required: true
For at least:
  description: How long the alarm must stay armed night before the trigger fires. Set to zero to fire immediately.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `alarm_control_panel.armed_night`. A basic example looks like this:

{% example %}
trigger: |
  trigger: alarm_control_panel.armed_night
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This fires every time `alarm_control_panel.home_alarm` transitions to the armed night state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple alarm panels are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
for:
  description: >
    Duration the state must hold before firing. Accepts a duration string like `00:05:00` for five minutes.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when an alarm panel transitions from a known, valid state. If an alarm panel comes back from being unavailable (`unavailable`) or having an unknown state (`unknown`), the trigger does not fire for that recovery.
- Night mode is ideal for sleeping hours. If you need perimeter-only protection while still active during the day, [Alarm armed home](/triggers/alarm_control_panel.armed_home/) is typically a better fit.
- To react when the alarm is disarmed in the morning, use [Alarm disarmed](/triggers/alarm_control_panel.disarmed/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: start a bedtime routine when the alarm is armed for the night

When you arm the alarm in night mode, the house prepares for sleep. Downstairs lights turn off, and the thermostat lowers to a comfortable sleeping temperature.

- **Trigger**: Alarm armed night
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Turn off downstairs lights
- **Action**: Lower the thermostat

{% details "YAML example for a bedtime routine" %}

{% example %}
automation: |
  alias: "Bedtime routine on night arm"
  triggers:
    - trigger: alarm_control_panel.armed_night
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: light.turn_off
      target:
        area_id: downstairs
    - action: climate.set_temperature
      target:
        entity_id: climate.thermostat
      data:
        temperature: 18
{% endexample %}

{% enddetails %}

### Automation: turn on a hallway night light when night mode activates

A dim hallway light makes midnight trips to the bathroom safer. When the alarm switches to night mode, a soft glow lights the way without disturbing anyone.

- **Trigger**: Alarm armed night
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Turn on hallway light at 5%

{% details "YAML example for a hallway night light" %}

{% example %}
automation: |
  alias: "Hallway night light on night arm"
  triggers:
    - trigger: alarm_control_panel.armed_night
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
      data:
        brightness_pct: 5
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
