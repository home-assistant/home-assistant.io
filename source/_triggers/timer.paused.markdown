---
title: "Timer paused"
trigger: timer.paused
domain: timer
description: "Triggers when one or more timers are paused."
related_triggers:
  - timer.restarted
  - timer.started
---

The **Timer paused** trigger fires when a running timer is paused. Use it when you want to react to an interrupted countdown, like dimming a light, pausing a script, or sending a reminder.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the timer you want to watch. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Timer paused**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the timer must stay paused before the trigger fires. Leave the default to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple timers are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted timer is paused, **First** to fire only for the first paused timer, or **All** to fire only after all targeted timers are paused.
  required: false
  default: Each
For at least:
  description: How long the timer must remain paused before the trigger fires. Defaults to firing immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `timer.paused`. A basic example looks like this:

{% example %}
trigger: |
  trigger: timer.paused
  target:
    entity_id: timer.movie_break
{% endexample %}

This fires when `timer.movie_break` is paused.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: When multiple timers are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the timer must remain paused before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- A timer keeps its remaining time when it is paused.
- To continue a paused timer, use the [Start timer](/actions/timer.start/) action without a new duration.
- The **For at least** option here waits until the timer has stayed paused for that long.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: dim the hallway light when the entry timer is paused

If you pause an entry timer while carrying groceries or helping someone at the door, you can dim the hallway light instead of turning it off.

- **Trigger**: Timer paused
  - **Target**: Entry timer
  - **Trigger when**: Each
- **Action**: Turn on light

{% details "YAML example for dimming a hallway light when a timer is paused" %}

{% example %}
automation: |
  alias: "Dim the hallway light when the entry timer is paused"
  triggers:
    - trigger: timer.paused
      target:
        entity_id: timer.entry
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
      data:
        brightness_pct: 30
{% endexample %}

{% enddetails %}

### Automation: notify when the laundry timer is paused

Send a reminder if someone pauses a laundry timer, so the load does not get forgotten.

- **Trigger**: Timer paused
  - **Target**: Laundry timer
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a paused laundry timer notification" %}

{% example %}
automation: |
  alias: "Notify when the laundry timer is paused"
  triggers:
    - trigger: timer.paused
      target:
        entity_id: timer.laundry
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The laundry timer is paused."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
