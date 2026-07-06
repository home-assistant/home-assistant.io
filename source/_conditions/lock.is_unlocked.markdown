---
title: "Lock is unlocked"
condition: lock.is_unlocked
domain: lock
description: "Tests if one or more locks are unlocked."
related_conditions:
  - lock.is_locked
---

The **Lock is unlocked** condition helps you check whether a lock is currently unlocked. Use it when an automation should continue only while a door is not secured, like reminding you to lock up before bed.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Lock is unlocked**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple locks are targeted.
7. Under **For at least**, set how long the lock must stay unlocked before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple locks are targeted, controls how results combine. Pick **Any** to pass if at least one targeted lock is unlocked, or **All** to pass only when every targeted lock is unlocked.
  required: false
For at least:
  description: How long the lock must stay unlocked before the condition passes.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `lock.is_unlocked`. A basic example looks like this:

{% example %}
condition: |
  condition: lock.is_unlocked
  target:
    entity_id: lock.front_door
{% endexample %}

This passes when `lock.front_door` is currently unlocked.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple locks are targeted, controls how results combine. Accepts
    `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the lock must stay unlocked before the condition passes. Accepts
    a duration like `00:10:00` for 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Locks in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- Use **For at least** if you want to ignore a short unlock before the door is secured again.
- To check for the secure state instead, use [Lock is locked](/conditions/lock.is_locked/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a bedtime reminder if the front door is still unlocked

If you sometimes forget to lock the door before bed, a gentle reminder can help. This automation runs at night and sends a phone notification if the front door has stayed unlocked for 10 minutes.

- **Trigger**: Time: 22:00
- **Condition**: Lock is unlocked
  - **Target**: Front door lock
  - **Condition passes if**: Any
  - **For at least**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a bedtime lock reminder" %}

{% example %}
automation: |
  alias: "Remind me if the front door is unlocked at night"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: lock.is_unlocked
      target:
        entity_id: lock.front_door
      options:
        behavior: any
        for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Front door still unlocked"
        message: "The front door has stayed unlocked for 10 minutes."
{% endexample %}

{% enddetails %}

### Automation: turn on a lamp if any outside door lock stays unlocked after sunset

If an outside door stays unlocked after dark, a visible reminder can help. This automation checks every 5 minutes and turns on a lamp when any targeted outside lock remains unlocked.

- **Trigger**: Time pattern: Every 5 minutes
- **Condition**: Lock is unlocked
- **Target**: Outside door locks (by label)
- **Condition passes if**: Any
- **For at least**: 00:05:00
- **Condition**: Sun is below the horizon
- **Action**: Turn on

{% details "YAML example for a visual unlocked reminder" %}

{% example %}
automation: |
  alias: "Turn on a lamp when an outside lock stays unlocked"
  triggers:
    - trigger: time_pattern
      minutes: "/5"
  conditions:
    - condition: lock.is_unlocked
      target:
        label_id: outside_locks
      options:
        behavior: any
        for: "00:05:00"
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room_lamp
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
