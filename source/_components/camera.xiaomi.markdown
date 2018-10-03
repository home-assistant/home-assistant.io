---
layout: page
title: "Xiaomi Cameras"
description: "Instructions on how to integrate a video feed (via FFmpeg) as a camera within Home Assistant."
date: 2018-06-20 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Camera
ha_release: 0.72
ha_iot_class: "Local Polling"
---

The `Xiaomi` camera platform allows you to utilize Xiaomi Cameras within Home Assistant.

To successfully implement this platform, the Home Assistant host should be capable of multiple simultaneous reads. For every concurrent Home Assistant user, a connection will be made to the camera every 10 seconds. This should normally not be a problem.

## {% linkable_title Preparing the Device %}

In order to integrate the camera with Home Assistant, it is necessary to install a custom firmware on the device. Instructions for doing so can be found for each models.

* [Yi 720p](https://github.com/fritz-smh/yi-hack)
* [Yi Home 17CN / 27US / 47US / 1080p Home / Dome / 1080p Dome](https://github.com/shadow-1/yi-hack-v3)
* [Xiaofang 1080p Camera](https://github.com/samtap/fang-hacks)

Once installed, please ensure that you have enabled FTP.

<p class='note warning'>
Currently, version 0.1.4-beta2 of the custom firmware is the highest supported. Firmwares higher than this version use [Pure-FTPd](https://www.pureftpd.org/project/pure-ftpd), which has a bug that prevents FFmpeg from correctly rendering video files.
</p>

<p class='note warning'>
Hassbian users: Don't forget to install `ffmpeg` support on your platform, otherwise, you'll not see video.
</p>

<p class='note warning'>
The live stream writing by the camera is not an supported format when the hass reads through FTP for Yi 720p and Xiaofang Cameras, so this platform retrives the video which was saved 1 minute earlier.
</p>

<p class='note warning'>
If you enabled RTSP server, you can connect to your camera via other Home Assistant camera platforms. However, this RTSP server disables the ability to use the supremely-useful Mi Home app. In order to maintain both Home Assistant compatibility _and_ the native app, this platform retrieves videos via FTP.
</p>

## {% linkable_title Configuring the Platform %}

To enable the platform, add the following lines to your`configuration.yaml` file:

```yaml
camera:
  - platform: xiaomi
    name: Camera
    host: '192.168.1.100'
    model: 'yi'
    password: YOUR_PASSWORD
```

{% configuration %}
name:
  description: A human-friendly name for the camera.
  required: true
  type: string
host:
  description: The IP address or hostname of the camera.
  required: true
  type: string
model:
  description: The model of Xiaomi Camera, currently supporting yi and xiaofang.
  required: true
  type: string
password:
  description: The password to the FTP server on the camera (from above), can be any string as the current firmware doesn't allow setting ftp passwords.
  required: true
  type: string
path:
  description: The path to the raw MP4 files.
  required: false
  default: /media/mmcblk0p1/record
  type: string
username:
  description: The user that can access the FTP server.
  required: false
  default: root
  type: string
ffmpeg_arguments:
  description: >
    Extra options to pass to `ffmpeg`
  required: false
  type: string
{% endconfiguration %}

<p class='note'>
The default for `path:` will not work with all cameras. It may be needed that you add that key with the exact path for your device.
</p>

## {% linkable_title Image quality %}

Any option supported by [`ffmpeg` camera](/components/camera.ffmpeg/) can be utilized via the `ffmpeg_arguments` configuration parameter.

One particularly useful adjustment deals with video size. Since Yi videos are fairly large (especially on the 1080p cameras), the following configuration will bring them down to a manageable size:

```yaml
camera:
  - platform: xiaomi
    name: My Camera
    host: '192.168.1.100'
    model: 'xiaofang'
    password: YOUR_PASSWORD
    path: /home/camera/feed
    ffmpeg_arguments: '-vf scale=800:450'
```
