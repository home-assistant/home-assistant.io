---
title: "Lock jammed"
trigger: lock.jammed
domain: lock
description: "Triggers when one or more locks jam."
related_triggers:
  - lock.locked
---

The **Lock jammed** trigger helps you react when a lock cannot finish its movement. Use it when you want Home Assistant to warn you about a problem at the door, like a misaligned bolt or something blocking the lock.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Lock jammed**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple locks are targeted.
7. Under **For at least**, set how long the lock must stay jammed before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple locks are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted lock jams, **First** to fire only when the first targeted lock jams, or **All** to fire only after every targeted lock is jammed.
  required: false
  default: Each
For at least:
  description: How long the lock must stay jammed before the trigger fires. Set to zero to fire immediately.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `lock.jammed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: lock.jammed
  target:
    entity_id: lock.front_door
{% endexample %}

This fires when `lock.front_door` enters the jammed state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple locks are targeted, controls when the trigger fires.
    Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the lock must stay jammed before the trigger fires. Accepts a
    duration like `00:01:00` for one minute.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires only when a lock changes into the jammed state from a known state. If a lock comes back from `unavailable` or `unknown`, that recovery does not fire this trigger.
- A jammed lock often needs attention right away, so keep **For at least** short unless you want to ignore brief reports.
- To confirm that the lock later reaches its normal state, use [Lock locked](/triggers/lock.locked/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify you when the front door lock jams

If the front door lock jams while someone is leaving, you want to know right away so the door is not left unsecured. This automation sends a phone notification as soon as the lock reports a jam.

- **Trigger**: Lock jammed
  - **Target**: Front door lock
  - **Trigger when**: Each
  - **For at least**: 00:00:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a jammed lock alert" %}

{% example %}
automation: |
  alias: "Notify when the front door lock jams"
  triggers:
    - trigger: lock.jammed
      target:
        entity_id: lock.front_door
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Front door lock jammed"
        message: "Check the front door lock. It may be blocked."
{% endexample %}

{% enddetails %}

### Automation: turn on the porch light if any outside door lock jams at night

If a lock at an outside entry jams after dark, extra light can help you see what is wrong. This automation turns on the porch light when any targeted outside lock stays jammed for 10 seconds.

- **Trigger**: Lock jammed
- **Target**: Outside door locks (by label)
- **Trigger when**: Each
- **For at least**: 00:00:10
- **Condition**: Sun is below the horizon
- **Action**: Turn on

{% details "YAML example for lighting the entry when a lock jams" %}

{% example %}
automation: |
  alias: "Turn on the porch light for a jammed lock"
  triggers:
    - trigger: lock.jammed
      target:
        label_id: outside_locks
      options:
        behavior: each
        for: "00:00:10"
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
