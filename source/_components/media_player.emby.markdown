---
layout: page
title: "Emby"
description: "Instructions how to integrate Emby into Home Assistant."
date: 2016-08-03 23:47
sidebar: true
comments: false
sharing: true
footer: true
logo: emby.png
ha_category: Media Player
featured: true
ha_release: ?
---


The `emby` platform allows you to connect an [Emby Media Server](http://emby.media/) to Home Assistant. It will allow you to control media playback and see the current playing item.

To configure the emby platform, you must first generate an api key from your emby server.

First go to Settings and click "Advanced"

<p class='img'>
  <img src='{{site_root}}/images/screenshots/plex-key1.png' />
</p>

Then click on the "Security" tab

<p class='img'>
  <img src='{{site_root}}/images/screenshots/plex-key2.png' />
</p>

And last, add a new key. You can name it whatever you want, as the name is only for your own reference.

Next you need to enable the emby platform in your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
media_player:
  platform: emby
```

Then, you need to create a `~/.homeassistant/emby.conf` like this:

```json
{"IP_ADDRESS:PORT": {"token": "TOKEN"}}
```

- **IP_ADDRESS** (*Required*): IP address of the Emby Media Server
- **PORT** (*Required*): Port where Emby is listening. Default is 8086
- **TOKEN** (*Required*): The api key you created before.

At this moment, the Emby platform only supports one Emby Media Server.
