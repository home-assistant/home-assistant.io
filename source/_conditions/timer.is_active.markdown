---
title: "Timer is active"
condition: timer.is_active
domain: timer
description: "Tests if one or more timers are active."
related_conditions:
  - timer.is_idle
  - timer.is_paused
---

The **Timer is active** condition passes when the timer is currently counting down. Use it when you want an automation to continue only while a timer is running.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the timer you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Timer is active**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the timer must stay active before the condition passes. Leave the default to check the current state only.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple timers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted timer is active, or **All** to pass only if every targeted timer is active.
For at least:
  description: How long the timer must remain active before the condition passes. Defaults to `00:00:00`.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `timer.is_active`. A basic example looks like this:

{% example %}
condition: |
  condition: timer.is_active
  target:
    entity_id: timer.entryway
  options:
    behavior: any
    for: "00:00:00"
{% endexample %}

This passes when `timer.entryway` is active.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple timers are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: How long the timer must remain active before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Timers in the `paused`, `idle`, `unavailable`, or `unknown` state do not count as active.
- Timers that are `unavailable` or `unknown` are skipped for **Any** and cause **All** to fail.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: remind yourself to leave only if the entry timer is still running

If you use a short entry timer while gathering your things, this automation sends a reminder only while that timer is still active.

- **Trigger**: Time: 08:00
- **Condition**: Timer is active
- **Target**: Entryway timer
- **Condition passes if**: Any
- **Action**: Send notification

{% details "YAML example for an active entryway timer reminder" %}

{% example %}
automation: |
  alias: "Remind yourself to leave only if the entry timer is active"
  triggers:
    - trigger: time
      at: "08:00:00"
  conditions:
    - condition: timer.is_active
      target:
        entity_id: timer.entryway
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: notify.mobile_app_phone
      data:
        message: "Your entry timer is still running."
{% endexample %}

{% enddetails %}

### Automation: keep the porch light on while the arrival timer is active

Run this automation after sunset so the porch light turns on only if your arrival timer is still counting down.

- **Trigger**: Sun: after sunset
- **Condition**: Timer is active
- **Target**: Arrival timer
- **Condition passes if**: Any
- **Action**: Turn on light

{% details "YAML example for keeping the porch light on while a timer is active" %}

{% example %}
automation: |
  alias: "Keep the porch light on while the arrival timer is active"
  triggers:
    - trigger: sun
      event: sunset
  conditions:
    - condition: timer.is_active
      target:
        entity_id: timer.arrival
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
