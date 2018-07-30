---
layout: page
title: "FFmpeg"
description: "Instructions on how to integrate FFmpeg within Home Assistant."
date: 2016-09-14 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ffmpeg.png
ha_category: Hub
---

The `ffmpeg` component allows other Home Assistant components to process video and audio streams. This component supports all FFmpeg versions since 3.0.0; if you have an older version, please update.

<p class='note'>
You need the `ffmpeg` binary in your system path. On Debian 8 or Raspbian (Jessie) you can install it from [debian-backports](https://backports.debian.org/Instructions/). If you want [hardware acceleration](https://trac.ffmpeg.org/wiki/HWAccelIntro) support on a Raspberry Pi, you will need to build from source by yourself. Windows binaries are available on the [FFmpeg](http://www.ffmpeg.org/) website.
</p>

<p class='note'>
If you are using [Hass.io](/hassio/) then just move forward to the configuration as all requirements are already fulfilled.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
ffmpeg:
```

Configuration variables:

- **ffmpeg_bin** (*Optional*): Default `ffmpeg`. The name or path to the `ffmpeg` binary.
- **run_test** (*Optional*): Default `true`. Check if `input` is usable by ffmpeg.

### {% linkable_title Raspbian Debian Jessie Lite Installations %}
To get the binary on Raspbian Debian Jessie Lite on a RPi you need to perform the following:

```bash
$ sudo echo "deb http://ftp.debian.org/debian jessie-backports main" >> /etc/apt/sources.list
$ sudo apt-get update
$ sudo apt-get -t jessie-backports install ffmpeg
```

We can use now following in the configuration:

```
ffmpeg:
  ffmpeg_bin: /usr/bin/ffmpeg
```

### {% linkable_title Troubleshooting %}

In most cases, `ffmpeg` automatically detects all needed options to read a video or audio stream or file. But it is possible in rare cases that you will need to set options to help `ffmpeg` out.

First, check that your stream is playable by `ffmpeg` outside of Home Assistant with (use option `-an` or `-vn` to disable video or audio stream):

```
$ ffmpeg -i INPUT -an -f null -
```

Now you should be able to see what is going wrong. The following list contains some common problems and solutions:

- `[rtsp @ ...] UDP timeout, retrying with TCP`: You need to set an RTSP transport in the configuration with: `input: -rtsp_transport tcp -i INPUT`
- `[rtsp @ ...] Could not find codec parameters for stream 0 (Video: ..., none): unspecified size`: FFmpeg needs more data or time for autodetection (the default is 5 seconds). You can set the `analyzeduration` and/or `probesize` options to experiment with giving FFmpeg more leeway. If you find the needed value, you can set it with: `input: -analyzeduration xy -probesize xy -i INPUT`. More information about this can be found [here](https://www.ffmpeg.org/ffmpeg-formats.html#Description).

#### {% linkable_title USB cameras %}

For `INPUT` a valid source is needed. A USB camera is an easy way to test your video setup. To get all available USB cameras connected to the system, e.g., use the v4l2 tools on a Linux machine.

```bash
$ v4l2-ctl --list-devices
UVC Camera (046d:0825) (usb-0000:00:14.0-1):
  /dev/video1

Integrated Camera (usb-0000:00:14.0-10):
  /dev/video0
```

Record a test video with your USB device `/dev/video1`:

```bash
$ ffmpeg -i /dev/video1 -codec:v libx264 -qp 0 lossless.mp4
[...]
Input #0, video4linux2,v4l2, from '/dev/video1':
  Duration: N/A, start: 43556.376974, bitrate: 147456 kb/s
    Stream #0:0: Video: rawvideo (YUY2 / 0x32595559), yuyv422, 640x480, 147456 kb/s, 30 fps, 30 tbr, 1000k tbn, 1000k tbc
[...]
Output #0, mp4, to 'lossless.mp4':
  Metadata:
    encoder         : Lavf57.41.100
    Stream #0:0: Video: h264 (libx264) ([33][0][0][0] / 0x0021), yuv422p, 640x480, q=-1--1, 30 fps, 15360 tbn, 30 tbc
    Metadata:
      encoder         : Lavc57.48.101 libx264
    Side data:
      cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: -1
Stream mapping:
  Stream #0:0 -> #0:0 (rawvideo (native) -> h264 (libx264))
Press [q] to stop, [?] for help
frame=  223 fps= 40 q=-1.0 Lsize=   16709kB time=00:00:07.40 bitrate=18497.5kbits/s dup=58 drop=0 speed=1.32x
```
