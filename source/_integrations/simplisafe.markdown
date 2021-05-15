---
title: SimpliSafe
description: Instructions on how to integrate SimpliSafe into Home Assistant.
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_category:
  - Alarm
  - Lock
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: simplisafe
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - lock
  - sensor
---

The `simplisafe` integration integrates [SimpliSafe home security](https://simplisafe.com) (V2 and V3) systems into Home Assistant. Multiple SimpliSafe accounts can be accommodated.

There is currently support for the following device types within Home Assistant:

- **Alarm Control Panel**: reports on the current alarm status and can be used to arm and disarm the system.
- **CO Detector**: reports on the carbon monoxide sensor status*.
- **Entry Sensor**: reports on the current entry sensor status*.
- **Freeze Sensor**: reports on the freeze sensor temperature*.
- **Glass Break Sensor**: reports on the glass breakage sensor status*.
- **Lock**: reports on `Door Locks` and can be used to lock and unlock a lock.
- **Motion Sensor**: reports on motion detected.
- **Siren**: reports on the siren status*.
- **Smoke Detector**: reports on the smoke sensor status*.
- **Water Sensor**: reports on water sensor status*.

* Sensor status is only available for SimpliSafe V3 systems and is updated once every 30 seconds, so information displayed in Home Assistant may be delayed.

{% include integrations/config_flow.md %}

## Services

Note that the `system_id` parameter required by the below service calls can be discovered
by looking at the device state attributes for the integration's `alarm_control_panel`
entity.

### `simplisafe.clear_notifications`

Clear any existing notifications within the SimpliSafe cloud; this will mark existing
notifications as "read" in the SimpliSafe web and mobile apps.

### `simplisafe.remove_pin`

Remove a SimpliSafe PIN (by label or PIN value).

| Service Data Attribute | Optional | Description                      |
| ---------------------- | -------- | -------------------------------- |
| `system_id`            | no       | The ID of a SimpliSafe system    |
| `label_or_pin`         | no       | The PIN label or value to remove |

### `simplisafe.set_pin`

Set a SimpliSafe PIN.

| Service Data Attribute | Optional | Description                                 |
| ---------------------- | -------- | ------------------------------------------- |
| `system_id`            | no       | The ID of the system to remove the PIN from |
| `label`                | no       | The label to show in the SimpliSafe UI      |
| `pin`                  | no       | The PIN value to use                        |

### `simplisafe.system_properties`

Set one or more system properties.

For any property denoting a volume, the following values should be used:

* Off: `0`
* Low: `1`
* Medium: `2`
* High: `3`

| Service Data Attribute | Optional | Description                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------------- |
| `system_id`            | no       | The ID of a SimpliSafe system                                                |
| `alarm_duration`       | yes      | The number of seconds a triggered alarm should sound                         |
| `chime_volume`         | yes      | The volume of the door chime                                                 |
| `entry_delay_away`     | yes      | The number of seconds to delay triggering when entering with an "away" state |
| `entry_delay_home`     | yes      | The number of seconds to delay triggering when entering with a "home" state  |
| `exit_delay_away`      | yes      | The number of seconds to delay triggering when exiting with an "away" state  |
| `exit_delay_home`      | yes      | The number of seconds to delay triggering when exiting with a "home" state   |
| `light`                | yes      | Whether the light on the base station should display when armed              |
| `voice_prompt_volume`  | yes      | The volume of the base station's voice prompts                               |
