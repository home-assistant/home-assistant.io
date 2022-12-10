---
title: Remote
description: Instructions on how to setup your remotes with Home Assistant.
ha_release: 0.34
ha_domain: remote
ha_category:
  - Remote
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

Keeps track which remotes are in your environment, their state and allows you to control them.

 * Maintains a state per remote and a combined state `all_remotes`.
 * Registers services `remote/turn_on`, `remote/turn_off`, `remote/toggle`, and `remote/send_command` to control remotes.

### Use the services

Go to the **Developer Tools**, then to **Call Service** in the frontend, and choose `remote/turn_on`, `remote/turn_off`, or `remote/toggle` from the list of available services (**Available services:** on the left). Enter something like the sample below into the **Service Data** field and hit **Call Service**.

```json
{"entity_id":"remote.family_room"}
```

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Only act on a specific remote, else target all.

See the platform documentation for each type of remote for more detailed examples.
