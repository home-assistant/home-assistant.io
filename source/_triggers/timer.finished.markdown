---
title: "Timer finished"
trigger: timer.finished
domain: timer
description: "Triggers when one or more timers finish."
related_triggers:
  - timer.time_remaining
  - timer.cancelled
---

The **Timer finished** trigger fires when a timer reaches zero or is ended early with the **Finish timer** action. Use it when you want something to happen at the end of a countdown, like turning off a fan, locking a door, or sending a reminder.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the timer you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Timer finished**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long ago the timer must have finished before the trigger fires. Leave the default to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple timers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted timer finishes, **First** to fire only for the first finished timer, or **All** to fire only after all targeted timers finish.
For at least:
  description: How long ago the timer must have finished before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `timer.finished`. A basic example looks like this:

{% example %}
trigger: |
  trigger: timer.finished
  target:
    entity_id: timer.bathroom_fan
{% endexample %}

This fires when `timer.bathroom_fan` finishes.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple timers are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: false
  type: string
  default: any
for:
  description: How long ago the timer must have finished before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires when the countdown completes or when you use [Finish timer](/actions/timer.finish/).
- The `timer.finished` event includes a `finished_at` value in its event data. Home Assistant uses this timestamp for the **For at least** option.
- If you cancel a timer, use [Timer cancelled](/triggers/timer.cancelled/) instead.
- The **For at least** option here adds extra delay after the timer finishes. If you want the action to happen when the countdown ends, you usually do not need it.
- If a timer finishes while Home Assistant is not running, this trigger does not run after startup.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the bathroom fan when the timer finishes

Use a timer to keep the fan running for a fixed amount of time after a shower.

- **Trigger**: Timer finished
  - **Target**: Bathroom fan timer
- **Trigger when**: Each
- **Action**: Turn off fan

{% details "YAML example for a bathroom fan timer" %}

{% example %}
automation: |
  alias: "Turn off bathroom fan when the timer finishes"
  triggers:
    - trigger: timer.finished
      target:
        entity_id: timer.bathroom_fan
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.bathroom
{% endexample %}

{% enddetails %}

### Automation: lock the patio door after the entry timer finishes

Start a short timer when you open the patio door, and lock it automatically if nobody needs it anymore.

- **Trigger**: Timer finished
  - **Target**: Patio door timer
- **Trigger when**: Each
- **Action**: Lock lock

{% details "YAML example for locking the patio door after a timer" %}

{% example %}
automation: |
  alias: "Lock the patio door after the timer finishes"
  triggers:
    - trigger: timer.finished
      target:
        entity_id: timer.patio_door
  actions:
    - action: lock.lock
      target:
        entity_id: lock.patio_door
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
