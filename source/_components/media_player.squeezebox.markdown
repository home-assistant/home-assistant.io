---
layout: component
title: "Logitech Squeezebox"
description: "Instructions how to integrate a Logitech Squeezebox into Home Assistant."
date: 2015-08-09 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logitech.png
ha_category: Media Player
---


The squeezebox platform allows you to control a [Logitech Squeezebox](https://en.wikipedia.org/wiki/Squeezebox_%28network_music_player%29) multimedia system from Home Assistant.

To add your Squeezebox to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: squeezebox
  host: IP_ADDRESS
  port: 9090
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **host** *Required*: The host name or address of the Logitech Media Server, eg. 192.168.1.21.
- **port** *Optional*: Telnet port to Logitech Media Server, default 9090.
- **username** *Optional*: The username, if password protection is enabled.
- **password** *Optional*: The password, if password protection is enabled.
