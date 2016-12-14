---
layout: page
title: Hikvision Binary Sensor
description: "Instructions on how to set up Hikvision camera binary sensors within Home Assistant."
date: 2016-12-08
sidebar: true
comments: false
sharing: true
footer: true
logo: hikvision.png
ha_category: Binary Sensor
ha_release: 0.35
ha_iot_class: "Local Push"
---

The Hikvision Binary Sensor is a platform that parses the event stream of a [Hikvision IP Camera](http://www.hikvision.com/) and presents the camera events to Home Assistant as binary sensors with either an "off" or "on" state.

The platform will automatically add all sensors to Home Assistant that are configured within the camera interface to "Notify the surveillance center" as a trigger.  If you would like to hide a sensor type you can do so by either unchecking "Notify the surveillance center" in the camera configuration or by using the "ignored" customize option detailed below.

For example, if you configure a camera with the name "Front Porch" that has motion detection and line crossing events enabled to notify the surveillance center the following binary sensors will be added to Home Assistant:

```
binary_sensor.front_porch_motion
binary_sensor.front_port_line_crossing
```

This platform should work with all Hikvision cameras, and has been confirmed to work with the following models:
- DS-2CD3132-I
- DS-2CD2232-I5
- DS-2CD2032-I
- DS-2CD2142FWD-I

To enable this sensor, the following lines are required in your `configuration.yaml`:

```yaml
binary_sensor:
  platform: hikvision
  host: IP_ADDRESS
  username: user
  password: pass
```

Configuration options for a Hikvision Sensor:

- **name** (*Optional*): The name you'd like to give the camera in Home Assistant, defaults to name defined in the camera.
- **host** (*Required*): The IP address of the camera you would like to connect to.
- **port** (*Optional*): The port to connect to the camera on, defaults to 80.
- **ssl** (*Optional*): True if you want to connect with https. Be sure to set the port also.
- **username** (*Required*): The username to authenticate with.
- **password** (*Required*): The password to authenticate with.
- **customize** (*Optional*): This attribute contains sensor-specific override values. Only sensor name needs defined:
  - **ignored** (*Optional*): Ignore this sensor completely. It won't be shown in the Web Interface and no events are generated for it.
  - **delay** (*Optional*): Specify the delay to wait after a sensor event ends before notifying Home Assistant. This is useful to catch multiple quick trips in one window without the state toggling on and off.  The default delay is 5 seconds.

Supported sensor/event types are:
- Motion
- IO Trigger
- Line Crossing
- Field Detection
- Video Loss
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


Example of a configuration in your `configuration.yaml` that utilizes the customize options:

```yaml
binary_sensor:
  platform: hikvision
  host: 192.168.X.X
  port: 80
  ssl: False
  username: user
  password: pass
  customize:
    sensor_name_1:
      delay: 30
    sensor_name_2:
      ignored: True
```
