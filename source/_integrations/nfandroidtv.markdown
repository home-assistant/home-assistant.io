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

## Supported functionality

### Sending notifications

The **Notifications for Android TV / Fire TV** {% term integration %} adds a notify {% term entity %} for each configured TV, such as `notify.my_android_tv`. To show a notification on your TV, use the [**Send a notification message**](/actions/notify.send_message/) (`notify.send_message`) {% term action %} and select your TV notify entity as the target.  For more customizable notifications, use the [**Notifications for Android TV / Fire TV: Send a notification message**](/actions/nfandroidtv.send_message/) (`nfandroidtv.send_message`) instead.

You can send a basic message, or add images and icons for camera snapshots, reminders, and status updates.

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Send a notification message**.
6. Under **Targets**, select the notify entity for your TV.
7. Enter the **Message** and set any other options.
8. Select **Save**.

{% details "Example YAML configuration" %}

{% example %}
action: |
  action: notify.send_message
  target:
    entity_id: notify.my_tv
  data:
    title: "Just a reminder"
    message: "You are awesome!"
{% endexample %}

{% enddetails %}

{% include integrations/actions.md %}

## Automation examples

These examples show how to use the TV notify entity in automations. Replace the example entity IDs with the ones from your Home Assistant instance.

### Automation: show a doorbell notification

Show a notification on the TV when the doorbell detects motion.

- **Trigger**: State, doorbell motion changes to detected
- **Action**: Send a notification via `nfandroidtv.send_message`
  - **Target**: Living room TV (`notify.living_room_tv`)
  - **Message**: Someone is at the front door.
  - **Duration**: 4 seconds
  - **Position**: Bottom left

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Show doorbell notification on the TV"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell_motion
      to: "on"
  actions:
    - action: nfandroidtv.send_message
      target:
        entity_id: notify.living_room_tv
      data:
        message: "Someone is at the front door."
        duration:
          seconds: 4
        position: "bottom-left"
{% endexample %}

{% enddetails %}
