---
title: Android TV
description: Instructions on how to integrate Android TV and Fire TV devices into Home Assistant.
ha_category:
  - Media player
  - Remote
ha_release: 0.7.6
ha_config_flow: true
ha_iot_class: Local Push
ha_codeowners:
  - '@JeffLIrion'
  - '@ollo69'
  - '@tronikos'
  - '@Drafteed'
ha_domain: androidtv
ha_zeroconf: true
ha_platforms:
  - button
  - diagnostics
  - media_player
  - remote
ha_integration_type: device
ha_quality_scale: platinum
---

The **Android TV** {% term integration %} allows you to control Android TV devices and [Amazon Fire TV](https://www.amazon.com/b/?node=8521791011) devices.

This integration supports two connection methods:

- **Remote Protocol** (recommended): Uses the Android TV Remote protocol for real-time push-based updates. Best for most Android TV devices. Requires [Android TV Remote Service](https://play.google.com/store/apps/details?id=com.google.android.tv.remote.service) which is pre-installed on most devices (Fire TV devices are a notable exception).
- **ADB (Android Debug Bridge)**: Uses ADB commands for polling-based control. Required for Fire TV devices and provides additional features like Find Remote and Reboot buttons. Requires ADB debugging to be enabled on the device.

{% include integrations/config_flow.md %}

## Connection methods

### Remote Protocol (recommended)

The Remote Protocol connection is recommended for most Android TV devices. It provides:
- Real-time push-based updates for power state, volume, and current app
- Simple setup with PIN pairing
- No need to enable developer options

For a quick introduction on how to get started with the Remote Protocol, check out this video:

<lite-youtube videoid="htbnf5YxAuw" videotitle="Android TV Remote Integration with Home Assistant"></lite-youtube>

{% note %}
The Remote Protocol does not work with Fire TV devices because they are missing the [Android TV Remote Service](https://play.google.com/store/apps/details?id=com.google.android.tv.remote.service).
{% endnote %}

### ADB (Android Debug Bridge)

The ADB connection is required for Fire TV devices and provides additional features:
- Find Remote button (for devices that support it, like NVIDIA Shield)
- Reboot button
- File upload/download capabilities
- Custom ADB shell commands

{% important %}
When setting up an ADB connection, it is recommended that you do NOT use an ADB server and instead use the built-in Python ADB implementation. This simplifies the setup and makes it easier to troubleshoot issues. If there are stability issues with this approach, then you may wish to try using an ADB server. See the [ADB Setup](#adb-setup) section for more information.
{% endimportant %}

#### Device preparation for ADB

To set up your device for ADB, you will need to find its IP address and enable ADB debugging. For Android devices, please consult the documentation for your device.

For Fire TV devices, the instructions are as follows:

- Turn on ADB Debugging on your Amazon Fire TV:
  - From the main (Launcher) screen, select Settings.
  - Select My Fire TV > Developer Options.
  - Select ADB Debugging.
- Find Amazon Fire TV device IP address:
  - From the main (Launcher) screen, select Settings.
  - Select My Fire TV > About > Network.

If Developer Options is missing from Settings, then select My Fire TV and press the button seven times on About. Note that on some Fire TV devices, such as the Insignia F30 series, it is not possible to enable Developer Options until you have signed in to an Amazon account on the device.

{% include integrations/option_flow.md %}
{% configuration_basic %}
Configure Applications List:
  description: Here you can define applications that are not automatically detected by the backend library, where the keys are app IDs and the values are app names that will be displayed in the UI. If a name is not provided and the option `Exclude apps with unknown name` is enabled, the app will never be shown in the sources list.
Enable IME:
  description: Enable this option to be able to get the current app name and send text as keyboard input. Disable it for devices that show 'Use keyboard on mobile device screen' instead of the on-screen keyboard. (Remote Protocol only)
Retrieve the running apps as the list of sources:
  description: "Whether or not to retrieve the running apps as the list of sources. If this option is checked, the running apps will be retrieved and used as the sources. If not, there will be only one source: the current app. (ADB only)"
Exclude apps with unknown name:
  description: "Exclude app with unknown name from the source list. If this option is checked, then only apps configured in `Configured Application List` option will be listed among the sources. (ADB only)"
Use screen capture for album art:
  description: "Determines if album art should be pulled from what is shown on screen. (ADB only)"
ADB shell turn off command:
  description: "ADB shell command to override default turn off command. Leave empty to use default. (ADB only)"
ADB shell turn on command:
  description: "ADB shell command to override default turn on command. Leave empty to use default. (ADB only)"
Configure State Detection Rules:
  description: Here you can configure a list of rules where the rule key is the app IDs and whose values are lists of state detection rules. As example a valid value for a detection rule is `["standby", {"playing":{"media_session_state":4}}, {"paused":{"media_session_state":3, "wake_lock_size":4}}]`. Note that rule values must be always inside square bracket (`[...]`). See the section [Custom State Detection](#custom-state-detection) for more info. (ADB only)
{% endconfiguration_basic %}

## ADB setup

This section applies only to ADB connections. ADB works by sending ADB commands to your Android / Fire TV device. There are two ways to accomplish this.

{% important %}
When connecting to your device for the first time via ADB, a dialog will appear on your Android / Fire TV asking you to approve the connection. Check the box that says "always allow connections from this device" and hit OK.
{% endimportant %}

### 1. Python ADB Implementation

The default approach is to connect to your device using the `adb-shell` Python package. As of Home Assistant 0.101, if a key is needed for authentication and it is not provided by the `ADB Key` setup option, then Home Assistant will generate a key for you.

{% important %}
To be able to provide `ADB Key` on integration setup, you need to enable [advanced mode](/blog/2019/07/17/release-96/#advanced-mode).
{% endimportant %}

Prior to Home Assistant 0.101, this approach did not work well for newer devices. Efforts have been made to resolve these issues, but if you experience problems then you should use the ADB server option.

### 2. ADB Server

The second option is to use an ADB server to connect to your Android and Fire TV devices.

{% important %}
To configure ADB server on integration setup, you need to enable [advanced mode](/blog/2019/07/17/release-96/#advanced-mode).
{% endimportant %}

Using this approach, Home Assistant will send the ADB commands to the server, which will then send them to the Android / Fire TV device and report back to Home Assistant. To use this option, add the `adb_server_ip` option to your configuration. If you are running the server on the same machine as Home Assistant, you can use `127.0.0.1` for this value.

## ADB troubleshooting

If the setup for your Android or Fire TV device fails with ADB, then there is probably an issue with your ADB connection. Here are some possible causes.

1. You have the wrong IP address for the device.

2. ADB is not enabled on your device.

3. You are already connected to the Android / Fire TV via ADB from another device. Only one device can be connected, so disconnect the other device, restart the Android / Fire TV (for good measure), and then restart Home Assistant.

4. You need to approve the ADB connection; see the note in the [ADB Setup](#adb-setup) section above.

5. Some Android devices (e.g., Philips TVs running Android TV) only accept the initial ADB connection request over their Wi-Fi interface. If you have the TV wired, you need to connect it to Wi-Fi and try the initial connection again. Once the authentication has been granted via Wi-Fi, you can connect to the TV over the wired interface as well.

6. If your device drops off WiFi, breaking the ADB connection and causing the {% term entity %} to become unavailable in Home Assistant, you could install a wake lock utility (such as [Wakelock](https://github.com/d4rken/wakelock-revamp)) to prevent this from happening. Some users have reported this problem with Xiaomi Mi Box devices.

7. If you are using the [Python ADB implementation](#1-python-adb-implementation) approach, as mentioned above, there may be some issues with newer devices. In this case, you should use the [ADB server](#2-adb-server) approach instead.

## Device Unavailable

Some devices, such as the Insignia F30 series, disappear from the network when they are turned off. This can be seen as the device becoming unavailable in Home Assistant (logs show TCP timeout errors), disappearing from the network, and not responding to ping. Often, this is for approximately 50 minutes out of each hour when turned off. This can be fixed by opening the Settings app on the device and using "Display & Sounds" -> "Power Controls" -> "Voice Commands When TV Screen is Off". Change this value to "On" and accept the warning about increased power consumption. This will cause the device to always remain listening on the network so that it can be turned on via Home Assistant. Note that after being unplugged or losing power, the device will need to be manually turned on once before this setting takes effect again.

## Media player

This {% term integration %} adds a `media_player` with playback and volume controls. The media player provides volume information and display name of current active app on the Android TV.

{% note %}
Due to API limitations, the Remote Protocol connection will not display the playback status. It is recommended to use this integration together with [Google Cast integration](/integrations/cast/). Two media players can be combined into one using the [Universal Media Player](/integrations/universal/) integration. See [Using with Google Cast](#using-with-google-cast) section for more details.
{% endnote %}

### Launching apps

Using the `media_player.play_media` or `media_player.select_source` {% term action %}, you can launch applications on your device.

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

Example using `media_player.play_media`:

```yaml
# Launch the YouTube app
action: media_player.play_media
data:
  media_content_type: app
  media_content_id: com.google.android.youtube.tv
target:
  entity_id: media_player.living_room_tv
```

Example using `media_player.select_source`:

```yaml
# Launch Netflix
action: media_player.select_source
target:
  entity_id: media_player.fire_tv_living_room
data:
  source: "com.netflix.ninja"
```

You can also stop an app by prefixing the app ID with a `!` when using `select_source`:

```yaml
# Stop Netflix
action: media_player.select_source
target:
  entity_id: media_player.fire_tv_living_room
data:
  source: "!com.netflix.ninja"
```

### Launching activities (Remote Protocol)

If the device doesn't have the Google Play Store or if you want to open specific activity in the app, you can pass deep links supported by some applications.

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

### Switch channels (Remote Protocol)

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

The Remote Protocol connection provides information about the power status of the device and gives you the ability to control playback. However, it does not provide information about the currently playing content (media title, duration, play/pause state, etc.). In turn, [Google Cast](/integrations/cast/) integration does not provide reliable information about the power status of the device (e.g. on Android TV Home Screen) and does not allow to control playback in Android apps without [MediaSession](https://developer.android.com/reference/android/media/session/MediaSession) support. However, it can display full information about the content being played in supported apps. For convenience, you can combine two media players into one using [Universal Media Player](/integrations/universal/) integration. Universal Media Player will automatically select the appropriate active media player entity.

{% details "Example YAML configuration" %}

Replace `media_player.living_room_tv_remote` with your Android TV media player entity ID.
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

## Actions (ADB only)

The following actions are only available for ADB connections.

### `androidtv.adb_command`

The `androidtv.adb_command` action allows you to send either keys or ADB shell commands to your Android / Fire TV device. If there is any output, it will be stored in the `'adb_response'` attribute (i.e., `state_attr('media_player.android_tv_living_room', 'adb_response')` in a template) and logged at the INFO level.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Name(s) of Android / Fire TV entities.
| `command`              |       no | Either a key command or an ADB shell command.

In an [action](/getting-started/automation-action/) of your [automation setup](/getting-started/automation/) it could look like this:

```yaml
actions:
  - action: androidtv.adb_command
    target:
      entity_id: media_player.androidtv_tv_living_room
    data:
      command: "HOME"
```

Available key commands include:

- `POWER`
- `SLEEP`
- `HOME`
- `UP`
- `DOWN`
- `LEFT`
- `RIGHT`
- `CENTER`
- `BACK`
- `MENU`

The full list of key commands can be found in the backend [androidtv](https://github.com/JeffLIrion/python-androidtv) package.

You can also use the command `GET_PROPERTIES` to retrieve the properties used by Home Assistant to update the device's state.  These will be stored in the media player's `'adb_response'` attribute and logged at the INFO level. This information can be used to help improve state detection in the backend [androidtv](https://github.com/JeffLIrion/python-androidtv) package, and also to define your own [custom state detection](#custom-state-detection) rules.

A list of various intents can be found [here](https://gist.github.com/mcfrojd/9e6875e1db5c089b1e3ddeb7dba0f304).

### `androidtv.learn_sendevent` (for faster ADB commands)

When sending commands like UP, DOWN, HOME, etc. via ADB, the device can be slow to respond. The problem isn't ADB, but rather the Android command `input` that is used to perform those actions. A faster way to send these commands is using the Android `sendevent` command. The challenge is that these commands are device-specific. To assist users in learning commands for their device, the Android debug bridge integration provides the `androidtv.learn_sendevent` action. Its usage is as follows:

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Name(s) of Android / Fire TV entities.

1. Perform the `androidtv.learn_sendevent` action.
2. Within 8 seconds, hit a single button on your Android / Fire TV remote.
3. After 8 seconds, a persistent notification will appear that contains the equivalent command that can be sent via the `androidtv.adb_command` action. This command can also be found in the `adb_response` attribute of the media player in Home Assistant, and it will be logged at the INFO level.

### `androidtv.download` and `androidtv.upload`

You can use the `androidtv.download` action to download a file from your Android / Fire TV device to your Home Assistant instance.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Name of Android / Fire TV entity.
| `device_path`          |       no | The filepath on the Android / Fire TV device.
| `local_path`           |       no | The filepath on your Home Assistant instance.

Similarly, you can use the `androidtv.upload` action to upload a file from Home Assistant instance to Android / Fire TV devices.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Name(s) of Android / Fire TV entities.
| `device_path`          |       no | The filepath on the Android / Fire TV device.
| `local_path`           |       no | The filepath on your Home Assistant instance.

## Custom state detection (ADB only)

The ADB connection works by polling the Android / Fire TV device at a regular interval and collecting a handful of properties. Unfortunately, there is no standard API for determining the state of the device to which all apps adhere. Instead, the backend `androidtv` package uses three of the properties that it collects to determine the state: `audio_state`, `media_session_state`, and `wake_lock_size`. The correct logic for determining the state differs depending on the current app, and the backend `androidtv` package implements app-specific state detection logic for a handful of apps. Of course, it is not feasible to implement custom logic for each and every app in the `androidtv` package. Moreover, the correct state detection logic may differ across devices and device configurations.

The solution to this problem is the `state_detection_rules` configuration parameter, which allows you to provide your own rules for state detection.  The keys are app IDs, and the values are lists of rules that are evaluated in order.  Valid rules are:

- `'standby'`, `'playing'`, `'paused'`, `'idle'`, or `'off'`
  - If this is not a map, then this state will always be reported when this app is the current app
  - If this is a map, then its entries are conditions that will be checked.  If all of the conditions are true, then this state will be reported.  Valid conditions pertain to 3 properties (see the example configuration above):
    1. ``'media_session_state'``
    2. ``'audio_state'``
    3. ``'wake_lock_size'``
- `'media_session_state'` = try to use the `media_session_state` property to determine the state
- `'audio_state'` = try to use the `audio_state` property to determine the state

To determine what these rules should be, you can use the `androidtv.adb_command` action with the command `GET_PROPERTIES`, as described in the [androidtv.adb_command](#androidtvadb_command) section.

## Remote

The integration supports the `remote` platform. The remote allows you to send commands to your device with the `remote.send_command` action.

### Remote Protocol commands

For Remote Protocol connections, you can send key commands and text as input to your Android TV device.
The entity has the `current_activity` attribute that shows the current foreground app on the Android TV.
You can pass the application ID shown in this `current_activity` as `activity` in the `remote.turn_on` action to launch that app.

{% details "List of the most common commands (Remote Protocol)" %}

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
- 0 through 9
- DEL
- ENTER
- CHANNEL_UP
- CHANNEL_DOWN
- F1 through F12
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

To send text as keyboard input use the `remote.send_command` and prefix the text to send with `text:`, e.g. `command: text:hello world` to type "hello world" in the selected input field.

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

### ADB remote commands

For ADB connections, you can send either keys or ADB shell commands to your Android / Fire TV device. The supported keys vary between Android models and version.

{% details "Full keycodes list (ADB)" %}

**Power Keys:**
- POWER - Power toggle
- SLEEP - Sleep mode
- RESUME - Resume
- SUSPEND - Suspend mode
- WAKEUP - Wake up

**Input Keys:**
- COMPONENT1, COMPONENT2 - Component inputs
- COMPOSITE1, COMPOSITE2 - Composite inputs
- HDMI1, HDMI2, HDMI3, HDMI4 - HDMI ports
- INPUT - Change input
- SAT - Satellite
- VGA - VGA

**Volume Keys:**
- VOLUME_DOWN - Volume down
- VOLUME_UP - Volume up
- MUTE - Volume mute

**Color Keys:**
- BLUE, GREEN, YELLOW, RED

**Other Keys:**
- BACK, CENTER, DOWN, END, ENTER, ESCAPE
- FAST_FORWARD, HOME, LEFT, MENU
- MOVE_HOME, PAIRING, REWIND, RIGHT
- SEARCH, SETTINGS, TEXT, TOP, UP

{% enddetails %}

You can also send other Android keys using the syntax `input keyevent {key}`, replacing `{key}` with the Android numeric key event. Refer to [Android TV KeyEvent](https://developer.android.com/reference/android/view/KeyEvent) for details.

## Button entities (ADB only)

ADB connections provide additional button entities:

- **Find Remote**: Triggers the Find My Remote feature on supported devices (like NVIDIA Shield or Google TV Streamer).
- **Reboot**: Reboots the Android TV device.

## Limitations and known issues

### Remote Protocol limitations

- The integration doesn't work with Fire TV devices because they are missing the [Android TV Remote Service](https://play.google.com/store/apps/details?id=com.google.android.tv.remote.service). Attempts to sideload it haven't been successful.
- If you cannot use the Google TV mobile app or the Google Home mobile app to send commands to the device, you cannot send commands with this integration either.
- Commands don't work on Netflix. They don't work from the Google TV mobile app or the Google Home mobile app either.
- Some devices, like Xiaomi, become unavailable after they are turned off and can't be turned on with this integration.
- Some devices, like TCL, become unavailable after they are turned off, unless you activate the **Screenless service**. To activate it, go to **Settings** > **System** > **Power and energy** > **Screenless service**, and activate it.
- Some devices experience disconnects every 15 seconds. This is typically resolved by rebooting the Android TV device after the initial setup of the integration.
- If you are not able to connect to the Android TV device, or are asked to pair it again and again, try force-stopping the Android TV Remote Service and clearing its storage. On the Android TV device, go to **Settings** > **Apps** > **Show system apps**. Then, select **Android TV Remote Service** > **Storage** > **Clear storage**. You will have to pair again.
- Some onscreen keyboards enabled by TV manufacturers do not support concurrent virtual and onscreen keyboard use. This presents whenever a text field is selected, such as "search" where a constant **use the keyboard on your mobile device** will show, preventing you from opening the onscreen keyboard to type. This can be overcome by either disabling your 3rd party keyboard and using the default Gboard keyboard or by deselecting **Enable IME** in the **Configure** page of the integration.
- If you can't turn on your Nvidia Shield device, go to **Settings** > **Remotes & accessories** > **Simplified wake buttons** and disable the following options: **SHIELD 2019 Remote: Wake on power and Netflix buttons only** and **Controllers: Wake on NVIDIA or logo buttons only**.

## Data updates

Android TV devices using the Remote Protocol push data directly to Home Assistant, enabling immediate updates for device state changes such as power state, volume, and current active app. But the media player entity has assumed playback state since the Android TV Remote API doesn't provide playback status.

ADB connections use polling to update device state at regular intervals.

## Removing the integration

{% include integrations/remove_device_service.md %}
