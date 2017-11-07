---
layout: page
title: "FFmpeg Motion Binary Sensor"
description: "Instructions on how to integrate an FFmpeg-based motion binary sensor"
date: 2016-08-25 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ffmpeg.png
ha_category: Binary Sensor
ha_release: 0.27
redirect_from: /components/binary_sensor.ffmpeg/
---


The `ffmpeg` platform allows you to use any video feed with [FFmpeg](http://www.ffmpeg.org/) for motion sensors in Home Assistant.

<p class='note'>
If the `ffmpeg` process is broken, the sensor will be unavailable. To control the ffmpeg process of sensor, use the service *ffmpeg.start*, *ffmpeg.stop*, *ffmpeg.restart*.
</p>

### {% linkable_title Motion %}

FFmpeg doesn't have a motion detection filter, but can use a scene filter to detect a new scene/motion. You can set how much needs to change in order to detect motion with the option 'changes', the percent value of change between frames. If you want a really small value for 'changes', you can also add a denoise filter.

To add FFmpeg with motion detection to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ffmpeg_motion
    input: FFMPEG_SUPPORTED_INPUT
```

Configuration variables:

- **input** (*Required*): An FFmpeg-compatible input file, stream, or feed.
- **name** (*Optional*): Override the name of your camera for the frontend.
- **initial_state** (*Optional*): Start `ffmpeg` with Home Assistant. Defaults to `true`.
- **changes** (*Optional*): How much needs to change between two frames to detect it as motion (a lower value is more sensitive). Defaults to 10%.
- **reset** (*Optional*): The time to reset the state after no new motion is detected. Defaults to 20 seconds.
- **repeat** (*Optional*): How many events need to be detected in *repeat_time* in order to trigger a motion. Defaults to 0 repeats (deactivated).
- **repeat_time** (*Optional*): The span of time *repeat* events need to occur in before triggering a motion. Defaults to 0 seconds (deactivated).
- **extra_arguments** (*Optional*): Extra options to pass to `ffmpeg`, e.g. video denoise filtering.

To experiment with values (changes/100 is the scene value in `ffmpeg`):

```bash
$ ffmpeg -i YOUR_INPUT -an -filter:v select=gt(scene\,0.1) -f framemd5 -
```

If you are running into trouble with this sensor, please refer to the [troubleshooting section](/components/ffmpeg/#troubleshooting).

#### {% linkable_title Tips %}

- Use motion only in a custom area with [crop filter](https://ffmpeg.org/ffmpeg-filters.html#crop):

```yaml
extra_arguments: -filter:v "crop=100:100:12:34"
```
