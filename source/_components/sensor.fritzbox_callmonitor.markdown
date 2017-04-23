---
layout: page
title: "FRITZ!Box"
description: "Instructions how to integrate a phone call monitor for AVM FRITZ!Box routers into Home Assistant."
date: 2016-08-13 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: System Monitor
ha_release: 0.27
ha_iot_class: "Local Polling"
---


The `fritzbox_callmonitor` sensor monitors the call monitor exposed by [AVM Fritz!Box](http://avm.de/produkte/fritzbox/) routers
on TCP port 1012. It will assume the values `idle`, `ringing`, `dialing`, or `talking` with the phone numbers involved contained in the state attributes.

To activate the call monitor on your Fritz!Box, dial #96\*5\* from any phone connected to it.

To use the Fritz!Box call monitor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fritzbox_callmonitor
```

Configuration variables:

- **host** (*Optional*): The IP address of your router, eg. 192.168.1.1. It is optional since every fritzbox is also reachable by using the IP address 169.254.1.1.
- **port** (*Optional*): The TCP port of the call monitor. There is usually no reason to change this.
