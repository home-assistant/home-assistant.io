---
layout: page
title: "LG webOS Smart TV"
description: "Instructions how to integrate a LG webOS Smart TV within Home Assistant."
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

The `webostv` platform allows you to control a [LG](http://www.lg.com/) webOS Smart TV.

When the TV is first connected, you will need to accept Home Assistant on the TV to allow communication.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: webostv
```

Configuration variables:

- **host** (*Optional*): The IP of the LG webOS Smart TV, e.g. `192.168.0.10`.
- **mac** (*Optional*): The MAC address of the TV, e.g. `C8:08:E9:99:99:1A`.
- **name** (*Optional*): The name you would like to give to the LG webOS Smart TV.
- **customize** array (*Optional*): List of options to customize.
  - ***sources** array (*Optional*): List of hardware inputs.

If you do not specify `host:`, all LG webOS Smart TVs within your network will be auto-discovered if they use the default name setting of `[LG] webOS TV`.
Home Assistant is able to turn on a LG webOS Smart TV if you specify its MAC address with `mac:`. Some models require the **Mobile TV On** setting and/or a wired network connection to use Wake-on-LAN.

A full configuration example will look like the sample below:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: webostv
    host: 192.168.0.10
    mac: C8:08:E9:99:99:1A
    name: Living Room TV
    customize:
      sources:
        - livetv
        - youtube
        - makotv
```
