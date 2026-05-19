---
title: "Timer restarted"
trigger: timer.restarted
domain: timer
description: "Triggers when one or more timers are restarted."
related_triggers:
  - timer.started
  - timer.paused
---

The **Timer restarted** trigger fires when you start a timer that is already active or paused. Use it when you want a different response for restarting a timer than for starting a new one.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the timer you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Timer restarted**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the timer must stay restarted before the trigger fires. Leave the default to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple timers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted timer is restarted, **First** to fire only for the first restarted timer, or **All** to fire only after all targeted timers are restarted.
For at least:
  description: How long the timer must remain restarted before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `timer.restarted`. A basic example looks like this:

{% example %}
trigger: |
  trigger: timer.restarted
  target:
    entity_id: timer.bedtime_story
{% endexample %}

This fires when `timer.bedtime_story` is restarted.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple timers are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: false
  type: string
  default: any
for:
  description: How long the timer must remain restarted before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires when you start a timer that is already active or paused.
- If you start a timer that is idle, use [Timer started](/triggers/timer.started/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: brighten the reading light when the bedtime timer restarts

If you pause a bedtime timer during story time, you can brighten the lamp again when the timer resumes.

- **Trigger**: Timer restarted
  - **Target**: Bedtime story timer
- **Trigger when**: Each
- **Action**: Turn on light

{% details "YAML example for brightening a light when a timer restarts" %}

{% example %}
automation: |
  alias: "Brighten the reading light when the bedtime timer restarts"
  triggers:
    - trigger: timer.restarted
      target:
        entity_id: timer.bedtime_story
  actions:
    - action: light.turn_on
      target:
        entity_id: light.reading_lamp
      data:
        brightness_pct: 75
{% endexample %}

{% enddetails %}

### Automation: send a reminder when the laundry timer restarts

Let the household know the laundry timer is running again after it was paused.

- **Trigger**: Timer restarted
  - **Target**: Laundry timer
- **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a restarted laundry timer notification" %}

{% example %}
automation: |
  alias: "Notify when the laundry timer restarts"
  triggers:
    - trigger: timer.restarted
      target:
        entity_id: timer.laundry
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The laundry timer has restarted."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
