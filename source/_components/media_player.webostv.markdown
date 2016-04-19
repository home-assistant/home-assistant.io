---
layout: page
title: "LG WebOS TV"
description: "Instructions how to integrate a LG WebOS TV within Home Assistant."
date: 2016-04-18 23:24
sidebar: true
comments: false
sharing: true
footer: true
logo: webostv.png
ha_category: Media Player
ha_iot_class: "Local Poll"
--------------------------


The `webostv` platform allows you to control a LG WebOS Smart TV.

When the TV is first connected, you will need to accept Home Assistant on the TV to allow communication.

To add a TV to your installation, add the following to your `configuration.yaml` file and follow the configurator instructions:

```yaml
# Example configuration.yaml entry
media_player:
  platform: webostv
  host: 192.168.0.10
  name: Living Room TV
```

Configuration variables:

- **host** *Optional*: The IP of the LG WebOS Smart TV, e.g. 192.168.0.10
- **name** *Optional*: The name you would like to give to the LG WebOS Smart TV.

If you do not provide a host name, all LG WebOS Smart TV's within your network will be auto-discovered if your TV network name is set to `[LG] webOS TV`