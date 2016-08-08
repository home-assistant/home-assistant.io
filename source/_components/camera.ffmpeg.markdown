---
layout: page
title: "FFmpeg Camera"
description: "Instructions how to integrate a Video feet with FFmpeg as cameras within Home Assistant."
date: 2015-09-17 08:01
sidebar: true
comments: false
sharing: true
footer: true
logo: ffmpeg.png
ha_category: Camera
---


The `ffmpeg` platform allows you to use every video feet with [FFmpeg](http://www.ffmpeg.org/) as camera in Home Assistant.

<p class='note'>
You need a ffmpeg binary in your system path. On debain 8 you can install it from backports. If you want HW support on raspberry you need self build from source. Windows binary are avilable on ffmpeg homepage.
</p>

To enable your Foscam IP camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  platform: ffmpeg
  input: FFMPEG_SUPPORTED_INPUT
  name: FFmpeg
  ffmpeg_bin: /usr/bin/ffmpeg
  extra_arguments: -q:v 2
```

Configuration variables:

- **input** (*Required*): A ffmpeg compatible input file, stream or feet.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **ffmpeg_bin** (*Optional*): Default 'ffmpeg'.
- **extra_arguments** (*Optional*): Extra option they will pass to ffmpeg. i.e. image quality or video filter options.
