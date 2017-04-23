---
layout: page
title: "Notifications for Android TV / FireTV"
description: "Notifications for Android TV / FireTV"
date: 2016-10-21 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nfandroidtv.png
ha_category: Notifications
ha_release: 0.32
---


Notification platform for [Notifications for Android TV](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google&hl=de) and [Notifications for FireTV](https://play.google.com/store/apps/details?id=de.cyberdream.firenotifications.google).
The notifications are in the global scope of your Android TV device. They will be displayed regardless of which application is running.
The In-App purchases only apply to the client for Android smartphones, so there isn't any limit when pushing notifications from HASS.

To enable the notification platform, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
- platform: nfandroidtv
  name: Kitchen
  host: 192.168.1.12
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **host** (*Required*): IP address of the Android TV / FireTV device.
- **duration** (*Optional*): The duration in seconds for which the notification will be displayed. Default is 5 seconds.
- **position** (*Optional*): Has to be one of: bottom-right (default), bottom-left, top-right, top-left, center
- **color** (*Optional*): Has to be one of: grey (default), black, indigo, green, red, cyan, teal, amber, pink
- **transparency** (*Optional*): Has to be one of: 0%, 25% (default), 50%, 75%, 100%
- **interrupt** (*Optional*): If set to true, 1, on etc., the notification is interactive and can be dismissed or selected to display more details. Depending on the running app (e.g. Netflix), this may stop playback.

The configuration will be used to configure the default values for the notification for the host specified by the IP. However, you can override most of the settings by passing them with the data-attribute when calling the service.
This is a fully customized JSON you can use to test how the final notification will look like:

```json
{
"message": "Messagetext",
"title": "My Notification",
"data":{
    "position":"center",
    "duration":2,
    "transparency":"0%",
    "color": "red",
    "interrupt": 1
    }
}
```
