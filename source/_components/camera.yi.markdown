---
layout: page
title: "Yi Home Camera"
description: "Instructions on how to integrate a video feed (via FFmpeg) as a camera within Home Assistant."
date: 2017-10-10 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: yi.png
ha_category: Camera
ha_release: 0.56
ha_iot_class: "Local Polling"
---

The `yi` camera platform allows you to utilize Yi Home Cameras within Home
Assistant. Specifically, this platform supports the line of Yi Home Cameras
that are based on the Hi3518e Chipset; these include:

* Yi Home 17CN
* Yi 1080p Home
* Yi Dome
* Yi 1080p Dome

To successfully implement this platform, the Home Assistant host should be
capable of multiple simultaneous reads; for every concurrent Home Assistant
user, a connection will be made to the camera every 10 seconds.
This should normally not be a problem.

## {% linkable_title Preparing the Device %}

### {% linkable_title Installing Alternative Firmware %}

In order to integrate the camera with Home Assitant, it is necessary to install
a custom firmware on the device. Instructions for doing so can be found via the
[yi-hack-v3 GitHub project](https://github.com/shadow-1/yi-hack-v3).

Once installed, please ensure that you have enabled FTP and Telnet on your
device.

<p class='note warning'>
Some alternative Yi firmwares enable an experimental RTSP server, which will
allow you to connect to your camera via other Home Assistant camera platforms.
However, this RTSP server disables the ability to use the supremely-useful Yi
Home app. In order to maintain both Home Assistant compatibility _and_ the native
app, this platform retrieves videos via FTP.
</p>

### {% linkable_title Changing the FTP Password %}

Once the custom firmware is installed, a password must be added to the FTP
server. To do so:

1. Telnet into your camera: `telnet <IP ADDRESS>`.
2. Enter `root` as the username and `<blank>` as the password.
3. Type `passwd` and hit `<Enter>`.
4. Enter your new password twice.
5. Log out of Telnet.

## {% linkable_title Configuring the Platform %}

To enable the platform, add the following lines to your
`configuration.yaml` file:

```yaml
camera:
  - platform: yi
    host: '192.168.1.100'
    password: my_password_123
```

Configuration variables:

- **name** (*Required*): a human-friendly name for the camera
- **host** (*Required*): the IP address or hostname of the camera
- **password** (*Required*): the password to the FTP server on the camera (from above)
- **path** (*Optional*): the path to the raw MP4 files (default: `/tmp/sd/record`)
- **username** (*Optional*): the user that can access the FTP server (default: `root`)
- **ffmpeg_arguments** (*Optional*): extra options to pass to `ffmpeg` (e.g. image quality or video filter options)

## {% linkable_title Image quality %}

Any option supported by the `ffmpeg` client can be utilized via the
`ffmpeg_arguments` configuration parameter.

One particularly useful adjustment deals with video size. Since Yi videos are
fairly large (especially on the 1080p cameras), the following configuration will
bring them down to a manageable size:

```yaml
camera:
  - platform: yi
    name: My Camera
    host: '192.168.1.100'
    password: my_password_123
    ffmpeg_arguments: '-vf scale=800:450'
```
