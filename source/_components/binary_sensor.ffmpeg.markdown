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
---


The `ffmpeg` platform allows you to use every video or audio feed with [FFmpeg](http://www.ffmpeg.org/) as varius sensors in Home Assistant. Avilable are: **noise**, **motion**

<p class='note'>
You need a ffmpeg binary in your system path. On debain 8 you can install it from backports. If you want HW support on raspberry you need self build from source. Windows binary are avilable on ffmpeg homepage.
</p>

### {% linkable_title Noise %}

To enable your FFmpeg with noise detection in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: ffmpeg
    tool: noise
    input: FFMPEG_SUPPORTED_INPUT
    name: FFmpeg Noise
    ffmpeg_bin: /usr/bin/ffmpeg
    peak: -30
    duration: 1
    reset: 20
```

Configuration variables:

- **input** (*Required*): A ffmpeg compatible input file, stream or feed.
- **tool** (*Required*): is fix set to 'noise'.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **ffmpeg_bin** (*Optional*): Default 'ffmpeg'.
- **peak** (*Optional*): Default -30. A peak of dB to detect it as noise. 0 is very loud and -100 is low.
- **duration** (*Optional*): Default 1 seconds. How long need the noise over the peak to trigger the state.
- **reset** (*Optional*): Default 20 seconds. The time to reset the state after none new noise is over the peak.
- **extra_arguments** (*Optional*): Extra option they will pass to ffmpeg. i.e. audio frequence filtering.
- **output** (*Optional*): Allow you to send the audio output of this sensor to a icecast server or other ffmpeg supported output. i.e. to stream with sonos after state is trigger.

For playing with values:
```bash
ffmpeg -i YOUR_INPUT -vn -filter:a silencedetect=n=-30dB:d=1 -f null -
```

### {% linkable_title Motion %}

FFmpeg don't have a motion detection filter so it use a scene filter to detect a new scene/motion. In fact you can set how big a object or size of image they need change to detect a motion. The option 'changes' is the percent value of change between frames. You can add a denoice filter to video if you want a realy small value for 'changes'.

To enable your FFmpeg with motion detection in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: ffmpeg
    tool: motion
    input: FFMPEG_SUPPORTED_INPUT
    name: FFmpeg Motion
    ffmpeg_bin: /usr/bin/ffmpeg
    changes: 10
    reset: 20
    # group feature / default not in use
    repeat: 0
    repeat_time: 0
    
```

Configuration variables:

- **input** (*Required*): A ffmpeg compatible input file, stream or feed.
- **tool** (*Required*): is fix set to 'motion'.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **ffmpeg_bin** (*Optional*): Default 'ffmpeg'.
- **changes** (*Optional*): Default 10 percent. A lower value is more sensitive. I use 4 / 3.5 on my cameras. It describe how mutch of two frames need to change to detect it as motion. See on descripton.
- **reset** (*Optional*): Default 20 seconds. The time to reset the state after none new motion is detect.
- **repeat** (*Optional*): Default 0 repeats (deactivate). How many motion need to detect in *repeat_time* to trigger a motion.
- **repeat_time** (*Optional*): Default 0 seconds (deactivate). The time to repeats befor it trigger a motion.
- **extra_arguments** (*Optional*): Extra option they will pass to ffmpeg. i.e. video denoise filtering.

For playing with values:
```bash
ffmpeg -i YOUR_INPUT -an -filter:v select=gt(scene\,0.1) -f framemd5 -
```
