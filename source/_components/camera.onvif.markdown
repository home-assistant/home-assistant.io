---
layout: page
title: "ONVIF Camera"
description: "Instructions on how to integrate a ONVIF camera within Home Assistant."
date: 2017-06-09 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: onvif.png
ha_category: Camera
ha_release: 0.47
---


The `onvif` camera platform allows you to use an ONVIF camera in Home Assistant. This requires the [`ffmpeg` component](/components/ffmpeg/) to be already configured.

To enable your ONVIF camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: onvif
    host: 192.168.1.111
```

Configuration variables:

- **host** (*Required*): An IP or hostname of the camera.
- **name** (*Optional*): Override the name of your camera.
- **username** (*Optional*): The username for the camera.
- **password** (*Optional*): The password for the camera.
- **port** (*Optional*): The port for the camera. This defaults to 5000.
- **profile** (*Optional*): Video profile that will be used to obtain the stream. This defaults to 0. More details below.
- **extra_arguments** (*Optional*): Extra options to pass to `ffmpeg`, e.g. image quality or video filter options. More details in [FFmpeg component](/components/ffmpeg).

Most of the Onvif cameras support more than one audio/video Profile. Each profile provides different image quality. Usually,  the first profile has the highest quality, and it is the profile used by default. However, you may want to use a lower quality image. One of the reasons may be that your hardware isn't able to render the highest quality image in real-time - especially when running on Raspberry Pi. Therefore you can choose which profile do you want to use by setting in config `profile` variable. List of profiles that your camera provides is available at entity attributes view.

If you are running into trouble with this sensor, please refer to the [Troubleshooting section](/components/ffmpeg/#troubleshooting).
