---
title: ONVIF
description: Instructions on how to integrate a ONVIF camera within Home Assistant.
ha_category:
  - Camera
ha_release: 0.47
ha_domain: onvif
---

The `onvif` camera platform allows you to use an [ONVIF](https://www.onvif.org/) Profile S conformant device in Home Assistant. This requires the [`ffmpeg` component](/integrations/ffmpeg/) to be already configured.

## Configuration

Home Assistant offers ONVIF integration through **Configuration** -> **Integrations** -> **ONVIF**. Follow the instructions to get it set up.

<div class='note'>
  It is recommended that you create a user on your device specifically for Home Assistant. For all current functionality, it is enough to create a standard user.
</div>

You can configure specific FFmpeg options through the integration options flow by clicking the gear icon on the top right of the integration details page.

{% configuration %}
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

Most of the ONVIF devices support more than one audio/video profile. Each profile provides different image quality, or in the case of an NVR, separate connected cameras. This integration will add entities for all compatible profiles with the video encoding set to H254. Usually, the first profile has the highest quality and it is the profile used by default. However, you may want to use a lower quality image. You may disable unwanted entities through the Home Assistant UI.

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
| `move_mode` | PTZ moving mode. Allowed values: `ContinuousMove`, `RelativeMove`, `AbsoluteMove`. Default :`RelativeMove`
| `continuous_duration` | Set ContinuousMove delay in seconds before stoping the move. Allowed values: floating point numbers or integer. Default : 0.5

If you are running into trouble with this sensor, please refer to the [Troubleshooting section](/integrations/ffmpeg/#troubleshooting).
