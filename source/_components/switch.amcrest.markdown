---
layout: page
title: "Amcrest IP Camera Switch"
description: "Instructions how to integrate Amcrest IP cameras switches within Home Assistant."
date: 2017-06-02 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: amcrest.png
ha_category: Switch
ha_release: 0.46
---

The `amcrest` switch platform allows you to control your motion detection setting on your [Amcrest](https://amcrest.com/) IP camera.

To enable the `amcrest` switch on your camera, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: amcrest
    host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address or hostname of your camera. If using hostname, make sure the DNS works as expected.
- **username** (*Required*): The username for accessing your camera.
- **password** (*Required*): The password for accessing your camera.
- **name** (*Optional*): This parameter allows you to override the name of your camera. The default is "Amcrest".
- **port** (*Optional*): The port that the camera is running on. The default is 80.

To check if your Amcrest camera is supported/tested, visit the [supportability matrix](https://github.com/tchellomello/python-amcrest#supportability-matrix) link from the `python-amcrest` project.
