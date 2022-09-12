---
title: ONVIF
description: Instructions on how to integrate a ONVIF camera within Home Assistant.
ha_category:
  - Camera
ha_release: 0.47
ha_iot_class: Local Push
ha_domain: onvif
ha_codeowners:
  - '@hunterjm'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - sensor
ha_integration_type: integration
---

The `onvif` camera platform allows you to use an [ONVIF](https://www.onvif.org/) Profile S conformant device in Home Assistant. This requires the [`ffmpeg` component](/integrations/ffmpeg/) to be already configured.

{% include integrations/config_flow.md %}

<div class='note'>
  It is recommended that you create a user on your device specifically for Home Assistant. For all current functionality, it is enough to create a standard user.
</div>

<div class='note'>
If running Home assistant Core in a venv, ensure that libxml2 and libxslt python interfaces are installed via your package manager.
</div>

### Configuration Notes

Most of the ONVIF devices support more than one audio/video profile. Each profile provides different image quality, or in the case of an NVR, separate connected cameras. This integration will add entities for all compatible profiles with the video encoding set to H.264. Usually, the first profile has the highest quality and it is the profile used by default. However, you may want to use a lower quality image. You may disable unwanted entities through the Home Assistant UI.

### Extra configuration of the integration

You can configure specific FFmpeg options through the integration options flow by clicking the gear icon on the top right of the integration details page.

| Option | Description |
| -------| ----------- |
| RTSP transport mechanism | RTSP transport protocols. The possible options are: `tcp`, `udp`, `udp_multicast`, `http`. |
| Extra FFmpeg arguments | Extra options to pass to `ffmpeg`, e.g., image quality or video filter options. More details in [`ffmpeg` component](/integrations/ffmpeg). |
| Use wallclock as timestamps | ([Advanced Mode](/blog/2019/07/17/release-96/#advanced-mode) only) Rewrite the camera timestamps. This may help with playback or crashing issues from Wi-Fi cameras or cameras of certain brands (e.g., EZVIZ). |

### Supported Sensors

This integration uses the ONVIF pullpoint subscription API to process events into sensors that will be automatically added to Home Assistant.  Below is a list of currently supported event topics along with the entities they create.

To help with development of this component, enable `info` level logging for `homeassistant.components.onvif` and create an issue on GitHub for any messages that show _"No registered handler for event"_.

| Topic(s) | Entity Type | Device Class | Description |
|----------|-------------|--------------|-------------|
| Motion Alarm | Binary Sensor | Motion | Generic motion alarm. |
| Field Detection | Binary Sensor | Motion | Polygonal field detection determines if each object in the scene is inside or outside the polygon. |
| Cell Motion Detection | Binary Sensor | Motion | Cell based motion detection determined by placing a grid over the video source and determining changes. |
| Motion Region Detector | Binary Sensor | Motion | Detects any motion against the specified motion region. The rule is configured for an area defined by a polygon. |
| Detected Sound | Binary Sensor | Sound | Device detected sound. |
| Digital Input | Binary Sensor | None | A digital input was triggered on the device. Amcrest is known to use this as a doorbell button press on the AD410. |
| Relay Triggered | Binary Sensor | None | Device relay output was triggered. |
| Image Too Blurry | Binary Sensor | Problem | Device reports blurry image. |
| Image Too Dark | Binary Sensor | Problem | Device reports dark image. |
| Image Too Bright | Binary Sensor | Problem | Device reports bright image. |
| Global Scene Change | Binary Sensor | Problem | Device reports a large portion of the video content changing.  The cause can be tamper actions like camera movement or coverage. |
| Tamper Detector | Binary Sensor | Problem |  Detects any kind of tampering to the image sensor. |
| Storage Failure | Binary Sensor | Problem | Storage failure on device. |
| Recording Job State | Binary Sensor | None | Whether or not the device is actively recording. |
| Processor Usage | Sensor | Percent | Device processor usage. |
| Last Reboot | Sensor | Timestamp | When the device was last rebooted. |
| Last Reset | Sensor | Timestamp | When the device was last reset. |
| Last Clock Synchronization | Sensor | Timestamp | When the device clock was last synchronized. |
| Last Backup | Sensor | Timestamp | When the last backup of the device configuration has been retrieved. |

### Service `onvif.ptz`

If your ONVIF camera supports PTZ, you will be able to pan, tilt or zoom your camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `tilt` | Tilt direction. Allowed values: `UP`, `DOWN`, `NONE` |
| `pan` | Pan direction. Allowed values: `RIGHT`, `LEFT`, `NONE` |
| `zoom` | Zoom. Allowed values: `ZOOM_IN`, `ZOOM_OUT`, `NONE` |
| `distance` | Distance coefficient. Sets how much PTZ should be executed in one request. Allowed values: floating point numbers, 0 to 1. Default : 0.1 |
| `speed` | Speed coefficient. Sets how fast PTZ will be executed. Allowed values: floating point numbers, 0 to 1. Default : 0.5 |
| `preset` | PTZ preset profile token. Sets the preset profile token which is executed with GotoPreset. |
| `move_mode` | PTZ moving mode. Allowed values: `ContinuousMove`, `RelativeMove`, `AbsoluteMove`, `GotoPreset`, `Stop`. Default :`RelativeMove` |
| `continuous_duration` | Set ContinuousMove delay in seconds before stopping the move. Allowed values: floating point numbers or integer. Default : 0.5 |

If you are running into trouble with this sensor, please refer to the [Troubleshooting section](/integrations/ffmpeg/#troubleshooting).
