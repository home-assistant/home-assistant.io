---
layout: page
title: "iTunes"
description: "Instructions on how to integrate iTunes into Home Assistant."
date: 2015-06-22 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: itunes.png
ha_category: Media Player
ha_release: 0.7.3
ha_iot_class: "Local Polling"
---


The iTunes platform allows you to control [iTunes](http://apple.com/itunes/) from Home Assistant. It uses a 3rd party server that you run on your Mac called [itunes-api](https://github.com/maddox/itunes-api). Play, pause, or skip songs remotely on iTunes running on your Mac.

In addition to controlling iTunes, your available AirPlay endpoints will be added as media players as well. You can then individually address them append turn them on, turn them off, or adjust their volume.

To add iTunes to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: itunes
    host: 192.168.1.50
```

Configuration variables:

- **host** (*Required*): The IP of the itunes-api API, eg. 192.168.1.50
- **port** (*Optional*): The port where itunes-api is accessible, eg. 8181.
