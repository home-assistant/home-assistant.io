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
---

Notification integration for [Notifications for Android TV](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) and [Notifications for Fire TV](https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK). You can use this integration to send notifications to your Android TV device. An overlay with the message content will appear for a configurable amount of seconds and then disappear again. Sending images (e.g., security cam) is supported too.

The notifications are in the global scope of your Android TV device. They will be displayed regardless of which application is running.

When setting this up be aware, that there are two apps: one for your smartphone to send notifications (not required for this platform) and one for your Android TV device to receive the notifications. The app available in the store of your Android TV device is the one that is needed to display notifications sent from Home Assistant. The In-App purchases only apply to the client for Android smartphones, so there isn't any limit when pushing notifications from Home Assistant.

{% include integrations/config_flow.md %}

## Services

The following options can be specified inside the data field for the notify service call:

### Service `notify.[name_of_your_tv]`

{% configuration %}
duration:
  description: The duration in seconds for which the notification will be displayed.
  default: 5
  type: integer
fontsize:
  description: "Has to be one of: `small`, `medium`, `large` or `max`."
  default: medium
  type: string
position:
  description: "Has to be one of: `bottom-right`, `bottom-left`, `top-right`, `top-left` or `center`."
  default: bottom-right
  type: string
color:
  description: "Has to be one of: `grey`, `black`, `indigo`, `green`, `red`, `cyan`, `teal`, `amber` or `pink`."
  default: grey
  type: string
transparency:
  description: "Has to be one of: `0%`, `25%`, `50%`, `75%` or `100%`."
  default: 25%
  type: string
timeout:
  description: The timeout in seconds for trying to send the notification to the device.
  default: 5
  type: integer
interrupt:
  description: If set to true, 1, on etc., the notification is interactive and can be dismissed or selected to display more details. Depending on the running app (e.g., Netflix), this may stop playback.
  default: false
  type: boolean
{% endconfiguration %}

This is a fully customized YAML you can use inside `data` to test how the final notification will look like:

```yaml
fontsize: "large"
position: "center"
duration: 2
transparency: "0%"
color: "red"
interrupt: 1
```

## Service data for sending images

The following attributes can be placed inside `data` to send images.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `file`                 |      yes | Groups the attributes for file upload. If present, either `url` or `path` have to be provided.
| `path`                |      yes | Local path of an image file. Is placed inside `file`.
| `url`                  |      yes | URL of an image file. Is placed inside `file`.
| `username`             |      yes | Username if the URL requires authentication. Is placed inside `file`.
| `password`             |      yes | Password if the URL requires authentication. Is placed inside `file`.
| `auth`                 |      yes | If set to `digest` HTTP-Digest-Authentication is used. If missing, HTTP-BASIC-Authentication is used and is placed inside `file`.

Example for posting file from URL:

```yaml
file:
  url: "http://[url to image file]"
  username: "optional user, if necessary"
  password: "optional password, if necessary"
  auth: "digest"
```

Example for posting file from local path:

```yaml
file:
  path: "/path/to/file.ext"
```

Please note that `path` is validated against the `allowlist_external_dirs` in the `configuration.yaml`.
