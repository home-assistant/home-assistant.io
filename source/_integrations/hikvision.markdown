---
title: Hikvision
description: Instructions on how to set up Hikvision camera binary sensors within Home Assistant.
ha_category:
  - Binary sensor
ha_release: 0.35
ha_iot_class: Local Push
ha_codeowners:
  - '@mezz64'
ha_domain: hikvision
ha_platforms:
  - binary_sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The Hikvision Binary Sensor is a platform that parses the event stream of a
[Hikvision IP Camera or NVR](https://www.hikvision.com/) and presents the
camera/nvr events to Home Assistant as binary sensors with either an "off" or
"on" state.

The platform will automatically add all sensors to Home Assistant that are
configured within the camera/nvr interface to "Notify the surveillance center"
as a trigger. If you would like to hide a sensor type you can do so by either
unchecking "Notify the surveillance center" in the camera configuration or by
using the "ignored" customize option detailed below.

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
- DS-2CD3132-I
- DS-7616NI-K2 (NVR)
- ERI-K104-PR (NVR)
- IPC-D140H(-M)

This platform also was confirmed to work with the following Hikvison-based NVRS

- N46PCK (Annke H800 4K NVR)
- N48PAW (Annke 4K NVR)

## Configuration

To enable this sensor,
add the following lines are required in your {% term "`configuration.yaml`" %} file:

```yaml
binary_sensor:
  - platform: hikvision
    host: IP_ADDRESS
    username: user
    password: pass
```

{% configuration %}
host:
  description: The IP address of the camera you would like to connect to.
  required: true
  type: string
username:
  description: The username to authenticate with.
  required: true
  type: string
password:
  description: The password to authenticate with.
  required: true
  type: string
name:
  description: >
    The name you would like to give the camera in Home Assistant,
    defaults to name defined in the camera.
  required: false
  type: string
port:
  description: The port to connect to the camera on.
  required: false
  type: integer
  default: 80
ssl:
  description: "`true` if you want to connect with HTTPS. Be sure to set the port also."
  required: false
  type: boolean
  default: false
customize:
  description: >
    This attribute contains sensor-specific override values.
    Only sensor name needs defined:
  required: false
  type: map
  keys:
    ignored:
      description: >
        Ignore this sensor completely. It won't be shown in
        the Web Interface and no events are generated for it.
      required: false
      type: boolean
      default: false
    delay:
      description: >
        Specify the delay to wait after a sensor event ends before notifying
        Home Assistant in seconds. This is useful to catch multiple quick trips
        in one window without the state toggling on and off.
      required: false
      type: integer
      default: 5
{% endconfiguration %}

### Supported types

Supported sensor/event types are:

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

## Examples

Example of a configuration in your {% term "`configuration.yaml`" %}
that utilizes the customize options for a camera:

```yaml
binary_sensor:
  - platform: hikvision
    host: 192.168.X.X
    port: 80
    ssl: false
    username: user
    password: pass
    customize:
      motion:
        delay: 30
      line_crossing:
        ignored: true
```

Example of a configuration in your {% term "`configuration.yaml`" %}
that utilizes the customize options for a nvr:

```yaml
binary_sensor:
  - platform: hikvision
    host: 192.168.X.X
    port: 80
    ssl: false
    username: user
    password: pass
    customize:
      motion_1:
        delay: 30
      field_detection_2:
        ignored: true
```
