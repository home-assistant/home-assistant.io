---
title: "Lock opened"
trigger: lock.opened
domain: lock
description: "Triggers when one or more locks open."
related_triggers:
  - lock.locked
---

The **Lock opened** trigger helps you react when a lock reports that it is open. Use it when you want Home Assistant to respond to a door that has been opened, like turning on lights, pausing an alarm workflow, or sending a message that an entry point is no longer closed.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Lock opened**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple locks are targeted.
7. Under **For at least**, set how long the lock must stay open before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple locks are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted lock opens, **First** to fire only when the first targeted lock opens, or **All** to fire only after every targeted lock is open.
  required: false
For at least:
  description: How long the lock must stay open before the trigger fires. Set to zero to fire immediately.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `lock.opened`. A basic example looks like this:

{% example %}
trigger: |
  trigger: lock.opened
  target:
    entity_id: lock.front_door
{% endexample %}

This fires when `lock.front_door` changes to the open state.

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
    How long the lock must stay open before the trigger fires. Accepts a
    duration like `00:00:30` for 30 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires only when a lock changes into the open state from a known state. If a lock comes back from `unavailable` or `unknown`, that recovery does not fire this trigger.
- Not every lock reports an open state. Use this trigger only with locks that support open-state reporting.
- To react when the same door becomes secure again, use [Lock locked](/triggers/lock.locked/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the hall light when the front door opens at night

When you arrive home after dark, it helps if the hallway is already lit. This automation turns on the hall light when the front door lock reports open after sunset.

- **Trigger**: Lock opened
- **Target**: Front door lock
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Condition**: Sun is below the horizon
- **Action**: Turn on

{% details "YAML example for lighting the hall when the door opens" %}

{% example %}
automation: |
  alias: "Turn on the hall light when the front door opens"
  triggers:
    - trigger: lock.opened
      target:
        entity_id: lock.front_door
      options:
        behavior: each
        for: "00:00:00"
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hall
{% endexample %}

{% enddetails %}

### Automation: pause the alarm countdown when the patio door opens

If you have created a script to handle alarm entry steps, opening the patio door can start a different response. This automation runs that script when the patio door lock reports open.

- **Trigger**: Lock opened
- **Target**: Patio door lock
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Script: Turn on script

{% details "YAML example for running a user-created script" %}

{% example %}
automation: |
  alias: "Run the patio entry script when the door opens"
  triggers:
    - trigger: lock.opened
      target:
        entity_id: lock.patio_door
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: script.patio_entry_sequence
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
