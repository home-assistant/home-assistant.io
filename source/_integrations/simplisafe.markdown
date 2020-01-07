---
title: SimpliSafe
description: Instructions on how to integrate SimpliSafe into Home Assistant.
logo: simplisafe.png
ha_release: 0.81
ha_category:
  - Alarm
  - Lock
ha_config_flow: true
---

The `simplisafe` integration integrates [SimpliSafe home security](https://simplisafe.com) (V2 and V3) systems into Home Assistant. Multiple SimpliSafe accounts can be accommodated.

There is currently support for the following device types within Home Assistant:

- **Alarm Control Panel**: reports on the current alarm status and can be used to arm and disarm the system.
- **Lock**: Reports on `Door Locks` and can be used to lock and unlock a lock.

## Configuration

To enable this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
simplisafe:
  accounts:
    - username: user@email.com
      password: password123
```

{% configuration %}
username:
  description: The email address of a SimpliSafe account.
  required: true
  type: string
password:
  description: The password of a SimpliSafe account.
  required: true
  type: string
code:
  description: A code to enable or disable the alarm in the frontend.
  required: false
  type: string
{% endconfiguration %}

## Services

Note that the `system_id` parameter required by the below service calls can be discovered
by looking at the device state attributes for the integration's `alarm_control_panel`
entity.

### `simplisafe.remove_pin`

Remove a SimpliSafe PIN (by label or PIN value).

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `label_or_pin`              |      no  | The PIN label or value to remove            |

### `simplisafe.set_alarm_duration`

Set the duration (in seconds) of an active alarm.

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `duaration`                 |      no  | The number of seconds to sound the alarm    |

### `simplisafe.set_delay`

Set a duration for how long the base station should delay when transitioning between states.

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `arrival_state`             |      no  | The target "arrival" state (away, home)     | 
| `transition`                |      no  | The system state transition to affect (entry, exit)               | 
| `seconds`                   |      no  | The number of seconds to delay              |

### `simplisafe.set_light`

Turn the base station light on/off.

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `light_state`               |      no  | True for on, False for off                  |

### `simplisafe.set_pin`

Set a SimpliSafe PIN.

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of the system to remove the PIN from |
| `label`                     |      no  | The label to show in the SimpliSafe UI      |
| `pin`                       |      no  | The PIN value to use                        |

### `simplisafe.set_volume_property`

Set a level for one of the base station's various volumes.

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `volume_property`           |      no  | The volume property to set (alarm, chime, voice_prompt)               | 
| `volume`                    |      no  | A volume (off, low, medium, high)           |
