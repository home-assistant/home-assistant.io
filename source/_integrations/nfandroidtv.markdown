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

## Notifiers

The **Notifications for Android TV / Fire TV** {% term integration %} will add a notify {% term entity %} for your configured TV. To send a notification, you can use the `notify.send_message` {% term action %}. For further instructions on using the notifiers in automations, please see the [getting started with automation page](/getting-started/automation/).

{% details "Example YAML configuration" %}

```yaml
action: notify.send_message
data:
  title: "Just a reminder"
  message: "You are awesome!"
  entity_id: notify.my_tv
```

{% enddetails %}

{% include integrations/actions.md %}
