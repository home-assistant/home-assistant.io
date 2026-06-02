---
title: Lock
description: Instructions on how to setup your locks with Home Assistant.
ha_category:
  - Lock
ha_release: 0.9
ha_quality_scale: internal
ha_domain: lock
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

Keeps track of the locks in your environment, their state, and lets you control them.

- Maintains a state per lock and a combined state `all_locks`.
- Lets you use lock states in automations with built-in triggers, conditions, and actions.

{% include integrations/building_block_integration.md %}

## The state of a lock entity

A lock entity can have the following states:

- **Jammed**: The lock is currently jammed.
- **Open**: Indication of whether the lock is currently open.
- **Opening**: Indication of whether the lock is currently opening.
- **Locked**: The lock is currently locked.
- **Locking**: The lock is in the process of being locked.
- **Unlocked**: The lock is currently unlocked.
- **Unlocking**: The lock is in the process of being unlocked.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/triggers_conditions_actions.md %}

## Lock automation examples

The real power of the **Lock** integration is using your locks in automations.
Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

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
        behavior: any
        for: "00:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

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
