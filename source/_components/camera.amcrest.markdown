---
layout: page
title: Amcrest Video Camera"
description: "Instructions how to integrate Amcrest cameras within Home Assistant."
date: 2016-02-07 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: amcrest.png
ha_category: Camera
ha_release: 0.26
---


The `amcrest` component allows you to integrate [Amcrest Video Camera](https://amcrest.com/ip-cameras.html) into Home Assistant.

To enable a Amcrest camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  platform: amcrest
  ip: IP_ADDRESS
  port: PORT
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **ip** *Required**: The IP or hostname of the IP camera. 
- **port** *Optional*: The port number to use for accessing the NVR.
- **username** *Required*: Username configured for the camera
- **password** *Required*: Password configured for the camera

