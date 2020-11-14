---
title: Reolink
description: Instructions on how to intgrate a Reolink camera within Home Assistant
ha_category:
  - Binary Sensor
  - Camera
  - Switch
ha_release: 0.118
ha_iot_class: Local Polling/Local Push
ha_quality_scale: gold
ha_config_flow: true
ha_codeowners:
  - '@fwestenberg'
ha_domain: reolink
---

The `reolink` implementation allows you to integrate your [Reolink](https://www.reolink.com/) devices in Home Assistant.

You can configure the Reolink integration by going to the integrations page inside the configuration panel.

## Services

The Reolink integration makes a PTZ service, if the configured device has this capability.

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

| Parameter            | Description                                                                                                 |
| :------------------- | :---------------------------------------------------------------------------------------------------------- |
| Stream               | Switch between Sub or Main camera stream.                                                                   |
| Protocol             | Switch between the RTMP or RTSP streaming protocol.                                                         |
| Channel              | When using a single camera, choose stream 0. When using a NVR, switch between the different camera streams. |

## Binary Sensor

When the camera supports motion detection events, a binary sensor is created for real-time motion detection.

## Switch

Depending on the camera, the following switches are created:

This integration creates a camera entity, which can be configured from the integrations page. In the options menu, the following parameters can be configured:

| Switch               | Description |
| :------------------- | :------------------------------------------------------------ |
| Email                | Switch email alerts from the camera when motion is detected.  |
| FTP                  | Switch FTP upload of photo and video when motion is detected. |
| IR lights            | Switch the infrared lights to auto or off                     |
| Motion detection     | Switch motion detection alerts on or off.                     |
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