---
title: Reolink
description: Instructions on how to intgrate a Reolink camera within Home Assistant
ha_category:
  - Binary Sensor
  - Camera
  - Switch
ha_release: 0.118
ha_iot_class: Local Polling/Local Push
ha_quality_scale: platinum 
ha_config_flow: true
ha_codeowners:
  - '@fwestenberg'
ha_domain: reolink
---

The `reolink` implementation allows you to integrate your [Reolink](https://www.reolink.com/) devices in Home Assistant.

You can configure the Reolink integration by going to the integrations page inside the configuration panel.

## Services

The Reolink integration supports all default camera [services](https://www.home-assistant.io/integrations/camera/#services) and additionally provides the following services:

### Service `reolink.set_sensitivity`

Set the motion detection sensitivity of the camera. Either all time schedule presets can be set at once, or a specific preset can be specified.

| Service data attribute  | Optional  | Description  |
| :---------------------- | :-------- | :----------- |
| `entity_id`             | no        | The camera to control.
| `sensitivity`           | no        | The sensitivity to set, a value between 1 (low sensitivity) and 50 (high sensitivity).
| `preset`                | yes       | The time schedule preset to set. Presets can be found in the Web UI of the camera.

### Service `reolink.set_daynight`

Set the day and night mode parameter of the camera.  

| Service data attribute  | Optional  | Description  |
| :---------------------- | :-------- | :----------- |
| `entity_id`             | no        | The camera to control.
| `mode`                  | no        | The day and night mode parameter supports the following values: `AUTO` Auto switch between black & white mode `COLOR` Always record videos in color mode `BLACKANDWHITE` Always record videos in black & white mode.

### Service `reolink.ptz_control`

Control the PTZ (Pan Tilt Zoom) movement of the camera.

| Service data attribute  | Optional  | Description  |
| :---------------------- | :-------- | :----------- |
| `entity_id`             | no        | The camera to control.
| `command`               | no        | The command to execute. Possibe values are: `AUTO`, `DOWN`, `FOCUSDEC`, `FOCUSINC`, `LEFT`, `LEFTDOWN`, `LEFTUP`, `RIGHT`, `RIGHTDOWN`, `RIGHTUP`, `STOP`, `TOPOS`, `UP`, `ZOOMDEC` and `ZOOMINC`.
| `preset`                | yes       | In case of the command `TOPOS`, pass the preset ID here. The possible presets are listed as attribute on the camera.
| `speed`                 | yes       | The speed at which the camera moves. Not applicable for the commands: `STOP` and `AUTO`.

<div class='note'>
The camera keeps moving until the `STOP` command is passed to the service.
</div>

## Camera

This integration creates a camera entity, providing a live-stream configurable from the integrations page. In the options menu, the following parameters can be configured:

| Parameter               | Description                                                                                                 |
| :-------------------    | :---------------------------------------------------------------------------------------------------------- |
| Stream                  | Switch between Sub or Main camera stream.                                                                   |
| Protocol                | Switch between the RTMP or RTSP streaming protocol.                                                         |
| Channel                 | When using a single camera, choose stream 0. When using a NVR, switch between the different camera streams. |

## Binary Sensor

When the camera supports motion detection events, a binary sensor is created for real-time motion detection. The time to switch motion detection off can be configured via the options menu, located at the integrations page.

| Parameter               | Description                                                                                                 |
| :-------------------    | :---------------------------------------------------------------------------------------------------------- |
| Motion sensor off delay | Control how many seconds it takes (after the last motion detection) for the binary sensor to switch off.    |

## Switch

Depending on the camera, the following switches are created:

This integration creates a camera entity, which can be configured from the integrations page. In the options menu, the following parameters can be configured:

| Switch               | Description |
| :------------------- | :------------------------------------------------------------ |
| Email                | Switch email alerts from the camera when motion is detected.  |
| FTP                  | Switch FTP upload of photo and video when motion is detected. |
| IR lights            | Switch the infrared lights to auto or off.                    |
| Record audio         | Record auto or mute. This also implies the live-stream.       |
| Recording            | Switch recording to the SD card.                              |

## Unsupported models

The following models are not to be supported:

- B800
- B400
- D400
- E1
- E1 Pro
- Battery-powered cameras