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


The `ffmpeg` platform allows you to use every video feed with [FFmpeg](http://www.ffmpeg.org/) as camera in Home Assistant. The input for ffmpeg need to support that could have multiple connection to source (input) in same time. For every user in UI and all 10 seconds (snapshot image) it make a new connection/reading to source. Normally that should never be a trouble only in strange selfmade constructs can be make mistakes.

To enable your FFmpeg feed in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: ffmpeg
    input: FFMPEG_SUPPORTED_INPUT
    name: FFmpeg
    extra_arguments: -q:v 2
```

Configuration variables:

- **input** (*Required*): A ffmpeg compatible input file, stream or feed.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **ffmpeg_bin** (*Optional*): Default 'ffmpeg'.
- **extra_arguments** (*Optional*): Extra option they will pass to `ffmpeg`. i.e. image quality or video filter options.

### {% linkable_title Image quality %}

You can control the `image quality` with [`extra_arguments`](https://www.ffmpeg.org/ffmpeg-codecs.html#jpeg2000) `-q:v 2-32` or with lossless option `-pred 1`.


If you are running into trouble with this sensor, please refer to this [Troubleshooting section](/components/ffmpeg/#troubleshooting).

