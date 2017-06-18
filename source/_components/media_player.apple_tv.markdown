---
layout: page
title: "Apple TV"
description: "Instructions how to integrate Apple TV devices into Home Assistant."
date: 2017-02-08 07:11
sidebar: true
comments: false
sharing: true
footer: true
logo: apple.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: 0.38
featured: true
---

The `apple_tv` platform allows you to control an Apple TV (3rd and 4th generation).

<p class='note'>
Currently you must have Home Sharing enabled for this to work. Support for pairing Home Assistant with your device will be supported in a later release.
</p>

If you want to automatically discover new devices, just make sure you have `discovery:` in your `configuration.yaml` file. To manually add an Apple TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: apple_tv
    host: IP_ADDRESS
    login_id: LOGIN_ID
```

Configuration variables:

- **host** (*Required*): The IP-address of the device
- **login_id** (*Required*): An identifier used to login to the device, see below
- **name** (*Optional*): The name of the device used in the frontend

In order to connect to the device you need a *login id*. The easiest way to obtain this identifier is to use the application ``atvremote``. It should be available in the same environment as you installed Home-Assistant. To install this utility, run ``pip3 install --upgrade pyatv``.  The run atvremote scan for all devices (try again if a device is missing):

```bash
$ atvremote scan
Found Apple TVs:
 - Apple TV at 10.0.10.22 (login id: 00000000-1234-5678-9012-345678901234)
```

Just copy and paste the login id from the device you want to add. For more details about `atvremote`, see: [this page](https://github.com/postlund/pyatv/blob/master/docs/atvremote.rst).

## {% linkable_title Notes and Limitations %}

- Pairing is currently not supported
