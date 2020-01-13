---
title: SimpliSafe
description: Instructions on how to integrate SimpliSafe into Home Assistant.
logo: simplisafe.png
ha_release: 0.81
ha_category:
  - Alarm
  - Lock
ha_config_flow: true
ha_codeowners:
  - '@bachya'
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

### `simplisafe.set_pin`

Set a SimpliSafe PIN.

| Service Data Attribute    | Optional | Description                                 |
|---------------------------|----------|---------------------------------------------|
| `system_id`                 |      no  | The ID of the system to remove the PIN from |
| `label`                     |      no  | The label to show in the SimpliSafe UI      |
| `pin`                       |      no  | The PIN value to use                        |

### `simplisafe.system_properties`

Set one or more system properties.

For any property denoting a volume, the following values should be used:

* Off: `0`
* Low: `1`
* Medium: `2`
* High: `3`

| Service Data Attribute    | Optional | Description                                                                  |
|---------------------------|----------|------------------------------------------------------------------------------|
| `system_id`                 |      no  | The ID of a SimpliSafe system                                                | 
| `alarm_duration`            |      yes | The number of seconds a triggered alarm should sound                         |
| `chime_volume`              |      yes | The volume of the door chime                                                 |
| `entry_delay_away`          |      yes | The number of seconds to delay triggering when entering with an "away" state |
| `entry_delay_home`          |      yes | The number of seconds to delay triggering when entering with a "home" state  |
| `exit_delay_away`           |      yes | The number of seconds to delay triggering when exiting with an "away" state  |
| `exit_delay_home`           |      yes | The number of seconds to delay triggering when exiting with a "home" state   |
| `light`                     |      yes | Whether the light on the base station should display when armed              |
| `voice_prompt_volume`       |      yes | The volume of the base station's voice prompts                               |
