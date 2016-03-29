---
layout: page
title: "Panasonic Viera TV"
description: "Instructions on how to integrate a Panasonic Viera TV into Home Assistant."
date: 2016-03-17 13:04
sidebar: true
comments: false
sharing: true
footer: true
logo: Panasonic.png
ha_category: Media Player
featured: false
---

The `panasonic_viera` platform allows you to control a Panasonic Viera TV.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: panasonic_viera
  host: 192.168.0.10
  port: 55000
  name: Living Room TV
```

Configuration variables:

- **host** *Required*: The IP of the Panasonic Viera TV, e.g. `192.168.0.10`
- **port** *Optional*: The port of your Panasonic Viera TV. Defaults to `55000`
- **name** *Optional*: The name you would like to give to the Panasonic Viera TV.

Currently known supported models:

- TX-P42STW50

If your model is not on the list then give it a test, if everything works correctly then add it to the list on [GitHub](https://github.com/balloob/home-assistant.io).
