---
layout: page
title: "Music Player Daemon support"
description: "Instructions how to integrate Music Player Daemon into Home Assistant."
date: 2015-06-02 08:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/mpd.png' class='brand pull-right' />
The mpd platform allows you to control a [Music Player Daemon](http://www.musicpd.org/) from Home Assistant. Unfortunatly you will not be able to manipulate the playlist (add or delete songs) or add transitions between the songs. 

To add MPD to your installation, add the following to your `configuration.yaml` file:

```
media_player:
  platform: mpd
  server: 127.0.0.1
  port: 6600
  location: bedroom
```

