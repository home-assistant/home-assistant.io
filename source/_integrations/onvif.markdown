---
title: ONVIF
description: Instructions on how to integrate a ONVIF camera within Home Assistant.
ha_category:
  - Camera
ha_release: 0.47
ha_domain: onvif
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
rtsp_transport:
  description: "RTSP transport protocols. The possible options are: `tcp`, `udp`, `udp_multicast`, `http`."
  required: false
  type: string
  default: tcp
extra_arguments:
  description: "Extra options to pass to `ffmpeg`, e.g., image quality or video filter options. More details in [`ffmpeg` component](/integrations/ffmpeg)."
  required: false
  type: string
  default: -q:v 2
{% endconfiguration %}

Most of the ONVIF cameras support more than one audio/video profile. Each profile provides different image quality. Usually, the first profile has the highest quality and it is the profile used by default. However, you may want to use a lower quality image. One of the reasons may be that your hardware isn't able to render the highest quality image in real-time, especially when running on Raspberry Pi. Therefore you can choose which profile do you want to use by setting in configuration `profile` variable.

### Service `onvif.ptz`

If your ONVIF camera supports PTZ, you will be able to pan, tilt or zoom your camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all.
| `tilt` | Tilt direction. Allowed values: `UP`, `DOWN`, `NONE`
| `pan` | Pan direction. Allowed values: `RIGHT`, `LEFT`, `NONE`
| `zoom` | Zoom. Allowed values: `ZOOM_IN`, `ZOOM_OUT`, `NONE`
| `distance` | Distance coefficient. Sets how much PTZ should be executed in one request. Allowed values: floating point numbers, 0 to 1. Default : 0.1
| `speed` | Speed coefficient. Sets how fast PTZ will be executed. Allowed values: floating point numbers, 0 to 1. Default : 0.5
| `preset` | PTZ preset profile token. Sets the preset profile token which is executed with GotoPreset.
| `move_mode` | PTZ moving mode. Allowed values: `ContinuousMove`, `RelativeMove`, `AbsoluteMove`, `GotoPreset`. Default :`RelativeMove`
| `continuous_duration` | Set ContinuousMove delay in seconds before stoping the move. Allowed values: floating point numbers or integer. Default : 0.5

If you are running into trouble with this sensor, please refer to the [Troubleshooting section](/integrations/ffmpeg/#troubleshooting).
