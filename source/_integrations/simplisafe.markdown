---
title: SimpliSafe
description: Instructions on how to integrate SimpliSafe into Home Assistant.
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_category:
  - Alarm
  - Button
  - Event
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
  - event
  - lock
  - sensor
ha_dhcp: true
ha_integration_type: hub
---

The **SimpliSafe** {% term integration %} integrates [SimpliSafe home security](https://simplisafe.com) (V2 and V3) systems into Home Assistant. Multiple SimpliSafe accounts can be accommodated.

There is currently support for the following device types within Home Assistant:

- **Alarm control panel**: reports on the current alarm status and can be used to arm and disarm the system.
- **CO detector**: reports on the carbon monoxide sensor status*.
- **Camera**: reports motion.
- **Doorbell**: reports detection.
- **Entry sensor**: reports on the current entry sensor status*.
- **Freeze sensor**: reports on the freeze sensor temperature*.
- **Glass Break Sensor**: reports on the glass breakage sensor status*.
- **Lock**: reports on `Door Locks` and can be used to lock and unlock a lock.
- **Motion Sensor**: reports on motion detected*.
- **Siren**: reports on the siren status*.
- **Smoke Detector**: reports on the smoke sensor status*.
- **Smoke+CO Detector**: reports on the smoke and carbon monoxide sensor status*.
- **Water Sensor**: reports on water sensor status*.

\* Sensor status is only available for SimpliSafe V3 systems and is updated once every 30 seconds, so information displayed in Home Assistant may be delayed. For cases where the default {% term polling %} interval of 30 seconds is too long for automations, enabling a secret alert in the SimpliSafe app will let Home Assistant automatically set the status to triggered for binary sensor devices that have secret alerts. However, due to the way SimpliSafe implements secret alerts, you can only receive push notifications when devices are triggered, not when they are cleared.

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

## System events

Each SimpliSafe system provides a system event {% term entity %} that captures events from your security system with the following attributes:

- `event_type`: One of the following:
  - **Automatic test** (`automatic_test`)
  - **Device test** (`device_test`)
  - **Secret alert triggered** (`secret_alert_triggered`)
  - **Sensor paired and named** (`sensor_paired_and_named`)
  - **User initiated test** (`user_initiated_test`)
- `changed_by`: The PIN that triggered the event (if applicable)
- `info`: A human-friendly string describing the event in more detail
- `sensor_name`: The sensor that triggered the event (if applicable)
- `sensor_serial`: The serial number of the sensor that triggered the event (if applicable)
- `sensor_type`: The type of sensor that triggered the event (if applicable)

### Automation example: detecting secret alert events

Home Assistant already uses SimpliSafe secret alerts as triggers to turn on binary sensors. However, if you want to manually listen for them or adapt this example to listen for another type of system event, you can do the following:

1. Enable the secret alert for the device in the SimpliSafe App.
2. Make a note of the serial number of the device.
    - You can see it in the top-left corner of the page where you set the alert.
3. Use the **Event received** trigger on your system event entity, with a condition to match the sensor serial:

  ```yaml
  triggers:
    - trigger: event.received
      target:
        entity_id: event.YOUR_SYSTEM_EVENTS_ENTITY
      options:
        event_type:
          - secret_alert_triggered
  conditions:
    - condition: template
      value_template: "{{ trigger.to_state.attributes.sensor_serial == 'abc123xyz' }}"
  ```


## Camera events

Each supported SimpliSafe camera (reports `camera_motion_detected`) and doorbell (reports `doorbell_detected`) also provides its own event {% term entity %}.

### Automation example: doorbell notification

{% example %}
automation: |
  - alias: "Notify me when the doorbell rings"
    triggers:
      - trigger: event.received
        target:
          entity_id: event.YOUR_DOORBELL
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.YOUR_PHONE
        data:
          message: "Someone is at the front door."
{% endexample %}


## `SIMPLISAFE_NOTIFICATION` events

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
