---
layout: page
title: "Volumio Media Player"
description: "How to set up the Volumio media player platform"
date: 2017-03-04
sidebar: true
comments: false
sharing: true
footer: true
logo: volumio.png
ha_category: Media Player
ha_release: 0.41
---

The `Volumio` platform allows you to control a [Volumio](http://volumio.org) media player
from Home Assistant.


To add a Volumio player to your installation, add the following to
your `configuration.yaml` file.

```yaml
# Example configuration.yaml entry
media_player:
  - platform: volumio
    host: homeaudio.local
    port: 3000
```

Configuration variables:

- **name** (*Optional*): Name of the device
- **host** (*Required*): IP address or hostname of the device
- **port** (*Required*): Port number of Volumio service
