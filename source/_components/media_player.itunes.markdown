---
layout: page
title: "iTunes support"
description: "Instructions how to integrate iTunes into Home Assistant."
date: 2015-06-22 11:00
sidebar: false
comments: false
sharing: true
footer: true
logo: itunes.png
ha_category: Media Player
---

<img src='/images/supported_brands/itunes.png' class='brand pull-right' />
 The iTunes platform allows you to control [iTunes](http://apple.com/itunes/) from Home Assistant.
 It uses a 3rd party server that you run on your Mac called
 [itunes-api](https://github.com/maddox/itunes-api). Play, pause, or skip songs remotely on iTunes
 running on your Mac.

 Your AirPlay speakers will also be exposed as simple media players inside Home
 Assistant. They will be available to be turned on or off or set their volume.

To add iTunes to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: itunes
  name: iTunes
  host: http://192.168.1.50
  port: 8181
```

Configuration variables:

- **host** *Required*: The URL of the itunes-api API, eg. http://192.168.1.50
- **port** *Optional*: The PORT that itunes-api is running on.
