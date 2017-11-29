---
layout: page
title: "Clementine Music Player"
description: "Instructions how to integrate Clementine Music Player within Home Assistant."
date: 2017-02-11 17:15
sidebar: true
comments: false
sharing: true
footer: true
logo: clementine.png
ha_category: Media Player
ha_iot_class: "Local Poll"
ha_release: "0.39"
ha_iot_class: "Local Polling"
---

The `clementine` platform allows you to control a [Clementine Music Player](https://www.clementine-player.org).

To add a Clementine Player to your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: clementine
    host: 192.168.0.20
```

Configuration variables:

- **host** (*Required*): The IP address of the Clementine Player (eg. 192.168.0.20).
- **port** (*Optional*): The remote control port (default is: 5500).
- **access_token** (*Optional*): The authorization code needed to connect.
- **name** (*Optional*): The name you would like to give to the Clementine player. The default is "Clementine Remote".

Remember that Clementine must be configured to accept connections through its network remote control protocol.

You can configure this through Clementine  `Tools > Preferences > Network remote control` configuration menu. Enable `Use network remote control` and configure the other options for your use case.

This component does not implement the `play_media` service so you cannot add tracks to the playlist.
