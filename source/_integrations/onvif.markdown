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
  - '@jterrace'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - event
  - sensor
  - switch
ha_integration_type: integration
ha_dhcp: true
---

The ONVIF camera integration allows you to use an [ONVIF](https://www.onvif.org/) Profile S conformant device in Home Assistant. This requires the [`ffmpeg` integration](/integrations/ffmpeg/) to be already configured.

{% include integrations/config_flow.md %}

{% tip %}
It is recommended that you create a user on your device specifically for Home Assistant. For all current functionality, it is enough to create a standard user.
{% endtip %}

{% note %}
If running Home Assistant Core in a venv, ensure that libxml2 and libxslt Python interfaces are installed via your package manager.
{% endnote %}

### Configuration notes

Most of the ONVIF devices support more than one audio/video profile. Each profile provides different image quality, or in the case of an NVR, separate connected cameras. This integration will add entities for all compatible profiles with the video encoding set to H.264. Usually, the first profile has the highest quality and it is the profile used by default. However, you may want to use a lower quality image. You may disable unwanted entities through the Home Assistant UI.

{% include integrations/option_flow.md %}

| Option | Description |
| -------| ----------- |
| RTSP transport mechanism | RTSP transport protocols. The possible options are: `tcp`, `udp`, `udp_multicast`, `http`. |
| Extra FFmpeg arguments | Extra options to pass to `ffmpeg`, e.g., image quality or video filter options. More details in [`ffmpeg` integration](/integrations/ffmpeg). |
| Use wallclock as timestamps | ([Advanced Mode](/blog/2019/07/17/release-96/#advanced-mode) only) Rewrite the camera timestamps. This may help with playback or crashing issues from Wi-Fi cameras or cameras of certain brands (e.g., EZVIZ). |
| Enable Webhooks | If the device supports notifications via a Webhook, the integration will attempt to set up a Webhook. Disable this option to force falling back to trying PullPoint if the device supports it. |

#### Snapshots

Some cameras will not produce usable snapshots with larger stream sizes.

By default, the integration will only enable the camera entity for the first H264 profile. If you are unable to get a working snapshot:

- If additional camera entities are available for other profiles, try enabling those entities.
- Set the `Extra FFmpeg arguments` to `-pred 1 -ss 00:00:05 -frames:v 1` to cause the snapshot to be taken 5 seconds into the stream.

### Supported sensors

This integration uses the ONVIF pullpoint subscription API to process events into sensors that will be automatically added to Home Assistant.  Below is a list of currently supported event topics along with the entities they create.

To help with development of this integration, enable `info` level logging for `homeassistant.components.onvif` and create an issue on GitHub for any messages that show _"No registered handler for event"_.

| Topic(s) | Entity Type | Device Class | Description |
|----------|-------------|--------------|-------------|
| Motion alarm | Binary sensor | Motion | Generic motion alarm. |
| Field detection | Binary sensor | Motion | Polygonal field detection determines if each object in the scene is inside or outside the polygon. |
| Cell motion detection | Binary sensor | Motion | Cell based motion detection determined by placing a grid over the video source and determining changes. |
| Human shape detection | Binary sensor | Motion | Detection of human shapes by on-camera recognition algorithm. |
| Motion region detector | Binary sensor | Motion | Detects any motion against the specified motion region. The rule is configured for an area defined by a polygon. |
| Detected sound | Binary sensor | Sound | Device detected sound. |
| Digital input | Binary sensor | None | A digital input was triggered on the device. Amcrest is known to use this as a doorbell button press on the AD410. |
| Relay triggered | Binary sensor | None | Device relay output was triggered. |
| Image too blurry | Binary sensor | Problem | Device reports blurry image. |
| Image too dark | Binary sensor | Problem | Device reports dark image. |
| Image too bright | Binary sensor | Problem | Device reports bright image. |
| Global scene change | Binary sensor | Problem | Device reports a large portion of the video content changing.  The cause can be tamper actions like camera movement or coverage. |
| Tamper detector | Binary sensor | Problem |  Detects any kind of tampering to the image sensor. |
| Storage failure | Binary sensor | Problem | Storage failure on device. |
| Recording job state | Binary sensor | None | Whether or not the device is actively recording. |
| Processor usage | Sensor | Percent | Device processor usage. |
| Last reboot | Sensor | Timestamp | When the device was last rebooted. |
| Last reset | Sensor | Timestamp | When the device was last reset. |
| Last Clock Synchronization | Sensor | Timestamp | When the device clock was last synchronized. |
| Last Backup | Sensor | Timestamp | When the last backup of the device configuration has been retrieved. |

If you are running into trouble with this sensor, please refer to the [Troubleshooting section](/integrations/ffmpeg/#troubleshooting).

### Action `onvif.ptz`

If your ONVIF camera supports <abbr title="pan, tilt, and zoom">PTZ</abbr>, you will be able to pan, tilt or zoom your camera.

| Data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `tilt` | Tilt direction. Allowed values: `UP`, `DOWN`, `NONE` |
| `pan` | Pan direction. Allowed values: `RIGHT`, `LEFT`, `NONE` |
| `zoom` | Zoom. Allowed values: `ZOOM_IN`, `ZOOM_OUT`, `NONE` |
| `distance` | Distance coefficient. Sets how much <abbr title="pan, tilt, and zoom">PTZ</abbr> should be executed in one request. Allowed values: floating point numbers, 0 to 1. Default : 0.1 |
| `speed` | Speed coefficient. Sets how fast PTZ will be executed. Allowed values: floating point numbers, 0 to 1. Default : 0.5 |
| `preset` | PTZ preset profile token. Sets the preset profile token which is executed with GotoPreset. |
| `move_mode` | PTZ moving mode. Allowed values: `ContinuousMove`, `RelativeMove`, `AbsoluteMove`, `GotoPreset`, `Stop`. Default :`RelativeMove` |
| `continuous_duration` | Set ContinuousMove delay in seconds before stopping the move. Allowed values: floating point numbers or integer. Default : 0.5 |

### Supported switches

This integration uses the ONVIF auxiliary command and imaging service to send certain settings and information to the camera via switch entities. Below is a list of currently supported switches.

| Name | Entity Name |  Description |
|----------|-------------|-------------|
| IR lamp  | `ir_lamp` |  Turn infrared lamp on and off via `IrCutFilter` ONVIF imaging setting. |
| Autofocus  | `autofocus` |  Turn autofocus on and off via `AutoFocusMode` ONVIF imaging setting. |
| Wiper  | `wiper` |  Turn on the lens wiper on and off via the `Wiper` ONVIF auxiliary command. |
