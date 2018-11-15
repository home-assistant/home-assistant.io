---
layout: page
title: "motionEye Camera"
description: "Instructions on how to integrate motionEye cameraes into Home Assistant."
date: 2018-11-15 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: motioneye.png
ha_category: Camera
ha_release: "0.84"
ha_iot_class: "Local Polling"
---

The `motioneye` camera platform allows you to view the video feeds from motionEye in Home Assistant.

<p class='note'>
  For this platform to work you need to set both `webcontrol_html_output off` and `webcontrol_localhost off` in your `motion.conf` file.
</p>

## {% linkable_title Configuration %}

To enable the camera, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: motioneye
    host: HOST_ADDRESS
```

{% configuration %}
host:
  description: The IP or hostname of the server running motionEye.
  required: true
  type: string
username:
  description: The username used to access motion webcontrol.
  required: false
  type: string
password:
  description: The password used to access motion webcontrol.
  required: false
  type: string
api_port:
  description: The port that motion webcontrol is running on.
  required: false
  type: integer
  default: 7999
web_port:
  description: The port that the motionEye web interface is running on.
  required: false
  type: integer
  default: 8765
ssl:
  description: If `true`, use SSL/TLS to contact motionEye.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Set this to `false` to buypass certificate validation.
  required: false
  default: true
  type: boolean
{% endconfiguration %}
