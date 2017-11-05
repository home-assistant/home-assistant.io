---
layout: page
title: "UniFi Video Camera"
description: "Instructions how to integrate UVC cameras within Home Assistant."
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


The `uvc` component allows you to integrate [UniFi Video Camera (UVC)](https://www.ubnt.com/unifi-video/unifi-video-camera/) into Home Assistant.

To enable a UVC camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: uvc
    nvr: IP_ADDRESS
    key: API_KEY
```

Configuration variables:

- **nvr** (*Required*): The IP or hostname of the NVR (Network Video Recorder) server.
- **key** (*Required*): The API key available from the NVR web interface.
- **port** (*Optional*): The port number to use for accessing the NVR.
- **password** (*Optional*): The camera password. Defaults to `ubnt` if not given.
