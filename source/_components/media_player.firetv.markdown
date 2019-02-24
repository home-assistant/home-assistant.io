---
layout: page
title: "FireTV"
description: "Instructions on how to integrate Fire-TV into Home Assistant."
date: 2015-10-23 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: firetv.png
ha_category: Media Player
ha_release: 0.7.6
ha_iot_class: "Local Polling"
---


The `firetv` platform allows you to control an [Amazon Fire TV/stick](https://www.amazon.com/b/?node=8521791011).

Steps to configure your Amazon Fire TV stick with Home Assistant:

- Turn on ADB Debugging on your Amazon Fire TV:
  - From the main (Launcher) screen, select Settings.
  - Select System > Developer Options.
  - Select ADB Debugging.
- Find Amazon Fire TV device IP:
  - From the main (Launcher) screen, select Settings.
  - Select System > About > Network.

To add FireTV to your installation, Note your device name, and add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  # a device that does not require ADB authentication
  - platform: firetv
    name: Fire TV 1
    host: 192.168.0.111

  # a device that does require ADB authentication
  - platform: firetv
    name: Fire TV 2
    host: 192.168.0.222
    adbkey: "/config/android/adbkey"

  # use an ADB server for sending ADB commands instead of the Python ADB implementation
  - platform: firetv
    name: Fire TV 3
    host: 192.168.0.123
    adb_server_ip: 127.0.0.1
```

{% configuration %}
host:
  description: The IP address for your Fire TV device.
  required: true
  type: string
name:
  description: The friendly name of the device.
  required: false
  default: Amazon Fire TV
  type: string
port:
  description: The port for your Fire TV device.
  required: false
  default: 5555
  type: integer
adbkey:
  description: The path to your `adbkey` file.  Note that the file `adbkey.pub` must be in the same directory.
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
  description: Whether or not to retrieve the running apps as the list of sources.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

## {% linkable_title ADB Setup %}

This component works by sending ADB commands to your Fire TV device.  There are two ways to accomplish this:

1. Using the `adb` Python package.  If your device requires ADB authentication, you will need to follow the instructions in the "ADB Authentication (for Fire TV devices with recent software)" section below.  Once you have an authenticated key, this approach does not require any additional setup or addons.  However, users with newer devices may find that the ADB connection is unstable.  If setting the `get_sources` configuration option to `false` does not help, they should use the next option.  
2. Using an ADB server.  For Hass.io users, you can install the [Android Debug Bridge](https://github.com/hassio-addons/addon-adb/blob/v0.1.0/README.md) addon.  With this approach, Home Assistant will send the ADB commands to the server, which will then send them to the Fire TV device and report back to Home Assistant.  To use this option, add the `adb_server_ip` option to your configuration.  If you are running the server on the same machine as Home Assistant, you can use `127.0.0.1` for this value.

### {% linkable_title ADB Authentication (for Fire TV devices with recent software) %}

If you get a "Device authentication required, no keys available" error when trying to set up Fire TV, then you'll need to create an adbkey and add its path to your configuration.  Follow the instructions on this page to connect to your Fire TV from your computer: [Connecting to Fire TV Through adb](https://developer.amazon.com/zh/docs/fire-tv/connecting-adb-to-device.html).  

<p class='note warning'>
  In the dialog appearing on your Fire TV, you must check the box that says "always allow connections from this device."  ADB authentication in Home Assistant will only work using a trusted key.
</p>

Once you've successfully connected to your Fire TV via the command `adb connect <ipaddress>`, the files `adbkey` and `adbkey.pub` will be created on your computer.  The default locations for these files are (from [https://developer.android.com/studio/command-line/adb](https://developer.android.com/studio/command-line/adb)):

* Linux and Mac: `$HOME/.android.`
* Windows: `%userprofile%\.android.`

Copy the `adbkey` and `adbkey.pub` files to your Home Assistant folder and add the path to the `adbkey` file to your configuration.  

#### ADB Troubleshooting

If you receive the error message `Issue: Error while setting up platform firetv` in your log when trying to set up a Fire TV device with an ADB key, then there is probably an issue with your ADB key.  Here are some possible causes.

1. ADB is not enabled on your Fire TV.  To remedy this, enable ADB by following the instructions above.  

2. Your key is not pre-authenticated.  Before using the `adbkey` in Home Assistant, you _**must**_ connect to your Fire TV device using the ADB binary and tell the Fire TV to always allow connections from this computer.  For more information, see the section "ADB Authentication (for Fire TV devices with recent software)" above.

3. Home Assistant does not have the appropriate permissions for the `adbkey` file and so it is not able to use it.  Once you fix the permissions, the component should work.

4. You are already connected to the Fire TV via ADB from another device.  Only one device can be connected, so disconnect the other device, restart the Fire TV (for good measure), and then restart Home Assistant.  
