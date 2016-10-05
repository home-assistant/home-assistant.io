---
layout: page
title: "FFmpeg Binary Sensor"
description: "Instructions on how to integrate an FFmpeg-based binary sensor"
date: 2016-08-25 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ffmpeg.png
ha_category: Binary Sensor
ha_release: 0.27
ha_iot_class: "Local Polling"
---


The `ffmpeg` platform allows you to use any video or audio feed with [FFmpeg](http://www.ffmpeg.org/) for various sensors in Home Assistant. Available are: **noise**, **motion**. 

<p class='note'>
If the `ffmpeg` process is broken, the sensor will be unavailable.   To restart it, use the service *binary_sensor.ffmpeg_restart*.
</p>

### {% linkable_title Noise %}

To add FFmpeg with noise detection to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ffmpeg
    tool: noise
```

Configuration variables:

- **input** (*Required*): An FFmpeg-compatible input file, stream, or feed.
- **tool** (*Required*): `noise`.
- **name** (*Optional*): Override the name of your camera.
- **peak** (*Optional*): Default -30. The threshold of detecting noise, in dB. 0 is very loud and -100 is low.
- **duration** (*Optional*): Default 1 second. How long the noise needs to be over the peak to trigger the state.
- **reset** (*Optional*): Default 20 seconds. The time to reset the state after no new noise is over the peak.
- **extra_arguments** (*Optional*): Extra options to pass to `ffmpeg`, like audio frequency filtering.
- **output** (*Optional*): Allows you to send the audio output of this sensor to an Icecast server or other FFmpeg-supported output, e.g. to stream with Sonos after a state is triggered.

To experiment with values:

```bash
$ ffmpeg -i YOUR_INPUT -vn -filter:a silencedetect=n=-30dB:d=1 -f null -
```

### {% linkable_title Motion %}

FFmpeg doesn't have a motion detection filter, but can use a scene filter to detect a new scene/motion. You can set how much needs to change in order to detect motion with the option 'changes', the percent value of change between frames. If you want a really small value for 'changes', you can also add a denoise filter.

To add FFmpeg with motion detection to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ffmpeg
    tool: motion
    input: FFMPEG_SUPPORTED_INPUT
```

Configuration variables:

- **input** (*Required*): An FFmpeg-compatible input file, stream, or feed.
- **tool** (*Required*): `motion`.
- **name** (*Optional*): Override the name of your camera.
- **changes** (*Optional*): Default 10%. How much needs to change between two frames to detect it as motion (a lower value is more sensitive).
- **reset** (*Optional*): Default 20 seconds. The time to reset the state after no new motion is detected.
- **repeat** (*Optional*): Default 0 repeats (deactivate). How many events need to be detected in *repeat_time* in order to trigger a motion.
- **repeat_time** (*Optional*): Default 0 seconds (deactivate). The span of time *repeat* events need to occur in before triggering a motion.
- **extra_arguments** (*Optional*): Extra options to pass to FFmpeg, e.g. video denoise filtering.

To experiment with values (changes/100 is the scene value in FFmpeg):

```bash
$ ffmpeg -i YOUR_INPUT -an -filter:v select=gt(scene\,0.1) -f framemd5 -
```

If you are running into trouble with this sensor, please refer to the [troubleshooting section](/components/ffmpeg/#troubleshooting).

#### {% linkable_title Tipps %}

- Use motion only in a customer area with [crop filter](https://ffmpeg.org/ffmpeg-filters.html#crop): ```extra_arguments: -filter:v "crop=100:100:12:34"```
