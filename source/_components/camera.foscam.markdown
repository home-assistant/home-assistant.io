---
layout: page
title: "Foscam IP Camera"
description: "Instructions how to integrate Foscam IP cameras within Home Assistant."
date: 2015-09-17 08:01
sidebar: true
comments: false
sharing: true
footer: true
logo: foscam.png
ha_category: Camera
---


The `foscam` platform allows you to watch the live stream of your [Foscam](http://www.foscam.com/) IP camera in Home Assistant.

To enable your Foscam IP camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  platform: foscam
  ip: 192.168.0.123
  name: Door Camera
  port: 88
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **ip** *Required*: The IP address your camera.
- **port** *Optional*: The port that the camera is running on. The default is 88. 
- **name** *Optional*: This parameter allows you to override the name of your camera.
- **username** *Required*: The username for accessing your camera.
- **password** *Required*: The password for accessing your camera.
  - **Note**: There seems to be some issues within Foscam with lengthy passwords and passwords containing certain symbols. Be sure to check your camera's documentation.
 
### {% linkable_title Control Foscam PTZ (Pan/Tilt/Zoom) - Home/Away %}
 Foscam Webcams which support CGI Commands can be controlled by Home Assistant ([Source](http://www.ipcamcontrol.net/files/Foscam%20IPCamera%20CGI%20User%20Guide-V1.0.4.pdf)). For an example of how this can be done, see the [Foscam IP Camera Pan, Tilt, Zoom Control](/cookbook/foscam_away_mode_PTZ/) Cookbook entry.
