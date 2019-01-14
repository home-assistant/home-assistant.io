---
layout: page
title: "UniFi Video Camera"
description: "Instructions on how to integrate UVC cameras within Home Assistant."
date: 2016-02-07 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ubiquiti.png
ha_category: Camera
ha_release: 0.13
ha_iot_class: "Local Polling"
---

The `uvc` camera platform allows you to integrate [UniFi Video Camera (UVC)](https://www.ubnt.com/products/#unifivideo) into Home Assistant.

The platform connects to the Unifi NVR software and automatically discovers/adds any camera connected to the NVR.

### {% linkable_title Setup %}

It is recommended that you create a new user for this platform in the NVR software and only give the user the permissions it need to operate.

- The API key is found in `User` -> `My account` -> `API Access` in the NVR software.
- The camera password is found in `Settings` -> `Camera Settings` -> `Camera Password` in the NVR software.

### {% linkable_title Configuration %}

To enable, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: uvc
    nvr: IP_ADDRESS
    key: API_KEY
    ssl: USE_SSL
```

{% configuration %}
nvr:
  description: The IP or hostname of the NVR (Network Video Recorder) server.
  required: true
  type: string
port:
  description: The port number to use for accessing the NVR.
  required: false
  type: integer
  default: 7080
key:
  description: The API key available from the NVR web interface.
  required: true
  type: string
password:
  description: The camera password.
  required: false
  type: string
  default: ubnt
ssl:
  description: Should use SSL/TLS to connect to the NVR.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

<p class='note'>
When using an API_KEY to access cameras controlled by Ubiquiti's NVR Software, the associated user account MUST have at least Administrator privileges within the NVR Software in order for new cameras to be added into Home Assistant. Once the entities have been created in Home Assistant, privileges for the user account can be lowered.
</p>

