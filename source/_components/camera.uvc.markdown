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


The `uvc` component allows you to integrate [UniFi Video Camera (UVC)](https://www.ubnt.com/products/#unifivideo) into Home Assistant.

The component connects to the Unifi NVR software and automatically discovers/adds any camera connected to the NVR.

<p class='note warning'>
This component uses an unsupported API, so it might break at any time.
</p>

To enable, add the following to your `configuration.yaml` file:

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
- **port** (*Optional*): The port number to use for accessing the NVR. Default is `7080`.
- **password** (*Optional*): The camera password. Defaults to `ubnt` if not given.


It is recommended that you create a new user for this component in the NVR software, and only give the user the permissions it need to operate.

The API-key is found in the specific users `API Access` tab in the NVR software.
The camera password is found in `Settings` -> `Camera Settings` -> `Camera Password` in the NVR software.
