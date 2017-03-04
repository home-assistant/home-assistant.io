---
layout: page
title: "Volumia Media Player"
description: "Instructions how to integrate a Volumia Raspberry Pi media player into Home Assistant."
date: 2017-02-04
sidebar: true
comments: false
sharing: true
footer: true
logo: yamaha.png
ha_category: Media Player
ha_release: 0.39
---

The `volumio` platform allows you to control a [Volumio media player](https://volumio.org/) from Home Assistant.


To add a Volumio player to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: volumio
    name: 'Volumio Home Audio'
    host: homeaudio.local
    port: 3000```
Configuration variables:

- **name** (*Optional*): Name of the device
- **host** (*Required*): IP address or hostname of the device
- **port** (*Required*): Port number of Volumio service

```
