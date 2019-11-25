---
title: "SimpliSafe"
description: "Instructions on how to integrate SimpliSafe into Home Assistant."
logo: simplisafe.png
ha_release: 0.81
ha_category:
  - Alarm
  - Lock
---

The `simplisafe` integration integrates SimpliSafe home security (V2 and V3) systems into Home Assistant. Multiple SimpliSafe accounts can be accommodated.

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

### `simplisafe.set_alarm_volume`

Set the volume of an active alarm.

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `volume`                    |      no  | A volume (off, low, medium, high)           |

### `simplisafe.set_chime_volume`

Set the volume of the door chime.

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `volume`                    |      no  | A volume (off, low, medium, high)           |

### `simplisafe.set_entry_delay_away`

Set the entry delay duration ("away" mode).

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `seconds`                   |      no  | The number of seconds to delay              |

### `simplisafe.set_entry_delay_home`

Set the entry delay duration ("home" mode).

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `seconds`                   |      no  | The number of seconds to delay              |

### `simplisafe.set_exit_delay_away`

Set the exit delay duration ("away" mode).

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `seconds`                   |      no  | The number of seconds to delay              |

### `simplisafe.set_exit_delay_home`

Set the exit delay duration ("home" mode).

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
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

### `simplisafe.set_voice_prompt_volume`

Set the volume of the voice prompt.

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system               | 
| `volume`                    |      no  | A volume (off, low, medium, high)           |
