---
layout: page
title: "Sonos"
description: "Instructions how to integrateSonos devices into Home Assistant."
date: 2015-09-12 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: sonos.png
ha_category: Media Player
featured: true
---


The `sonos` platform allows you to control your [Sonos](http://www.sonos.com) HiFi wireless speakers and audio components from Home Assistant.

To add your Sonos components to your installation, add the following to your `configuration.yaml` file.  It will perform auto-discovery of your connected speakers.

```yaml
# Example configuration.yaml entry
media_player:
  platform: sonos
```

