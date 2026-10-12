---
title: "Timer is paused"
condition: timer.is_paused
domain: timer
description: "Tests if one or more timers are paused."
related_conditions:
  - timer.is_active
  - timer.is_idle
---

The **Timer is paused** condition passes when the timer is paused and still has time remaining. Use it when an automation should continue only while a countdown is on hold.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the timer you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Timer is paused**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the timer must stay paused before the condition passes. Leave the default to check the current state only.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple timers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted timer is paused, or **All** to pass only if every targeted timer is paused.
For at least:
  description: How long the timer must remain paused before the condition passes. Defaults to `00:00:00`.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `timer.is_paused`. A basic example looks like this:

{% example %}
condition: |
  condition: timer.is_paused
  target:
    entity_id: timer.movie_break
{% endexample %}

This passes when `timer.movie_break` is paused.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple timers are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: How long the timer must remain paused before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A paused timer keeps its remaining time until it is restarted or cancelled.
- Timers that are `unavailable` or `unknown` are skipped for **Any** and cause **All** to fail.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a reminder only if the bedtime timer is paused

If you paused a bedtime timer during reading time, this reminder checks that the timer is still on hold before it sends a notification.

- **Trigger**: Time: 20:30
- **Condition**: Timer is paused
  - **Target**: Bedtime timer
- **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for checking that a bedtime timer is paused" %}

{% example %}
automation: |
  alias: "Send a reminder only if the bedtime timer is paused"
  triggers:
    - trigger: time
      at: "20:30:00"
  conditions:
    - condition: timer.is_paused
      target:
        entity_id: timer.bedtime
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The bedtime timer is still paused."
{% endexample %}

{% enddetails %}

### Automation: turn on the reading lamp only if the study timer is paused

If a study timer is paused, you can use that state to bring the lamp back on at a comfortable brightness.

- **Trigger**: Sunset
- **Condition**: Timer is paused
  - **Target**: Study timer
- **Condition passes if**: Any
- **Action**: Turn on light

{% details "YAML example for checking that a study timer is paused before turning on a light" %}

{% example %}
automation: |
  alias: "Turn on the reading lamp only if the study timer is paused"
  triggers:
    - trigger: sun.sunset
  conditions:
    - condition: timer.is_paused
      target:
        entity_id: timer.study
  actions:
    - action: light.turn_on
      target:
        entity_id: light.reading_lamp
      data:
        brightness_pct: 50
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
