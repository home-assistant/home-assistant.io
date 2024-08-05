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

{% include integrations/config_flow.md %}

## Actions

The following options can be specified inside the data field for the notify action:

### Action `notify.[name_of_your_tv]`

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
  default: "`grey`"
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

This is a fully customized YAML you can use inside `data` to test how the final notification will look like (for using this inside an action look at the example at the end of this page):

```yaml
fontsize: "large"
position: "center"
duration: 2
transparency: "0%"
color: "red"
interrupt: 1
```

## Action data for sending images and icons

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `image`                |      yes | Groups the attributes for image upload. It can take a `url` or `path`. It is optional unless you use authentication options. Then, either `url` or `path` has to be provided. |
| `icon`                 |      yes | Groups the attributes for icon upload.  It can take a `url` or `path`. It is optional unless you use authentication options. Then, either `url` or `path` has to be provided.  |
| `path`                 |      yes | Local path of an image file. Is placed inside `image`, `icon`, or both.
| `url`                  |      yes | URL of an image file. Is placed inside `image`, `icon` or both.
| `username`             |      yes | Username if the URL requires authentication. Is placed inside `image`, `icon` or both`.
| `password`             |      yes | Password if the URL requires authentication. Is placed inside `image`, `icon` or both.
| `auth`                 |      yes | If set to `digest` HTTP-Digest-Authentication is used. If missing, HTTP-BASIC-Authentication is used and is placed inside `image`, `icon` or both.

Example action data for both image and icons:

```yaml
# If your urls do not require extra authentication
icon: "http://[url to image file]"
image: "http://[url to image file]"

# Paths in most cases
icon: "/you/path/location"
image: "/you/path/location"
# Or alternatively
icon:
  path: "/you/path/location"
image:
  path: "/you/path/location"

# If your urls require extra authentication
image:
  url: "http://[url to image file]"
  username: "optional user, if necessary" # Optional
  password: "optional password, if necessary" # Optional 
  auth: "digest" # Optional
icon:
  url: "http://[url to image file]"
  username: "optional user, if necessary" # Optional
  password: "optional password, if necessary" # Optional
  auth: "digest" # Optional
```

Example of an automation with an action, full configuration:

{% raw %}

```yaml
action: notify.living_room_tv
data:
  title: "Thanks for the water!"
  message: "Nigel is {{ states('sensor.nigel_moisture') }}% moisture"
  data:
    duration: 4
    position: "bottom-left"
    fontsize: "medium"
    transparency: "75%"
    color: "teal"
    interrupt: 0
```

{% endraw %}

Please note that `path` is validated against the `allowlist_external_dirs` in the {% term "`configuration.yaml`" %}.
