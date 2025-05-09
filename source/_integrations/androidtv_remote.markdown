---
title: Android TV Remote
description: Instructions on how to integrate Android TV Remote into Home Assistant.
ha_category:
  - Media player
  - Remote
ha_release: 2023.5
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@tronikos'
  - '@Drafteed'
ha_domain: androidtv_remote
ha_zeroconf: true
ha_platforms:
  - diagnostics
  - media_player
  - remote
ha_integration_type: device
---

The **Android TV Remote** {% term integration %} allows you to control an Android TV and launching apps. For this to work, the Android TV device needs to have [Android TV Remote Service](https://play.google.com/store/apps/details?id=com.google.android.tv.remote.service) which is pre-installed on most devices (Fire TV devices are a notable exception).

For a quick introduction on how to get started with Android TV Remote, check out this video:

<lite-youtube videoid="htbnf5YxAuw" videotitle="Android TV Remote Integration with Home Assistant"></lite-youtube>

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}
{% configuration_basic %}
Configure Applications List:
  description: Here you can define applications where the keys are app IDs and the values are app names and icons that will be displayed in the UI.
{% endconfiguration_basic %}

## Media player

This {% term integration %} adds a `media_player` with basic playback and volume controls. The media player provides volume information and display name of current active app on the Android TV. Due to API limitations, the integration will not display the playback status. It is recommended to use this integration together with [Google Cast integration](/integrations/cast/). Two media players can be combined into one using the [Universal Media Player](/integrations/universal/) integration. See [Using with Google Cast](#using-with-google-cast) section for more details.

Using the `media_player.play_media` {% term action %}, you can launch applications, switch channels, and start activities via `Deep Links`. Only `app`, `url` and `channel` media types are supported.

### Launching apps

If the Android TV device has the Google Play Store, you can directly launch any app by its application ID (package name).
The app doesn't need to exist in the Google Play Store.
If it exists, you can find the application ID in the URL of the app's Google Play Store listing.
For example, if the URL of an app page is `play.google.com/store/apps/details?id=com.example.app123`, the application ID is `com.example.app123`.
The application ID is also displayed in the media player card when you launch the application on the device.

Examples of application IDs for popular applications:

| App | App ID |
| --- | --- |
| YouTube | `com.google.android.youtube.tv`
| Netflix | `com.netflix.ninja`
| Prime Video | `com.amazon.amazonvideo.livingroom`
| Disney+ | `com.disney.disneyplus`
| Plex | `com.plexapp.android`
| Kodi | `org.xbmc.kodi`
| Twitch | `tv.twitch.android.app`

Example:

```yaml
# Launch the YouTube app
action: media_player.play_media
data:
  media_content_type: app
  media_content_id: com.google.android.youtube.tv
target:
  entity_id: media_player.living_room_tv
```

### Launching activities

Alternatively, if the device doesn't have the Google Play Store or if you want to open specific activity in the app, you can pass deep links supported by some applications.

Examples of deep links for popular applications:

| App | Deep link |
| --- | --- |
| YouTube | `https://www.youtube.com` or `vnd.youtube://` or `vnd.youtube.launch://`
| Netflix | `https://www.netflix.com/title` or `netflix://`
| Prime Video | `https://app.primevideo.com`
| Disney+ | `https://www.disneyplus.com`
| Plex | `plex://`
| Twitch | `twitch://home` `[home, stream, game, video, clip, search, browse, channel, user]`

Example:

```yaml
# Open a specific YouTube video:
action: media_player.play_media
data:
  media_content_type: url
  media_content_id: https://www.youtube.com/watch?v=dQw4w9WgXcQ
target:
  entity_id: media_player.living_room_tv
```

### Switch channels

You can pass the channel number to switch channels. The channel number must be an integer.

Example:

```yaml
# Change channel to number 15:
action: media_player.play_media
data:
  media_content_type: channel
  media_content_id: 15
target:
  entity_id: media_player.living_room_tv
```

### Using with Google Cast

Android TV Remote {% term integration %} provides information about the power status of the device and gives you the ability to control playback. However, it does not provide information about the currently playing content (media title, duration, play/pause state, etc.). In turn, [Google Cast](/integrations/cast/) integration does not provide reliable information about the power status of the device (e.g. on Android TV Home Screen) and does not allow to control playback in Android apps without [MediaSession](https://developer.android.com/reference/android/media/session/MediaSession) support. However, it can display full information about the content being played in supported apps. For convenience, you can combine two media players into one using [Universal Media Player](/integrations/universal/) integration. Universal Media Player will automatically select the appropriate active media player entity.

{% details "Example YAML configuration" %}

Replace `media_player.living_room_tv_remote` with your Android TV Remote media player entity ID.
Replace `media_player.living_room_tv_cast` with your Google Cast media player entity ID.

```yaml
media_player:
  - platform: universal
    name: living_room_tv
    unique_id: living_room_tv
    device_class: tv
    children:
      - media_player.living_room_tv_remote
      - media_player.living_room_tv_cast
    browse_media_entity: media_player.living_room_tv_cast
    commands:
      turn_off:
        action: media_player.turn_off
        data:
          entity_id: media_player.living_room_tv_remote
      turn_on:
        action: media_player.turn_on
        data:
          entity_id: media_player.living_room_tv_remote
      volume_up:
        action: media_player.volume_up
        data:
          entity_id: media_player.living_room_tv_remote
      volume_down:
        action: media_player.volume_down
        data:
          entity_id: media_player.living_room_tv_remote
```

{% enddetails %}

## Remote

The remote allows you to send key commands to your Android TV device with the `remote.send_command` action.
The entity has the `current_activity` attribute that shows the current foreground app on the Android TV.
You can pass the application ID shown in this `current_activity` as `activity` in the `remote.turn_on` action to launch that app.

{% details "List of the most common commands" %}

Navigation:
- DPAD_UP
- DPAD_DOWN
- DPAD_LEFT
- DPAD_RIGHT
- DPAD_CENTER
- BUTTON_A
- BUTTON_B
- BUTTON_X
- BUTTON_Y
- BACK

Volume Control:
- VOLUME_DOWN
- VOLUME_UP
- VOLUME_MUTE
- MUTE

Media Control:
- MEDIA_PLAY_PAUSE
- MEDIA_PLAY
- MEDIA_PAUSE
- MEDIA_NEXT
- MEDIA_PREVIOUS
- MEDIA_STOP
- MEDIA_RECORD
- MEDIA_REWIND
- MEDIA_FAST_FORWARD

TV Control:
- 0
- 1
- 2
- 3
- 4
- 5
- 6
- 7
- 8
- 9
- DEL
- ENTER
- CHANNEL_UP
- CHANNEL_DOWN
- F1
- F2
- F3
- F4
- F5
- F6
- F7
- F8
- F9
- F10
- F11
- F12
- TV
- PROG_RED
- PROG_GREEN
- PROG_YELLOW
- PROG_BLUE

Other:
- BUTTON_MODE
- EXPLORER
- MENU
- HOME
- INFO
- GUIDE
- TV_TELETEXT
- CAPTIONS
- DVR
- MEDIA_AUDIO_TRACK
- SETTINGS
- SEARCH
- ASSIST
- POWER

{% enddetails %}

If `activity` is specified in `remote.turn_on` it will open the specified URL or the application with the given package name. See [Launching apps section](#launching-apps).

Example actions:

```yaml
# Open the currently selected item on the Android TV
action: remote.send_command
data:
  command: DPAD_CENTER
target:
  entity_id: remote.living_room_tv
```

```yaml
# Long press on the currently selected item on the Android TV
action: remote.send_command
data:
  command: DPAD_CENTER
  hold_secs: 0.5
target:
  entity_id: remote.living_room_tv
```

```yaml
# Launch YouTube
action: remote.turn_on
data:
  activity: https://www.youtube.com
target:
  entity_id: remote.living_room_tv
```

```yaml
# Open a specific YouTube video:
action: remote.turn_on
data:
  activity: https://www.youtube.com/watch?v=dQw4w9WgXcQ
target:
  entity_id: remote.living_room_tv
```

### Dashboard example

You have to manually create buttons in Lovelace to send commands to the Android TV device or launch apps on it.

Below is an example for you to start with. Many of the buttons support long press.

![Screenshot Android TV Remote example](/images/integrations/androidtv_remote/lovelace_example.png)

{% details "YAML Lovelace example" %}

Add a Manual card with the following code. 
Replace all instances of `living_room_tv` with your entity ID.
 - To use the `replace all` functionality, inside the code editor, press `ctrl+F` (or `command+F` on Mac).

```yaml
type: vertical-stack
cards:
  - type: entities
    entities:
      - entity: remote.living_room_tv
  - square: true
    columns: 3
    type: grid
    cards:
      - type: button
        show_icon: false
        tap_action:
          action: none
        hold_action:
          action: none
      - type: button
        icon: mdi:arrow-up-bold
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: DPAD_UP
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        show_icon: false
        tap_action:
          action: none
        hold_action:
          action: none
      - type: button
        icon: mdi:arrow-left-bold
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: DPAD_LEFT
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:circle
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: DPAD_CENTER
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: DPAD_CENTER
            hold_secs: 0.5
          target:
            entity_id: remote.living_room_tv
      - type: button
        icon: mdi:arrow-right-bold
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: DPAD_RIGHT
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:arrow-left
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: BACK
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: BACK
            hold_secs: 0.5
          target:
            entity_id: remote.living_room_tv
      - type: button
        icon: mdi:arrow-down-bold
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: DPAD_DOWN
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:home-outline
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: HOME
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: HOME
            hold_secs: 0.5
          target:
            entity_id: remote.living_room_tv
  - square: false
    columns: 3
    type: grid
    cards:
      - type: button
        icon: mdi:skip-previous
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: MEDIA_PREVIOUS
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: MEDIA_REWIND
          target:
            entity_id: remote.living_room_tv
      - type: button
        icon: mdi:play-pause
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: MEDIA_PLAY_PAUSE
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: MEDIA_STOP
          target:
            entity_id: remote.living_room_tv
      - type: button
        icon: mdi:skip-next
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: MEDIA_NEXT
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: MEDIA_FAST_FORWARD
          target:
            entity_id: remote.living_room_tv
      - type: button
        icon: mdi:volume-off
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: MUTE
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:volume-medium
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: VOLUME_DOWN
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:volume-high
        tap_action:
          action: perform-action
          perform_action: remote.send_command
          data:
            command: VOLUME_UP
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
  - square: false
    columns: 4
    type: grid
    cards:
      - type: button
        icon: mdi:youtube
        tap_action:
          action: perform-action
          perform_action: remote.turn_on
          data:
            activity: https://www.youtube.com
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: button
        icon: mdi:netflix
        tap_action:
          action: perform-action
          perform_action: remote.turn_on
          data:
            activity: com.netflix.ninja
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: picture
        image: >-
          https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/450px-Amazon_Prime_Video_logo.svg.png
        tap_action:
          action: perform-action
          perform_action: remote.turn_on
          data:
            activity: com.amazon.amazonvideo.livingroom
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
      - type: picture
        image: >-
          https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/440px-Disney%2B_logo.svg.png
        tap_action:
          action: perform-action
          perform_action: remote.turn_on
          data:
            activity: com.disney.disneyplus
          target:
            entity_id: remote.living_room_tv
        hold_action:
          action: none
  - type: entity
    entity: remote.living_room_tv
    attribute: current_activity
  - type: media-control
    entity: media_player.living_room_tv
```

{% enddetails %}


## Limitations and known issues

- The integration doesn't work with Fire TV devices because they are missing the [Android TV Remote Service](https://play.google.com/store/apps/details?id=com.google.android.tv.remote.service). Attempts to sideload it haven't been successful.
- If you cannot use the Google TV mobile app or the Google Home mobile app to send commands to the device, you cannot send commands with this integration either.
- Commands don't work on Netflix. They don't work from the Google TV mobile app or the Google Home mobile app either.
- Some devices, like Xiaomi, become unavailable after they are turned off and can't be turned on with this integration.
- Some devices, like TCL, become unavailable after they are turned off, unless you activate the **Screenless service**. To activate it, go to **Settings** > **System** > **Power and energy** > **Screenless service**, and activate it.
- Some devices experience disconnects every 15 seconds. This is typically resolved by rebooting the Android TV device after the initial setup of the integration.
- If you are not able to connect to the Android TV device, or are asked to pair it again and again, try force-stopping the Android TV Remote Service and clearing its storage. On the Android TV device, go to **Settings** > **Apps** > **Show system apps**. Then, select **Android TV Remote Service** > **Storage** > **Clear storage**. You will have to pair again.
- Some onscreen keyboards enabled by TV manufacturers do not support concurrent virtual and onscreen keyboard use. This presents whenever a text field is selected, such as "search" where a constant **use the keyboard on your mobile device** will show, preventing you from opening the onscreen keyboard to type. This can be overcome by either disabling your 3rd party keyboard and using the default Gboard keyboard or by deselecting **Enable IME** in the **Configure** page of the integration.
- If you can't turn on your Nvidia Shield device, go to **Settings** > **Remotes & accessories** > **Simplified wake buttons** and disable the following options: **SHIELD 2019 Remote: Wake on power and Netflix buttons only** and **Controllers: Wake on NVIDIA or logo buttons only**.
