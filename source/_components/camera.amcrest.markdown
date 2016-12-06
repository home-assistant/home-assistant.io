---
layout: page
title: "Amcrest Camera"
description: "Instructions how to integrate Amcrest camera into Home Assistant."
date: 2016-12-03 08:10
sidebar: true
comments: false
sharing: true
footer: true
logo: amcrest.png
ha_category: Camera
ha_release: 0.34
---

The `amcrest` platform allows you to watch the live stream of your [Amcrest](https://amcrest.com/) IP camera in Home Assistant.

To enable your Amcrest camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: amcrest
    host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address your camera.
- **port** (*Optional*): The port that the camera is running on. The default is 80. 
- **username** (*Required*): The username for accessing your camera.
- **password** (*Required*): The password for accessing your camera.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
