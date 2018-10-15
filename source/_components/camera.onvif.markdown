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

{% configuration %}
host:
  description: An IP or hostname of the camera.
  required: true
  type: string
name:
  description: Override the name of your camera.
  required: false
  type: string
username:
  description: The username for the camera.
  required: false
  type: string
password:
  description: The password for the camera.
  required: false
  type: string
port:
  description: The port for the camera.
  required: false
  default: 5000
  type: integer
profile:
  description: Video profile that will be used to obtain the stream, more details below.
  required: false
  default: 0
  type: integer
extra_arguments:
  description: "Extra options to pass to `ffmpeg`, e.g., image quality or video filter options. More details in [FFmpeg component](/components/ffmpeg)."
  required: false
  type: string
{% endconfiguration %}

Most of the Onvif cameras support more than one audio/video Profile. Each profile provides different image quality. Usually, the first profile has the highest quality, and it is the profile used by default. However, you may want to use a lower quality image. One of the reasons may be that your hardware isn't able to render the highest quality image in real-time - especially when running on Raspberry Pi. Therefore you can choose which profile do you want to use by setting in config `profile` variable.

### {% linkable_title Service `camera.onvif_ptz` %}

If your ONVIF camera supports PTZ, you will be able to pan, tilt or zoom your camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Else targets all.
| `tilt` | Tilt direction. Allowed values: `UP`, `DOWN`, `NONE`
| `pan` | Pan direction. Allowed values: `RIGHT`, `LEFT`, `NONE`
| `zoom` | Zoom. Allowed values: `ZOOM_IN`, `ZOOM_OUT`, `NONE`

If you are running into trouble with this sensor, please refer to the [Troubleshooting section](/components/ffmpeg/#troubleshooting).
