---
layout: page
title: "Emby"
description: "Instructions on how to integrate Emby into Home Assistant."
date: 2016-10-13 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: emby.png
ha_category: Media Player
ha_release: "0.32"
ha_iot_class: "Local Push"
---


The `emby` platform allows you to control a [Emby](http://emby.media/) multimedia system from Home Assistant.

To add Emby to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: emby
    host: 192.168.11.5
    api_key: "emby_api_key"
```

Configuration variables:

- **host** (*Optional*): The host name or address of the device that is running Emby. Defaults to ```localhost```.
- **api_key** (*Required*): The api-key you would like home-assistant to use to authenticate.
- **ssl** (*Optional*): `true` if you want to connect with https/wss. Your SSL certificate must be valid. Defaults to `false`.
- **port** (*Optional*): The port number. Defaults to 8096 with SSL set to `false` and 8920 with SSL set to `true`.
- **auto_hide** (*Optional*): `true` if you want to automatically hide devices that are unavailable from the Home Assistant Interface. Defaults to `false`.
