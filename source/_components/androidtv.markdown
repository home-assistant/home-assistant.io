---
layout: page
title: "Android TV"
description: "Instructions on how to integrate Android TV and Fire TV devices into Home Assistant."
date: 2015-10-23 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: androidtv.png
ha_category: Media Player
ha_release: 0.7.6
ha_iot_class: Local Polling
redirect_from:
  - /components/media_player.firetv/
---

The `androidtv` platform allows you to control an Android TV device or [Amazon Fire TV](https://www.amazon.com/b/?node=8521791011) device.

## {% linkable_title Device preparation %}

To set up your device, you will need to find its IP address and enable ADB debugging. For Android TV devices, please consult the documentation for your device.

For Fire TV devices, the instructions are as follows:

- Turn on ADB Debugging on your Amazon Fire TV:
  - From the main (Launcher) screen, select Settings.
  - Select System > Developer Options.
  - Select ADB Debugging.
- Find Amazon Fire TV device IP address:
  - From the main (Launcher) screen, select Settings.
  - Select System > About > Network.

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
media_player:
  # Use the Python ADB implementation without authentication
  - platform: androidtv
    name: Android TV 1
    host: 192.168.0.111

  # Use the Python ADB implementation with authentication
  - platform: androidtv
    name: Android TV 2
    host: 192.168.0.222
    adbkey: "/config/android/adbkey"

  # Use an ADB server for sending ADB commands
  - platform: androidtv
    name: Android TV 3
    host: 192.168.0.123
    adb_server_ip: 127.0.0.1
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
  description: The path to your `adbkey` file. Note that the file `adbkey.pub` must be in the same directory.
  required: false
  type: string
adb_server_ip:
  description: The IP address of the ADB server.
  required: false
  type: string
adb_server_port:
  description: The port for the ADB server.
  required: false
  default: 5037
  type: port
get_sources:
  description: Whether or not to retrieve the running apps as the list of sources for Fire TV devices; not used for Android TV devices.
  required: false
  default: true
  type: boolean
apps:
  description: A dictionary where the keys are app IDs and the values are app names that will be displayed in the UI; see example below.
  required: false
  default: {}
  type: dict
device_class:
  description: "The type of device: `auto` (detect whether it is an Android TV or Fire TV device), `androidtv`, or `firetv`."
  required: false
  default: auto
  type: string
turn_on_command:
  description: An ADB shell command that will override the default `turn_on` command.
  required: false
  type: string
turn_off_command:
  description: An ADB shell command that will override the default `turn_off` command.
  required: false
  type: string
{% endconfiguration %}

### {% linkable_title Full Configuration %}

```yaml
# Example configuration.yaml entry
media_player:
  # Use an ADB server to setup an Android TV device, provide
  # an app name, and override the default turn on/off commands
  - platform: androidtv
    name: Android TV
    device_class: androidtv
    host: 192.168.0.222
    adb_server_ip: 127.0.0.1
    apps:
      com.amazon.tv.launcher: "Fire TV"
    turn_on_command: "input keyevent 3"
    turn_off_command: "input keyevent 223"

  # Use the Python ADB implementation with authentication
  # to setup a Fire TV device and don't get the running apps
  - platform: androidtv
    name: Fire TV
    device_class: firetv
    host: 192.168.0.222
    adbkey: "/config/android/adbkey"
    get_sources: false
```

## {% linkable_title ADB Setup %}

This component works by sending ADB commands to your Android TV / Fire TV device. There are two ways to accomplish this:

### {% linkable_title 1. ADB Server %}

You can use an ADB server to connect to your Android TV and Fire TV devices.

For Hass.io users, you can install the [Android Debug Bridge](https://github.com/hassio-addons/addon-adb/blob/master/README.md) addon. Using this approach, Home Assistant will send the ADB commands to the server, which will then send them to the Android TV / Fire TV device and report back to Home Assistant. To use this option, add the `adb_server_ip` option to your configuration. If you are running the server on the same machine as Home Assistant, you can use `127.0.0.1` for this value.

### {% linkable_title 2. Python ADB Implementation %}

The second option is to connect to your device using the `adb` Python package.

If your device requires ADB authentication, you will need to follow the instructions in the [ADB Authentication](#adb-authentication) section below. Once you have an authenticated key, this approach does not require any additional setup or addons. However, users with newer devices may find that the ADB connection is unstable. For a Fire TV device, you can try setting the `get_sources` configuration option to `false`.  If the problem cannot be resolved, you should use the ADB server option.

### {% linkable_title ADB Authentication %}

If you get a "Device authentication required, no keys available" error when trying to set up your Android TV or Fire TV, then you'll need to create an adbkey and add its path to your configuration. Follow the instructions on this page to connect to your device from your computer: [Connecting to Fire TV Through adb](https://developer.amazon.com/zh/docs/fire-tv/connecting-adb-to-device.html).

<p class='note warning'>
In the dialog appearing on your Android TV / Fire TV, you must check the box that says "always allow connections from this device." ADB authentication in Home Assistant will only work using a trusted key.
</p>

Once you've successfully connected to your Android TV / Fire TV via the command `adb connect <ipaddress>`, the files `adbkey` and `adbkey.pub` will be created on your computer. The default locations for these files are (from [https://developer.android.com/studio/command-line/adb](https://developer.android.com/studio/command-line/adb)):

- Linux and Mac: `$HOME/.android.`
- Windows: `%userprofile%\.android.`

Copy the `adbkey` and `adbkey.pub` files to your Home Assistant folder and add the path to the `adbkey` file to your configuration.

#### {% linkable_title ADB Troubleshooting %}

If you receive the error message `Issue: Error while setting up platform androidtv` in your log when trying to set up an Android TV or Fire TV device with an ADB key, then there is probably an issue with your ADB key. Here are some possible causes.

1. ADB is not enabled on your device.

2. Your key is not pre-authenticated. Before using the `adbkey` in Home Assistant, you _**must**_ connect to your device using the ADB binary and tell it to always allow connections from this computer. For more information, see the section [ADB Authentication](#adb-authentication) above.

3. Home Assistant does not have the appropriate permissions for the `adbkey` file and so it is not able to use it. Once you fix the permissions, the component should work.

4. You are already connected to the Android TV / Fire TV via ADB from another device. Only one device can be connected, so disconnect the other device, restart the Android TV / Fire TV (for good measure), and then restart Home Assistant.

## {% linkable_title Services %}

### {% linkable_title `media_player.select_source` %}

For Fire TV devices, you can launch an app using the `media_player.select_source` command. Simply provide the app ID as the `source`.  You can also stop an app by prefixing the app ID with a `!`. For example, you could define [scripts](/docs/scripts) to start and stop Netflix as follows:

```yaml
start_netflix:
  sequence:
  - service: media_player.select_source
    data:
      entity_id: media_player.fire_tv_living_room
      source: 'com.netflix.ninja'

stop_netflix:
  sequence:
  - service: media_player.select_source
    data:
      entity_id: media_player.fire_tv_living_room
      source: '!com.netflix.ninja'
```

### {% linkable_title `androidtv.adb_command` %}

The service `androidtv.adb_command` allows you to send either keys or ADB shell commands to your Android TV / Fire TV device.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |       no | Name(s) of Android TV / Fire TV entities.
| `command`              |       no | Either a key command or an ADB shell command.

In an [action](/getting-started/automation-action/) of your [automation setup](/getting-started/automation/) it could look like this:

```yaml
action:
  service: androidtv.adb_command
  data:
    entity_id: media_player.androidtv_tv_living_room
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

The full list of key commands can be found [here](https://github.com/JeffLIrion/python-androidtv/blob/e1c07176efc9216cdcff8245c920224c0234ea56/androidtv/constants.py#L115-L155).

You can also use the command `GET_PROPERTIES` to retrieve the properties used by Home Assistant to update the device's state.  These will be logged at the INFO level and can be used to help improve state detection in the backend [androidtv](https://github.com/JeffLIrion/python-androidtv) package.
