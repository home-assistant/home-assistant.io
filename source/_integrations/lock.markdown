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

### Action `lock.lock` 

Lock your door, the attribute should appear under a 'data' attribute for the action.

| Data attribute | Optional | Description                  |
| -------------- | -------- | ---------------------------- |
| `entity_id`    | no       | Entity of the relevant lock. |

#### Example

```yaml
actions:
  action: lock.lock
  target:
    entity_id: lock.my_place
```

### Action `lock.unlock` 

Unlock your door, the attribute should appear under a 'data' attribute for the action.

| Data attribute | Optional | Description                  |
| -------------- | -------- | ---------------------------- |
| `entity_id`    | no       | Entity of the relevant lock. |

#### Example

```yaml
actions:
  action: lock.unlock
  target:
    entity_id: lock.my_place
```

## Use the actions

Go to the **Developer Tools**, then to **Actions** in the frontend, and choose `lock.lock`, `lock.unlock` or `lock.open` from the list of available actions. Enter something like the sample below into the **data** field and select **Perform action**.

```json
{"entity_id":"lock.front_door"}
```

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `entity_id`    | yes      | Only act on specific lock. Use `entity_id: all` to target all. |
