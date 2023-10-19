---
title: TvOverlay Notifications for Android TV
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

The [TvOverlay](https://play.google.com/store/apps/details?id=com.tabdeveloper.tvoverlay) Notifications for Android TV integration makes it possible to send notifications to your Android TV. An overlay with the message content will display on the Android TV screen for a configurable period of time. Sending images and icons are supported too. Icons are essentially the same as images, but small in size and displayed on the left of the notification. You can further customize the notifications like adding app title, badge, source name etc. TvOverlay also supports sending persistent notifications. These are small icon with a text. You can make it visible and hide based on the service call data attributes.

The notifications are in the global scope of your Android TV device. They will be displayed regardless of which application is running.

There are two apps for TvOVerlay: one for your Android smartphone ([TvOverlay Remote](https://play.google.com/store/apps/details?id=com.tabdeveloper.tvoverlayremote)) to configure and send notifications. And another one for your Android TV ([TvOverlay](https://play.google.com/store/apps/details?id=com.tabdeveloper.tvoverlay)) to receive the notifications. It is required to install the app on your Android TV to display the notifications sent from Home Assistant. The app is available at Google Play store.

{% include integrations/config_flow.md %}

## Services

The following options can be specified inside the data field for the notify service call:

### Service

Once loaded, the `notify.[name_of_your_tv]` platform will expose a service that can be called to send notifications.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification.
| `title`                |      yes | Title of the notification.
| `data`                 |      yes | Additional data attributes to customize the notifications, see below.

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
badge_color: "#FF41E09A"
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
badge_color: "#FF41E09A"
bg_color: "#000000"
visible: true
```

## Service data for sending images and icons

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

Example for posting image from mdi icon:

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

Example of an automation with an service call:

{% raw %}

```yaml
service: notify.living_room_tv
data:
  title: "Alert!"
  message: "There is a motion detected at front gate."
  data:
    id: "motion_alert_1"
    app_title: "Motion"
    source_name: "Front Gate"
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
service: notify.living_room_tv
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
service: notify.living_room_tv
data:
  message: "Motion Alert"
  data:
    id: "alert_1"
    is_persistent: true
    visible: false
```

{% endraw %}
