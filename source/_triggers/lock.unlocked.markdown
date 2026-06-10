---
title: "Lock unlocked"
trigger: lock.unlocked
domain: lock
description: "Triggers after one or more locks unlock."
related_triggers:
  - lock.locked
---

The **Lock unlocked** trigger helps you react when a lock reaches the unlocked state. Use it when you want Home Assistant to welcome someone home, keep track of entry events, or adjust security devices after a door is no longer locked.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Lock unlocked**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple locks are targeted.
7. Under **For at least**, set how long the lock must stay unlocked before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple locks are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted lock unlocks, **First** to fire only when the first targeted lock unlocks, or **All** to fire only after every targeted lock is unlocked.
  required: false
For at least:
  description: How long the lock must stay unlocked before the trigger fires. Set to zero to fire immediately.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `lock.unlocked`. A basic example looks like this:

{% example %}
trigger: |
  trigger: lock.unlocked
  target:
    entity_id: lock.front_door
{% endexample %}

This fires when `lock.front_door` changes to the unlocked state.

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
    How long the lock must stay unlocked before the trigger fires. Accepts a
    duration like `00:00:10` for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires only when a lock changes into the unlocked state from a known state. If a lock comes back from `unavailable` or `unknown`, that recovery does not fire this trigger.
- Use **For at least** if you want to ignore very brief unlock events.
- To react when the door is secured again, use [Lock locked](/triggers/lock.locked/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the hallway light when the front door unlocks

If you often arrive home with your hands full, it helps when the light is already on. This automation turns on the hallway light when the front door unlocks.

- **Trigger**: Lock unlocked
- **Target**: Front door lock
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Turn on

{% details "YAML example for turning on the hallway light" %}

{% example %}
automation: |
  alias: "Turn on the hallway light when the front door unlocks"
  triggers:
    - trigger: lock.unlocked
      target:
        entity_id: lock.front_door
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

### Automation: send a message when any storage door lock unlocks

If several storage areas use smart locks, you may want a quick record when one of them is unlocked. This automation sends a phone notification when any targeted storage lock unlocks.

- **Trigger**: Lock unlocked
  - **Target**: Storage locks (by label)
  - **Trigger when**: Each
  - **For at least**: 00:00:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a storage lock notification" %}

{% example %}
automation: |
  alias: "Notify when a storage lock unlocks"
  triggers:
    - trigger: lock.unlocked
      target:
        label_id: storage_locks
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Storage door unlocked"
        message: "One of the storage door locks has been unlocked."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
