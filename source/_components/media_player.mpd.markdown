---
layout: page
title: "Music Player Daemon (MPD)"
description: "Instructions how to integrate Music Player Daemon into Home Assistant."
date: 2015-06-02 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mpd.png
ha_category: Media Player
---


The `mpd` platform allows you to control a [Music Player Daemon](http://www.musicpd.org/) from Home Assistant. Unfortunatly you will not be able to manipulate the playlist (add or delete songs) or add transitions between the songs. 

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

- **server** *Required*: IP address of the Music Player Daemon, eg. 192.168.1.32
- **port** *Optional*: Port of the Music Player Daemon, defaults to 6600.
- **location** *Optional*: Location of your Music Player Daemon.
- **password** *Optional*: Password for your Music Player Daemon.

This platform works with [Music Player Daemon](http://www.musicpd.org/) and [mopidy](https://www.mopidy.com/) with [Mopidy-MPD](https://docs.mopidy.com/en/latest/ext/mpd/) as used by [Pi MusicBox](http://www.pimusicbox.com/).

