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
  - diagnostics
  - lock
  - sensor
ha_dhcp: true
ha_integration_type: integration
---

The `simplisafe` integration integrates [SimpliSafe home security](https://simplisafe.com) (V2 and V3) systems into Home Assistant. Multiple SimpliSafe accounts can be accommodated.

There is currently support for the following device types within Home Assistant:

- **Alarm Control Panel**: reports on the current alarm status and can be used to arm and disarm the system.
- **CO Detector**: reports on the carbon monoxide sensor status*.
- **Entry Sensor**: reports on the current entry sensor status*.
- **Freeze Sensor**: reports on the freeze sensor temperature*.
- **Glass Break Sensor**: reports on the glass breakage sensor status*.
- **Lock**: reports on `Door Locks` and can be used to lock and unlock a lock.
- **Motion Sensor**: reports on motion detected*.
- **Siren**: reports on the siren status*.
- **Smoke Detector**: reports on the smoke sensor status*.
- **Water Sensor**: reports on water sensor status*.

* Sensor status is only available for SimpliSafe V3 systems and is updated once every 30 seconds, so information displayed in Home Assistant may be delayed.

## SimpliSafe Plans

SimpliSafe offers several [monitoring plans](https://support.simplisafe.com/hc/en-us/articles/360023809972-What-are-the-service-plan-options-). Currently, only the Standard and Interactive Monitoring are known to work with this integration; if you find otherwise, please consider updating this documentation.

{% include integrations/config_flow.md %}

## Getting an Authorization Code

<div class="note info">
You must have multi-factor authentication set up in your SimpliSafe account to install the integration.
</div>

<div class="note info">
You must use a "standard" operating system (Windows, macOS, Linux) to perform the below instructions. Indications are that non-standard OS's, like Chrome OS, will not work.
</div>

<div class="note warning">
Because of a technical limitation, the below instructions will not work for iOS users as-is. It is recommended that you set up the SimpliSafe integration from a desktop browser. If you must use an iOS device, please ensure that the SimpliSafe app is not installed before beginning; the app can be re-installed after the integration is set up.
</div>

Starting in 2021, SimpliSafe has moved to a new authentication mechanism via its web app. Below are instructions on retrieving the authorization code needed to finish setting the integration up.

1. Initiate adding the integration via the instructions above.
2. When prompted, click the link that opens the SimpliSafe web app.
3. Input your SimpliSafe credentials. You will see "Verification Pending" – leave this browser tab open.
4. You will receive a multi-factor authentication prompt, either via SMS or email. Regardless of the type, use this message to verify the access request.
5. After the verification is successful, return to the first browser tab/window.

Retrieving the access code is different depending on which browser you are using:

* Chrome: Navigate to `Developer -> Developer Tools -> Console Tab` and look for a `Failed to launch` error.
* Edge: Navigate to `Developer -> Developer Tools -> Console Tab` and look for a `Failed to launch` error.
* Safari: Navigate to `Develop -> Show Web Inspector -> Network Tab` and look for a reference to `ErrorPage.html`.

Look for a reference to a URL that starts with `com.simplisafe.mobile://` and note the code at the end:

```txt
com.simplisafe.mobile://auth.simplisafe.com/ios/com.simplisafe.mobile/callback?code=<CODE>
```

Copy/paste this code parameter into Home Assistant to finish setting up the integration.

## Services

### `simplisafe.clear_notifications`

Clear any existing notifications within the SimpliSafe cloud; this will mark existing
notifications as "read" in the SimpliSafe web and mobile apps, as well as prevent them
from triggering future `SIMPLISAFE_NOTIFICATION` events.

### `simplisafe.remove_pin`

Remove a SimpliSafe PIN (by label or PIN value).

| Service Data Attribute | Optional | Description                      |
| ---------------------- | -------- | -------------------------------- |
| `label_or_pin`           | no       | The PIN label or value to remove |

### `simplisafe.set_pin`

Set a SimpliSafe PIN.

| Service Data Attribute | Optional | Description                                 |
| ---------------------- | -------- | ------------------------------------------- |
| `label`                  | no       | The label to show in the SimpliSafe UI      |
| `pin`                    | no       | The PIN value to use                        |

### `simplisafe.system_properties`

Set one or more system properties.

| Service Data Attribute | Optional | Description                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------------- |
| `alarm_duration`         | yes      | The number of seconds a triggered alarm should sound                         |
| `chime_volume`           | yes      | The volume of the door chime                                                 |
| `entry_delay_away`       | yes      | The number of seconds to delay triggering when entering with an "away" state |
| `entry_delay_home`       | yes      | The number of seconds to delay triggering when entering with a "home" state  |
| `exit_delay_away`        | yes      | The number of seconds to delay triggering when exiting with an "away" state  |
| `exit_delay_home`        | yes      | The number of seconds to delay triggering when exiting with a "home" state   |
| `light`                  | yes      | Whether the light on the base station should display when armed              |
| `voice_prompt_volume`    | yes      | The volume of the base station's voice prompts                               |

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

* `automatic_test`
* `camera_motion_detected`
* `doorbell_detected`
* `device_test`
* `secret_alert_triggered`
* `sensor_paired_and_named`
* `user_initiated_test`

To build an automation using one of these, use `SIMPLISAFE_EVENT`
as an event trigger, with `last_event_type` as the `event_data`.
For example, the following will trigger when the doorbell rings:

```yaml
trigger:
  - platform: event
    event_type: SIMPLISAFE_EVENT
    event_data:
        last_event_type: doorbell_detected
```

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
