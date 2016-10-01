---
layout: page
title: "Sony Bravia TV"
description: "Instructions on how to integrate a Sony Bravia TV into Home Assistant."
date: 2016-07-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bravia.png
ha_category: Media Player
ha_release: 0.23
ha_iot_class: "Local Polling"
---

The `braviatv` platform allows you to control a [Sony Bravia TV](http://www.sony.com).

Almost all [Sony Bravia TV 2013 and newer](http://info.tvsideview.sony.net/en_ww/home_device.html#bravia) are supported.

You will need to configure your TV to allow the Home Assistant for remote usage. To do that, ensure that your TV is turned on. Open the configuration popup on Home Assistant and enter a random PIN (for example 0000). After that, the TV will show you a PIN and Home Assistant will allow you to re-enter that PIN. Enter the PIN shown on your TV and Home Assistant will be able to control your Sony Bravia TV.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: braviatv
    host: 192.168.0.10
```

Configuration variables:

- **host** (*Required*): The IP of the Sony Bravia TV, eg. 192.168.0.10
- **name** (*Optional*): The name to use on the frontend.

You are also able to configure the TV manually by placing a `bravia.conf` file in your `.homeassistant` config directory with the following information - please update the details to match your setup:

```json
{"192.168.0.10": {"pin": "7745", "mac": "ac:1e:0a:e1:0c:01"}}
```
