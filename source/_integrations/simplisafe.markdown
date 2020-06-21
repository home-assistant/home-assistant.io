---
title: SimpliSafe
description: Instructions on how to integrate SimpliSafe into Home Assistant.
ha_release: 0.81
ha_category:
  - Alarm
  - Lock
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: simplisafe
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
  description: A code to enable or disable the alarm in the frontend. *Under normal operation, the integration doesn’t need a SimpliSafe keypad code.*
  required: false
  type: string
{% endconfiguration %}

## Services

Note that the `system_id` parameter required by the below service calls can be discovered
by looking at the device state attributes for the integration's `alarm_control_panel`
entity.

### `simplisafe.clear_notifications`

Clear any existing notifications within the SimpliSafe cloud; this will mark existing
notifications as "read" in the SimpliSafe web and mobile apps, as well as prevent them
from triggering future `SIMPLISAFE_NOTIFICATION` events.

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

## Events

### `SIMPLISAFE_EVENT`

`SIMPLISAFE_EVENT` events represent events that appear on the timeline of the SimpliSafe
web and mobile apps. When received, they come with event data that contains the
following keys:

* `changed_by`: the PIN that triggered the event (if appropriate)
* `event_type`: the type of event
* `info`: a human-friendly string describing the event in more detail
* `sensor_name`: the sensor that triggered the event (if appropriate)
* `sensor_serial`: the serial number of the sensor that triggered the event (if appropriate)
* `sensor_type`: the type of sensor that triggered the event (if appropriate)
* `system_id`: the system ID to which the event belongs
* `timestamp`: the UTC datetime at which the event was received

For example, when the system is armed by "remote" means (via the web app, etc.), a
`SIMPLISAFE_EVENT` event will fire with the following event data:

```python
{
    "changed_by": "",
    "event_type": "armed_home",
    "info": "System Armed (Home) by Remote Management",
    "sensor_name": "",
    "sensor_serial": "",
    "sensor_type": "remote",
    "system_id": 123456,
    "timestamp": datetime.datetime(2020, 2, 13, 23, 1, 13, tzinfo=<UTC>),
}
```

`event_type`, being one of the key fields automations might be built from, can have the
following values:

* `camera_motion_detected`
* `doorbell_detected`
* `entry_detected`
* `motion_detected`

### `SIMPLISAFE_NOTIFICATION`

`SIMPLISAFE_NOTIFICATION` events represent system notifications that would appear in the
messages section of the SimpliSafe web and mobile apps. When received, they come with
event data that contains the following keys:

* `category`: The notification category (e.g., `error`)
* `code`: The SimpliSafe code for the notification
* `message`: The actual text of the notification
* `timestamp`: The UTC timestamp of the notification

Note that when Home Assistant restarts, `SIMPLISAFE_NOTIFICATION` events will fire once
again for any notifications still active in the SimpliSafe web and mobile apps. To
prevent this, either (a) clear them in the web/mobile app or (b) utilize the 
`simplisafe.clear_notifications` service described above.
