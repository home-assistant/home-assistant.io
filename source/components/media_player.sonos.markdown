---
layout: page
title: "Sonos support"
description: "Instructions how to integrateSonos devices into Home Assistant."
date: 2015-09-12 13:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/denon.png' class='brand pull-right' />
The sonos platform allows you to control your [Sonos](http://www.sonos.com) HiFi wireless speakers and audio components from Home Assistant.


To add a Sonos devices to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: sonos
```

