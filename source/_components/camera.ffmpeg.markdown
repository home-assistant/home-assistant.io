---
layout: page
title: "FFmpeg Camera"
description: "Instructions how to integrate a Video fees with FFmpeg as cameras within Home Assistant."
date: 2016-08-13 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ffmpeg.png
ha_category: Camera
ha_release: 0.26
---


The `ffmpeg` platform allows you to use every video feed with [FFmpeg](http://www.ffmpeg.org/) as camera in Home Assistant.

<p class='note'>
You need a ffmpeg binary in your system path. On debain 8 you can install it from backports. If you want HW support on raspberry you need self build from source. Windows binary are avilable on ffmpeg homepage.
</p>

To enable your FFmpeg feed in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: ffmpeg
    input: FFMPEG_SUPPORTED_INPUT
    name: FFmpeg
    ffmpeg_bin: /usr/bin/ffmpeg
    extra_arguments: -q:v 2
```

Configuration variables:

- **input** (*Required*): A ffmpeg compatible input file, stream or feed.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **ffmpeg_bin** (*Optional*): Default 'ffmpeg'.
- **extra_arguments** (*Optional*): Extra option they will pass to ffmpeg. i.e. image quality or video filter options.

### {% linkable_title Image quality %}

You can control the `image quality` with [`extra_arguments`](https://www.ffmpeg.org/ffmpeg-codecs.html#jpeg2000) `-q:v 2-32` or with lossless option `-pred 1`.

