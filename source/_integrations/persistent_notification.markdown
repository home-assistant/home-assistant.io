---
description: Instructions on how to integrate persistent notifications into Home Assistant.
ha_release: 0.23
ha_domain: persistent_notification
---

The **Persistent Notification** {% term integration %} can be used to show a notification on the frontend that has to be dismissed by the user.

<p class='img'>
  <img src='/images/screenshots/persistent-notification.png' />
</p>

<a id="automation"></a>

{% include integrations/triggers.md %}

{% include integrations/actions.md %}

## Use as a notifier

Persistent notifications can also be used as a pre-configured notifier for the [Notify integration](/integrations/notify/) when that integration is loaded. It is available as `notify.persistent_notification`. This lets you use it with features that require a notifier, such as [notify action groups](/integrations/group/#notify-action-groups) or the [Alert integration](/integrations/alert/).

You can place the following attribute inside `data` for extended functionality:

- `notification_id`: When a notification ID is given, it overwrites the notification if one with that ID already exists.
