---
title: TvOverlay
description: TvOverlay Notifications for Android TV
ha_category:
  - Notifications
ha_release: 2023.12
ha_config_flow: true
ha_domain: tvoverlay
ha_iot_class: Local Push
ha_platforms:
  - notify
ha_codeowners:
  - '@hareeshmu'
ha_integration_type: service
---

The TvOverlay integration allows you to send notifications to your Android/Google TV. These notifications can include messages, images, videos and icons, with the option to customize them by adding app titles, badges, source names, and more. You can even send persistent notifications featuring a small icon and text, and you can control their visibility and display duration based on service call data attributes.

There are two apps related to TvOverlay: one for your Android smartphone, called ([TvOverlay Remote](https://play.google.com/store/apps/details?id=com.tabdeveloper.tvoverlayremote)), which is used for configuring and sending notifications from smartphone; and another for your Android/Google TV, named ([TvOverlay](https://play.google.com/store/apps/details?id=com.tabdeveloper.tvoverlay)), which receives the notifications. To display notifications from Home Assistant on your Android/Google TV, you need to install the [TvOverlay](https://play.google.com/store/apps/details?id=com.tabdeveloper.tvoverlay) app, available on the Google Play store.

The notifications on your Android TV have a global scope, meaning they will appear on the screen regardless of the application you are currently using.

![Screenshot of TvOverlay Notification](/images/screenshots/tvoverlay-notification.png)

![Screenshot of TvOverlay Persistent Notification](/images/screenshots/tvoverlay-persistent-notification.png)

{% include integrations/config_flow.md %}

## Services

Once the `TvOverlay` integration is loaded, it will expose the `notify.[name_of_your_tv]` platform as a service that can be called to send notifications.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification.
| `title`                |      yes | Title of the notification.
| `data`                 |      yes | For additional data attributes to customize the notifications, please refer to the configuration variables below.

For the `notify.[name_of_your_tv]` service call, you can specify the following options inside the `data` field:

{% configuration %}
id:
  description: "An optional ID for the notification. If a persistent notification with this ID exists, it can be updated."
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
  description: "The App Icon to be displayed in the notification. See below app_icon service data for options."
  default: Home Assistant Logo
  type: string
badge_icon:
  description: "A small [mdi icon](https://pictogrammers.com/library/mdi) badge, (eg: `(mdi:bell)`) to be displayed in the notification."
  default: mdi:bell
  type: string
badge_color:
  description: "Any 6 or 8 digit [Hex Color](https://htmlcolorcodes.com/color-picker). eg: `#FFFFFF`."
  default: #FFFFFF
  type: string
image:
  description: "An image to be send in the notification. See below image service data for options."
  default: None
  type: string
video:
  description: "A video URL to display the live video in the notification. Supports `RTSP`, `HLS`, `DASH` and `SmoothStreaming`. If you specify both `image` and `video`, then only `video` will be used in the notification."
  default: None
  type: string
position:
  description: "Options: `bottom_right`, `bottom_left`, `top_right`, `top_left`. Default: `top_right`."
  default: top-right
  type: string
duration:
  description: "The duration in seconds (eg: `10` for 10 seconds) or a string formatted duration (eg: `1d2h3m4s`) for which the notification will be displayed. Default: `5`."
  default: 5
  type: string
is_persistent:
  description: "If set to `true`, a persistent notification will be displayed. Following extra options are applicable only for persistent notifications. Default: `false`"
  default: false
  type: boolean
message_color:
  description: "The `message` text color for persistent notification. Any 6 or 8 digit [Hex color](https://htmlcolorcodes.com/color-picker). eg: `#FFFFFF`."
  default: #FFFFFF
  type: string
shape:
  description: "Border shape of the persistent notification. Options: `circle`, `rounded`, `rectangular`. Default: `circle`."
  default: #FFFFFF
  type: string
border_color:
  description: "Border color of the shape. Any 6 or 8 digit [Hex color](https://htmlcolorcodes.com/color-picker). eg: `#FFFFFF`."
  default: #FFFFFF
  type: string
bg_color:
  description: "Background color of the persistent notification. Any 6 or 8 digit [Hex color](https://htmlcolorcodes.com/color-picker). eg: `#FFFFFF`."
  default: #FFFFFF
  type: string
visible:
  description: "Using the same message `id`, a persistent notification can be shown (`true`) or hidden (`false`). Default: `true`."
  default: true
  type: boolean
{% endconfiguration %}

This is a fully customized YAML that you can use within the `data` field to preview the notification's appearance (refer to the Automation service call examples at the end of this page).

```yaml
id: "my_message"
app_title: "Home Assistant"
source_name: "Notify"
app_icon: "mdi:home-assistant"
badge_icon: "mdi:bell"
badge_color: "#41E09A"
position: "top_right"
image: "https://picsum.photos/200/100"
duration: "10"
```

```yaml
id: "my_message"
app_title: "Home Assistant"
source_name: "Notify"
app_icon: "mdi:home-assistant"
badge_icon: "mdi:bell"
badge_color: "#41E09A"
position: "top_right"
video: "rtsp://user:pass@192.168.1.50/stream2"
duration: "1m"
```

Customized YAML for Persistent Notifications:

```yaml
id: "my_persistent_message"
is_persistent: true
message_color: "#FFFFFF"
shape: "circle"
border_color: "#FFFFFF"
badge_icon: "mdi:bell"
badge_color: "#41E09A"
bg_color: "#000000"
duration: "1m30s"
visible: true
```

### Service data for sending images

You can include the following attributes inside `data` for sending `images` and `app_icon`.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `image`                |      yes | Groups the attributes for `image` upload. If it's present, you must provide either `url`, `path`, or `mdi_icon`.
| `app_icon`             |      yes | Groups the attributes for `app_icon` upload. If it's present, you must provide either `url`, `path`, or `mdi_icon`.
| `url`                  |      yes | URL of an image file. Can be placed inside `image` and `app_icon`.
| `path`                 |      yes | Local path of an image file. Can be placed inside `image` and `app_icon`.
| `mdi_icon`             |      yes | [mdi icons](https://pictogrammers.com/library/mdi), (eg: `mdi:home-assistant`). Can be placed inside `image` and `app_icon`.
| `username`             |      yes | Username if the URL requires authentication. Is placed inside `image`, `app_icon` or both`.
| `password`             |      yes | Password if the URL requires authentication. Is placed inside `image`, `app_icon` or both.
| `auth`                 |      yes | Can be set to `basic` or `digest` authentication.

## Examples for image and app_icon

Example for posting image from a public URL:

Please note that the `url` is validated against [allowlist_external_urls](https://www.home-assistant.io/docs/configuration/basic/#allowlist_external_urls) in the `configuration.yaml`.

```yaml
image: "https://picsum.photos/200/100"
```

Example for posting image from a protected URL:

```yaml
image:
  url: "https://picsum.photos/200/100"
  username: "optional username, if necessary"
  password: "optional password, if necessary"
  auth: "basic"
```

Example for posting image from local path:

Please note that the `path` is validated against [allowlist_external_dirs](https://www.home-assistant.io/docs/configuration/basic/#allowlist_external_dirs) in the `configuration.yaml`.

```yaml
image: "/path/to/image.png"
```

```yaml
image: 
  path: "/path/to/image.png"
```

Examples for posting image from [mdi icon](https://pictogrammers.com/library/mdi):

```yaml
image: "mdi:home-assistant"
```

```yaml
image:
  mdi_icon: "mdi:home-assistant"
```

All the above image examples are applies to app_icon as well:

```yaml
app_icon: "https://picsum.photos/200/100"
```

Example for posting app_icon from local path:

```yaml
app_icon: "/path/to/file.png"
```

```yaml
app_icon:
  path: "/path/to/image.png"
```

Example for posting app_icon from [mdi icon](https://pictogrammers.com/library/mdi):

```yaml
app_icon: "mdi:home-assistant"
```

Examples for posting both image and icon from URL:

```yaml
image: "https://picsum.photos/200/100"
app_icon: "https://picsum.photos/200/100"
```

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
    duration: "10s"
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
    message_color: "#FFFFFF"
    shape: "circle"
    border_color: "#41E09A"
    badge_icon: "mdi:bell"
    badge_color: "#B00020"
    bg_color: "#000000"
    duration: "2m"
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
