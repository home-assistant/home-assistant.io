---
layout: page
title: "Plex"
description: "Instructions how to integrate Plex into Home Assistant."
date: 2015-10-05 21:21
sidebar: false
comments: false
sharing: true
footer: true
logo: plex.png
ha_category: Media Player
---

<img src='/images/supported_brands/plex.png' class='brand pull-right' />
The Plex platform allows you to connect a [Plex Media Server](https://plex.tv) to Home Assistant. It will allow you to control media playback and see the current playing item.

To add Plex to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: plex
  name: plex_server
  user: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Configuration variables:

- **name** *Required*: The name of the backend device (Under Plex Media Server > settings > server)
- **user** *Required*: The username for your Pley server.
- **password** *Required*: The password for your Plex server.
