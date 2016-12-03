---
layout: page
title: "Hikvision Camera Switch"
description: "Instructions how to integrate Hikvision camera switches into Home Assistant."
date: 2015-06-10 22:54
sidebar: true
comments: false
sharing: true
footer: true
logo: hikvision.png
ha_category: Switch
ha_release: pre 0.7
---


This `hikvisioncam` switch platform allows you to control your motion detection setting on your [Hikvision](http://www.hikvision.com/) camera.

<p class='note warning'>
Currently works using default https port only.
</p>

To use your Hikvision cam in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: hikvisioncam
    host: 192.168.1.32
```

Configuration variables:

- **host** (*Required*): The IP address of your Hikvision camera, eg. `192.168.1.32`.
- **port** (*Optional*): The port to connect to your Hikvision camera. Defaults to `80`.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **username** (*Optional*): The username for accessing your Hikvision camera. Defaults to `admin`.
- **password** (*Optional*): The password to access your Hikvision camera. Defaults to `12345`.
