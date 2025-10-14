---
title: QuickBars
description: Display and control entities, camera feeds, and notifications on your Android TV with the QuickBars app.
ha_release: 2025.11
ha_category: Utility
ha_iot_class: Local Push
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@Trooped'
ha_domain: quickbars
ha_zeroconf: true
ha_integration_type: service
related:
  - url: https://quickbars.app
    title: The official QuickBars for Home Assistant website
---

The **QuickBars** {% term integration %} connects Home Assistant to the [QuickBars for Home Assistant](https://quickbars.app) Android / Google TV app. The app enables on-screen overlays called **QuickBars**, which let you control {% term entities %} and view their states quickly, without disrupting the viewing experience.

A common use case is to set up the **QuickBars for Home Assistant** app initially by sending your Home Assistant URL and a Long-Lived Access Token from the integration. From there, you can configure which entities are available to the app, create and customize QuickBars, and use Home Assistant automations to show a QuickBar, display a camera picture-in-picture feed, or send a rich notification to the TV.

{% tip %}
The QuickBars TV app can be used as a standalone application. This integration enhances it by unlocking powerful features, including:
  - Triggering notifications, camera PiPs, and QuickBars from automations.
  - Configuring the app directly from Home Assistant.
  - Accessing advanced options like custom QuickBar colors and custom-sized camera PiPs.

It works entirely on your local network using local push for real-time communication. This {% term integration %} exposes services and emits events, but does not create any entities.
{% endtip %}

## Supported devices

- Android TV / Google TV devices with Android 9 or higher.

## Unsupported devices

- Any device which is *not* Android TV.

## Prerequisites

1. Install the [QuickBars for Home Assistant](https://quickbars.app) app on your Android TV device.
2. Ensure your Android TV device and Home Assistant are on the **same LAN**.
3. Open the QuickBars app on your TV. Keep it open and visible on the screen for the initial pairing process, where you will be asked to enter a code shown on the TV into Home Assistant.
4. If the app has not been configured yet, you may be prompted to provide your Home Assistant URL and a long-lived access token. This can also be done via the integration's configuration flow.

{% note %}
When entering your Home Assistant URL, do not use localhost or 127.0.0.1. Use a hostname or IP address that is reachable on your local network.
{% endnote %}

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}
{% configuration_basic %}
Add/remove Saved Entities:
  description: Select which Home Assistant entities are "saved" (imported) into the QuickBars TV app, making them available for use in QuickBars
Manage Saved Entities:
  description: Configure your saved (imported) entities (currently, only friendly name configuration is supported).
Manage QuickBars:
  description: Create new QuickBars or edit existing ones. This includes setting the name, entities, position, layout, overlay options, custom colors, and rules for when a QuickBar should automatically close.
{% endconfiguration_basic %}

## Actions

This integration provides services to display content on your TV. You can call these from automations, scripts, or the Developer tools.

### Action: `quickbars.quickbar_toggle` 

Open or close a QuickBar overlay by its alias.

- **Fields**
  - `device_id` *(optional)* — Target a specific QuickBars device. If omitted, broadcasts to all connected QuickBars devices.
  - `alias` *(required)* — The QuickBar alias defined in the TV app.

**Example**

```yaml
# Toggle a QuickBar
action: quickbars.quickbar_toggle
data:
  device_id: 123456789ABCDEF
  alias: living_room
```

### Action: `quickbars.camera_toggle` 

Shows or hides a picture-in-picture camera overlay on the TV. The camera entity must first be imported into the QuickBars app via the options flow and must have an MJPEG stream URL. You can display the camera using its alias (configured in the TV app) or its Home Assistant entity ID. You may also use a direct RTSP URL.

- **Fields**
  - `device_id` *(optional)* - Target a specific QuickBars device. If omitted, broadcasts to all connected QuickBars devices.
  - `camera_alias` *(optional)* - Camera Alias as configured in QuickBars TV app (in the Manage Saved Entities screen). You must use this or `camera_entity`.
  - `camera_entity` *(optional)* - The Home Assistant camera entity ID. You must use this or `camera_alias`.
  - `camera_entity` *(optional)* - An **RTSP** URL (rtsp://…) to play directly via the TV app.
    - If you provide both `camera_entity`/`camera_alias` and `rtsp_url`, the app will prefer RTSP for that request.
    - You may also provide only `rtsp_url` (no entity/alias) for an ad-hoc stream.
    - Use rtsp:// (TLS rtsps:// isn’t supported).
    - Credentials may be included (for example, rtsp://user:pass@host:554/path). If your username/password contains special characters like @ or :, the app will handle encoding automatically.
    - You can create a script that calls this RTSP url PiP display action, import it into the app and use it as a normal trigger (to imitate the standard MJPEG stream functionality).
  - `size` *(optional)* - The size of the overlay. Can be *small*, *medium*, or *large*. If not specified, uses the default size configured for the camera in the TV app. You can use this or `size_px`.
  - `size_px` *(optional)* - A custom size for the overlay, specified as a map with width and height in pixels (*for example*, `{"w": 640, "h": 360}`). Use instead of `size`.
  - `position` *(optional)* - The position of the overlay on the screen. Can be *top_left*, *top_right*, *bottom_left*, or *bottom_right*. If not specified, uses the position configured to the camera entity on the TV app.
  - `show_title` *(optional)* - A boolean (`true`/`false`) to show the camera's name on the stream. If not specified, uses the show_title configured to the camera entity on the TV app.
  - `auto_hide` *(optional)* - The number of seconds before the overlay automatically hides. Set to `0` to disable auto-hide. If not specified, uses the default setting from the TV app.

**Examples**

```yaml
# Display an MJPEG camera PiP on the TV
action: quickbars.camera_toggle
data:
  device_id: 123456789ABCDEF
  camera_entity: camera.driveway_camera
  size: large
  position: bottom_left
```

```yaml
# Display an RTSP stream (no camera entity needed)
action: quickbars.camera_toggle
data:
  device_id: 123456789ABCDEF
  rtsp_url: rtsp://user:pass@192.168.1.200:554/stream1 # Enter your RTSP url, determined by your camera.
  size: large
  position: bottom_left
```

### Action: `quickbars.notify`

Displays a rich notification on the TV, with an optional title, icon, image, sound, and actionable buttons.

- **Fields**
  - `device_id` *(optional)* - Target a specific QuickBars device. If omitted, broadcasts to all connected QuickBars devices.
  - `title` *(optional)* - The title of the notification.
  - `message` *(required)* - The main text content of the notification.
  - `actions` *(optional)* - A list of action buttons to display. Each action is a map with an `id` (a unique string for your automations) and a `label` (the text on the button).
  - `length` *(optional)* - The duration in seconds to show the notification. Default is 6.
  - `color` *(optional)* - The background color of the notification in hex format (*for example*, #8cd0e6).
  - `transparency` *(optional)* - The background transparency, from 0.0 (fully opaque) to 1.0 (fully transparent). Default is 0.
  - `mdi_icon` *(optional)* - An MDI icon to display near the title (*for example*, mdi:bell).
  - `image` *(optional)* - Provide an image via `url`, `path` (relative to `/config/www`), or `media_id`. Choose any of the 3 options, or `image_media`. Examples:
    -   `url: "https://example.com/pic.jpg"`
    -   `path: "folder/file.jpg"`
    -   `media_id: "media-source://media_source/local/folder/file.jpg"`
  - `image_media` *(optional)* - An alternative to image that allows you to select an image directly from Home Assistant's Media Browser.
  - `sound` *(optional)* - Provide a sound via `url`, `path` (relative to `/config/www`), or `media_id`. Choose any of the 3 options, or `sound_media`. Examples:
    -   `url: "https://example.com/file.mp3"`
    -   `path: "chimes/ding.mp3"`
    -   `media_id: "media-source://media_source/local/chimes/ding.mp3"`
  - `sound_media` *(optional)* - An alternative to sound that allows you to select an audio file directly from Home Assistant's Media Browser.
  - `sound_volume_percent` *(optional)* - The sound volume, from 0 to 200. 100 is the TV's system volume. Values above 100 use a software boost that may cause distortion. Default is 100.
  - `interrupt` *(optional)* - A boolean (`true`/`false`). If `true`, this notification will immediately replace any currently visible notification.
  - `position` *(optional, default top_right)* - The position of the notification on the screen. Can be *top_left*, *top_right*, *bottom_left*, or *bottom_right*. Default is *top_right*.

**Example**

```yaml
# Display a notification on the TV
action: quickbars.notify
data:
  device_id: 1234567890abcdef
  title: New Visitor!
  mdi_icon: mdi:alien
  message: "Someone is at the door"
  actions:
    - id: turn_on
      label: Turn On Light
    - id: open_door
      label: Open The Door
  position: bottom_left
  length: 20
  image:
    path: images/doorbell.jpg
  sound:
    path: chimes/dingdong.mp3
  sound_volume_percent: 120     
```

## Events

When a user presses an action button on a TV notification, the QuickBars app sends an event to Home Assistant. You can use this event to trigger automations. The event type is `quickbars.action`, and it contains the `action_i`d you defined in your `quickbars.notify` action call.

{% details "Example: reacting to a notification button press" %}

This automation listens for the `quickbars.action` event. When the event is fired with an `action_id` of `unlock_door`, it calls the `lock.unlock` service for the front door lock.

```yaml
alias: "Handle TV Notification Action - Unlock Door"
triggers:
  - trigger: event
    event_type: quickbars.action  
    event_data:
      action_id: unlock_door
actions:
  - action: lock.unlock
    target:
      entity_id: lock.front_door
```
{% enddetails %}

## Example automation: Doorbell
This automation combines a camera feed and an actionable notification when a doorbell is pressed.

```yaml
alias: "Doorbell Pressed - Show on TV"
triggers:
  - trigger: state
    entity_id: binary_sensor.doorbell
    to: "on"
actions:
  - action: quickbars.camera_toggle     
    data:
      device_id: abcdef123456
      camera_entity: camera.front_door
      position: top_right
      auto_hide: 25
  - action: quickbars.notify
    data:
      device_id: abcdef123456
      title: "Doorbell"
      message: "Someone is at the door"
      mdi_icon: mdi:doorbell
      length: 25
      sound:
        path: chimes/ding.mp3
      sound_volume_percent: 150
      actions:
        - id: open
          label: "Open"
        - id: ignore
          label: "Ignore"
      position: top_left
```

## Data updates

The QuickBars integration uses a combination of communication methods for efficiency and real-time updates:

  - **Initial Setup**: During the initial pairing, the integration sends on-demand requests to the TV app using local HTTP commands to establish the connection.
  - **Ongoing Communication**: After setup, the app establishes a persistent WebSocket connection to Home Assistant (provided the persistent background connection option is enabled in the TV app's settings). This single connection is used for all subsequent interactions, including:
    - Real-time push updates, such as sending notifications or toggling camera feeds using the integration's actions.
    - Interactive configuration via the Options flow.

## Known limitations

  - The QuickBars for Home Assistant app only works on Android TV. Fire TV / Roku TV / Tizen OS / WebOS / Apple TV are *not* supported. This is due to permissions like "Display Over Other Apps" and Acessibility permissions that only Android TV has.
  - The QuickBars TV app must be open in the foreground when using the Options flow from Home Assistant to configure it.
  - Advanced features in the TV app, such as using more than one QuickBar or advanced grid layouts, may require the "QuickBars Plus" in-app purchase.

## Troubleshooting

### TV not reachable during setup
  - #### Symptom: The setup form shows “TV not reachable”.
  - #### Resolution:
    1. Ensure the TV is powered on and the QuickBars app is open and visible on the screen (in the foreground).
    2. Try exiting the app and re-opening it.
    3. Confirm that your TV and Home Assistant are on the same local network and can communicate with each other. Check for any firewall rules or network segmentation (like guest Wi-Fi) that might be blocking traffic.
    4. For discovery to work, ensure Zeroconf/mDNS is enabled and working correctly on your network.
    5. If you are providing a URL and token, double-check that the URL is correct and reachable from the local network, and that the long-lived access token is valid.

### Camera PiP or a notification doesn't appear on the TV after sending them using the actions

  -  #### Symptom: Events are sent using the integration, but don't appear on the TV.

  -  #### Resolution:
     1. In the QuickBars TV app settings, ensure that the "Persistent background connection" option is enabled. This allows Home Assistant to send commands to the app even when it's not in the foreground.
     2. for Cameras - verify the camera has a valid MJPEG stream, and it's imported to the TV app (if using a regular camera entity with MJPEG stream, and not RTSP url). 

## Removing the integration

{% include integrations/remove_device_service.md %}

After removing the integration from Home Assistant, it is recommended to also open the QuickBars app on your TV and clear the Home Assistant integration pairing from the app's settings. This is required if you plan to re-pair the app with Home Assistant in the future.