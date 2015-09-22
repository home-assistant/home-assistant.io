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
  url: http://192.168.0.123/jsonrpc
  name: Kodi
  user: USERNAME
  password: PASSWORD
```

Configuration variables:

- **url** *Required*: The URL of the XBMC/Kodi JSON-RPC API, eg. http://192.168.0.123/jsonrpc
- **name** *Optional*: The name of the device used in the frontend.
- **username** *Optional*: The XBMC/Kodi HTTP username.
- **password** *Optional*: The XBMC/Kodi HTTP password.
