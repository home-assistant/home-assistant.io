---
layout: page
title: "Amcrest IP Camera"
description: "Instructions how to integrate Amcrest IP cameras sensors within Home Assistant."
date: 2017-01-13 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: amcrest.png
ha_category: Sensor
ha_release: 0.37
---

The `amcrest` sensor allows you to integrate your [Amcrest](https://amcrest.com/) IP camera in Home Assistant.

To enable the `amcrest` sensors on your camera, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: amcrest
    host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
    monitored_conditions:
      - motion_detector
      - sdcard
      - ptz_preset
```

Configuration variables:

- **host** (*Required*): The IP address or hostname of your camera. If using hostname, make sure the DNS works as expected.
- **username** (*Required*): The username for accessing your camera.
- **password** (*Required*): The password for accessing your camera.
- **name** (*Optional*): This parameter allows you to override the name of your camera. The default is "Amcrest Camera".
- **port** (*Optional*): The port that the camera is running on. The default is 80.
- **scan_interval** (*Optional*): Defines the update interval of the sensor in seconds. The default is 10 seconds.
- **monitored_conditions** array (*Required*): Conditions to display in the frontend. The following conditions can be monitored.
  - **motion_detector**: Return True/False when a motion is detected
  - **sdcard**: Return the SD card usage by reporting the total and used space
  - **ptz_preset**: Return the number of PTZ preset positions configured for the given camera

To check if your Amcrest camera is supported/tested, visit the [supportability matrix](https://github.com/tchellomello/python-amcrest#supportability-matrix) link from the `python-amcrest` project.
