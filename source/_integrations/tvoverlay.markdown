---
title: TvOverlay
description: TvOverlay Notifications for Android TV
ha_category:
  - Notifications
ha_release: 2023.11
ha_config_flow: true
ha_domain: tvoverlay
ha_iot_class: Local Push
ha_platforms:
  - notify
ha_codeowners:
  - '@hareeshmu'
ha_integration_type: service
---

The [TvOverlay](https://play.google.com/store/apps/details?id=com.tabdeveloper.tvoverlay) Notifications for Android TV integration allows you to send notifications to your Android TV. These notifications can include messages, images, and icons, with the option to customize them by adding app titles, badges, source names, and more. You can even send persistent notifications that feature a small icon and text, and you can control their visibility based on service call data attributes.

There are two apps for TVOverlay: one for your Android smartphone, called ([TvOverlay Remote](https://play.google.com/store/apps/details?id=com.tabdeveloper.tvoverlayremote)), used for configuring and sending notifications, and another for your Android TV, named ([TvOverlay](https://play.google.com/store/apps/details?id=com.tabdeveloper.tvoverlay)), which receives the notifications. To display notifications from Home Assistant on your Android TV, you must install the "TvOverlay" app, which is available on the Google Play store.

The notifications on your Android TV are in the global scope, meaning they will appear on the screen regardless of which application you are currently running.

![Screenshot of TvOverlay Notification](/images/screenshots/tvoverlay-notification.jpg)

![Screenshot of TvOverlay Persistent Notification](/images/screenshots/tvoverlay-persistent-notification.jpg)

{% include integrations/config_flow.md %}

## Services

Once the TvOverlay integration is loaded, the `notify.[name_of_your_tv]` platform will expose a service that can be called to send notifications.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification.
| `title`                |      yes | Title of the notification.
| `data`                 |      yes | Additional data attributes to customize the notifications, see below.

The following options can be specified inside the data field for the notify service call:

{% configuration %}
id:
  description: "An optional id of the notification, if a persistent notification with this id exist, it can be updated."
  default: Random
  type: string
app_title:
  description: "The App Title to be displayed in the notification."
  default: Home Assistant
  type: string
source_name:
  description: "The Source Name to be displayed in the notification."
  default: Notify
  type: string
app_icon:
  description: "The App Icon to be displayed in the notification. See below app_icon service data for options"
  default: Home Assistant Logo
  type: string
badge_icon:
  description: "A small mdi icon badge to be displayed in the notification."
  default: mdi:bell
  type: string
badge_color:
  description: "Any Hex 6 or 8 digit color. eg: `#FFFFFF`."
  default: #FFFFFF
  type: string
image:
  description: "An image to be send in the notification. See below image service data for options."
  default: None
  type: string
position:
  description: "Has to be one of: `bottom_right`, `bottom_left`, `top_right`, `top_left`."
  default: top-right
  type: string
duration:
  description: "The duration in seconds for which the notification will be displayed."
  default: 5
  type: integer
is_persistent:
  description: "If set to true, a persistent notification will be displayed, Only below options are applicable for persistent notification."
  default: false
  type: boolean
text_color:
  description: "Message Text color for persistent notification. Any Hex 6 or 8 digit color. eg: `#FFFFFF`."
  default: #FFFFFF
  type: string
shape:
  description: "Border shape of the persistent notification. Has to be one of: `circle`, `rounded`, `rectangular`."
  default: #FFFFFF
  type: string
border_color:
  description: "Border color of shape. Any Hex 6 or 8 digit color. eg: `#FFFFFF`."
  default: #FFFFFF
  type: string
bg_color:
  description: "Background color of the persistent notification. Any Hex 6 or 8 digit color. eg: `#FFFFFF`."
  default: #FFFFFF
  type: string
visible:
  description: "Using the same message id, persistent notification can be make visible or hide."
  default: true
  type: boolean
{% endconfiguration %}

This is a fully customized YAML you can use inside `data` to test how the final notification will look like (Look at the service call examples at the end of this page):

```yaml
id: "my_message"
app_title: "Home Assistant"
source_name: "Notify"
app_icon: "mdi:home-assistant"
badge_icon: "mdi:bell"
badge_color: "#41E09A"
position: "top_right"
image: "https://picsum.photos/200/100"
duration: 10
```

Customized YAML for Persistent Notification:

```yaml
id: "my_persistent_message"
is_persistent: true
text_color: "#FFFFFF"
shape: "circle"
border_color: "#FFFFFF"
badge_icon: "mdi:bell"
badge_color: "#41E09A"
bg_color: "#000000"
visible: true
```

### Service data for sending images

The following attributes can be placed inside `data` for send `image` and `app_icon`.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `image`                |      yes | Groups the attributes for image upload. If present, either `url` or `path` or `mdi_icon` must be provided.
| `app_icon`             |      yes | Groups the attributes for icon upload. If present, either `url` or `path` or `mdi_icon` must be provided.
| `url`                  |      yes | URL of an image file. Is placed inside `image`, `icon` or both.
| `path`                 |      yes | Local path of an image file. Is placed inside `image`, `icon` or both.
| `mdi_icon`             |      yes | Local path of an image file. Is placed inside `image`, `icon` or both.
| `username`             |      yes | Username if the URL requires authentication. Is placed inside `image`, `icon` or both`.
| `password`             |      yes | Password if the URL requires authentication. Is placed inside `image`, `icon` or both.
| `auth`                 |      yes | Can be set to `basic` for HTTP-BASIC-Authentication and `digest` for HTTP-Digest-Authentication.

Example for posting image from a public URL:

```yaml
image: "https://picsum.photos/200/100"
```

Example for posting image from a protected URL:

```yaml
image:
  url: "https://picsum.photos/200/100"
  username: "optional user, if necessary"
  password: "optional password, if necessary"
  auth: "digest"
```

Example for posting image from local path:

```yaml
image: "/path/to/file.png"
```

Please note that `path` is validated against the `allowlist_external_dirs` in the `configuration.yaml`.

Example for posting image from a protected local path:

```yaml
image: 
  path: "/path/to/file.png"
  username: "optional user, if necessary"
  password: "optional password, if necessary"
  auth: "digest"
```

Examples for posting image from mdi icon:

```yaml
image: "mdi:home-assistant"
```

```yaml
image:
  mdi_icon: mdi:home-assistant
```

All the above examples are applies to app_icon as well.:

```yaml
app_icon: "https://picsum.photos/200/100"
```

Example for posting app_icon from local path:

```yaml
app_icon: "/path/to/file.png"
```

Example for posting app_icon from mdi icon:

```yaml
app_icon: "mdi:home-assistant"
```

Example for posting both image and icon from URL:

```yaml
image:
  url: "http://[url to image file]"
  username: "optional user, if necessary"
  password: "optional password, if necessary"
  auth: "digest"
app_icon:
  url: "http://[url to image file]"
  username: "optional user, if necessary"
  password: "optional password, if necessary"
  auth: "digest"
```

## Automation service call examples

Example of an automation service call:

{% raw %}

```yaml
service: notify.tvoverlay
data:
  title: "Motion Alert!"
  message: "There is a motion detected at front gate."
  data:
    id: "motion_alert_1"
    app_title: "Home Assistant"
    source_name: "Notify"
    app_icon: "mdi:motion-sensor"
    badge_icon: "mdi:camera"
    badge_color: "#B00020"
    position: "top_right"
    duration: 10
    image: "https://picsum.photos/300/200"
```

{% endraw %}

Example of an automation service call to show a Persistent Notification:

{% raw %}

```yaml
service: notify.tvoverlay
data:
  message: "Motion Alert"
  data:
    id: "alert_1"
    is_persistent: true
    text_color: "#FFFFFF"
    shape: "circle"
    border_color: "#41E09A"
    badge_icon: "mdi:bell"
    badge_color: "#B00020"
    bg_color: "#000000"
    duration: 60
    visible: true
```

{% endraw %}

Example of an automation service call to hide a Persistent Notification:

{% raw %}

```yaml
service: notify.tvoverlay
data:
  message: "Motion Alert"
  data:
    id: "alert_1"
    is_persistent: true
    visible: false
```

{% endraw %}
