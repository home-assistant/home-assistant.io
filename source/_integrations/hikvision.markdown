---
title: Hikvision
description: Instructions on how to set up Hikvision cameras and NVRs within Home Assistant.
ha_category:
  - Binary sensor
  - Camera
ha_release: 0.35
ha_iot_class: Local Push
ha_codeowners:
  - '@mezz64'
  - '@ptarjan'
ha_domain: hikvision
ha_platforms:
  - binary_sensor
  - camera
ha_integration_type: integration
ha_quality_scale: bronze
ha_config_flow: true
---

The **Hikvision** {% term integration %} connects your [Hikvision IP Camera or <abbr title="Network Video Recorder">NVR</abbr>](https://www.hikvision.com/) to Home Assistant, providing:

- Binary sensors that parse the event stream and present camera/NVR events as sensors with either an "off" or "on" state
- Camera entities with <abbr title="Real Time Streaming Protocol">RTSP</abbr> streaming and <abbr title="Hypertext Transfer Protocol">HTTP</abbr> snapshot capabilities

The platform will automatically add all sensors to Home Assistant that are
configured within the camera/nvr interface to "Notify the surveillance center"
as a trigger. If you would like to hide a sensor type you can do so by
unchecking "Notify the surveillance center" in the camera configuration.

{% important %}
In order for the sensors to work the hikvision user must have the 'Remote: Notify Surveillance Center/Trigger Alarm Output' permission which can be enabled from the user management section of the web interface. If authentication issues persist after permissions are verified, try accessing using an admin user. Certain devices will only authenticate with an admin account despite permissions being set correctly.
Also, the 'WEB Authentication' needs to be set to 'digest/basic' in the security/authentication section. Ensure this is applied on each individual camera in case of using an NVR.
{% endimportant %}

For example, if you configure a camera with the name "Front Porch" that has
motion detection and line crossing events enabled to notify the surveillance
center the following binary sensors will be added to Home Assistant:

```text
binary_sensor.front_porch_motion
binary_sensor.front_port_line_crossing
```

When used with a NVR device the sensors will be appended with the channel number
they represent. For example,
if you configure an NVR with the name "Home" that supports 2 cameras with
motion detection and line crossing events enabled to notify the surveillance
center the following binary sensors will be added to Home Assistant:

```text
binary_sensor.home_motion_1
binary_sensor.home_motion_2
binary_sensor.home_line_crossing_1
binary_sensor.home_line_crossing_2
```

This platform should work with all Hikvision cameras and nvrs,
and has been confirmed to work with the following models:

- DS-2CD2032-I
- DS-2CD2042WD-I
- DS-2CD2043G0-I
- DS-2CD2142FWD-I
- DS-2CD2155FWD-IS
- DS-2CD2232-I5
- DS-2CD2385G1
- DS-2CD2387G2-LU
- DS-2CD2686G2
- DS-2CD3132-I
- DS-7616NI-K2 (NVR)
- ERI-K104-PR (NVR)
- IPC-D140H(-M)

This platform also was confirmed to work with the following Hikvison-based NVRS

- N46PCK (Annke H800 4K NVR)
- N48PAW (Annke 4K NVR)

{% include integrations/config_flow.md %}

## Camera

The integration creates camera entities for each video channel on your Hikvision device. These camera entities support:

- RTSP streaming: Live video streaming using the RTSP protocol
- HTTP snapshots: Still image capture via the camera's HTTP API

### NVR video channel discovery

When connecting to an NVR (Network Video Recorder) that manages multiple cameras, the integration automatically discovers all video channels. A separate camera entity is created for each channel, allowing you to view and manage each connected camera individually.

For example, if you configure an NVR named "Home" with 4 connected cameras, the following camera entities will be created:

```text
camera.home_channel_1
camera.home_channel_2
camera.home_channel_3
camera.home_channel_4
```

## Binary sensor

### Event notification methods

The integration detects events using the camera's event stream. For standalone cameras, events configured to "Notify the surveillance center" are automatically detected.

For NVR devices, the integration supports extended event detection with additional notification methods beyond the standard "center" and "HTTP" methods. The following notification triggers are supported:

- Center: Notify the surveillance center (standard method)
- HTTP: HTTP notification
- Record: Recording trigger
- Email: Email notification trigger
- Beep: Audible beep notification

This extended support allows detection of events that may be configured with non-standard notification methods on your NVR, which some devices use by default.

### Supported event types

Supported event types are:

- Motion
- Line Crossing
- Field Detection
- Tamper Detection
- Shelter Alarm
- Disk Full
- Disk Error
- Net Interface Broken
- IP Conflict
- Illegal Access
- Video Mismatch
- Bad Video
- PIR Alarm
- Face Detection
- Scene Change Detection
- I/O
- Unattended Baggage
- Attended Baggage
- Recording Failure
- Exiting Region
- Entering Region

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
