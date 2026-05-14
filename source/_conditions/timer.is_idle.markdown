---
title: "Timer is idle"
condition: timer.is_idle
domain: timer
description: "Tests if one or more timers are idle."
related_conditions:
  - timer.is_active
  - timer.is_paused
---

The **Timer is idle** condition passes when the timer is not running. Use it when an automation should continue only if the timer has not started yet, has finished, or was canceled.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the timer you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Timer is idle**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the timer must stay idle before the condition passes. Leave the default to check the current state only.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple timers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted timer is idle, or **All** to pass only if every targeted timer is idle.
For at least:
  description: How long the timer must remain idle before the condition passes. Defaults to `00:00:00`.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `timer.is_idle`. A basic example looks like this:

{% example %}
condition: |
  condition: timer.is_idle
  target:
    entity_id: timer.guest_room
  options:
    behavior: any
    for: "00:00:00"
{% endexample %}

This passes when `timer.guest_room` is idle.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple timers are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: How long the timer must remain idle before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A timer is idle when it has not started yet, has finished, or was canceled.
- Timers that are `unavailable` or `unknown` are skipped for **Any** and cause **All** to fail.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: start the guest room light only if the timer is idle

If the guest room timer is not already running, you can safely start a new timed lighting routine.

- **Trigger**: Time: 19:00
- **Condition**: Timer is idle
  - **Target**: Guest room timer
- **Condition passes if**: Any
- **Action**: Turn on light

{% details "YAML example for checking that a timer is idle before turning on a light" %}

{% example %}
automation: |
  alias: "Turn on the guest room light only if the timer is idle"
  triggers:
    - trigger: time
      at: "19:00:00"
  conditions:
    - condition: timer.is_idle
      target:
        entity_id: timer.guest_room
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.guest_room
{% endexample %}

{% enddetails %}

### Automation: arm the alarm only if the departure timer is idle

Use this condition to avoid arming the alarm while a departure timer is still running.

- **Trigger**: Person leaves home zone
- **Condition**: Timer is idle
  - **Target**: Departure timer
- **Condition passes if**: Any
- **Action**: Arm away

{% details "YAML example for checking that a departure timer is idle before arming the alarm" %}

{% example %}
automation: |
  alias: "Arm the alarm only if the departure timer is idle"
  triggers:
    - trigger: zone
      entity_id: person.alex
      zone: zone.home
      event: leave
  conditions:
    - condition: timer.is_idle
      target:
        entity_id: timer.departure
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
