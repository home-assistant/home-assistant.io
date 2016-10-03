---
layout: page
title: "LG WebOS TV"
description: "Instructions how to integrate a LG WebOS TV within Home Assistant."
date: 2016-04-18 23:24
sidebar: true
comments: false
sharing: true
footer: true
logo: webos.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: 0.18
---

The `webostv` platform allows you to control a [LG](http://www.lg.com) WebOS Smart TV.

When the TV is first connected, you will need to accept Home Assistant on the TV to allow communication.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: webostv
    host: 192.168.0.10
```

Configuration variables:

- **host** (*Optional*): The IP of the LG WebOS Smart TV, eg. 192.168.0.10
- **name** (*Optional*): The name you would like to give to the LG WebOS Smart TV.
- **customize** array (*Optional*): List of options to customize.
  - ***sources** array (*Optional*): List of hardware inputs.

If you do not provide a host name, all LG WebOS Smart TV's within your network will be auto-discovered if your TV network name is set to `[LG] webOS TV`.

A full configuration example will look like the sample below:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: webostv
    host: 192.168.0.10
    name: Living Room TV
    customize:
      sources:
        - livetv
        - youtube
        - makotv
```
