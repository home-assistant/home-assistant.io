---
layout: page
title: "Amcrest IP Camera"
description: "Instructions how to integrate Amcrest IP cameras within Home Assistant."
date: 2016-11-24 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: amcrest.png
ha_category: Camera
ha_release: 0.34
---

The `amcrest` platform allows you to integrate your [Amcrest](https://amcrest.com/) IP camera in Home Assistant.

To enable your camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: amcrest
    host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your camera.
- **username** (*Required*): The username for accessing your camera.
- **password** (*Required*): The password for accessing your camera.
- **name** (*Optional*): This parameter allows you to override the name of your camera. The default is "Amcrest Camera".
- **port** (*Optional*): The port that the camera is running on. The default is 80.

