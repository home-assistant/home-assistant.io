---
title: Android TV
description: Instructions on how to integrate Android TV and Fire TV devices into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.7.6
ha_iot_class: Local Polling
ha_codeowners:
  - '@JeffLIrion'
ha_domain: androidtv
---

The `androidtv` platform allows you to control an Android TV device or [Amazon Fire TV](https://www.amazon.com/b/?node=8521791011) device.

<div class='note'>

When setting up this integration, it is recommended that you do NOT use an ADB server and instead use the built-in Python ADB implementation. This simplifies the setup and makes it easier to troubleshoot issues. If there are stability issues with this approach, then you may wish to try using an ADB server. See the [ADB Setup](#adb-setup) section for more information.

</div>

## Device preparation

To set up your device, you will need to find its IP address and enable ADB debugging. For Android TV devices, please consult the documentation for your device.

For Fire TV devices, the instructions are as follows:

- Turn on ADB Debugging on your Amazon Fire TV:
  - From the main (Launcher) screen, select Settings.
  - Select My Fire TV > Developer Options.
  - Select ADB Debugging.
- Find Amazon Fire TV device IP address:
  - From the main (Launcher) screen, select Settings.
  - Select My Fire TV > About > Network.

## Configuration

```yaml
# Example configuration.yaml entry
media_player:
  # Use the Python ADB implementation
  - platform: androidtv
    name: Android TV 1
    host: 192.168.0.111
```

{% configuration %}
host:
  description: The IP address for your Android TV / Fire TV device.
  required: true
  type: string
name:
  description: The friendly name of the device.
  required: false
  default: Android TV
  type: string
port:
  description: The port for your Android TV / Fire TV device.
  required: false
  default: 5555
  type: integer
adbkey:
  description: The path to your `adbkey` file; if not provided, Home Assistant will generate a key for you (if necessary).
  required: false
  type: string
adb_server_ip:
  description: The IP address of the ADB server. If this is provided, the integration will utilize an [ADB server](#2-adb-server) to communicate with the device.
  required: false
  type: string
adb_server_port:
  description: The port for the ADB server.
  required: false
  default: 5037
  type: integer
get_sources:
  description: Whether or not to retrieve the running apps as the list of sources.
  required: false
  default: true
  type: boolean
apps:
  description: A dictionary where the keys are app IDs and the values are app names that will be displayed in the UI; see example below. If a name is not provided, the app will never be shown in the sources list. ([These app names](https://github.com/JeffLIrion/python-androidtv/blob/748d6b71cad611c624ef7526d9928431167531a3/androidtv/constants.py#L290-L308) are configured in the backend package and do not need to be included in your configuration.)
  required: false
  default: {}
  type: map
exclude_unnamed_apps:
  description: If this is true, then only the apps you specify in the `apps` configuration parameter and [those specified in the backend library](https://github.com/JeffLIrion/python-androidtv/blob/5c39196ade3f88ab453b205fd15b32472d3e0482/androidtv/constants.py#L267-L283) will be shown in the sources list.
  required: false
  default: false
  type: boolean
device_class:
  description: "The type of device: `auto` (detect whether it is an Android TV or Fire TV device), `androidtv`, or `firetv`."
  required: false
  default: auto
  type: string
state_detection_rules:
  description: A dictionary whose keys are app IDs and whose values are lists of state detection rules; see the section [Custom State Detection](#custom-state-detection) for more info.
  required: false
  default: {}
  type: map
turn_on_command:
  description: An ADB shell command that will override the default `turn_on` command.
  required: false
  type: string
turn_off_command:
  description: An ADB shell command that will override the default `turn_off` command.
  required: false
  type: string
screencap:
  description: Determines if album art should be pulled from what is shown onscreen.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

### Full Configuration

```yaml
# Example configuration.yaml entry
media_player:
  # Use the Python ADB implementation with a user-provided key to setup an
  # Android TV device. Provide some app names and don't display other apps
  # in the sources menu. Override the default turn on/off commands, and
  # provide custom state detection rules.
  - platform: androidtv
    name: Android TV
    device_class: androidtv
    host: 192.168.0.222
    adbkey: "/config/android/adbkey"
    exclude_unnamed_apps: true
    apps:
      com.amazon.tv.launcher: "Fire TV"
      some.background.app:  # this will never show up in the sources list
      another.background.app: ""  # this will also never show up in the sources list
    turn_on_command: "input keyevent 3"
    turn_off_command: "input keyevent 223"
    state_detection_rules:
      'com.amazon.tv.launcher':
        - 'standby'
      'com.netflix.ninja':
        - 'media_session_state'
      'com.ellation.vrv':
        - 'audio_state'
      'com.plexapp.android':
        - 'paused':
            'media_session_state': 3  # this indentation is important!
            'wake_lock_size': 1       # this indentation is important!
        - 'playing':
            'media_session_state': 3  # this indentation is important!
        - 'standby'
      'com.amazon.avod':
        - 'playing':
            'wake_lock_size': 4  # this indentation is important!
        - 'playing':
            'wake_lock_size': 3  # this indentation is important!
        - 'paused':
            'wake_lock_size': 2  # this indentation is important!
        - 'paused':
            'wake_lock_size': 1  # this indentation is important!
        - 'standby'

  # Use an ADB server to setup a Fire TV device and don't get the running apps.
  - platform: androidtv
    name: Fire TV
    device_class: firetv
    host: 192.168.0.222
    adb_server_ip: 127.0.0.1
    adb_server_port: 5037
    get_sources: false
```

## ADB Setup

This integration works by sending ADB commands to your Android TV / Fire TV device. There are two ways to accomplish this.

<div class='note'>
When connecting to your device for the first time, a dialog will appear on your Android TV / Fire TV asking you to approve the connection. Check the box that says "always allow connections from this device" and hit OK.
</div>

### 1. Python ADB Implementation

The default approach is to connect to your device using the `adb-shell` Python package. As of Home Assistant 0.101, if a key is needed for authentication and it is not provided by the `adbkey` configuration option, then Home Assistant will generate a key for you.

Prior to Home Assistant 0.101, this approach did not work well for newer devices. Efforts have been made to resolve these issues, but if you experience problems then you should use the ADB server option.

### 2. ADB Server

The second option is to use an ADB server to connect to your Android TV and Fire TV devices.

For Home Assistant users, you can install the [Android Debug Bridge](https://github.com/hassio-addons/addon-adb/blob/master/README.md) add-on. Using this approach, Home Assistant will send the ADB commands to the server, which will then send them to the Android TV / Fire TV device and report back to Home Assistant. To use this option, add the `adb_server_ip` option to your configuration. If you are running the server on the same machine as Home Assistant, you can use `127.0.0.1` for this value.

## ADB Troubleshooting

If the setup for your Android TV or Fire TV device fails, then there is probably an issue with your ADB connection. Here are some possible causes.

1. You have the wrong IP address for the device.

2. ADB is not enabled on your device.

3. You are already connected to the Android TV / Fire TV via ADB from another device. Only one device can be connected, so disconnect the other device, restart the Android TV / Fire TV (for good measure), and then restart Home Assistant.

4. You need to approve the ADB connection; see the note in the [ADB Setup](#adb-setup) section above.

5. Some Android TV devices (e.g., Philips TVs running Android TV) only accept the initial ADB connection request over their Wi-Fi interface. If you have the TV wired, you need to connect it to Wi-Fi and try the initial connection again. Once the authentication has been granted via Wi-Fi, you can connect to the TV over the wired interface as well.

6. If your device drops off WiFi, breaking the ADB connection and causing the entity to become unavailable in Home Assistant, you could install a wake lock utility (such as [Wakelock](https://github.com/d4rken/wakelock-revamp)) to prevent this from happening. Some users have reported this problem with Xiaomi Mi Box devices.

7. If you are using the [Python ADB implementation](#1-python-adb-implementation) approach, as mentioned above, there may be some issues with newer devices. In this case, you should use the [ADB server](#2-adb-server) approach instead.

## Services

### `media_player.select_source`

You can launch an app on your device using the `media_player.select_source` command. Simply provide the app ID as the `source`.  You can also stop an app by prefixing the app ID with a `!`. For example, you could define [scripts](/docs/scripts) to start and stop Netflix as follows:

```yaml
start_netflix:
  sequence:
  - service: media_player.select_source
    target:
      entity_id: media_player.fire_tv_living_room
    data:
      source: "com.netflix.ninja"

stop_netflix:
  sequence:
  - service: media_player.select_source
    target:
      entity_id: media_player.fire_tv_living_room
    data:
      source: "!com.netflix.ninja"
```

### `androidtv.adb_command`

The service `androidtv.adb_command` allows you to send either keys or ADB shell commands to your Android TV / Fire TV device. If there is any output, it will be stored in the `'adb_response'` attribute (i.e., `state_attr('media_player.android_tv_living_room', 'adb_response')` in a template) and logged at the INFO level.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Name(s) of Android TV / Fire TV entities.
| `command`              |       no | Either a key command or an ADB shell command.

In an [action](/getting-started/automation-action/) of your [automation setup](/getting-started/automation/) it could look like this:

```yaml
action:
  service: androidtv.adb_command
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

The full list of key commands can be found [here](https://github.com/JeffLIrion/python-androidtv/blob/748d6b71cad611c624ef7526d9928431167531a3/androidtv/constants.py#L189-L233).

You can also use the command `GET_PROPERTIES` to retrieve the properties used by Home Assistant to update the device's state.  These will be stored in the media player's `'adb_response'` attribute and logged at the INFO level. This information can be used to help improve state detection in the backend [androidtv](https://github.com/JeffLIrion/python-androidtv) package, and also to define your own [custom state detection](#custom-state-detection) rules.

A list of various intents can be found [here](https://gist.github.com/mcfrojd/9e6875e1db5c089b1e3ddeb7dba0f304).

### `androidtv.learn_sendevent` (for faster ADB commands)

When sending commands like UP, DOWN, HOME, etc. via ADB, the device can be slow to respond. The problem isn't ADB, but rather the Android command `input` that is used to perform those actions. A faster way to send these commands is using the Android `sendevent` command. The challenge is that these commands are device-specific. To assist users in learning commands for their device, the Android TV integration provides the `androidtv.learn_sendevent` service. Its usage is as follows:

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Name(s) of Android TV / Fire TV entities.

1. Call the `androidtv.learn_sendevent` service. 
2. Within 8 seconds, hit a single button on your Android TV / Fire TV remote. 
3. After 8 seconds, a persistent notification will appear that contains the equivalent command that can be sent via the `androidtv.adb_command` service. This command can also be found in the `adb_response` attribute of the media player in Home Assistant, and it will be logged at the INFO level.

As an example, a service call in a [script](/docs/scripts) could be changed from this:

```yaml
# Send the "UP" command (slow)
- service: androidtv.adb_command
  target:
    entity_id: media_player.fire_tv_living_room
  data:
    command: UP
```

to this:

```yaml
# Send the "UP" command using `sendevent` (faster)
- service: androidtv.adb_command
  target:
    entity_id: media_player.fire_tv_living_room
  data:
    command: "sendevent /dev/input/event4 4 4 786979 && sendevent /dev/input/event4 1 172 1 && sendevent /dev/input/event4 0 0 0 && sendevent /dev/input/event4 4 4 786979 && sendevent /dev/input/event4 1 172 0 && sendevent /dev/input/event4 0 0 0"
```

### `androidtv.download` and `androidtv.upload`

You can use the `androidtv.download` service to download a file from your Android TV / Fire TV device to your Home Assistant instance. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Name of Android TV / Fire TV entity.
| `device_path`          |       no | The filepath on the Android TV / Fire TV device.
| `local_path`           |       no | The filepath on your Home Assistant instance.

Similarly, you can use the `androidtv.upload` service to upload a file from Home Assistant instance to Android TV / Fire TV devices.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Name(s) of Android TV / Fire TV entities.
| `device_path`          |       no | The filepath on the Android TV / Fire TV device.
| `local_path`           |       no | The filepath on your Home Assistant instance.

## Custom State Detection

The Android TV integration works by polling the Android TV / Fire TV device at a regular interval and collecting a handful of properties. Unfortunately, there is no standard API for determining the state of the device to which all apps adhere. Instead, the backend `androidtv` package uses three of the properties that it collects to determine the state: `audio_state`, `media_session_state`, and `wake_lock_size`. The correct logic for determining the state differs depending on the current app, and the backend `androidtv` package implements app-specific state detection logic for a handful of apps. Of course, it is not feasible to implement custom logic for each and every app in the `androidtv` package. Moreover, the correct state detection logic may differ across devices and device configurations.

The solution to this problem is the `state_detection_rules` configuration parameter, which allows you to provide your own rules for state detection.  The keys are app IDs, and the values are lists of rules that are evaluated in order.  Valid rules are:

* `'standby'`, `'playing'`, `'paused'`, `'idle'`, or `'off'`
  * If this is not a map, then this state will always be reported when this app is the current app
  * If this is a map, then its entries are conditions that will be checked.  If all of the conditions are true, then this state will be reported.  Valid conditions pertain to 3 properties (see the example configuration above):
    1. ``'media_session_state'``
    2. ``'audio_state'``
    3. ``'wake_lock_size'``
* `'media_session_state'` = try to use the `media_session_state` property to determine the state
* `'audio_state'` = try to use the `audio_state` property to determine the state

To determine what these rules should be, you can use the `androidtv.adb_command` service with the command `GET_PROPERTIES`, as described in the [androidtv.adb_command](#androidtvadb_command) section.
