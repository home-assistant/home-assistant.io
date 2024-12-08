---
title: SimpliSafe
description: Instructions on how to integrate SimpliSafe into Home Assistant.
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_category:
  - Alarm
  - Button
  - Lock
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: simplisafe
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - diagnostics
  - lock
  - sensor
ha_dhcp: true
ha_integration_type: hub
---

The `simplisafe` integration integrates [SimpliSafe home security](https://simplisafe.com) (V2 and V3) systems into Home Assistant. Multiple SimpliSafe accounts can be accommodated.

There is currently support for the following device types within Home Assistant:

- **Alarm control panel**: reports on the current alarm status and can be used to arm and disarm the system.
- **CO detector**: reports on the carbon monoxide sensor status*.
- **Entry sensor**: reports on the current entry sensor status*.
- **Freeze sensor**: reports on the freeze sensor temperature*.
- **Glass Break Sensor**: reports on the glass breakage sensor status*.
- **Lock**: reports on `Door Locks` and can be used to lock and unlock a lock.
- **Motion Sensor**: reports on motion detected*.
- **Siren**: reports on the siren status*.
- **Smoke Detector**: reports on the smoke sensor status*.
- **Smoke+CO Detector**: reports on the smoke and carbon monoxide sensor status*.
- **Water Sensor**: reports on water sensor status*.

- Sensor status is only available for SimpliSafe V3 systems and is updated once every 30 seconds, so information displayed in Home Assistant may be delayed.

## SimpliSafe Plans

SimpliSafe offers several [monitoring plans](https://support.simplisafe.com/articles/alarm-events-monitoring/what-are-the-service-plan-options/6344794a013ba90af0bce6a4). All plans (including the free plan) should work with this integration.  

{% include integrations/config_flow.md %}

## Getting an Authorization Code

{% important %}
You must have multi-factor authentication (MFA) enabled on your SimpliSafe account for the below instructions to work. Without MFA enabled, you will never receive the correct authorization code!
{% endimportant %}

SimpliSafe authenticates users via its web app. Due to technical limitations, there is a manual step when adding the integration. For in-depth guidance, refer to step 6 of [the `simplisafe-python` documentation on authentication](https://simplisafe-python.readthedocs.io/en/latest/usage.html#authentication).

## Actions

### `simplisafe.remove_pin`

Remove a SimpliSafe PIN (by label or PIN value).

| Data attribute | Optional | Description                      |
| ---------------------- | -------- | -------------------------------- |
| `label_or_pin`         | no       | The PIN label or value to remove |

### `simplisafe.set_pin`

Set a SimpliSafe PIN.

| Data attribute | Optional | Description                            |
| ---------------------- | -------- | -------------------------------------- |
| `label`                | no       | The label to show in the SimpliSafe UI |
| `pin`                  | no       | The PIN value to use                   |

### `simplisafe.system_properties`

Set one or more system properties.

| Data attribute | Optional | Description                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------------- |
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

- `last_event_changed_by`: the PIN that triggered the event (if appropriate)
- `last_event_type`: the type of event
- `last_event_info`: a human-friendly string describing the event in more detail
- `last_event_sensor_name`: the sensor that triggered the event (if appropriate)
- `last_event_sensor_serial`: the serial number of the sensor that triggered the event (if appropriate)
- `last_event_sensor_type`: the type of sensor that triggered the event (if appropriate)
- `system_id`: the system ID to which the event belongs
- `last_event_timestamp`: the UTC datetime at which the event was received

For example, when someone rings the doorbell, a
`SIMPLISAFE_EVENT` event will fire with the following event data:

```python
{
    "event_type": "SIMPLISAFE_EVENT",
    "data": {
        "last_event_changed_by": "",
        "last_event_type": "doorbell_detected",
        "last_event_info": "Someone is at your \"Front Door\"",
        "last_event_sensor_name": "Front Door",
        "last_event_sensor_serial": "",
        "last_event_sensor_type": "doorbell",
        "system_id": [systemid],
        "last_event_timestamp": "2021-01-28T22:01:32+00:00"
    },
    "origin": "LOCAL",
    "time_fired": "2021-01-28T22:01:37.478539+00:00",
    "context": {
        "id": "[id]",
        "parent_id": null,
        "user_id": null
    }
}
```

`last_event_type` can have the following values:

- `automatic_test`
- `camera_motion_detected`
- `doorbell_detected`
- `device_test`
- `secret_alert_triggered`
- `sensor_paired_and_named`
- `user_initiated_test`

To build an automation using one of these, use `SIMPLISAFE_EVENT`
as an event trigger, with `last_event_type` as the `event_data`.
For example, the following will trigger when the doorbell rings:

```yaml
triggers:
  - trigger: event
    event_type: SIMPLISAFE_EVENT
    event_data:
        last_event_type: doorbell_detected
```

### Using secret alerts for sensor changes

For cases where the default {% term polling %} interval of 30 seconds is too long for automations, you can use secret alerts to get push notifications of a sensor being triggered.

To enable secret alerts for sensor changes, follow these steps:

1. Enable the secret alert for the device in the Simplisafe App.
2. Make a note of the serial number of the device.
    - You can see it in the top-left corner of the page where you set the alert.
3. Use the following event trigger:

  ```yaml
  triggers:
    - trigger: event
      event_type: SIMPLISAFE_EVENT
      event_data:
          last_event_type: secret_alert_triggered
          last_event_sensor_serial: "abc123xyz"  # Replace with your device's serial number (use lowercase letters)
  ```

{% note %}
Due to the way Simplisafe implements secret alerts, you can only determine when a sensor is triggered, not when it is cleared.
{% endnote %}

### `SIMPLISAFE_NOTIFICATION`

`SIMPLISAFE_NOTIFICATION` events represent system notifications that would appear in the
messages section of the SimpliSafe web and mobile apps. When received, they come with
event data that contains the following keys:

- `category`: The notification category (e.g., `error`)
- `code`: The SimpliSafe code for the notification
- `message`: The actual text of the notification
- `timestamp`: The UTC timestamp of the notification

Note that when Home Assistant restarts, `SIMPLISAFE_NOTIFICATION` events will fire once
again for any notifications still active in the SimpliSafe web and mobile apps. To
prevent this, either (a) clear them in the web/mobile app or (b) utilize the 
`clear_notifications` button provided by the alarm control panel.
