---
layout: page
title: "FFmpeg"
description: "Instructions for how to integrate FFmpeg within Home Assistant."
date: 2016-09-14 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ffmpeg.png
ha_category: Hub
---

The FFmpeg component allows other Home Assistant components to process video and audio streams. This component supports all FFmpeg versions since 3.0.0; if you have a older version, please update.

<p class='note'>
You need the `ffmpeg` binary in your system path. On Debian 8 or Raspbian (Jessie) you can install it from [debian-backports](https://backports.debian.org/Instructions/). If you want [hardware acceleration](https://trac.ffmpeg.org/wiki/HWAccelIntro) support on a Raspberry Pi, you will need to build from source by yourself. Windows binaries are available on the [FFmpeg](http://www.ffmpeg.org/) website.
</p>

To set it up, add the following information to your `configuration.yaml` file:

```yaml
ffmpeg:
```

Configuration variables:

- **ffmpeg_bin** (*Optional*): Default 'ffmpeg'. The name or path to the `ffmpeg` binary.
- **run_test** (*Optional*): Default True. Check if `input` is usable by ffmpeg.

### {% linkable_title Raspbian Debian Jessie Lite Installations %}
To get the binary on Raspbian Debian Jessie Lite on a RPi you need to perform the following:
```
$ sudo apt-get install libav-tools
```
This will get a forked version of ffmpeg called avconv, once this is installed you need to use the following in the configuration:

```
ffmpeg:
  ffmpeg_bin: /usr/bin/avconv
```

### {% linkable_title Troubleshooting %}

In most cases, `ffmpeg` automatically detects all needed options to read a video or audio stream or file. But it is possible in rare cases that you will need to set options to help `ffmpeg` out.

First check that your stream is playable by `ffmpeg` outside of Home Assistant with (use option `-an` or `-vn` to disable video or audio stream):

```
$ ffmpeg -i INPUT -an -f null -
```

Now you should be able to see what is going wrong.  The following list contains some common problems and solutions:

- `[rtsp @ ...] UDP timeout, retrying with TCP`: You need to set an RTSP transport in the configuration with: `input: -rtsp_transport tcp -i INPUT`
- `[rtsp @ ...] Could not find codec parameters for stream 0 (Video: ..., none): unspecified size`: FFmpeg needs more data or time for autodetection (the default is 5 seconds). You can set the `analyzeduration` and/or `probesize` options to experiment with giving FFmpeg more leeway. If you find the needed value, you can set it  with: `input: -analyzeduration xy -probesize xy -i INPUT`. More information about this can be found [here](https://www.ffmpeg.org/ffmpeg-formats.html#Description).
