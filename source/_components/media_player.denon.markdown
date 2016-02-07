---
layout: component
title: "Denon Network Receivers"
description: "Instructions how to integrate Denon Network Receivers into Home Assistant."
date: 2015-09-08 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: denon.png
ha_category: Media Player
---


The `denon` platform allows you to control a [Denon Network Receivers](http://www.denon.co.uk/chg/product/compactsystems/networkmusicsystems/ceolpiccolo) from Home Assistant.

Supported devices:

- Denon DRA-N5
- Denon RCD-N8 (untested)

To add a Denon Network Receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: denon
  host: IP_ADDRESS
  name: Music station
```
Configuration variables:

- **host** (*Required*): IP address of the device. Example: 192.168.1.32
- **name** (*Optional*): Name of the device

A few notes:

- The receiver handles only one telnet connection and refuses others.
- Be careful with the volume. 50% or even 100% are very loud.
- To be able to wake up the receiver, activate the "remote" setting in the receiver's settings.
- Play and pause are supported, toggling is not possible.
- Seeking cannot be implemented as the UI sends absolute positions. Only seeking via simulated button presses is possible.
