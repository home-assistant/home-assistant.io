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
- **turn_on_action** (*Optional*): Defines an [action](/docs/automation/action/) to turn the TV on.
- **name** (*Optional*): The name you would like to give to the LG webOS Smart TV.
- **timeout** (*Optional*): The timeout for connections to the TV in seconds.
- **filename** (*Optional*): The filename where the pairing key with the TV should be stored. This path is relative to Home Assistant's config directory. It defaults to `webostv.conf`.
- **customize** array (*Optional*): List of options to customize.
  - ***sources** array (*Optional*): List of hardware inputs.

If you do not specify `host:`, all LG webOS Smart TVs within your network will be auto-discovered if they use the default name setting of `[LG] webOS TV`.
Home Assistant is able to turn on a LG webOS Smart TV if you specify an action, like HDMI-CEC or WakeOnLan.

A full configuration example will look like the sample below:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: webostv
    host: 192.168.0.10
    name: Living Room TV
    timeout: 5
    filename: webostv.conf
    turn_on_action:
      service: persistent_notification.create
      data:
        message: "Turn on action"
    customize:
      sources:
        - livetv
        - youtube
        - makotv
        - netflix
```
