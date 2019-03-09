---
layout: page
title: "Foscam IP Camera"
description: "Instructions on how to integrate Foscam IP cameras within Home Assistant."
date: 2015-09-17 08:01
sidebar: true
comments: false
sharing: true
footer: true
logo: foscam.png
ha_category: Camera
ha_iot_class: "Local Polling"
---

The `foscam` platform allows you to watch the live stream of your [Foscam](http://www.foscam.com/) IP camera in Home Assistant.

## {% linkable_title Configuration %}

To enable your Foscam IP camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: foscam
    ip: IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
ip:
  description: The IP address your camera.
  required: true
  type: string
port:
  description: The port that the camera is running on.
  required: false
  default: 88
  type: integer
username:
  description: The username for accessing your camera.
  required: true
  type: string
password:
  description: The password for accessing your camera.
  required: true
  type: string
name:
  description: This parameter allows you to override the name of your camera.
  required: false
  type: string
{% endconfiguration %}

<p class='note'>
There seems to be some issues within Foscam with lengthy passwords and passwords containing certain symbols. Be sure to check your camera's documentation.
</p>

### {% linkable_title Control Foscam PTZ (Pan/Tilt/Zoom) - Home/Away %}

 Foscam Webcams which support CGI Commands can be controlled by Home Assistant ([Source](http://www.ipcamcontrol.net/files/Foscam%20IPCamera%20CGI%20User%20Guide-V1.0.4.pdf)). For an example of how this can be done, see the [Foscam IP Camera Pan, Tilt, Zoom Control](/cookbook/foscam_away_mode_PTZ/) Cookbook entry.
