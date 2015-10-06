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

```yaml
# Example configuration.yaml entry
media_player:
  platform: mpd
  server: IP_ADDRESS
  port: 6600
  location: bedroom
  password: PASSWORD
```

Configuration variables:

- **server** *Required*: IP address of the Music Player Daemon. Example: 192.168.1.32
- **port** *Optional*: Port of the Music Player Daemon, defaults to 6600. Example: 6600
- **location** *Optional*: Location of your Music Player Daemon.
- **password** *Optional*: Password for your Music Player Daemon.
