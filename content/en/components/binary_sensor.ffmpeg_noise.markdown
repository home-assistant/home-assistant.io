---
layout: page
title: "FFmpeg Noise Binary Sensor"
description: "Instructions on how to integrate an FFmpeg-based noise binary sensor"
date: 2016-08-25 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ffmpeg.png
ha_category: Binary Sensor
ha_release: 0.27
---


The `ffmpeg` platform allows you to use any video or audio feed with [FFmpeg](http://www.ffmpeg.org/) for various sensors in Home Assistant.

<p class='note'>
If the `ffmpeg` process is broken, the sensor will be unavailable. To control the ffmpeg process of sensor, use the service *ffmpeg.start*, *ffmpeg.stop*, *ffmpeg.restart*.
</p>

### {% linkable_title Noise %}

To add FFmpeg with noise detection to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ffmpeg_noise
    input: FFMPEG_SUPPORTED_INPUT
```

Configuration variables:

- **input** (*Required*): An FFmpeg-compatible input file, stream, or feed.
- **name** (*Optional*): Override the name of your camera.
- **initial_state** (*Optional*): Default true. Start ffmpeg with home-assistant.
- **peak** (*Optional*): Default -30. The threshold of detecting noise, in dB. 0 is very loud and -100 is low.
- **duration** (*Optional*): Default 1 second. How long the noise needs to be over the peak to trigger the state.
- **reset** (*Optional*): Default 20 seconds. The time to reset the state after no new noise is over the peak.
- **extra_arguments** (*Optional*): Extra options to pass to `ffmpeg`, like audio frequency filtering.
- **output** (*Optional*): Allows you to send the audio output of this sensor to an Icecast server or other FFmpeg-supported output, e.g., to stream with Sonos after a state is triggered.

To experiment with values:

```bash
$ ffmpeg -i YOUR_INPUT -vn -filter:a silencedetect=n=-30dB:d=1 -f null -
```
