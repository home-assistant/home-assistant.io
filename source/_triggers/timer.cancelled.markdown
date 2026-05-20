---
title: "Timer cancelled"
trigger: timer.cancelled
domain: timer
description: "Triggers when one or more timers are cancelled."
related_triggers:
  - timer.finished
  - timer.started
---

The **Timer cancelled** trigger fires when a timer is cancelled before it reaches zero. Use it when you want to react differently to a manual cancel than to a finished countdown.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the timer you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Timer cancelled**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long ago the timer must have been cancelled before the trigger fires. Leave the default to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple timers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted timer is cancelled, **First** to fire only for the first cancelled timer, or **All** to fire only after all targeted timers are cancelled.
For at least:
  description: How long ago the timer must have been cancelled before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `timer.cancelled`. A basic example looks like this:

{% example %}
trigger: |
  trigger: timer.cancelled
  target:
    entity_id: timer.laundry
{% endexample %}

This fires when `timer.laundry` is cancelled.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple timers are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: false
  type: string
  default: any
for:
  description: How long ago the timer must have been cancelled before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Canceling a timer resets it to its configured starting duration.
- A cancelled timer does not fire the **Timer finished** trigger.
- The **For at least** option here adds extra delay after the timer is cancelled. It does not replace the timer's own countdown.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when the tea timer is cancelled

If you cancel a kitchen timer because plans change, you can send a quick reminder so nobody waits for an alert that will never come.

- **Trigger**: Timer cancelled
  - **Target**: Tea timer
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a cancelled tea timer notification" %}

{% example %}
automation: |
  alias: "Notify when the tea timer is cancelled"
  triggers:
    - trigger: timer.cancelled
      target:
        entity_id: timer.tea
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The tea timer was cancelled."
{% endexample %}

{% enddetails %}

### Automation: turn off the bathroom fan when the shower timer is cancelled

If you stop a shower timer early, you may also want the fan to stop instead of running for the full original time.

- **Trigger**: Timer cancelled
  - **Target**: Shower timer
  - **Trigger when**: Each
- **Action**: Turn off fan

{% details "YAML example for stopping the bathroom fan after a cancelled timer" %}

{% example %}
automation: |
  alias: "Turn off bathroom fan when the shower timer is cancelled"
  triggers:
    - trigger: timer.cancelled
      target:
        entity_id: timer.shower
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.bathroom
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
