---
title: ONVIF
description: Instructions on how to integrate a ONVIF camera within Home Assistant.
logo: onvif.png
ha_category:
  - Camera
ha_release: 0.47
---

The `onvif` camera platform allows you to use an [ONVIF](https://www.onvif.org/) camera in Home Assistant. This requires the [`ffmpeg` component](/integrations/ffmpeg/) to be already configured.

## Configuration

To enable your ONVIF camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: onvif
    host: 192.168.1.111
```

{% configuration %}
host:
  description: The IP address or hostname of the camera.
  required: true
  type: string
name:
  description: Override the name of your camera.
  required: false
  type: string
  default: ONVIF Camera
username:
  description: The username for the camera.
  required: false
  type: string
  default: admin
password:
  description: The password for the camera.
  required: false
  type: string
  default: 888888
port:
  description: The (HTTP) port for the camera.
  required: false
  type: integer
  default: 5000
profile:
  description: Video profile that will be used to obtain the stream, more details below.
  required: false
  type: integer
  default: 0
extra_arguments:
  description: "Extra options to pass to `ffmpeg`, e.g., image quality or video filter options. More details in [`ffmpeg` component](/integrations/ffmpeg)."
  required: false
  type: string
  default: -q:v 2
{% endconfiguration %}

Most of the ONVIF cameras support more than one audio/video profile. Each profile provides different image quality. Usually, the first profile has the highest quality and it is the profile used by default. However, you may want to use a lower quality image. One of the reasons may be that your hardware isn't able to render the highest quality image in real-time, especially when running on Raspberry Pi. Therefore you can choose which profile do you want to use by setting in config `profile` variable.

### Service `camera.onvif_ptz`

If your ONVIF camera supports PTZ, you will be able to pan, tilt or zoom your camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Else targets all.
| `tilt` | Tilt direction. Allowed values: `UP`, `DOWN`, `NONE`
| `pan` | Pan direction. Allowed values: `RIGHT`, `LEFT`, `NONE`
| `zoom` | Zoom. Allowed values: `ZOOM_IN`, `ZOOM_OUT`, `NONE`

If you are running into trouble with this sensor, please refer to the [Troubleshooting section](/integrations/ffmpeg/#troubleshooting).
