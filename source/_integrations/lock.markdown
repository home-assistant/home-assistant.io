---
title: Lock
description: Instructions on how to setup your locks with Home Assistant.
ha_category:
  - Lock
ha_release: 0.9
ha_quality_scale: internal
ha_domain: lock
ha_iot_class:
---

Keeps track which locks are in your environment, their state and allows you to control them.

 * Maintains a state per lock and a combined state `all_locks`.
 * Registers services `lock.lock`, `lock.unlock` and `lock.open` (unlatch) to control locks.

### Services

A lock integration provides the following services:

#### Service `lock.lock` 

Lock your door, the attribute should appear under a 'data' attribute for the service.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Entity of the relevant lock.                          |

##### Example

```yaml
action:
  service: lock.lock
  target:
    entity_id: lock.my_place
```

#### Service `lock.unlock` 

Unlock your door, the attribute should appear under a 'data' attribute for the service.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Entity of the relevant lock.                          |

##### Example

```yaml
action:
  service: lock.unlock
  target:
    entity_id: lock.my_place
```

### Use the services

Go to the **Developer Tools**, then to **Call Service** in the frontend, and choose `lock.lock`, `lock.unlock` or `lock.open` from the list of available services (**Services:** on the left). Enter something like the sample below into the **Service Data** field and hit **CALL SERVICE**.

```json
{"entity_id":"lock.front_door"}
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Only act on specific lock. Use `entity_id: all` to target all.
