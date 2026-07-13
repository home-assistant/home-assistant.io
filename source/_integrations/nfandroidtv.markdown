---
title: Notifications for Android TV / Fire TV
description: Notifications for Android TV / Fire TV
ha_category:
  - Notifications
ha_release: 0.32
ha_config_flow: true
ha_domain: nfandroidtv
ha_iot_class: Local Push
ha_platforms:
  - notify
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
---

Notification integration for [Notifications for Android TV](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) and [Notifications for Fire TV](https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK). You can use this integration to send notifications to your Android TV device. An overlay with the message content will appear for a configurable amount of seconds and then disappear again. Sending images (e.g., security cam) and custom icons is supported too. Icons are essentially the same as images (any image format supported by Android TV is supported), but are displayed small and to the left of the notification whereas images are large and above the notification.

The notifications are in the global scope of your Android TV device. They will be displayed regardless of which application is running.

When setting this up be aware, that there are two apps: one for your smartphone to send notifications (not required for this platform) and one for your Android TV device to receive the notifications. The app available in the store of your Android TV device is the one that is needed to display notifications sent from Home Assistant. The In-App purchases only apply to the client for Android smartphones, so there isn't any limit when pushing notifications from Home Assistant.

## Prerequisites

Make sure the app on your TV has the following permissions enabled:

- **Notification access**
- **Display over other apps**

On some TVs, opening the app and following its setup wizard will prompt you to grant these permissions. You might need to restart your TV after changing them.

{% include integrations/config_flow.md %}

## Sending notifications

The **Notifications for Android TV / Fire TV** {% term integration %} adds a notify {% term entity %} for each configured TV, such as `notify.my_android_tv`. To show a notification on your TV, use the [**Notifications: Send a notification message**](/actions/notify.send_message/) (`notify.send_message`) {% term action %} and select your TV notify entity as the target.

You can send a basic message, or add images and icons for camera snapshots, reminders, and status updates.

{% details "Example YAML configuration" %}

```yaml
action: notify.send_message
target:
  entity_id: notify.my_tv
data:
  title: "Just a reminder"
  message: "You are awesome!"
```

{% enddetails %}

### Notification data options

Use the following options inside the `data` field of the TV notify action, such as `notify.my_android_tv`.

{% configuration %}
duration:
  description: The duration in seconds for which the notification is displayed.
  required: false
  default: 5
  type: integer
fontsize:
  description: "The font size, one of `small`, `medium`, `large`, or `max`."
  required: false
  default: medium
  type: string
position:
  description: "The notification position, one of `bottom-right`, `bottom-left`, `top-right`, `top-left`, or `center`."
  required: false
  default: bottom-right
  type: string
<!-- textlint-disable terminology -->
color:
  description: "The notification color, one of `grey`, `black`, `indigo`, `green`, `red`, `cyan`, `teal`, `amber`, or `pink`."
  required: false
  default: grey
  type: string
<!-- textlint-enable terminology -->
transparency:
  description: "The notification transparency, one of `0%`, `25%`, `50%`, `75%`, or `100%`."
  required: false
  default: 25%
  type: string
interrupt:
  description: Set to `true` to make the notification interactive so it can be dismissed or selected to display more details.
  required: false
  default: false
  type: boolean
image:
  description: Image upload settings. Provide either `url` or `path`. If you set `username`, `password`, or `auth`, you must also set `url`.
  required: false
  type: map
icon:
  description: Icon upload settings. Provide either `url` or `path`. If you set `username`, `password`, or `auth`, you must also set `url`.
  required: false
  type: map
{% endconfiguration %}

For `image` and `icon`, use these nested settings:

{% configuration %}
path:
  description: Local path of an image file.
  required: false
  type: string
url:
  description: URL of an image file.
  required: false
  type: string
username:
  description: Username if the URL requires authentication.
  required: false
  type: string
password:
  description: Password if the URL requires authentication.
  required: false
  type: string
auth:
  description: Set to `digest` to use HTTP Digest authentication. If omitted, basic authentication is used.
  required: false
  type: string
{% endconfiguration %}

Local image and icon paths are validated against `allowlist_external_dirs` in {% term "configuration.yaml" %}.

## Notifications for Android TV / Fire TV automation examples

### Automation: show a doorbell notification

Show a notification on the TV when the doorbell detects motion.

- **Trigger**: State, doorbell motion changes to detected
- **Action**: Send a notification message
  - **Target**: Living room TV (`notify.living_room_tv`)
  - **Message**: Someone is at the front door.
  - **Data**:
    - **Duration**: 4
    - **Position**: bottom-left

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Show doorbell notification on the TV"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell_motion
      to: "on"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.living_room_tv
      data:
        message: "Someone is at the front door."
        data:
          duration: 4
          position: "bottom-left"
{% endexample %}

{% enddetails %}
