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

The **Lawn mower** {% term integration %} allows the control of robotic lawn mowers to be reflected within Home Assistant.

{% include integrations/building_block_integration.md %}

## The state of a lawn mower entity

A lawn mower entity can have the following states:

- **Mowing**: The lawn mower is currently mowing.
- **Docked**: The lawn mower is done mowing and is currently docked.
- **Paused**: The lawn mower was active and is now paused.
- **Returning**: The lawn mower is returning to the dock.
- **Error**: The lawn mower encountered an error while active and needs assistance.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Actions

Available actions: `start_mowing`, `pause` and `dock`.

Before calling one of these actions, make sure your lawn_mower platform supports it.

### Action `lawn_mower.start_mowing`

Start or resume a mowing task.

| Data attribute | Optional | Description                                                          |
| -------------- | -------- | -------------------------------------------------------------------- |
| `entity_id`    | yes      | Only act on specific lawn_mower. Use `entity_id: all` to target all. |

### Action `lawn_mower.pause`

Pause a mowing task.

| Data attribute | Optional | Description                                                          |
| -------------- | -------- | -------------------------------------------------------------------- |
| `entity_id`    | yes      | Only act on specific lawn_mower. Use `entity_id: all` to target all. |

### Action `lawn_mower.dock`

Tell the lawn_mower to return to dock.

| Data attribute | Optional | Description                                                          |
| -------------- | -------- | -------------------------------------------------------------------- |
| `entity_id`    | yes      | Only act on specific lawn_mower. Use `entity_id: all` to target all. |
