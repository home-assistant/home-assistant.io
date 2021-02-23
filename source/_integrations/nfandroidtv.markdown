---
title: Notifications for Android TV / FireTV
description: Notifications for Android TV / FireTV
ha_category:
  - Notifications
ha_release: 0.32
ha_domain: nfandroidtv
ha_iot_class: Local Push
ha_platforms:
  - notify
---

Notification platform for [Notifications for Android TV](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) and [Notifications for FireTV](https://play.google.com/store/apps/details?id=de.cyberdream.firenotifications.google). You can use this plarform to send notifications to your Android TV device. An overlay with the message content will appear for a configurable amount of seconds and then disapper again. Sending images (e.g., security cam) is supported too.

The notifications are in the global scope of your Android TV device. They will be displayed regardless of which application is running.

When setting this up be aware, that there are two apps: one for your smartphone to send notifications (not required for this platform) and one for your Android TV device to receive the notifications. The app available in the store of your Android TV device is the one that is needed to display notifications sent from Home Assistant. The In-App purchases only apply to the client for Android smartphones, so there isn't any limit when pushing notifications from Home Assistant.

To enable the notification platform, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: nfandroidtv
    name: Kitchen
    host: 192.168.1.12
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
host:
  description: IP address of the Android TV / FireTV device.
  required: true
  type: string
duration:
  description: The duration in seconds for which the notification will be displayed.
  required: false
  default: 5
  type: integer
fontsize:
  description: "Has to be one of: `small`, `medium`, `large` or `max`."
  required: false
  default: medium
  type: string
position:
  description: "Has to be one of: `bottom-right`, `bottom-left`, `top-right`, `top-left` or `center`."
  required: false
  default: bottom-right
  type: string
color:
  description: "Has to be one of: `grey`, `black`, `indigo`, `green`, `red`, `cyan`, `teal`, `amber` or `pink`."
  required: false
  default: grey
  type: string
transparency:
  description: "Has to be one of: `0%`, `25%`, `50%`, `75%` or `100%`."
  required: false
  default: 25%
  type: string
timeout:
  description: The timeout in seconds.
  required: false
  default: 5
  type: integer
interrupt:
  description: If set to true, 1, on etc., the notification is interactive and can be dismissed or selected to display more details. Depending on the running app (e.g., Netflix), this may stop playback.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

The configuration will be used to configure the default values for the notification for the host specified by the IP. However, you can override most of the settings by passing them with the data-attribute when calling the service.
This is a fully customized JSON you can use to test how the final notification will look like:

```json
{
"message": "Messagetext",
"title": "My Notification",
"data":{
    "fontsize": "large",
    "position":"center",
    "duration":2,
    "transparency":"0%",
    "color": "red",
    "interrupt": 1
    }
}
```

### Service data for sending images

The following attributes can be placed inside `data` to send images.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `file`                 |      yes | Groups the attributes for file upload. If present, either `url` or `path` have to be provided.
| `path`                |      yes | Local path of an image file. Is placed inside `file`.
| `url`                  |      yes | URL of an image file. Is placed inside `file`.
| `username`             |      yes | Username if the URL requires authentication. Is placed inside `file`.
| `password`             |      yes | Password if the URL requires authentication. Is placed inside `file`.
| `auth`                 |      yes | If set to `digest` HTTP-Digest-Authentication is used. If missing, HTTP-BASIC-Authentication is used. Is placed inside `file`.

Example for posting file from URL:

```json
{
  "message":"Messagetext",
  "title":"My Notification",
  "data":{
    "file":{
      "url":"http://[url to image file]",
      "username":"optional user, if necessary",
      "password":"optional password, if necessary",
      "auth":"digest"
    }
  }
}
```

Example for posting file from local path:

```json
{
  "message":"Messagetext",
  "title":"My Notification",
  "data":{
    "file":{
      "path":"/path/to/file.ext"
    }
  }
}
```

Please note that `path` is validated against the `allowlist_external_dirs` in the `configuration.yaml`.
