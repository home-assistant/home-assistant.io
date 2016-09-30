---
layout: page
title: "FFmpeg Binary Sensor"
description: "Instructions how to integrate a varius ffmpeg based binary sensor"
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


The `ffmpeg` platform allows you to use every video or audio feed with [FFmpeg](http://www.ffmpeg.org/) for various sensors in Home Assistant. Available are: **noise**, **motion**. If the `ffmpeg` process is broken, the sensor will be unavailable.   To restart the instance, use the service *binary_sensor.ffmpeg_restart*.

### {% linkable_title Noise %}

To enable your FFmpeg with noise detection in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ffmpeg
    tool: noise
```

Configuration variables:

- **input** (*Required*): A ffmpeg compatible input file, stream or feed.
- **tool** (*Required*): Is fix set to `noise`.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **peak** (*Optional*): Default -30. A peak of dB to detect it as noise. 0 is very loud and -100 is low.
- **duration** (*Optional*): Default 1 seconds. How long need the noise over the peak to trigger the state.
- **reset** (*Optional*): Defaults to 20 seconds. The time to reset the state after none new noise is over the peak.
- **extra_arguments** (*Optional*): Extra option they will pass to `ffmpeg`, like audio frequence filtering.
- **output** (*Optional*): Allow you to send the audio output of this sensor to an icecast server or other ffmpeg supported output, eg. to stream with sonos after state is triggered.

For playing with values:

```bash
$ ffmpeg -i YOUR_INPUT -vn -filter:a silencedetect=n=-30dB:d=1 -f null -
```

### {% linkable_title Motion %}

FFmpeg doesn't have a motion detection filter, so it uses a scene filter to detect a new scene/motion. In fact, you can set how big of an object or the size of an image that needs to change in order to detect motion. The option 'changes' is the percent value of change between frames. You can add a denoise filter to the video if you want a really small value for 'changes'.

To enable your FFmpeg with motion detection in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ffmpeg
    tool: motion
    input: FFMPEG_SUPPORTED_INPUT
```

Configuration variables:

- **input** (*Required*): A ffmpeg compatible input file, stream, or feed.
- **tool** (*Required*): Is fix set to `motion`.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **changes** (*Optional*): Default 10 percent. A lower value is more sensitive. I use 4 / 3.5 on my cameras. It describes how much needs to change between two frames to detect it as motion. See on descripton.
- **reset** (*Optional*): Default 20 seconds. The time to reset the state after no new motion is detected.
- **repeat** (*Optional*): Default 0 repeats (deactivate). How many events need to be detected in *repeat_time* in order to trigger a motion.
- **repeat_time** (*Optional*): Default 0 seconds (deactivate). The span of time *repeat* events need to occur in before triggering a motion.
- **extra_arguments** (*Optional*): Extra option they will pass to ffmpeg. i.e. video denoise filtering.

For playing with values (changes/100 is the scene value on ffmpeg):

```bash
$ ffmpeg -i YOUR_INPUT -an -filter:v select=gt(scene\,0.1) -f framemd5 -
```

If you are running into trouble with this sensor, please refer to this [Troubleshooting section](/components/ffmpeg/#troubleshooting).
