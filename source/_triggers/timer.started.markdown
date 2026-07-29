---
title: "Timer started"
trigger: timer.started
domain: timer
description: "Triggers when one or more timers are started."
related_triggers:
  - timer.restarted
  - timer.finished
---

The **Timer started** trigger fires when a timer begins from the idle state. Use it when you want something to happen as soon as a countdown starts.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the timer you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Timer started**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the timer must stay started before the trigger fires. Leave the default to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple timers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted timer starts, **First** to fire only for the first started timer, or **All** to fire only after all targeted timers start.
For at least:
  description: How long the timer must remain started before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `timer.started`. A basic example looks like this:

{% example %}
trigger: |
  trigger: timer.started
  target:
    entity_id: timer.entryway
{% endexample %}

This fires when `timer.entryway` starts.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple timers are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the timer must remain started before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger is for timers that start from `idle`.
- If you resume a paused timer, use [Timer restarted](/triggers/timer.restarted/) instead.
- The **For at least** option here adds extra delay after the timer starts. It is separate from the timer's own countdown.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the porch light when the entry timer starts

Start a short entry timer when someone arrives home, and switch on the porch light at the same time.

- **Trigger**: Timer started
  - **Target**: Entryway timer
  - **Trigger when**: Each
- **Action**: Turn on light

{% details "YAML example for turning on the porch light when a timer starts" %}

{% example %}
automation: |
  alias: "Turn on the porch light when the entry timer starts"
  triggers:
    - trigger: timer.started
      target:
        entity_id: timer.entryway
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

### Automation: announce when the laundry timer starts

Send a message when someone starts the laundry timer so everyone knows the cycle has begun.

- **Trigger**: Timer started
  - **Target**: Laundry timer
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a started laundry timer notification" %}

{% example %}
automation: |
  alias: "Notify when the laundry timer starts"
  triggers:
    - trigger: timer.started
      target:
        entity_id: timer.laundry
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The laundry timer has started."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
