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

This switch platform allows you to control your motion detection setting on your Hikvision camera.

```
# Example configuration.yaml entry
switch:
    platform: hikvisioncam
    name: Hikvision Cam 1 Motion Detection
    host: 192.168.1.26
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```
