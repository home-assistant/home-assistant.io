---
title: Schlage
description: Instructions on how to integrate Schlage WiFi smart locks into Home Assistant.
ha_category:
  - Lock
  - Sensor
  - Switch
ha_release: 2023.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@dknowles2'
ha_platforms:
  - binary_sensor
  - diagnostics
  - lock
  - select
  - sensor
  - switch
ha_integration_type: hub
ha_domain: schlage
---

The **Schlage** {% term integration %} provides connectivity with Schlage WiFi smart locks through Schlage's cloud API.

## Known working devices

- Schlage Encode Smart WiFi Deadbolt
- Schlage Encode Smart WiFi Lever
- Schlage Encode Plus Smart WiFi Deadbolt

Other devices not listed above have not been tested and may not function as expected.

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Lock
- Sensor
- Switch

{% include integrations/config_flow.md %}

## Data updates

The Schlage integration fetches updated lock state data every 30 seconds.

## Binary sensor

Once you have enabled the Schlage integration, you should see the following binary sensor:

- **Keypad disabled** - Indicates that the keypad has been disabled, typically due to too many incorrect lock codes being attempted.

## Select

Once you have enabled the Schlage integration, you should see the following selects:

- **Auto Lock Time** - Configure the time until the deadbolt automatically locks, or disable the auto-lock feature entirely. For example, `0`: auto-lock is disabled, `15`: auto-lock after 15 seconds, `300`: auto-lock after 5 minutes.

## Sensor

Once you have enabled the Schlage integration, you should see the following sensors:

- Lock Battery

## Switch

Once you have enabled the Schlage integration, you should see the following switches:

- **1-Touch Locking** - When enabled, locks the lock with a press of the Schlage button.
- **Keypress Beep** - Controls whether the lock will emit beeping tones on use.

{% include integrations/actions.md %}

### Integration actions

The Schlage integration provides actions to manage the access codes (PINs) stored on your lock. The codes are stored on the lock itself; temporary schedules are enforced by the lock via the Schlage cloud service.

- [`schlage.add_code`](#action-schlageadd_code) — add a new access code
- [`schlage.update_code`](#action-schlageupdate_code) — update an existing access code
- [`schlage.delete_code`](#action-schlagedelete_code) — remove an access code
- [`schlage.get_codes`](#action-schlageget_codes) — list all access codes with their current state

#### `schlage.add_code`

Adds a new access code to the lock.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `name` | no | Name for the PIN. Must be unique to the lock (case insensitive). |
| `code` | no | The PIN code to add. Must be unique to the lock and be between 4 and 8 digits long. |
| `notify_on_use` | yes | Whether the native Schlage notification should be sent when this PIN is used. Defaults to `true`. |
| `start_datetime` | yes | When this PIN becomes active. Providing a start time makes the PIN temporary; both a start and an end time are required. |
| `end_datetime` | yes | When this PIN stops working. Required together with the start time; leaving both empty creates a permanent PIN. |

To create a temporary PIN, provide both a start and an end time. Leave both empty for a permanent PIN.

#### `schlage.update_code`

Updates an existing access code on the lock.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `access_code_id` | no | The ID of the access code to update, as returned by the `schlage.get_codes` action. |
| `name` | yes | New name for the PIN. |
| `code` | yes | New PIN code. Must be unique to the lock and be between 4 and 8 digits long. |
| `notify_on_use` | yes | Whether the native Schlage notification should be sent when this PIN is used. |
| `disabled` | yes | Whether the PIN should be disabled without deleting it. |
| `start_datetime` | yes | New activation time. Providing dates replaces the schedule; both a start and an end time are required. |
| `end_datetime` | yes | New deactivation time. Required together with the start time. |

The schedule is only modified when dates are provided. Updating other fields (such as the name) leaves an existing temporary schedule untouched. To remove a temporary schedule, update the code with both a new start and end time that span the desired period, or delete and re-add the code as permanent.

#### `schlage.delete_code`

Removes an access code from the lock.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `name` | yes | Name of the PIN to delete. |
| `access_code_id` | yes | The ID of the access code to delete, as returned by the `schlage.get_codes` action. |

One of `name` or `access_code_id` must be provided.

#### `schlage.get_codes`

Returns all access codes currently stored on the lock, including each code's `name`, `code`, `access_code_id`, `notify_on_use`, `disabled` state, and its `schedule` (`always` or `temporary`).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
