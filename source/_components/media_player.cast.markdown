---
layout: component
title: "Google Cast"
description: "Instructions how to integrate Google Cast into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: google_cast.png
ha_category: Media Player
---


Google Cast devices will be automatically discovered if you enable [the discovery component]({{site_root}}/components/discovery.html). There is a issue where Chromecasts can only be discovered if your device is connected to the same subnet as your Chromecast.

Chromecast platform can also be forced to load by adding the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
media_player:
  platform: chromecast
  host: 192.168.1.9
```

Configuration variables:

- **host** *Optional*: Use only if you don't want to scan for devices.

<p class='note warning'>
This platform is currently not working due to a changed Cast API.
</p>

