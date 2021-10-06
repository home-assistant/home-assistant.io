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

## Getting an Authorization Code

Starting in 2021, SimpliSafe has moved to a new authentication mechanism via its web app. Below are instructions on retrieving the authorization code needed to finish setting the integration up.

1. Initiate adding the integration via the instructions above.
2. When prompted, click the link that opens the SimpliSafe web app.
3. Input your SimpliSafe credentials. You will see "Verification Pending" – leave this browser tab open.
4. Check your email for a message from SimpliSafe. When you have received that email, click "Verify Device" – note that this will open a second browser tab/window.
5. After the verification is successful, return to the first browser tab/window. The browser will show an error about not being able to navigate to the page; ignore it.

At this stage, take a look at the address bar and note the `code` parameter at the very end of the URL:

```
com.simplisafe.mobile://auth.simplisafe.com/ios/com.simplisafe.mobile/callback?code=<CODE>
```

Copy/paste this code parameter into Home Assistant to finish setting up the integration.

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

## Events

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
