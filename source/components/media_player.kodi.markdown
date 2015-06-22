---
layout: page
title: "Kodi support"
description: "Instructions how to integrate Kodi into Home Assistant."
date: 2015-06-22 11:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/kodi.png' class='brand pull-right' />
The kodi platform allows you to control a [Kodi](http://kodi.tv/) multimedia system from Home Assistant.

To add Kodi to your installation, add the following to your `configuration.yaml` file:

```
# Example configuration.yaml entry
media_player:
  platform: kodi
  name: Kodi
  url: http://192.168.0.123/jsonrpc
  user: kodi
  password: my_secure_password
```

