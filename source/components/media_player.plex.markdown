---
layout: page
title: "Plex"
description: "Instructions how to integrate Plex into Home Assistant."
date: 2015-10-05 21:21
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/plex.png' class='brand pull-right' />
The Plex platform allows you to connect a [Plex Media Server](https://plex.tv) to Home Assistant.
It will allow you to control media playback and see the current playing item.


```yaml
# Example configuration.yaml entry
media_player:
  platform: plex
  # The name of the backend device (Under Plex Media Server > settings > server)
  name: plex_server
  user: your_username
  password: your_secure_password
```
