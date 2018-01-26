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
- **port** (*Optional*): The port for the camera. This defaults to 5000
- **extra_arguments** (*Optional*): Extra options to pass to `ffmpeg`, e.g. image quality or video filter options. More details in [FFmpeg component](/components/ffmpeg).

If you are running into trouble with this sensor, please refer to the [Troubleshooting section](/components/ffmpeg/#troubleshooting).
