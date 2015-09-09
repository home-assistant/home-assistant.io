---
layout: page
title: "Hikvision camera support"
description: "Instructions how to integrate Hikvision camera's into Home Assistant."
date: 2015-06-10 22:54
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/hikvision.png' class='brand pull-right' />
This hikvisioncam switch platform allows you to control your motion detection setting on your [Hikvision](http://www.hikvision.com/) camera.

To use your Hikvision cam in your installation, add the following to your `configuration.yaml` file:

```
# Example configuration.yaml entry
switch:
    platform: hikvisioncam
    host: 192.168.1.32
    name: Hikvision Cam 1 Motion Detection
    username: USERNAME
    password: PASSWORD
```

Configuration variables:

- **host** *Required*: The IP address of your Hikvision camera, eg. 192.168.1.32
- **name** *Optional*: This parameter allows you to override the name of your camera.
- **username** *Required*: The username for accessing your Hikvision camera.
- **password** *Required*: The password to access your Hikvision camera.
