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
ha_release: pre 0.7
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
  baseurl: http://localhost/mpd/cover/
  covername: cover.jpg
```

Configuration variables:

- **server** (*Required*): IP address of the Music Player Daemon, eg. 192.168.1.32
- **port** (*Optional*): Port of the Music Player Daemon, defaults to 6600.
- **location** (*Optional*): Location of your Music Player Daemon.
- **password** (*Optional*): Password for your Music Player Daemon.
- **baseurl** (*Optional*): Base url for your cover art.
- **covername** (*Optional*): The name of the file to use for cover art.

To get cover art to work properly you will need to setup a web server that has access to your music directory and have a image of the cover in each album. Here is an example of how to setup nginx.

```yaml
server {
    listen 80; 
    server_name localhost;

    location /mpd/cover/ {
        root /storage/Music/;
        rewrite /mpd/cover/(.*) /$1 break;
    }   
}
```

This platform works with [Music Player Daemon](http://www.musicpd.org/) and [mopidy](https://www.mopidy.com/) with [Mopidy-MPD](https://docs.mopidy.com/en/latest/ext/mpd/) as used by [Pi MusicBox](http://www.pimusicbox.com/).

