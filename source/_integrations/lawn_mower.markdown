---
title: Lawn mower
description: Instructions on how to setup and use lawn mowers in Home Assistant.
ha_release: 2023.9
ha_domain: lawn_mower
ha_quality_scale: internal
ha_category:
  - Lawn mower
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The lawn mower integration allows the control of robotic lawn mowers to be reflected within Home Assistant.

{% include integrations/building_block_integration.md %}

## Services

Available services: `start_mowing`, `pause` and `dock`.

Before calling one of these services, make sure your lawn_mower platform supports it.

### Service `lawn_mower.start_mowing`

Start or resume a mowing task.

| Service data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific lawn_mower. Use `entity_id: all` to target all. |

### Service `lawn_mower.pause`

Pause a mowing task.

| Service data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific lawn_mower. Use `entity_id: all` to target all. |

### Service `lawn_mower.dock`

Tell the lawn_mower to return to dock.

| Service data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific lawn_mower. Use `entity_id: all` to target all. |
