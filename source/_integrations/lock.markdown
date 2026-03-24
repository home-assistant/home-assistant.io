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

Keeps track which locks are in your environment, their state and allows you to control them.

- Maintains a state per lock and a combined state `all_locks`.
- Registers actions `lock.lock`, `lock.unlock`, and `lock.open` (unlatch) to control locks.

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

## Actions

A lock integration provides the following actions:

### Action: Lock

The `lock.lock` action locks your door.

| Data attribute | Optional | Description                  |
| -------------- | -------- | ---------------------------- |
| `entity_id`    | no       | Entity of the relevant lock. |
| `code`         | yes      | Code used to lock the lock.  |

#### Example

```yaml
actions:
  - action: lock.lock
    target:
      entity_id: lock.my_place
    data:
      code: "1234"
```

### Action: Unlock

The `lock.unlock` action unlocks your door.

| Data attribute | Optional | Description                   |
| -------------- | -------- | ----------------------------- |
| `entity_id`    | no       | Entity of the relevant lock.  |
| `code`         | yes      | Code used to unlock the lock. |

#### Example

```yaml
actions:
  - action: lock.unlock
    target:
      entity_id: lock.my_place
    data:
      code: "1234"
```

### Action: Open

The `lock.open` action opens (unlatches) a lock.

| Data attribute | Optional | Description                   |
| -------------- | -------- | ----------------------------- |
| `entity_id`    | no       | Entity of the relevant lock.  |
| `code`         | yes      | Code used to open the lock. |

#### Example

```yaml
actions:
  - action: lock.open
    target:
      entity_id: lock.my_place
    data:
      code: "1234"
```

## Use the actions

Go to {% my developer_services title="**Settings** > **Developer tools** > **Actions**" %}, and choose `lock.lock`, `lock.unlock`, or `lock.open` from the list of available actions. Fill in the required data and select **Perform action**.
