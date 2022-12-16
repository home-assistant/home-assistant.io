---
title: Reolink NVR/camera
description: Instructions on how to integrate Reolink devices (NVR/cameras) into Home Assistant.
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 2022.12
ha_domain: reolink
ha_codeowners:
  - '@starkillerOG'
ha_config_flow: true
ha_platforms:
  - Camera
ha_integration_type: integration
---

The integration allows you to control [Reolink](https://reolink.com/) NVRs or cameras.

{% include integrations/config_flow.md %}

## Known reolink firmware bugs

<div class='note warning'>
There is a BUG in Reolink NVR firmware: it only sends ONVIF event-notifications if motion happened on the camera connected to its very first (index "0") channel.
Reolink is aware of this and are working on fixing the problem.
</div>

<div class='note warning'>
Reolink doorbell presses only generate ONVIF event-notifications when the doorbell is directly connected to your network.
When connecting the Reolink doorbell to a NVR, no doorbell press events are generated.
Reolink is aware of this and a solution is already implemented in beta firmware.
</div>

## Services

The Reolink integration supports all default camera [services](https://www.home-assistant.io/integrations/camera/#services) and additionally provides the following services:

### Service `reolink_cctv.set_sensitivity`

Set the motion detection sensitivity of the camera. Either all time schedule presets can be set at once, or a specific preset can be specified.

| Service data attribute  | Optional  | Description  |
| :---------------------- | :-------- | :----------- |
| `entity_id`             | no        | The camera to control.
| `sensitivity`           | no        | The sensitivity to set, a value between 1 (low sensitivity) and 50 (high sensitivity).
| `preset`                | yes       | The time schedule preset to set. Presets can be found in the Web UI of the camera.

### Service `reolink_cctv.set_backlight`

Optimizing brightness and contrast levels to compensate for differences between dark and bright objects using either BLC or WDR mode.
This may improve image clarity in high contrast situations, but it should be tested at different times of the day and night to ensure there is no negative effect.

| Service data attribute  | Optional  | Description  |
| :---------------------- | :-------- | :----------- |
| `entity_id`             | no        | The camera to control.
| `mode`                  | no        | The backlight parameter supports the following values: `BACKLIGHTCONTROL`: use Backlight Control `DYNAMICRANGECONTROL`: use Dynamic Range Control `OFF`: no optimization

### Service `reolink_cctv.set_daynight`

Set the day and night mode parameter of the camera.

| Service data attribute  | Optional  | Description  |
| :---------------------- | :-------- | :----------- |
| `entity_id`             | no        | The camera to control.
| `mode`                  | no        | The day and night mode parameter supports the following values: `AUTO` Auto switch between black & white mode `COLOR` Always record videos in color mode `BLACKANDWHITE` Always record videos in black & white mode.

### Service `reolink_cctv.ptz_control`

Control the PTZ (Pan Tilt Zoom) movement of the camera.

| Service data attribute  | Optional  | Description  |
| :---------------------- | :-------- | :----------- |
| `entity_id`             | no        | The camera to control.
| `command`               | no        | The command to execute. Possibe values are: `AUTO`, `DOWN`, `FOCUSDEC`, `FOCUSINC`, `LEFT`, `LEFTDOWN`, `LEFTUP`, `RIGHT`, `RIGHTDOWN`, `RIGHTUP`, `STOP`, `TOPOS`, `UP`, `ZOOMDEC` and `ZOOMINC`.
| `preset`                | yes       | In case of the command `TOPOS`, pass the preset ID here. The possible presets are listed as attribute on the camera.
| `speed`                 | yes       | The speed at which the camera moves. Not applicable for the commands: `STOP` and `AUTO`.

**The camera keeps moving until the `STOP` command is passed to the service.**

## Camera streams

This integration creates a few camera entities, one for each stream type with diffrent resolutions: Main, Sub, Ext and Images.
The Sub stream camera entity is enabled by default, the other streams are disabled by default.
The Images stream provides a sequence of image snapshots giving very low latency at the cost of a very low frame rate, this can be used when the hi-res RTMP/RTSP video stream are too laggy.

## Configuration options

In the options menu, the following parameters can be configured:

| Parameter               | Description                                                                                                 |
| :-------------------    | :---------------------------------------------------------------------------------------------------------- |
| Protocol                | Switch between the RTMP or RTSP streaming protocol.                                                         |

## Unsupported models

The following models are not to be supported:

- Battery-powered cameras
- B800: Only with NVR
- B400: Only with NVR
- D400: Only with NVR
- Lumus
