---
title: Vacuum
description: Instructions on how to setup and use vacuums in Home Assistant.
ha_release: 0.51
ha_domain: vacuum
ha_quality_scale: internal
ha_category:
  - Vacuum
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Vacuum** {% term integration %} enables the ability to control home cleaning robots within Home Assistant.

{% include integrations/building_block_integration.md %}

## The state of a vacuum entity

A vacuum {% term entity %} can have the following states:

- **Cleaning**: The vacuum is currently cleaning.
- **Docked**: The vacuum is currently docked. It is assumed that docked can also mean charging.
- **Error**: The vacuum encountered an error while cleaning.
- **Idle**: The vacuum is not paused, not docked, and does not have any errors.
- **Paused**: The vacuum was cleaning but was paused without returning to the dock.
- **Returning**: The vacuum is done cleaning and is currently returning to the dock, but not yet docked.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Actions

Available actions: `start`, `pause`, `stop`, `return_to_base`, `locate`, `clean_spot`, `set_fan_speed` and `send_command`.

Before calling one of these actions, make sure your vacuum platform supports it.

### Action `vacuum.start`

Start or resume a cleaning task.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action `vacuum.pause`

Pause a cleaning task.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action `vacuum.stop`

Stop the current activity of the vacuum.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action `vacuum.return_to_base`

Tell the vacuum to return home.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action `vacuum.locate`

Locate the vacuum cleaner robot.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action `vacuum.clean_spot`

Tell the vacuum cleaner to do a spot clean-up.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action `vacuum.set_fan_speed`

Set the fan speed of the vacuum. The `fanspeed` can be a label, as `balanced` or `turbo`, or be a number; it depends on the `vacuum` platform.

| Data attribute | Optional | Description                                                                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all.                                                   |
| `fan_speed`            | no       | Platform dependent vacuum cleaner fan speed, with speed steps, like 'medium', or by percentage, between 0 and 100. |

### Action `vacuum.send_command`

Send a platform-specific command to the vacuum cleaner.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |
| `command`              | no       | Command to execute.                                              |
| `params`               | yes      | Parameters for the command.                                      |
