---
layout: page
title: "Emby"
description: "Instructions how to integrate Emby into Home Assistant."
date: 2016-10-13 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: emby.png
ha_category: Media Player
ha_release: "0.32"
ha_iot_class: "Local Polling"
---


The `emby` platform allows you to control a [Emby](http://emby.media/) multimedia system from Home Assistant.

To add Emby to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: emby
    host: http://192.168.11.5
    api_key: "emby_api_key"
```

Configuration variables:

- **host** (*Required*): The host name or address of the device that is running Emby, either http or https.
- **api_key** (*Requred*): The api-key you would like home-assistant to use to authenticate.
- **port** (*Optional*): The port number. Defaults to 8096.
